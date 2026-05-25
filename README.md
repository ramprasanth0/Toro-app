# Toro — Global, AI-Corrected Dictation for Everyone

Toro is a lightweight, global keyboard-triggered dictation assistant that formats, capitalizes, and punctuates your spoken words in real time as you speak. Built for developers, technical writers, and creators, it works seamlessly across your entire operating system.

---

## ⚡ Why Toro?

Most operating system dictation tools are built for general-purpose text and struggle with complex jargon, formatting, and technical terms. Toro utilizes an advanced AI correction layer that corrects capitalization, punctuation, and structural context automatically.

* **3x to 4x Faster**: Dictating at **120–150 words per minute** cuts typing time for documentation, pull requests, emails, and notes in half.
* **Smart Grammar Correction**: Toro formats spoken inputs into polished, professional prose instantly (e.g. automatically capitalizing acronyms like RFC, SQL, WebSocket, etc., and placing commas and periods), without you having to speak your punctuation aloud.

---

## 🚀 Key Benefits

* **Universal OS Access**: Press and hold `Ctrl + Space` anywhere to record. Release the shortcut to instantly auto-correct and paste the polished text at your cursor.
* **Intelligent Auto-Correction**: Fixes spelling mistakes, corrects grammar, and formats technical prose.
* **Quiet Background Utility**: Sits unobtrusively in your system tray, staying completely out of your way until called.
* **Audio Feedbacks**: Low-latency acoustic ticks play when your session starts and ends for touch-free recording.
* **Selectable AI Profiles**: Switch between Fast, Balanced, and Accurate dictation modes on the fly via a simple taskbar icon.

---

## 🛠️ Installation & Setup

1. **Download Toro**:
   Go to the [Releases](https://github.com/ramprasanth0/toro-app/releases) section and download the latest compiled `Toro.exe` executable for Windows.
   `Previous releases have been removed due to security reasons`

3. **Configure Your Credentials**:
   Create a `.env` file in the **exact same directory** where you placed `Toro.exe` and save your API keys inside it:
   ```env
   DEEPGRAM_API_KEY=your_deepgram_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Launch**:
   Double-click `Toro.exe`. Toro will run quietly in the system tray.

5. **Dictate**:
   - Focus any text entry box (IDE, editor, Slack, browser, etc.).
   - **Press and hold** `Ctrl + Space` and speak naturally.
   - **Release** the shortcut keys, and watch your words appear, perfectly corrected!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
