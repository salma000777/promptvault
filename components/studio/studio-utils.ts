export function getScoreLabel(score: number): string {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Strong";
  }

  if (score >= 60) {
    return "Good foundation";
  }

  if (score >= 40) {
    return "Needs improvement";
  }

  return "Weak";
}

export function getScoreDescription(score: number): string {
  if (score >= 90) {
    return "Your prompt is highly specific, structured, and ready for reliable AI output.";
  }

  if (score >= 75) {
    return "Your prompt is effective, with a few opportunities to improve precision.";
  }

  if (score >= 60) {
    return "The core idea is solid, but clearer instructions would improve the result.";
  }

  if (score >= 40) {
    return "The prompt needs more context, constraints, and output direction.";
  }

  return "The prompt is too open-ended to consistently produce a useful result.";
}