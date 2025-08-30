const langSelect = document.getElementById("langSelect");
const autoFillToggle = document.getElementById("autoFillToggle");

chrome.storage.sync.get(["language", "autoFill"], (data) => {
  langSelect.value = data.language || "English";
  autoFillToggle.checked = data.autoFill || false;
});

langSelect.addEventListener("change", () => {
  chrome.storage.sync.set({ language: langSelect.value });
});

autoFillToggle.addEventListener("change", () => {
  chrome.storage.sync.set({ autoFill: autoFillToggle.checked });
});
