import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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
  title: 'Annai Eventz Attur | Event Management Company in Salem',
  description:
    'Premium event planning, decor, stage production, and coordination for weddings, corporate events, anniversaries, baby showers, and celebrations in Attur, Salem.',
  keywords: [
    'event management company Attur',
    'wedding planner Salem',
    'stage decoration Attur',
    'corporate event planner Salem',
    'birthday decoration Attur',
    'Annai Eventz Attur'
  ],
  openGraph: {
    title: 'Annai Eventz Attur | Event Management Company',
    description:
      'Event planning and management for weddings, corporate functions, anniversaries, baby showers, and private celebrations in Attur, Salem.',
    images: [
      {
        url: 'https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-lllpusjfps.jpg?w=1200&q=75',
        width: 1200,
        height: 800,
        alt: 'Event stage setup by Annai Eventz Attur'
      }
    ],
    type: 'website'
  }
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Annai Eventz Attur',
  description:
    'Event planning, decor, stage production, and coordination for weddings, corporate functions, birthdays, anniversaries, baby showers, and family celebrations.',
  telephone: ['+91 99948 26482', '+91 86108 72204'],
  image:
    'https://content.jdmagicbox.com/v2/comp/salem/a7/0427px427.x427.240730171835.i8a7/catalogue/annai-eventz-attur-salem-event-management-companies-lllpusjfps.jpg?w=1200&q=75',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Bus Stand, Madha Kovil Street, Attur',
    addressLocality: 'Salem',
    addressRegion: 'Tamil Nadu',
    postalCode: '636102',
    addressCountry: 'IN'
  },
  areaServed: ['Attur', 'Salem', 'Tamil Nadu'],
  serviceType: [
    'Wedding management',
    'Corporate event planning',
    'Stage and venue decor',
    'Birthday celebration planning',
    'Baby shower planning'
  ],
  priceRange: 'Custom quote'
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
