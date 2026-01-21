'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import quizData from '@/data/quiz-data.json'

type Scores = {
  espresso: number
  latte: number
  coldbrew: number
  matcha: number
}

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<Scores>({
    espresso: 0,
    latte: 0,
    coldbrew: 0,
    matcha: 0,
  })
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const question = quizData.questions[currentQuestion]
  const progress = ((currentQuestion) / quizData.questions.length) * 100

  const handleSelect = (optionIndex: number) => {
    if (isTransitioning) return
    setSelectedOption(optionIndex)
  }

  const handleNext = () => {
    if (selectedOption === null || isTransitioning) return

    const option = question.options[selectedOption]
    const newScores = { ...scores }

    // Add scores from selected option
    Object.entries(option.scores).forEach(([key, value]) => {
      newScores[key as keyof Scores] += value
    })

    setScores(newScores)
    setIsTransitioning(true)

    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setIsTransitioning(false)
      } else {
        // Calculate result
        const result = Object.entries(newScores).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0]
        router.push(`/results/${result}`)
      }
    }, 300)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Progress bar */}
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div className="flex justify-between text-sm text-neutral-400 mb-2">
          <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 progress-bar rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <div className={`w-full transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
          {/* Question text */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {question.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full p-4 md:p-5 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === index
                    ? 'border-amber-500 bg-amber-500/20 text-white'
                    : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600 hover:bg-neutral-800 text-neutral-200'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selectedOption === index
                      ? 'border-amber-500 bg-amber-500'
                      : 'border-neutral-600'
                  }`}>
                    {selectedOption === index && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  <span className="text-base md:text-lg">{option.text}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Next button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 ${
                selectedOption !== null
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion < quizData.questions.length - 1 ? 'Next →' : 'See My Result →'}
            </button>
          </div>
        </div>
      </div>

      {/* Back to start */}
      <div className="text-center mt-8">
        <button
          onClick={() => router.push('/')}
          className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors"
        >
          ← Start over
        </button>
      </div>
    </div>
  )
}
