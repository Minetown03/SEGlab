import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'it')}
        className="appearance-none bg-transparent text-primary-dark hover:text-primary-medium cursor-pointer font-medium focus:outline-none pr-8 pl-2 py-1"
      >
        <option value="en">EN</option>
        <option value="it">IT</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center text-primary-dark">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
} 