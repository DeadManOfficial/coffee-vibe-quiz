import quizData from '@/data/quiz-data.json'

export function QuizJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: quizData.title,
    description: quizData.subtitle,
    about: {
      '@type': 'Thing',
      name: 'Coffee Personality',
    },
    educationalLevel: 'beginner',
    numberOfQuestions: quizData.questions.length,
    hasPart: quizData.questions.map((q, index) => ({
      '@type': 'Question',
      position: index + 1,
      text: q.text,
      eduQuestionType: 'Multiple choice',
      answerCount: q.options.length,
    })),
    author: {
      '@type': 'Organization',
      name: 'Coffee Vibe Quiz',
      url: 'https://coffeevibes.quiz',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Coffee Vibe Quiz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://coffeevibes.quiz/logo.png',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Coffee Vibe Quiz',
    description: 'Discover your coffee personality in 60 seconds. Are you an Espresso Addict, Latte Art Master, Chill Cold Brew, or Chaos Matcha?',
    url: 'https://coffeevibes.quiz',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://coffeevibes.quiz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://twitter.com/coffeevibesquiz',
      'https://tiktok.com/@coffeevibesquiz',
      'https://instagram.com/coffeevibesquiz',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ResultJsonLd({ result }: { result: { title: string; description: string; emoji: string } }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `I'm ${result.title}! - Coffee Vibe Quiz Result`,
    description: result.description,
    image: `https://coffeevibes.quiz/api/og?result=${encodeURIComponent(result.title)}`,
    author: {
      '@type': 'Organization',
      name: 'Coffee Vibe Quiz',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Coffee Vibe Quiz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://coffeevibes.quiz/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://coffeevibes.quiz',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQJsonLd() {
  const faqs = [
    {
      question: "What is the Coffee Vibe Quiz?",
      answer: "A fun 8-question personality quiz that reveals your coffee personality type: Espresso Addict, Latte Art Master, Chill Cold Brew, or Chaos Matcha."
    },
    {
      question: "How long does the quiz take?",
      answer: "The quiz takes less than 60 seconds to complete - just 8 quick questions!"
    },
    {
      question: "Can I share my results?",
      answer: "Yes! After completing the quiz, you can share your results directly to Twitter, TikTok, or copy the link to share anywhere."
    },
    {
      question: "Is the Coffee Vibe Quiz free?",
      answer: "Yes, the quiz is completely free to take and share with friends."
    }
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
