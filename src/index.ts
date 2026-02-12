import "./bootstrap"; // Load environment variables
import { Command } from "commander";
import { extractCallData } from "./llm/extractor";
import { detectUrgency } from "./urgency/urgencyRules";
import { CallSchema } from "./schema/callSchema";

const program = new Command();

// Define the CLI interface
program
  .argument("[transcript]", "Phone call transcript")
  .action(async (transcript) => {
    try {
      // Validate transcript input
      if (!transcript || transcript.trim().length === 0) {
        console.error("Error: No transcript provided.\n");
        console.error("Usage:");
        console.error('  npm start "Patient transcript text..."');

        process.exit(1);
      }

      const extracted = await extractCallData(transcript); // Extract structured data from the transcript
      const urgency = detectUrgency(extracted.summary); // Determine urgency based on the summary
      const result = {
        // Combine extracted data with urgency level
        ...extracted,
        urgency,
      };

      const validatedResult = CallSchema.parse(result);

      console.log(JSON.stringify(validatedResult, null, 2));
    } catch (err) {
      console.error("Error processing transcript:", err);

      process.exit(1);
    }
  });

program.parse();
