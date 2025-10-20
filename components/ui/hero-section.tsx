import { Button } from "./button"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-blue-50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-blue-50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-sm font-light text-gray-700 mb-3 leading-tight tracking-tight">
            Let's Solve Your Business{" "}
            <span className="text-blue-600 font-normal">Flaw</span>{" "}
            and Make Your Business{" "}
            <span className="text-blue-600 font-normal">Flow</span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
            We analyze your business, spot gaps, and provide actionable solutions — 
            all through simple, guided steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg group"
            >
              Book a Consultation
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
            <a
              href="https://wa.me/?text=Hi%20I%20want%20to%20discuss%20services%20and%20book%20a%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-md text-sm font-medium px-8 py-4 text-lg text-white bg-green-500 hover:bg-green-600"
            >
              <svg className="w-5 h-5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M19.11 17.49c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.92 1.23 3.12.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="#fff"/>
                <path d="M16.01 3.2C9.2 3.2 3.76 8.64 3.76 15.46c0 2.21.58 4.28 1.59 6.07L3 29l7.67-2c1.73.95 3.72 1.49 5.84 1.49 6.81 0 12.25-5.44 12.25-12.25S22.82 3.2 16.01 3.2zm0 22.2c-1.94 0-3.74-.57-5.24-1.55l-.38-.24-4.55 1.19 1.22-4.43-.25-.41a10.28 10.28 0 01-1.56-5.3c0-5.68 4.6-10.28 10.28-10.28 5.68 0 10.28 4.6 10.28 10.28 0 5.68-4.6 10.28-10.28 10.28z" fill="#E6F5EA"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 animate-fade-in-up">
            <p className="text-sm text-gray-500 mb-8">Trusted by 500+ businesses</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {["Company A", "Company B", "Company C", "Company D", "Company E"].map((company, index) => (
                <div
                  key={company}
                  className="text-gray-400 font-medium text-lg"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection