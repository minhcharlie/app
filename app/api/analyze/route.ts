import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
  }

  try {
    const { prompt, customCriteria } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const customCriteriaText = customCriteria && customCriteria.length > 0 
      ? `Also evaluate based on these custom criteria: ${customCriteria.join(', ')}. For each custom criterion, provide a score from 0 to 100 in the "customScores" object.`
      : ''

    const systemPrompt = `
      You are an expert prompt engineer. Your task is to evaluate the following prompt for clarity, relevance, and coherence.
      
      Provide your evaluation in a strict JSON format with the following keys:
      - clarityScore: A number from 0 to 100.
      - relevanceScore: A number from 0 to 100.
      - coherenceScore: A number from 0 to 100.
      - customScores: An object where keys are the custom criteria names and values are numbers from 0 to 100. (Only if custom criteria were provided)
      - suggestions: An array of strings containing specific improvement suggestions.
      - rewrittenPrompt: A version of the prompt that you have improved based on your evaluation.

      ${customCriteriaText}

      Prompt to evaluate:
      "${prompt}"
    `

    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const text = response.text()
    
    const jsonMatch = text.match(/\{.*\}/s)
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response as JSON')
    }
    
    const analysis = JSON.parse(jsonMatch[0])

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
