import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Nav } from './_components/Nav';
import { ThemeProvider } from 'next-themes';
import ApolloProviderWrapper from './util/apollo-provider';
import { Toaster } from '@/components/ui/toaster';
import ServerAuthCheck from './util/auth/ServerAuthCheck';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'File uploader application',
  description: 'Created using NextJS, NestJS, GraphQL and Amazon S3',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <ApolloProviderWrapper>
            <ServerAuthCheck>
              <Nav />
            </ServerAuthCheck>
            {children}
            <Toaster />
          </ApolloProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
