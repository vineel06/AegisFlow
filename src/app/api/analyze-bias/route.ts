import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API client by accessing the variable securely.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    // Ensure the key exists
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error: GEMINI_API_KEY is not defined.' },
        { status: 500 }
      );
    }

    // Attempt to parse the request body
    const body = await req.json().catch(() => ({}));
    const { biasData } = body;

    // Validate the input
    if (!biasData || typeof biasData !== 'string') {
      return NextResponse.json(
        { error: 'Bad Request: Missing or invalid "biasData" in request body.' },
        { status: 400 }
      );
    }

    // Load the designated gemini-2.5-flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Construct the advanced prompt for the AI Ethics Officer persona
    const prompt = `
      Act as an expert AI Ethics Officer investigating an algorithmic system.
      You are evaluating the following statistical bias data logged by the ingestion pipeline:
      "${biasData}"
      
      You must return your findings in pure JSON format only.
      Your JSON response MUST contain exactly the following structure:
      {
        "summary": "A concise overview of the bias that has been detected.",
        "potential_harm": "A direct explanation of the real-world harm and ethical violations this could cause.",
        "mitigation_strategy": [
          "Actionable step 1",
          "Actionable step 2",
          "Actionable step 3"
        ]
      }
    `;

    // Fire the generative request configuring rigorous JSON MIME typing
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = result.response.text();
    const jsonOutput = JSON.parse(responseText);

    // Provide the clean JSON response to the client
    return NextResponse.json(jsonOutput, { status: 200 });

  } catch (error: any) {
    console.error('AI Ethics Analysis Error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI execution context.', details: error.message },
      { status: 500 }
    );
  }
}
