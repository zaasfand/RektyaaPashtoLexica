import axios from "axios";

class PashtoGenerative {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";
    }

    /**
     * Processes a given text file and sends it to the API for Pashto text analysis.
     * @param {File} file - The uploaded .txt file containing Pashto text.
     * @returns {Promise<Object>} - A Promise resolving to a structured JSON response.
     */
    async processFile(file) {
        return new Promise((resolve, reject) => {
            // Ensure a file is provided
            if (!file) {
                return reject(new Error("No file provided"));
            }

            // Allow only .txt files
            if (!file.name.endsWith(".txt")) {
                return reject(new Error("Only .txt files are allowed"));
            }

            const reader = new FileReader();

            // Handle successful file reading
            reader.onload = async (event) => {
                try {
                    const fileContent = event.target.result.trim();

                    // Ensure the file is not empty
                    if (!fileContent) {
                        return reject(new Error("Uploaded file is empty"));
                    }

                    // Construct the API prompt for text processing
                    const prompt = `Task: Process the following Pashto text and return a structured JSON output.

                    Text:
                    ${fileContent}
                    
                    Steps:
                    1. Identify the script type: 'Roman Pashto' or 'Literal Pashto'.
                    2. Segment text into lines and words.
                    3. Extract each word's details with the following keys, ensuring they are always included:
                       - "original_word": (The word in Pashto script)
                       - "roman_transliteration": (The word in Roman Pashto)
                       - "english_meaning": (The English meaning of the word)
                       - "part_of_speech": (The grammatical category of the word, e.g., noun, verb)
                       - "synonyms": (An array of synonyms in Pashto)
                    
                    4. If the script is **Roman Pashto**, translate it into **Pashto script**.
                    5. If the script is **Pashto script**, transliterate it into **Roman Pashto**.
                    6. Return a structured JSON response in **pure JSON format**, without markdown or extra formatting.`;
                    

                    // Define the API request payload
                    const requestData = {
                        contents: [{ role: "user", parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 1,
                            top_p: 0.95,
                            top_k: 40,
                            max_output_tokens: 8192,
                        },
                    };

                    // Make API request to process the text
                    const response = await axios.post(`${this.apiUrl}?key=${this.apiKey}`, requestData);

                    // Validate API response
                    if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
                        return reject(new Error("Invalid API response: Missing candidates"));
                    }

                    // Extract the generated response content
                    const json = response.data.candidates[0].content.parts[0].text;
                    const responseText = json;

                    if (!responseText) {
                        return reject(new Error("Invalid API response: Missing 'text' content"));
                    }

                    try {
                        // Trim any unwanted spaces or formatting from response
                        let cleanResponse = responseText.trim();

                        // Remove backticks if the response contains a code block
                        if (cleanResponse.startsWith("```json")) {
                            cleanResponse = cleanResponse.replace(/^```json/, "").replace(/```$/, "").trim();
                        }

                        // Parse the response text into JSON
                        const jsonOutput = JSON.parse(cleanResponse);

                        // Log the parsed JSON output for debugging
                        console.log("🚀 ~ PashtoGenerative ~ reader.onload= ~ jsonOutput:", jsonOutput);

                        // Resolve the promise with the JSON output
                        resolve(jsonOutput);
                    } catch (jsonError) {
                        console.error("JSON Parsing Error:", jsonError);
                        reject(new Error("Failed to parse API response as JSON"));
                    }
                } catch (error) {
                    console.error("Processing error:", error);
                    reject(error);
                }
            };

            // Handle file read errors
            reader.onerror = () => {
                reject(new Error("Error reading file"));
            };

            // Read file content as text
            reader.readAsText(file);
        });
    }
}

export default PashtoGenerative;
