'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Loader2, Copy, CornerDownLeft, Sparkles, Wand2, BarChart3, ArrowLeftRight } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'
import { getAIFeaturesByCategory, processAIRequest, AIRequest } from '@/lib/ai'

interface AIModalProps {
  isOpen: boolean
  onClose: () => void
  onInsertContent: (content: string, replace?: boolean) => void
  selectedText?: string
  noteContent?: string
}

export default function AIModal({ isOpen, onClose, onInsertContent, selectedText, noteContent }: AIModalProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [selectedTone, setSelectedTone] = useState<'professional' | 'casual' | 'academic' | 'creative'>('professional')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState<'generate' | 'enhance' | 'analyze' | 'transform'>('generate')
  const promptInputRef = useRef<HTMLTextAreaElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const featuresByCategory = getAIFeaturesByCategory()
  const categories = [
    { id: 'generate', name: 'Generate', icon: Sparkles },
    { id: 'enhance', name: 'Enhance', icon: Wand2 },
    { id: 'analyze', name: 'Analyze', icon: BarChart3 },
    { id: 'transform', name: 'Transform', icon: ArrowLeftRight }
  ] as const

  useEffect(() => {
    if (isOpen && promptInputRef.current) {
      setTimeout(() => promptInputRef.current?.focus(), 100)
    }
  }, [isOpen, selectedFeature])

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleSubmit = async () => {
    if (!selectedFeature) return

    setIsLoading(true)
    setError('')
    setResult('')

    const request: AIRequest = {
      featureId: selectedFeature,
      prompt,
      content: noteContent,
      selectedText,
      tone: selectedTone
    }

    const response = await processAIRequest(request)

    if (response.success && response.content) {
      setResult(response.content)
    } else {
      setError(response.error || 'An error occurred')
    }

    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  const insertContent = (replace = false) => {
    onInsertContent(result, replace)
    onClose()
  }

  const reset = () => {
    setSelectedFeature(null)
    setPrompt('')
    setResult('')
    setError('')
    setActiveCategory('generate')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!isOpen) return null

  const requiresPrompt = selectedFeature === 'generate-content'
  const hasToneOption = selectedFeature === 'change-tone'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
              {selectedText && (
                <p className="text-sm text-gray-500">
                  {selectedText.length} characters selected
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-72 border-r border-gray-200 flex flex-col">
            {/* Category Tabs */}
            <div className="p-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mb-1 mx-auto" />
                      {category.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Features List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {featuresByCategory[activeCategory].map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setSelectedFeature(feature.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedFeature === feature.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{feature.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {feature.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {selectedFeature ? (
              <div className="flex-1 flex flex-col">
                {/* Input Area */}
                <div className="p-6 border-b border-gray-200 space-y-4">
                  {requiresPrompt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What would you like me to generate?
                      </label>
                      <textarea
                        ref={promptInputRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe what you want to generate..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={3}
                      />
                    </div>
                  )}

                  {hasToneOption && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tone
                      </label>
                      <div className="flex space-x-2">
                        {(['professional', 'casual', 'academic', 'creative'] as const).map((tone) => (
                          <button
                            key={tone}
                            onClick={() => setSelectedTone(tone)}
                            className={`px-3 py-1 rounded-md text-sm capitalize transition-colors ${
                              selectedTone === tone
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {tone}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">⌘ Enter</kbd> to generate
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || (requiresPrompt && !prompt.trim())}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Generate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Results Area */}
                <div className="flex-1 overflow-hidden">
                  {isLoading && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600">AI is working on your request...</p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-6">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 text-sm">{error}</p>
                      </div>
                    </div>
                  )}

                  {result && (
                    <div className="flex-1 flex flex-col">
                      <div className="p-6 flex-1 overflow-y-auto overflow-x-auto">
                        <div className="prose prose-gray max-w-none">
                          <div
                            className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap overflow-auto"
                            style={{ maxHeight: '400px' }}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(result.replace(/\n/g, '<br>'))
                            }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </button>

                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => insertContent(false)}
                            className="px-4 py-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <CornerDownLeft className="w-4 h-4" />
                            <span>Insert</span>
                          </button>
                          {selectedText && (
                            <button
                              onClick={() => insertContent(true)}
                              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                            >
                              Replace Selection
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Choose an AI feature
                  </h3>
                  <p className="text-gray-500">
                    Select a feature from the sidebar to get started with AI assistance for your notes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}