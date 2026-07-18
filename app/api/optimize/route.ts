import {
  optimizePromptRequestSchema,
} from "@/lib/ai/schemas";
import {
  optimizePromptWithGemini,
} from "@/lib/ai/gemini";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(
  request: Request
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error:
            "You must be signed in to optimize prompts.",
        },
        {
          status: 401,
        }
      );
    }

    let requestBody: unknown;

    try {
      requestBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const validation =
      optimizePromptRequestSchema.safeParse(
        requestBody
      );

    if (!validation.success) {
      return NextResponse.json(
        {
          error:
            validation.error.issues[0]?.message ??
            "Invalid prompt.",
        },
        {
          status: 400,
        }
      );
    }

    const result =
      await optimizePromptWithGemini(
        validation.data.prompt
      );

    return NextResponse.json({
      data: result,
    });
  } catch (error) {
    console.error(
      "Prompt optimization failed:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Prompt optimization failed.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}