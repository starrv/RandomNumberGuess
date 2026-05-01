import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./css/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Random Number Guess",
  description: "This is Random Number Guess, a number guessing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={roboto.className}
    >
      <head>
        <link rel="icon" href="/images/icon.png" sizes="128x128" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="application-name" content="Random Number Guess" lang="en" />
        <meta name="author" content="Valencia S." lang="en" />
        <meta name="image" content="/images/thumbnail.png" lang="en" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
