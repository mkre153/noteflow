import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { processAIRequest, AIRequest, AI_FEATURES } from '@/lib/ai'

const requestSchema = Joi.object({
  featureId: Joi.string().valid(...AI_FEATURES.map(f => f.id)).required(),
  prompt: Joi.string().max(10000).allow(''),
  content: Joi.string().max(100000).allow(''),
  selectedText: Joi.string().max(50000).allow(''),
  tone: Joi.string().valid('professional', 'casual', 'academic', 'creative').optional()
})

export async function POST(request: NextRequest) {
  try {
    const body: AIRequest = await request.json()

    // Validate request body
    const { error, value } = requestSchema.validate(body)
    if (error) {
      return NextResponse.json(
        { success: false, error: `Validation error: ${error.details[0].message}` },
        { status: 400 }
      )
    }

    const result = await processAIRequest(value)

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