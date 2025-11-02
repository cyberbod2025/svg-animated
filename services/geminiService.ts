
import { GoogleGenAI } from "@google/genai";
import type { AnimationConfig } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function buildPrompt(config: AnimationConfig): string {
  const { 
    logoName, 
    logoAnimation, 
    textAnimation, 
    backgroundAnimation, 
    duration, 
    primaryColor, 
    secondaryColor, 
    isTransparent,
    backgroundColor
  } = config;

  return `
You are an expert SVG animation designer. Your task is to generate a complete, single, valid, and animated SVG file based on the user's request.
The animation MUST be implemented using SMIL (Synchronized Multimedia Integration Language) within the SVG file itself.
DO NOT use CSS or JavaScript for animations. The SVG MUST be self-contained.
The viewBox should be '0 0 200 200'.
Ensure the animation loops indefinitely ('indefinite').
The generated SVG should be visually stunning and professional.

User's Request:
- Logo Name/Text: "${logoName}"
- Main Shape Animation: ${logoAnimation}. This should be the most prominent visual element.
- Text Animation: ${textAnimation}. This applies to the text "${logoName}".
- Background Animation: ${backgroundAnimation}.
- Total Animation Duration: ${duration} seconds. Coordinate the individual animations to fit within this duration.
- Background: ${isTransparent ? 'Transparent' : `Solid color (${backgroundColor})`}. If not transparent, add a rect element for the background.
- Primary Color: "${primaryColor}" (for the main logo shape and highlights)
- Secondary Color: "${secondaryColor}" (for text and secondary elements)

Please generate the SVG code now. Only output the raw SVG code, without any markdown formatting like \`\`\`svg.
  `;
}

export const generateAnimation = async (config: AnimationConfig): Promise<string> => {
  const prompt = buildPrompt(config);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate animation. Please check your API key and try again.");
  }
};
