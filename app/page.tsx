import ContactForm from '@/components/ContactForm';
import EventBrief from '@/components/EventBrief';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Packages from '@/components/Packages';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import StickyActions from '@/components/StickyActions';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Packages />
        <Stats />
        <Gallery />
        <EventBrief />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <StickyActions />
    </>
  );
}
