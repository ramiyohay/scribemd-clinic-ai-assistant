# ScribeMD Clinic AI Assistant

## Overview
A simple AI-powered CLI that processes simulated clinic phone transcripts and outputs structured JSON.

## Features
- Intent detection
- Structured data extraction
- Rule-based urgency classification
- Schema validation using Zod

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
- Multilingual support