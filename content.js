let words = [];
let language = "english";
let autoFill = false;

chrome.storage.sync.get(["autoFill"], (data) => {
  autoFill = data.autoFill || false;
});
async function fetchWords(lang) {
  const url = `https://raw.githubusercontent.com/Godwhitelight/skribbl-wordlist/main/${lang}.txt?raw=true`;
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  // Try UTF-8 first
  let text = new TextDecoder("utf-8").decode(buffer);

  // If text is mostly "�", retry as Windows-1255
  if ((text.match(/�/g) || []).length > text.length / 2) {
    text = new TextDecoder("windows-1255").decode(buffer);
  }

  console.log(text);
  return text.split("\n").map(w => w.trim()).filter(Boolean);
}

function extractHintAndLength() {
  const hintContainer = document.querySelector("#game-word .container");
  if (!hintContainer) return null;

  const hintElems = Array.from(hintContainer.querySelectorAll(".hint"));
  const hint = hintElems.map(elem => {
    return elem.classList.contains("uncover") ? elem.textContent.toLowerCase() : "_";
  }).join("");

  const wordLengthText = hintContainer.querySelector(".word-length")?.textContent.trim() || "";
  const lengths = wordLengthText.split(" ").map(s => parseInt(s, 10)).filter(n => !isNaN(n));

  return { hint, lengths };
}

function matchWords(hint, lengths) {
  const regex = new RegExp("^" + hint.replace(/_/g, ".") + "$", "i");

  return words.filter(word => {
    const split = word.split(" ");
    if (split.length !== lengths.length) return false;
    for (let i = 0; i < split.length; i++) {
      if (split[i].length !== lengths[i]) return false;
    }
    return regex.test(word);
  });
}

function showSuggestions(suggestions) {
  let box = document.getElementById("suggestionBox");
  if (!box) {
    box = document.createElement("div");
    box.id = "suggestionBox";
    box.style = `
    position: absolute;
    top: 20px;
    right: 20px;
    background: white;
    color: black;
    padding: 15px;
    border: 1px solid black;
    z-index: 9999;
    max-height: 600px;
    overflow-y: scroll;   /* ✅ always show vertical scroll */
    overflow-x: hidden;
    font-size: 18px;
    line-height: 1.5;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    font-family: "Arial", "Segoe UI", "Noto Sans Hebrew", sans-serif; /* ✅ Hebrew safe fonts */
  `;
    document.body.appendChild(box);
  }

  if (suggestions.length === 0) {
    box.innerHTML = "<strong>No matches</strong>";
  } else {
    box.innerHTML =
      "<strong>Suggestions:</strong><br>" +
      suggestions.slice(0, 20).map(w => `• ${w}`).join("<br>");
  }

  if (autoFill && suggestions.length === 1) {
    const chatInput = document.querySelector("form.chat-form input[type='text']");
    if (chatInput) {
      chatInput.value = suggestions[0];
      chatInput.focus();
    }
  }
}

function monitor() {
  let lastHint = "";

  setInterval(() => {
    const data = extractHintAndLength();
    if (!data) return;

    const { hint, lengths } = data;
    if (!hint || hint === lastHint) return;

    lastHint = hint;
    const matches = matchWords(hint, lengths);
    showSuggestions(matches);
  }, 1000);
}

chrome.storage.sync.get(["language"], async (data) => {
  language = data.language || "English";
  words = await fetchWords(language);
  console.log(`✅ Loaded ${words.length} words for ${language}`);
  monitor();
});