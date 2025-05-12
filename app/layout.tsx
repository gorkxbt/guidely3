import React from 'react';
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guidely - Shop Smarter. Discover Faster.',
  description: 'Guidely transforms online shopping with AI-guided experiences that understand your needs and deliver the perfect products—every time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 