# pashto-lexica

Rekhtya - Pashto Lexica is an NPM package that processes Pashto text from `.txt` files using Google's Generative Language API (Gemini). It identifies the script type (Roman Pashto or Literal Pashto), extracts word details, and provides translations or transliterations.

## Features
- Detects whether the text is **Roman Pashto** or **Literal Pashto**.
- Segments the text into lines and words.
- Extracts word details (original word, English meaning, part of speech, synonyms in Pashto).
- Translates **Roman Pashto** into **Pashto script**.
- Transliterates **Pashto script** into **Roman Pashto**.
- Returns a structured JSON response.

---

## Installation

To install the package, run:

```sh
npm install @rekhtya/pashto-lexica
