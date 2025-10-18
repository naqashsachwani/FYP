import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { openai } from "@/configs/openai";

async function main(base64Image, mimeType) {
  const messages = [
    {
      role: "system",
      content: `
        You are a product listing assistant for an e-commerce store.
        Your job is to analyze an image of a product and generate structured data.

        Respond ONLY with raw JSON (no code blocks, no markdown, no explanation).
        The JSON must strictly follow this schema:

        {
          "name": string,
          "description": string
        }
      `,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Analyze this image and return name + description.",
        },
        {
          type: "image_url",
          image_url: `data:${mimeType};base64,${base64Image}`,
        },
      ],
    },
  ];

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages,
    max_tokens: 300,
  });

  const raw = response.choices[0].message.content || "";
  const cleaned = raw.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    throw new Error("AI did not return valid JSON");
  }

  return parsed;
}

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { base64Image, mimeType } = await request.json();

    if (!base64Image || !mimeType) {
      return NextResponse.json({ error: "Missing image data or MIME type" }, { status: 400 });
    }

    const result = await main(base64Image, mimeType);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: error.code || error.message || "AI request failed" },
      { status: 400 }
    );
  }
}
