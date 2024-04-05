import { GenerativeAI } from "./gemini";

type Config = "free" | "normal" | "pro";
type Model = "gemini-pro" | "gemini-vision-pro";
interface GenerativeData {
  prompt: {
    text: string;
    image?: string;
  };
  generative: {
    model: Model;
    config: Config;
  };
}

interface GenerativeResponse {
  text: string;
}

export default async (data: GenerativeData): Promise<GenerativeResponse> => {
  return new Promise(async (resolve, reject) => {
    const {
      prompt: { text },
    } = data;
    const { generateContent } = GenerativeAI(data.generative);

    try {
      const geminiResponse = await generateContent(text);

      resolve({
        text: geminiResponse.response.text(),
      });
    } catch (error) {
      reject(error);
    }
  });
};
