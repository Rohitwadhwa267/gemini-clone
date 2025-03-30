const apiKey = "AIzaSyABJiOaSThHHgyVPPdO56xziL1MatcYNgY";
// geminiApi.js (Separate file for Gemini API interaction)
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as mime from 'mime-types';


export async function getGeminiResponse(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseModalities: [],
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const candidates = result.response.candidates;
    let text = result.response.text();

    // Handle inline data downloads (images etc.)
    for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if (part.inlineData) {
          try {
            const mimeType = part.inlineData.mimeType;
            const extension = mime.extension(mimeType);
            const filename = `output_${candidate_index}_${part_index}.${extension}`;
            const base64Data = part.inlineData.data;

            const blob = base64toBlob(base64Data, mimeType);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            console.log(`Output downloaded as: ${filename}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    console.log("Response:", text);
    
    return text;

  } catch (error) {
    console.error("Error during API call:", error);
    return null; // Return null or an error object
  }
}

const base64toBlob = (base64Data, mimeType) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mimeType });
};