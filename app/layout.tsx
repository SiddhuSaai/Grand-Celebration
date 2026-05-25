import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { clientProfile } from '@/lib/client';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Grand Celebration Events And Decors | Event Decorators in Coimbatore',
  description:
    'Event decoration, balloon decor, wedding stage styling, birthday decoration, lighting, and event management in Peelamedu, Coimbatore.',
  keywords: [
    'event decorators Coimbatore',
    'balloon decorators Peelamedu',
    'wedding decorators Coimbatore',
    'birthday decoration Coimbatore',
    'stage decorators Peelamedu',
    'Grand Celebration Events And Decors'
  ],
  openGraph: {
    title: 'Grand Celebration Events And Decors | Event Decorators',
    description:
      'Balloon decoration, wedding decor, birthday decor, lighting, stage styling, and event management in Peelamedu, Coimbatore.',
    type: 'website'
  }
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: clientProfile.name,
  description:
    'Event decoration, balloon decor, stage production, lighting, and event management for weddings, birthdays, corporate functions, and family celebrations.',
  telephone: clientProfile.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'M I G 3676, J R ILLAM, Near PENGUIN Hotel, Gandhima Nagar, Peelamedu',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641004',
    addressCountry: 'IN'
  },
  areaServed: ['Peelamedu', 'Coimbatore', 'Tamil Nadu'],
  serviceType: [
    'Balloon decoration',
    'Wedding decoration',
    'Birthday decoration',
    'Lighting decoration',
    'Stage and venue decor'
  ],
  priceRange: `${clientProfile.startingPrice} onwards`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-white font-sans text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
