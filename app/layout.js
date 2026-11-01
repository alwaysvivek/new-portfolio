import { Unbounded, Instrument_Serif, Caveat } from 'next/font/google';
import './globals.css';

const unb = Unbounded({ subsets: ['latin'], variable: '--f-unb', display: 'swap' });
const ins = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--f-ins', display: 'swap' });
const cav = Caveat({ subsets: ['latin'], weight: '700', variable: '--f-cav', display: 'swap' });

export const metadata = { title: 'vivek dagar' };
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#000000' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${unb.variable} ${ins.variable} ${cav.variable}`}>
      <body>{children}</body>
    </html>
  );
}
