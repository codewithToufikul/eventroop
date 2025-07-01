import { Link } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/4 -right-4 w-96 h-96 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="hidden sm:block absolute top-10 left-4 lg:left-10 w-4 h-4 lg:w-6 lg:h-6 bg-teal-400 rounded-full animate-bounce opacity-60"></div>
          <div className="hidden sm:block absolute top-20 right-4 lg:right-20 w-3 h-3 lg:w-4 lg:h-4 bg-cyan-400 rounded-full animate-bounce animation-delay-1000 opacity-60"></div>
          <div className="hidden md:block absolute bottom-10 left-1/4 w-4 h-4 lg:w-5 lg:h-5 bg-blue-400 rounded-full animate-bounce animation-delay-2000 opacity-60"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight animate-fade-in text-center ">
              Welcome to
              <br className="sm:hidden" />
              <span className="sm:ml-2">EventRoop</span>
              <span className="inline-block ml-2 sm:ml-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl animate-bounce">🎉</span>
            </h1>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              Create unforgettable moments, discover amazing experiences, and connect with your community like never before.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
                <Link 
                  to="/login" 
                  className="group relative w-full sm:w-auto bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-cyan-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
                <Link 
                  to="/register" 
                  className="group relative w-full sm:w-auto bg-white/80 backdrop-blur-sm border-2 border-teal-300 text-teal-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-teal-50"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3 sm:mb-4 px-4 sm:px-0">
            Why Choose EventRoop?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 sm:px-0">
            Experience the future of event management with our cutting-edge platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              title: "Create Events",
              desc: "Design stunning events with our intuitive creator. From intimate gatherings to grand celebrations.",
              icon: "✨",
              gradient: "from-pink-400 to-purple-500"
            },
            {
              title: "Join Events",
              desc: "Discover exciting experiences in your area. Connect with like-minded people and create memories.",
              icon: "🎪",
              gradient: "from-blue-400 to-teal-500"
            },
            {
              title: "Smart Dashboard",
              desc: "Manage everything from one place. Track attendance, send updates, and analyze your event success.",
              icon: "📊",
              gradient: "from-green-400 to-cyan-500"
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white/70 backdrop-blur-sm shadow-xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 border border-white/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl sm:rounded-3xl transition-opacity duration-500`}></div>
              <div className="relative z-10 text-center sm:text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4 group-hover:text-teal-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-white/60 to-teal-50/60 backdrop-blur-sm py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 lg:mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 lg:mb-16 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 sm:px-0">
            Get started in just three simple steps and join thousands of event creators
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "Register", desc: "Create your free account in seconds", icon: "🚀" },
              { step: "Create or Join Events", desc: "Start your event journey today", icon: "🎯" },
              { step: "Track Your Events", desc: "Monitor and manage with ease", icon: "📈" }
            ].map((item, i) => (
              <div
                key={i}
                className="relative text-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-white/50"
              >
                <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-xl shadow-lg">
                  {i + 1}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 mt-2 sm:mt-4">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {item.step}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-teal-300 to-cyan-300 opacity-30 transform -translate-y-1/2"></div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              { number: "10K+", label: "Events Created" },
              { number: "50K+", label: "Happy Users" },
              { number: "100+", label: "Cities" },
              { number: "5★", label: "User Rating" }
            ].map((stat, i) => (
              <div key={i} className="group p-4 sm:p-6 rounded-xl hover:bg-white/30 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative py-6 sm:py-8 text-center bg-gradient-to-r from-teal-600/10 to-cyan-600/10 backdrop-blur-sm border-t border-white/20 mt-8 sm:mt-12 lg:mt-16">
        <p className="text-gray-600 text-sm sm:text-base px-4">
          © {new Date().getFullYear()} EventRoop. Crafted with ❤️ for amazing events.
        </p>
      </footer>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        /* Mobile-first responsive improvements */
        @media (max-width: 640px) {
          .group:hover {
            transform: translateY(-2px);
          }
        }
        
        /* Ensure proper touch targets on mobile */
        @media (max-width: 640px) {
          a, button {
            min-height: 44px;
          }
        }
        
        /* Better text contrast on mobile */
        @media (max-width: 640px) {
          .text-gray-600 {
            color: #4B5563;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;