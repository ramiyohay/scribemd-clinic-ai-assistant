import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import { extractCallData } from "../src/llm/extractor";
import { detectUrgency } from "../src/urgency/urgencyRules";

describe("AI Transcript Processing", () => {
  it("should detect urgent chest pain case", async () => {
    const transcript = `
      Hi, this is Sarah Cohen, born 03/12/1988.
      I’ve had chest pain for two days.
      Please call me back at 310-555-2211.
    `;

    const extracted = await extractCallData(transcript);
    const urgency = detectUrgency(extracted.summary);

    expect(extracted.intent).toBe("urgent_medical_issue");
    expect(urgency).toBe("high");
    expect(extracted.name).toContain("Sarah");
  });

  it("should classify prescription refill as low urgency", async () => {
    const transcript = `
      Hello, my name is David Levi.
      I need a refill on my medication.
      Call me at 212-555-9988.
    `;

    const extracted = await extractCallData(transcript);
    const urgency = detectUrgency(extracted.summary);

    expect(extracted.intent).toBe("prescription_refill");
    expect(urgency).toBe("low");
  });
});

describe("CLI Validation", () => {
  it("should fail when no transcript is provided", () => {
    let error: any = null;

    try {
      // Run the CLI
      execSync("ts-node src/index.ts", { stdio: "pipe" });
    } catch (err: any) {
      error = err;
    }

    const stderr = error.stderr.toString();

    expect(error).not.toBeNull();
    expect(stderr).toContain("No transcript provided");
  });
});
