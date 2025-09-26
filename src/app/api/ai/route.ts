import { NextRequest, NextResponse } from 'next/server'
import { processAIRequest, AIRequest } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const body: AIRequest = await request.json()

    if (!body.featureId) {
      return NextResponse.json(
        { success: false, error: 'Feature ID is required' },
        { status: 400 }
      )
    }

    const result = await processAIRequest(body)

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}