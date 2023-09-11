import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  console.log("API KEY :", openai.apiKey);

  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    const contextMessage = {
      role: "system",
      content:
        "Tu es un générateur de code. Répond seulement en utilisant du code en markdown. Utilise le code pour expliquer . Ecris les explication en fancais. ",
    };

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("API KEY not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [contextMessage, ...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (e) {
    console.error("[CONVERSATION ERROR]", e);

    return new NextResponse("Internal error", { status: 500 });
  }
}
