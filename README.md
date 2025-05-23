This project is a generic dashboard full of widgets for a dev with functioning API calls to gather local weather data (it's hardcoded for now since location request function does not appear to be working with my implementation) from google's weather API and top trending news via google news 3rd party api SerpApi. The article image defaults to a placeholder because we do not always have permission to retrieve the image data, and sometimes it completely crashes the site depending on what src data is returned. The app has other generic widgets for show only

/home desktop view
![Screenshot from 2025-05-22 21-45-10](https://github.com/user-attachments/assets/7418c0ef-c963-4907-a26a-a9e281ce5cf6)

/home mobile view
![Screenshot from 2025-05-22 21-48-36](https://github.com/user-attachments/assets/ca855fac-3a28-41b6-a599-7f2f48d2204f)
![Screenshot from 2025-05-22 21-48-46](https://github.com/user-attachments/assets/7a38e224-81d5-49e4-90f2-1949d7459978)




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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
