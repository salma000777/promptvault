import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const apiKey = process.env.PADDLE_API_KEY;

if (!apiKey) {
  throw new Error("Missing PADDLE_API_KEY");
}

export const paddle = new Paddle(apiKey, {
  environment:
    process.env.PADDLE_ENV === "production"
      ? Environment.production
      : Environment.sandbox,
});