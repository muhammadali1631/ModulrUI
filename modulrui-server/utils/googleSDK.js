import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const askAI = async (messages) => {
  try {

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Message array is empty");
    }

    // Convert OpenAI messages -> Gemini format
    const contents = [];
    let systemInstruction = null;

    for (const message of messages) {
      if (message.role === "system") {
        systemInstruction = {
          parts: [
            {
              text: message.content,
            },
          ],
        };
        continue;
      }

      contents.push({
        role: message.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: message.content,
          },
        ],
      });
    }

    const body = {
      contents,
    };

    if (systemInstruction) {
      body.systemInstruction = systemInstruction;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error(data?.error?.message || "Request failed");
    }

    const content =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!content.trim()) {
      throw new Error("AI returned empty response");
    }

    return content;
  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw error;
  }
};