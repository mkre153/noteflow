# NoteFlow

An advanced note-taking application built with Next.js 15 and React 19, featuring a rich text editor powered by Tiptap and AI-powered content enhancement.

## Prerequisites

- Node.js 18+
- OpenAI API key for AI features

## Environment Setup

1. Copy the environment template:
```bash
cp .env.local.example .env.local
```

2. Add your OpenAI API key to `.env.local`:
```env
OPENAI_API_KEY=your_actual_api_key_here
```

⚠️ **Security Note**: Never commit your `.env.local` file to version control. The actual API key should only exist in your local environment and production environment variables.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
