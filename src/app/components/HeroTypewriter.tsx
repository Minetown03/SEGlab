import { useEffect, useState } from 'react';

const PHRASES = [
  'Revolutionizing Segmentation.',
  'Optimizing Customer Lifetime Value.',
  'Delivering Smarter CRM Tools.',
  'Unlocking Behavioral Insights.'
];

export default function HeroTypewriter() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const phrase = PHRASES[currentPhrase];

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => {
        setDisplayed(phrase.slice(0, displayed.length + 1));
      }, 120);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(phrase.slice(0, displayed.length - 1));
      }, 70);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % PHRASES.length);
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, currentPhrase]);

  // Blinking cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-primary-light via-primary-medium to-primary-dark px-4">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-custom font-bold text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-8 drop-shadow-xl">
          {displayed}
          <span className={`inline-block w-2 h-8 align-middle ${blink ? 'bg-white' : 'bg-transparent'} ml-1 rounded-sm transition-all duration-200`} />
        </h1>
        <button
          onClick={() => window.open('YOUR_GOOGLE_FORM_URL', '_blank')}
          className="mt-4 px-10 py-4 rounded-full bg-primary-medium text-white font-bold text-lg shadow-2xl border border-primary-dark hover:bg-primary-dark hover:text-white hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-dark"
        >
          Take Our Survey
        </button>
      </div>
    </section>
  );
} 