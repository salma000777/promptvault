import {
  GoogleGenAI,
  Type,
} from "@google/genai";

import {
  promptOptimizationSchema,
  type PromptOptimizationResult,
} from "@/lib/ai/schemas";

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing from .env.local."
    );
  }

  return new GoogleGenAI({
    apiKey,
  });
}

function buildOptimizationInstruction(
  originalPrompt: string
) {
  return `
You are PromptVault's senior prompt-engineering evaluator.

Analyze and improve the user's prompt.

Evaluation criteria:
1. Clarity and specificity
2. Context and background
3. Role definition
4. Goal definition
5. Constraints and boundaries
6. Output format
7. Intended audience
8. Examples or reference material
9. Ability to produce consistent results
10. Avoidance of ambiguity

Scoring rules:
- Give a score from 0 to 100.
- Judge the original prompt, not your improved version.
- Be honest and useful.
- Do not inflate the score.
- Preserve the user's original purpose.
- Do not introduce unsafe or unrelated instructions.
- Write actionable feedback.
- The optimized prompt must be ready to copy and use.
- Do not wrap the optimized prompt in Markdown code fences.
- Do not include commentary outside the requested JSON structure.

Original user prompt:

${originalPrompt}
`;
}

export async function optimizePromptWithGemini(
  originalPrompt: string
): Promise<PromptOptimizationResult> {
  const ai = getGeminiClient();

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",

    contents: buildOptimizationInstruction(
      originalPrompt
    ),

    config: {
      temperature: 0.3,

      responseMimeType: "application/json",

      responseSchema: {
        type: Type.OBJECT,

        properties: {
          score: {
            type: Type.INTEGER,
            minimum: 0,
            maximum: 100,
            description:
              "A strict quality score for the original prompt.",
          },

          summary: {
            type: Type.STRING,
            description:
              "A concise overall assessment of the original prompt.",
          },

          strengths: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description:
              "Specific strengths found in the original prompt.",
          },

          weaknesses: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description:
              "Specific weaknesses or missing information.",
          },

          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description:
              "Actionable recommendations for improving the prompt.",
          },

          optimizedPrompt: {
            type: Type.STRING,
            description:
              "A complete improved version ready to copy and use.",
          },
        },

        required: [
          "score",
          "summary",
          "strengths",
          "weaknesses",
          "suggestions",
          "optimizedPrompt",
        ],
      },
    },
  });

  const responseText = response.text;

  if (!responseText) {
    throw new Error(
      "Gemini returned an empty response."
    );
  }

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(responseText);
  } catch {
    console.error(
      "Invalid Gemini JSON response:",
      responseText
    );

    throw new Error(
      "Gemini returned an invalid response."
    );
  }

  const validation =
    promptOptimizationSchema.safeParse(
      parsedResponse
    );

  if (!validation.success) {
    console.error(
      "Gemini response validation failed:",
      validation.error.flatten()
    );

    throw new Error(
      "Gemini returned an incomplete analysis."
    );
  }

  return validation.data;
}