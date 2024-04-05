import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  type GenerationConfig,
} from "@google/generative-ai";
import * as dotenv from "dotenv";
dotenv.config();

type Config = "free" | "normal" | "pro";
type Model = "gemini-pro" | "gemini-vision-pro";
interface GenerativeData {
  config: Config;
  model: Model;
}

const GeminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const GenerativeAI = (data: GenerativeData) => {
  /* Configuration Free | changes switch to normal and pro */
  let generationConfig: GenerationConfig = {
    temperature: 0.5,
    stopSequences: ["\n"],
    topK: 40,
    topP: 0.9,
  };
  /* Model to use */
  const model: Model = data.model;

  switch (data.config) {
    case "normal":
      generationConfig = {
        ...generationConfig,
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
      };
      break;
    case "pro":
      generationConfig = {
        ...generationConfig,
        temperature: 0.9,
        topK: 40,
        topP: 0.9,
      };
      break;
  }

  return GeminiAI.getGenerativeModel({
    model: model,
    generationConfig: generationConfig,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });
};
