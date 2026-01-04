Minimal blog/portfolio (nav.al aesthetic) powered by **Next.js App Router + Tailwind** and **Hashnode Headless GraphQL**.

## Getting Started

Install deps & run dev:

```bash
npm i
npm run dev
```

Open `http://localhost:3000`.

## Contact (Resend)

The site has a minimal contact popup that sends you an email via Resend.

Set these environment variables in Vercel (Project → Settings → Environment Variables) and locally in `.env.local`:

```bash
RESEND_API_KEY="your_resend_api_key"
CONTACT_TO_EMAIL="you@yourdomain.com"
CONTACT_FROM_EMAIL="Contact <contact@gokmens.com>"
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
