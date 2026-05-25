import type { Metadata } from 'next';
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import StickyActions from '@/components/StickyActions';
import { clientProfile } from '@/lib/client';

export const metadata: Metadata = {
  title: `About ${clientProfile.shortName}`,
  description: `Learn about ${clientProfile.name}, event decor and celebration planning support in ${clientProfile.location}.`
};

export default function AboutPage() {
  return (
    <>
      <Navbar solid />
      <main className="pt-20">
        <About />
        <ContactForm />
      </main>
      <Footer />
      <StickyActions />
    </>
  );
}
