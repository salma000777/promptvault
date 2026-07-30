import OpenAI from "openai";

export async function optimizePromptWithOpenRouter(
  originalPrompt: string
) {
  const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY!,
    baseURL: "https://openrouter.ai/api/v1",
  });

  const response = await client.chat.completions.create({
    model:
      process.env.OPENROUTER_MODEL ??
      "qwen/qwen3-coder:free",

    messages: [
      {
        role: "system",
        content:
          "You are PromptVault's prompt optimization assistant.",
      },
      {
        role: "user",
        content: originalPrompt,
      },
    ],
  });

  throw new Error(
    "OpenRouter provider not implemented yet. Response:\n\n" +
      response.choices[0].message.content
  );
}