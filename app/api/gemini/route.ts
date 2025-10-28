import { NextRequest, NextResponse } from 'next/server';
import { generateContent, trainOnData } from '@/lib/gemini-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, trainData } = body;

    // If we have training data, register it
    if (trainData) {
      await trainOnData(trainData);
    }

    // If we have a prompt, generate content
    if (prompt) {
      const response = await generateContent(prompt);
      return NextResponse.json({ success: true, response });
    }

    return NextResponse.json({ success: false, error: 'No prompt provided' });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to generate content' });
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'Gemini API endpoint is running',
    apiKeySet: !!process.env.GEMINI_API_KEY,
    model: 'gemini-2.5-flash'
  });
}