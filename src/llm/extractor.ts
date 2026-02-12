import OpenAI from "openai";

// Use OPENAI_API_KEY from environment variables for authentication
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// text cleaning function to remove code block formatting from the model's response
function cleanJsonResponse(text: string): string {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

// This function takes a phone call transcript as input and uses the OpenAI API to extract structured data from it
export async function extractCallData(transcript: string) {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    temperature: 0, // makes output deterministic
    input: `
You are an information extraction system for a medical clinic.

Extract structured data from the transcript.

IMPORTANT:
You MUST use ONLY the following intent values:
- appointment_booking
- prescription_refill
- billing_question
- urgent_medical_issue
- lab_results
- other

Do NOT invent new labels.
Do NOT paraphrase.
Choose the closest match.

Return JSON only with this exact structure:
{
  "intent": "...",
  "name": "...",
  "dob": "...",
  "phone": "...",
  "summary": "..."
}

Transcript:
"""${transcript}"""
`,
  });

  const text = response.output_text;
  const cleanedText = cleanJsonResponse(text); // Clean the response to extract valid JSON

  try {
    return JSON.parse(cleanedText);
  } catch (err) {
    console.error("Failed to parse LLM response:");
    console.error(cleanedText);

    throw err;
  }
}
