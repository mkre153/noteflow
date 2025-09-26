import OpenAI from 'openai'

export interface AIFeature {
  id: string
  name: string
  description: string
  category: 'generate' | 'enhance' | 'analyze' | 'transform'
  icon: string
}

export const AI_FEATURES: AIFeature[] = [
  {
    id: 'generate-content',
    name: 'Generate Content',
    description: 'Create new content based on your prompt',
    category: 'generate',
    icon: '✨'
  },
  {
    id: 'expand-selection',
    name: 'Expand Text',
    description: 'Expand selected text into detailed content',
    category: 'generate',
    icon: '📝'
  },
  {
    id: 'summarize-note',
    name: 'Summarize Note',
    description: 'Create a concise summary of your note',
    category: 'analyze',
    icon: '📋'
  },
  {
    id: 'improve-writing',
    name: 'Improve Writing',
    description: 'Enhance grammar, style, and clarity',
    category: 'enhance',
    icon: '🔧'
  },
  {
    id: 'change-tone',
    name: 'Change Tone',
    description: 'Rewrite in professional, casual, or academic tone',
    category: 'enhance',
    icon: '🎭'
  },
  {
    id: 'extract-tasks',
    name: 'Extract Tasks',
    description: 'Identify action items and tasks',
    category: 'analyze',
    icon: '✅'
  },
  {
    id: 'bullet-to-prose',
    name: 'Bullet to Prose',
    description: 'Convert bullet points to flowing paragraphs',
    category: 'transform',
    icon: '📖'
  },
  {
    id: 'prose-to-bullet',
    name: 'Prose to Bullets',
    description: 'Convert paragraphs to organized bullet points',
    category: 'transform',
    icon: '•'
  }
]

let openai: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.')
    }
    openai = new OpenAI({ apiKey })
  }
  return openai
}

export interface AIRequest {
  featureId: string
  prompt?: string
  content?: string
  selectedText?: string
  tone?: 'professional' | 'casual' | 'academic' | 'creative'
}

export interface AIResponse {
  success: boolean
  content?: string
  error?: string
}

export async function processAIRequest(request: AIRequest): Promise<AIResponse> {
  try {
    // Check if we're running on the server
    if (typeof window === 'undefined') {
      // Server-side: Direct OpenAI API call
      const client = getOpenAIClient()
      const feature = AI_FEATURES.find(f => f.id === request.featureId)

      if (!feature) {
        return { success: false, error: 'Unknown AI feature' }
      }

      const systemPrompt = getSystemPrompt(request.featureId, request.tone)
      const userPrompt = buildUserPrompt(request)

      const completion = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
        max_tokens: 2000
      })

      const content = completion.choices[0]?.message?.content
      if (!content) {
        return { success: false, error: 'No response generated' }
      }

      return { success: true, content }
    } else {
      // Client-side: API route call
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      const result: AIResponse = await response.json()
      return result
    }
  } catch (error) {
    console.error('AI processing error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred processing your request'
    }
  }
}

function getSystemPrompt(featureId: string, tone?: string): string {
  const basePrompts: Record<string, string> = {
    'generate-content': 'You are a helpful writing assistant. Generate high-quality, relevant content based on the user\'s prompt. Write in clear, engaging prose.',

    'expand-selection': 'You are a content expansion specialist. Take the provided text and expand it into detailed, comprehensive content while maintaining the original meaning and context.',

    'summarize-note': 'You are a summarization expert. Create concise, accurate summaries that capture the key points, main ideas, and important details from the provided content.',

    'improve-writing': 'You are an expert writing editor. Improve the provided text by enhancing grammar, clarity, flow, and overall readability while maintaining the original meaning and voice.',

    'change-tone': `You are a tone adjustment specialist. Rewrite the provided text to match the specified tone: ${tone || 'professional'}. Maintain the core message while adapting the style, vocabulary, and approach.`,

    'extract-tasks': 'You are a task extraction specialist. Analyze the provided content and identify all action items, tasks, deadlines, and deliverables. Format them as a clear, organized list.',

    'bullet-to-prose': 'You are a content formatter. Convert the provided bullet points into flowing, well-structured paragraphs while maintaining all the original information.',

    'prose-to-bullet': 'You are a content organizer. Convert the provided paragraphs into clear, organized bullet points that capture all key information in a scannable format.'
  }

  return basePrompts[featureId] || 'You are a helpful AI assistant.'
}

function buildUserPrompt(request: AIRequest): string {
  const { featureId, prompt, content, selectedText } = request

  switch (featureId) {
    case 'generate-content':
      return `Please generate content for: ${prompt}`

    case 'expand-selection':
      return `Please expand this text into more detailed content:\n\n${selectedText || content}`

    case 'summarize-note':
      return `Please summarize this note:\n\n${content}`

    case 'improve-writing':
      return `Please improve this text:\n\n${selectedText || content}`

    case 'change-tone':
      return `Please rewrite this text with the specified tone:\n\n${selectedText || content}`

    case 'extract-tasks':
      return `Please extract all tasks and action items from this content:\n\n${content}`

    case 'bullet-to-prose':
      return `Please convert these bullet points to flowing paragraphs:\n\n${selectedText || content}`

    case 'prose-to-bullet':
      return `Please convert this text to organized bullet points:\n\n${selectedText || content}`

    default:
      return prompt || content || 'Please help with this content.'
  }
}

export function getAIFeaturesByCategory() {
  return {
    generate: AI_FEATURES.filter(f => f.category === 'generate'),
    enhance: AI_FEATURES.filter(f => f.category === 'enhance'),
    analyze: AI_FEATURES.filter(f => f.category === 'analyze'),
    transform: AI_FEATURES.filter(f => f.category === 'transform')
  }
}