# ScribeMD Clinic AI Assistant

## Overview
A simple AI-powered CLI that processes simulated clinic phone transcripts and outputs structured JSON.

## Features
- Intent detection using an LLM (OpenAI GPT-4o-mini) for natural language understanding
- Structured data extraction from unstructured transcripts (name, DOB, phone, reason for call)
- Rule-based urgency classification to ensure deterministic and explainable triage
- Schema validation using Zod to guarantee clean, typed JSON output

## Approach
LLM Layer (OpenAI API)
- Handles natural language understanding and entity extraction from conversational input.

Deterministic Business Logic
- Urgency classification is rule-based to ensure predictable and explainable behavior rather than relying on probabilistic model output.

Validation Layer (Zod)
- Ensures all outputs conform to a strict schema before being returned, preventing malformed AI responses from propagating.

CLI Interface
- Provides a simple, testable interface to simulate real ingestion of transcripts.

## Setup

```bash
npm install
```

Create a `.env` file:

```
OPENAI_API_KEY=your_key_here
```

Run (examples attached):

```bash
npm start "Hi, this is Sarah Cohen, born 03/12/1988. I need to book an appointment because I’ve had chest pain for two days. Please call me back at 310-555-2211."
```

```bash
npm start "Hello, my name is Daniel Katz, DOB 11/02/1979. I'd like to schedule my annual physical. Call me at 917-555-4400."
```

```bash
npm start "This is Michael Brown, born January 3rd 1965. I need a refill for my diabetes medication. My number is 212-555-7788."
```

```bash
npm start "uh yeah hi this is uh David Levi I think my birthday is July 4 1975 and I need my blood pressure meds refilled please call me at 212 555 9988 thanks"
```

## Improvements (Future Work)
- Stronger structured outputs via function calling
- More advanced urgency detection (for this task we used hard coded values)
- Validation middleware for security
- Multilingual support to handle non-English callers
- Introduce confidence scoring and human-review routing for uncertain cases
- Package the service as an API endpoint for integration with EMR/scheduling systems