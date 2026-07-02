import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const completion = await openrouter.chat.completions.create({
      model: "openai/gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are PromptVault AI.

Your job is to transform prompts into professional prompt engineering quality.

Always return:

# Optimized Prompt

<optimized prompt>

# Improvements

- Improvement 1
- Improvement 2
- Improvement 3

# Prompt Score

A score out of 100.

# Recommended Model

Which AI model is best for this prompt and why.
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return NextResponse.json({
      output: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}