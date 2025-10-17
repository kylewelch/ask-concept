import { AIProvider } from '@/contexts/AIContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AIProvider>
          {children}
        </AIProvider>
      </body>
    </html>
  );
}