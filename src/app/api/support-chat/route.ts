import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // In development, might not have key set. Mock response to avoid crashing if empty,
      // but let's just log and throw.
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured" }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a helpful and technical 'Help Desk' automated assistant for the AegisFlow dashboard, a system for systemic bias detection and algorithmic auditing. 

If the user says hi, hello, or asks a non-technical question, respond with a friendly greeting.

IMPORTANT: You must ALWAYS return a correctly formatted JSON object containing a single 'response' key with your answer as the value. Do not return plain text, ONLY a JSON object like this: {"response": "..."}

The user's question is: "${message}"`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    // Clean up potential markdown formatting
    responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();

    let finalJson;
    try {
      finalJson = JSON.parse(responseText);
      // Ensure it has the 'response' key
      if (!finalJson.response) {
        finalJson = { response: responseText };
      }
    } catch (e) {
      // Fallback if the model failed to return valid JSON
      finalJson = { response: responseText };
    }

    return new Response(JSON.stringify(finalJson), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Support Chat API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
