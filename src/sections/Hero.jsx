// src/sections/Hero.jsx
import profileImg from "../assets/profile.jpeg";
import "../custom.css";

const bannerPhrases = ["FULL STACK", "KUBERNETES", "AI ARCHITECTURE"];

function AnimatedBanner() {
  return (
    <div className="h-14 sm:h-16 md:h-20 flex items-center justify-center md:justify-start mt-2 relative overflow-hidden">
      {bannerPhrases.map((phrase, idx) => (
        <AnimatedWord
          key={phrase}
          phrase={phrase}
          style={{
            animation: `bannerSwap ${bannerPhrases.length * 3}s linear infinite`,
            animationDelay: `${idx * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedWord({ phrase, style = {} }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center md:justify-start whitespace-nowrap opacity-0" style={style}>
      {phrase.split("").map((ch, i) => (
        <span key={i} className="letter text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-yellow-400" style={{ animationDelay: `${i * 60}ms` }}>
          {ch}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen bg-neutral-900 text-white overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4">
                I’m <span className="text-yellow-400">Piyush Rana</span>
              </h1>

              {/* Animated banner */}
              <AnimatedBanner />

              <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                I’m a <span className="font-semibold text-yellow-400">Full-Stack Developer</span> passionate about building scalable, responsive, and user-friendly web apps. Experienced with React, Node.js, Express, MongoDB, Python, Docker, and Kafka — delivering end-to-end solutions that blend modern design with robust back-end functionality.
              </p>

              {/* CTA */}
              <div className="mt-10">
                <a href="#portfolio" className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-300 shadow-lg transition-transform duration-200 hover:-translate-y-0.5">
                  View My Work 🚀
                </a>
              </div>
            </div>

            {/* RIGHT: Photo */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <img src={profileImg} alt="Piyush Rana" className="h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full object-cover ring-2 ring-neutral-700 shadow-2xl" style={{ animation: "floaty 6s ease-in-out infinite" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow in bottom-center */}
      <div className="relative z-10 pb-8 flex justify-center">
        <a href="#portfolio" className="text-yellow-400 text-4xl animate-bounce">
          ⌄
        </a>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes bannerSwap {
          0% { opacity: 0; transform: translateY(12px); }
          10% { opacity: 1; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(0); }
          40% { opacity: 0; transform: translateY(-12px); }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
