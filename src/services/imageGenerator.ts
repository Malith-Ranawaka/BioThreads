import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateProductImages() {
  const products = [
    { id: 'bio-1', prompt: 'A high-quality studio product photograph of a minimalist white organic cotton t-shirt, clean background, sustainable fashion aesthetic, professional lighting.' },
    { id: 'bio-2', prompt: 'A high-quality studio product photograph of a soft sage green bamboo jersey long sleeve shirt, clean background, sustainable fashion aesthetic, professional lighting.' },
    { id: 'bio-3', prompt: 'A high-quality studio product photograph of a rugged olive green hemp utility jacket, textured fabric, clean background, sustainable fashion aesthetic, professional lighting.' },
    { id: '5', prompt: 'A high-quality studio product photograph of a futuristic black parka made from upcycled bio-polymers, techwear style, clean background, sustainable fashion aesthetic, professional lighting.' }
  ];

  const results = [];

  for (const product of products) {
    console.log(`Generating image for ${product.id}...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: product.prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4",
          },
        },
      });

      let imageUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        results.push({ id: product.id, imageUrl });
      }
    } catch (error) {
      console.error(`Error generating image for ${product.id}:`, error);
    }
  }

  return results;
}

// This script is intended to be used as a reference for the agent to know what to do.
// The agent will actually perform the tool calls.
