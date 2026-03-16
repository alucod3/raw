import type { Metadata } from 'next';
import './globals.css';
import MouseGlow from '@/components/MouseGlow';

export const metadata: Metadata = {
  title: 'RAW — Revenge Against the Web',
  description: 'Descubra onde seus dados estão expostos na internet e remova-os com inteligência artificial.',
  keywords: ['privacidade', 'LGPD', 'vazamento de dados', 'OSINT', 'remoção de dados', 'cibersegurança'],
  openGraph: {
    title: 'RAW — Revenge Against the Web',
    description: 'Seus dados estão expostos. Nós ajudamos você a recuperar sua privacidade.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="noise-overlay" />
        <MouseGlow />
        {children}
      </body>
    </html>
  );
}
