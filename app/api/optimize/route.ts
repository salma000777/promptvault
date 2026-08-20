import { NextResponse } from "next/server";

import {
  optimizePromptRequestSchema,
} from "@/lib/ai/schemas";

import {
  optimizePrompt,
} from "@/lib/ai/provider";

import {
  createClient,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(
  request: Request
) {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
      error: authError,
    } =
      await supabase.auth.getUser();

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

    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("is_pro")
        .eq("id", user.id)
        .maybeSingle();

    if (profileError) {
      console.error(
        "Failed to check Pro access:",
        profileError
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify your Pro access.",
        },
        {
          status: 500,
        }
      );
    }

    if (!profile?.is_pro) {
      return NextResponse.json(
        {
          error:
            "AI optimization is a Pro feature. Upgrade to Pro to use Studio.",
        },
        {
          status: 403,
        }
      );
    }

    let requestBody: unknown;

    try {
      requestBody =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid request body.",
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
            validation.error.issues[0]
              ?.message ??
            "Invalid prompt.",
        },
        {
          status: 400,
        }
      );
    }

    const result =
      await optimizePrompt(
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
        status: 503,
      }
    );
  }
}
