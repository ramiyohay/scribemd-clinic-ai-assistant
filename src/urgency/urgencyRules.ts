// Here we define rules to determine the urgency of a patient's condition based on the summary of their symptoms.
// This is a simple approach , based on hardcoded keywords.
// In a real application, we will use a more sophisticated method, such as a machine learning model trained on historical call data.

export function detectUrgency(summary: string): "low" | "medium" | "high" {
  const s = summary.toLowerCase();

  if (
    s.includes("chest pain") ||
    s.includes("can't breathe") ||
    s.includes("stroke")
  ) {
    return "high";
  }

  if (
    s.includes("fever") ||
    s.includes("infection") ||
    s.includes("severe pain")
  ) {
    return "medium";
  }

  return "low";
}
