import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Nav } from './_components/Nav';
import { ThemeProvider } from 'next-themes';
import ApolloProviderWrapper from './util/apollo-provider';

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
				<Nav />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<ApolloProviderWrapper>{children}</ApolloProviderWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
