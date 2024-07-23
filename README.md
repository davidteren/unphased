# Unphased - YouTube Audio Phase Correction Extension

Unphased is a Chrome extension designed to correct out-of-phase audio issues in YouTube videos. It provides options for phase inversion and mono output, allowing users to improve the audio quality of videos with phase-related problems.

## Features

- **Phase Inversion**: Invert the phase of the right audio channel to correct out-of-phase stereo recordings.
  - **Mono Toggle**: Convert the audio to mono, which can help identify phase issues and improve clarity in some cases.
  - **Easy-to-use Interface**: Simple buttons overlaid on YouTube pages for quick audio adjustments.
  - **Persistent Settings**: Audio settings persist while navigating between YouTube videos.

## Demo

![Demo video](https://github.com/davidteren/unphased/blob/main/docs/unphased-demo1.mp4)

## Installation

### From Source (For Development)

1. Clone this repository:
   ```
   git clone https://github.com/your-username/unphased.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

### From Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store for easy installation once it's published.

## Usage

1. Navigate to any YouTube video.
2. Look for the Unphased control panel in the top right corner of the page.
3. Use the "Phase" button to toggle between normal and inverted phase for the right channel.
4. Use the "Stereo/Mono" button to switch between stereo and mono output.
5. Adjust these settings until you achieve the best audio quality for the current video.

## Development

The extension is built using vanilla JavaScript and utilizes the Web Audio API for audio processing. The main components are:

- `manifest.json`: Extension configuration file
- `content.js`: Contains the core logic for audio processing and UI creation
- `background.js`: Handles extension icon clicks
- `popup.html`: Defines the popup that appears when clicking the extension icon
- `styles.css`: Contains styles for the extension's UI elements

To modify the extension:

1. Make your changes to the relevant files.
2. If you're adding new features, make sure to update the manifest file if necessary.
3. Reload the extension in Chrome to test your changes.

## Contributing

Contributions are welcome! If you have a bug fix or new feature you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Push to your fork and submit a pull request.

Please make sure your code adheres to the existing style and that you've tested your changes thoroughly.

## License

[MIT License](LICENSE)

## Contact

If you have any questions or suggestions, please open an issue on this GitHub repository.
