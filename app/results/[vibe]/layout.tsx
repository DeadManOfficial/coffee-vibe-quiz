import { Metadata } from 'next'
import quizData from '@/data/quiz-data.json'

type Props = {
  params: { vibe: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vibe = params.vibe as keyof typeof quizData.results
  const result = quizData.results[vibe]

  if (!result) {
    return {
      title: "What's Your Coffee Vibe?",
    }
  }

  const title = `I'm ${result.title}! | Coffee Vibe Quiz`
  const description = result.shareText

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: `/images/og-${vibe}.png`,
          width: 1200,
          height: 630,
          alt: result.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/og-${vibe}.png`],
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
