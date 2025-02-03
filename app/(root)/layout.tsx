import type { Metadata } from 'next';

import { Header } from '@/src/components/shared';

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
