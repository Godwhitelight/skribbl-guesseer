# Skribbl.io Word Helper

A Chrome extension that helps you guess words in [skribbl.io](https://skribbl.io) by providing intelligent word suggestions based on hints and word length patterns.

## 🎯 Features

- **Multi-language Support**: Choose from English, German, Bulgarian, Czech, Danish, and Hebrew wordlists
- **Smart Word Matching**: Analyzes hint patterns and word length to suggest relevant words
- **Auto-fill Option**: Automatically fills the chat input when only one word matches the criteria
- **Real-time Suggestions**: Displays up to 20 word suggestions in a convenient floating box
- **Customizable Settings**: Easy-to-use popup interface for configuring language and auto-fill preferences

## 🚀 Installation

### From Source (Developer Installation)

1. **Download the Extension**
   ```bash
   git clone https://github.com/Godwhitelight/skribbl-guesseer.git
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the downloaded folder
   - The extension icon should appear in your toolbar

3. **Grant Permissions**
   - The extension needs access to `skribbl.io` to function properly
   - Permissions are automatically requested during installation

## 📖 How to Use

1. **Configure Settings**
   - Click the extension icon in your Chrome toolbar
   - Select your preferred language from the dropdown
   - Toggle auto-fill if you want the extension to automatically fill answers when only one word matches

2. **Play skribbl.io**
   - Navigate to [skribbl.io](https://skribbl.io) and join a game
   - When it's time to guess, the extension will automatically analyze the hint
   - Word suggestions will appear in a floating box on the right side of the screen

3. **Use Suggestions**
   - Browse through the suggested words
   - If auto-fill is enabled and only one word matches, it will be automatically entered
   - Otherwise, manually type your guess from the suggestions

## 🌍 Supported Languages

The extension supports word lists in the following languages:

- **English** - Most comprehensive wordlist
- **German** - Deutsche Wörter
- **Bulgarian** - Български думи
- **Czech** - České slova
- **Danish** - Danske ord
- **Hebrew** - מילים בעברית (with proper font support)

*Word lists are fetched from the [skribbl-wordlist](https://github.com/Godwhitelight/skribbl-wordlist) repository.*

## 🔧 Technical Details

### Architecture
- **Manifest Version**: 3 (latest Chrome extension standard)
- **Content Script**: Runs on `skribbl.io` pages to monitor game state
- **Popup Interface**: Settings page for user configuration
- **Storage**: Chrome sync storage for cross-device settings

### Key Components
- `manifest.json` - Extension configuration and permissions
- `content.js` - Main logic for hint detection and word matching
- `settings.html` - Settings interface UI
- `settings.js` - Settings page functionality

### Word Matching Algorithm
1. Extracts hint patterns and word length from the game interface
2. Filters word list based on matching criteria
3. Displays up to 20 most relevant suggestions
4. Optionally auto-fills when only one match is found

## 🛠️ Development

### Prerequisites
- Chrome browser with Developer mode enabled
- Basic understanding of Chrome extension development

### Local Development
1. Make changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Test on [skribbl.io](https://skribbl.io)

## 📝 License

This project is open source. Please respect the terms of use of skribbl.io when using this extension.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or suggest features via GitHub issues
- Submit pull requests for improvements
- Add support for additional languages
- Improve the word matching algorithm

## ⚠️ Disclaimer

This extension is for educational and entertainment purposes. Use responsibly and in accordance with skribbl.io's terms of service. The extension enhances the gaming experience but should not be used to gain unfair advantages in competitive play.

## 🔗 Related Projects

- [skribbl-wordlist](https://github.com/Godwhitelight/skribbl-wordlist) - Word lists used by this extension
