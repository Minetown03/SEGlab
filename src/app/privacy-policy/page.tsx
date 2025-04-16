import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="text-primary-medium hover:text-primary-dark transition-colors duration-300 inline-block mb-8"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-primary-dark mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Subscribe to our newsletter</li>
                <li>Fill out our survey</li>
                <li>Contact us directly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Send you updates about our services</li>
                <li>Respond to your inquiries</li>
                <li>Improve our services</li>
                <li>Analyze usage patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties. Your email address and personal information will remain strictly confidential.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">4. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-4">
                Email: privacy@segtech.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 