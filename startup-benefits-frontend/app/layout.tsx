'use client';

import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Startup Benefits - Exclusive SaaS Deals for Startups</title>
        <meta name="description" content="Access exclusive deals and benefits on premium SaaS tools for your startup" />
      </head>
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
