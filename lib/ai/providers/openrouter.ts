import {
  promptOptimizationSchema,
  type PromptOptimizationResult,
} from "@/lib/ai/schemas";

const OPENROUTER_API_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL?.trim() ||
  "openrouter/free";

function getOpenRouterApiKey() {
  const apiKey =
    process.env.OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is missing from .env.local."
    );
  }

  return apiKey;
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
- Return only data matching the requested JSON schema.

Original user prompt:

${originalPrompt}
`;
}

type OpenRouterResponse = {
  model?: string;
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
    code?: string | number;
  };
};

export async function optimizePromptWithOpenRouter(
  originalPrompt: string
): Promise<PromptOptimizationResult> {
  const apiKey = getOpenRouterApiKey();

  const response = await fetch(
    OPENROUTER_API_URL,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-OpenRouter-Title": "PromptVault",
      },

      body: JSON.stringify({
        model: OPENROUTER_MODEL,

        messages: [
          {
            role: "system",
            content:
              "You are PromptVault's senior prompt-engineering evaluator. Return only valid structured JSON matching the provided schema.",
          },
          {
            role: "user",
            content:
              buildOptimizationInstruction(
                originalPrompt
              ),
          },
        ],

        temperature: 0.3,

        response_format: {
          type: "json_schema",

          json_schema: {
            name: "prompt_optimization",

            strict: true,

            schema: {
              type: "object",

              additionalProperties: false,

              properties: {
                score: {
                  type: "integer",
                  minimum: 0,
                  maximum: 100,
                  description:
                    "A strict quality score for the original prompt.",
                },

                summary: {
                  type: "string",
                  description:
                    "A concise overall assessment of the original prompt.",
                },

                strengths: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  minItems: 1,
                  maxItems: 6,
                  description:
                    "Specific strengths found in the original prompt.",
                },

                weaknesses: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  minItems: 1,
                  maxItems: 6,
                  description:
                    "Specific weaknesses or missing information.",
                },

                suggestions: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  minItems: 1,
                  maxItems: 8,
                  description:
                    "Actionable recommendations for improving the prompt.",
                },

                optimizedPrompt: {
                  type: "string",
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
        },

        provider: {
          require_parameters: true,
        },
      }),
    }
  );

  let body: OpenRouterResponse;

  try {
    body =
      (await response.json()) as OpenRouterResponse;
  } catch {
    throw new Error(
      `OpenRouter returned an unreadable response (${response.status}).`
    );
  }

  if (!response.ok) {
    throw new Error(
      body.error?.message ??
        `OpenRouter request failed with status ${response.status}.`
    );
  }

  const responseText =
    body.choices?.[0]?.message?.content;

  if (!responseText) {
    throw new Error(
      "OpenRouter returned an empty response."
    );
  }

  let parsedResponse: unknown;

  try {
    parsedResponse =
      JSON.parse(responseText);
  } catch {
    console.error(
      "Invalid OpenRouter JSON response:",
      responseText
    );

    throw new Error(
      "OpenRouter returned invalid JSON."
    );
  }

  const validation =
    promptOptimizationSchema.safeParse(
      parsedResponse
    );

  if (!validation.success) {
    console.error(
      "OpenRouter response validation failed:",
      validation.error.flatten()
    );

    throw new Error(
      "OpenRouter returned an incomplete analysis."
    );
  }

  console.log(
    `PromptVault OpenRouter fallback succeeded${
      body.model
        ? ` using ${body.model}`
        : ""
    }.`
  );

  return validation.data;
}