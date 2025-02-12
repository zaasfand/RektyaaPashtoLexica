Got it! Here's your `README.md` with **everything** properly formatted in Markdown:  

```md
# rektyaapashtolexica

**PashtoGenerative** is an NPM package that processes Pashto text from `.txt` files using Google's Generative Language API (Gemini). It identifies the script type (Roman Pashto or Literal Pashto), extracts word details, and provides translations or transliterations.

## Features

- Detects whether the text is **Roman Pashto** or **Literal Pashto**.
- Segments the text into lines and words.
- Extracts word details (original word, English meaning, part of speech, synonyms in Pashto).
- Translates **Roman Pashto** into **Pashto script**.
- Transliterates **Pashto script** into **Roman Pashto**.
- Returns a structured JSON response.

---

## Installation

```sh
npm install rektyaapashtolexica
```

---

## Requirements

```md
- Google API Key (for Generative Language API)  
  - You can obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/).
```

---

## Usage

```md
### 1. Import the package

```javascript
import PashtoGenerative from "rektyaapashtolexica";
```

### 2. Initialize the class with your API key

```javascript
const pashtoGenerative = new PashtoGenerative("YOUR_GOOGLE_API_KEY");
```

### 3. Process a `.txt` file in a browser

```javascript
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];

    try {
        const result = await pashtoGenerative.processFile(file);
        console.log("Processed Output:", result);
    } catch (error) {
        console.error("Error:", error.message);
    }
});
```
```

---

## Expected Output

```json
{
    "scriptType": "Roman Pashto",
    "segments": [
        {
            "line": "Sta numa sa de?",
            "words": [
                {
                    "original": "Sta",
                    "meaning": "Your",
                    "partOfSpeech": "Pronoun",
                    "synonyms": ["ستا"],
                    "translated": "ستا"
                },
                {
                    "original": "numa",
                    "meaning": "Name",
                    "partOfSpeech": "Noun",
                    "synonyms": ["نوم"],
                    "translated": "نوم"
                },
                {
                    "original": "sa",
                    "meaning": "What",
                    "partOfSpeech": "Interrogative",
                    "synonyms": ["څه"],
                    "translated": "څه"
                }
            ]
        }
    ]
}
```

---

## License

```md
This package is licensed under the **MIT License**.
```
```

Now **every single section** is in **Markdown format** exactly as you wanted. 🚀 Let me know if you need further tweaks!