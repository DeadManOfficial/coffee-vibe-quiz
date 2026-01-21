import { Metadata } from 'next'
import quizData from '@/data/quiz-data.json'

type Props = {
  params: { vibe: string }
}

const baseUrl = 'https://coffeevibes.quiz' // Update with your custom domain

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vibe = params.vibe as keyof typeof quizData.results
  const result = quizData.results[vibe]

  if (!result) {
    return {
      title: "What's Your Coffee Vibe?",
    }
  }

  const title = `I'm ${result.title}! | Coffee Vibe Quiz`
  const description = `${result.shareText} Take the quiz to discover YOUR coffee personality!`
  const ogImageUrl = `${baseUrl}/api/og?vibe=${vibe}`

  return {
    title,
    description,
    keywords: [
      result.title.toLowerCase(),
      'coffee quiz result',
      'personality quiz result',
      'coffee personality',
      ...result.traits.map(t => t.toLowerCase()),
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${baseUrl}/results/${vibe}`,
      siteName: 'Coffee Vibe Quiz',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${result.title} - Coffee Vibe Quiz Result`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@coffeevibesquiz',
    },
    alternates: {
      canonical: `${baseUrl}/results/${vibe}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(quizData.results).map((vibe) => ({
    vibe,
  }))
}

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
