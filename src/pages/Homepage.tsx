import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Rocket, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

export function Homepage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preloader animation
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-neon-blue/30 rounded-full animate-spin border-t-neon-blue"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-neon-blue animate-neon-pulse">
              ChroniqAI
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ChroniqAI - The Future Thinks Chroniq</title>
        <meta name="description" content="ChroniqAI is an AI agency dedicated to shaping next-gen intelligence. We build futuristic solutions that help businesses adapt, innovate, and scale." />
      </Helmet>
      
      <div className="scroll-snap-container">
        {/* Section 1: Hero */}
        <section className="scroll-snap-section relative bg-background overflow-hidden">
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-neon-blue rounded-full animate-float-particles"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                }}
              />
            ))}
          </div>

          {/* Neon grid overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--neon-blue)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--neon-blue)) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-glow 4s ease-in-out infinite',
            }}
          />

          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 text-neon-blue animate-neon-flicker" style={{
              textShadow: '0 0 10px hsl(var(--neon-blue)), 0 0 20px hsl(var(--neon-blue)), 0 0 40px hsl(var(--neon-blue))',
            }}>
              ChroniqAI
            </h1>
            
            <p className="text-3xl md:text-4xl mb-8 text-neon-purple animate-neon-pulse font-semibold">
              The Future Thinks Chroniq
            </p>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl leading-relaxed mb-8">
              ChroniqAI is an AI agency dedicated to shaping next-gen intelligence. 
              We build futuristic solutions that help businesses adapt, innovate, and scale.
            </p>

            <Button asChild size="lg" className="bg-neon-blue text-background hover:bg-neon-blue/90 shadow-glow-primary">
              <Link to="/login">
                Access Platform
              </Link>
            </Button>

            <div className="absolute bottom-10 animate-bounce">
              <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
                <div className="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: What We Do */}
        <section className="scroll-snap-section relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--background)), hsl(258 100% 10%))',
          }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-neon-purple animate-neon-flicker"
              style={{
                textShadow: '0 0 10px hsl(var(--neon-purple)), 0 0 20px hsl(var(--neon-purple))',
              }}
            >
              What We Do
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "AI-Powered Automation", desc: "Streamline workflows with intelligent automation" },
                { icon: Sparkles, title: "Data-Driven Insights", desc: "Transform data into actionable intelligence" },
                { icon: Rocket, title: "Creative AI Experiences", desc: "Build immersive AI-powered interactions" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 rounded-lg border border-neon-purple/30 bg-card/50 backdrop-blur-sm hover:border-neon-purple hover:shadow-glow-purple transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <item.icon className="w-16 h-16 mx-auto mb-4 text-neon-purple" />
                  <h3 className="text-2xl font-bold mb-4 text-neon-purple">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Why Choose Us */}
        <section className="scroll-snap-section relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-background">
          {/* Animated neuron network */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              {[...Array(10)].map((_, i) => (
                <circle
                  key={i}
                  cx={`${Math.random() * 100}%`}
                  cy={`${Math.random() * 100}%`}
                  r="3"
                  fill="hsl(var(--neon-green))"
                  className="animate-neon-pulse"
                  style={{ animationDelay: `${Math.random() * 2}s` }}
                />
              ))}
            </svg>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-neon-green animate-neon-flicker"
              style={{
                textShadow: '0 0 10px hsl(var(--neon-green)), 0 0 20px hsl(var(--neon-green))',
              }}
            >
              Why Choose Us
            </h2>

            <div className="space-y-8 max-w-4xl mx-auto">
              {[
                { emoji: "⚡", title: "Futuristic Design with Neon Aesthetic", desc: "Stand out with cutting-edge visual identity" },
                { emoji: "🤖", title: "Advanced AI Solutions that Scale", desc: "From prototype to enterprise-grade systems" },
                { emoji: "🚀", title: "Innovation that Gives You an Edge", desc: "Stay ahead with bleeding-edge technology" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg border border-neon-green/30 bg-card/50 backdrop-blur-sm hover:border-neon-green hover:shadow-glow-success transition-all duration-300 text-left animate-fade-in flex items-start gap-6"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <span className="text-5xl">{item.emoji}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-neon-green">{item.title}</h3>
                    <p className="text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Contact */}
        <section className="scroll-snap-section relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--background)), hsl(195 100% 10%))',
          }}
        >
          {/* Glowing neon lines */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-30"></div>
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-30"></div>
            <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30"></div>
            <div className="absolute left-0 bottom-1/4 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-12 text-neon-blue animate-neon-flicker"
              style={{
                textShadow: '0 0 10px hsl(var(--neon-blue)), 0 0 20px hsl(var(--neon-blue))',
              }}
            >
              Let's Build the Future Together
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-center justify-center gap-4 text-2xl">
                <Phone className="text-neon-blue animate-neon-pulse" />
                <a href="tel:+919876543210" className="text-neon-blue hover:text-neon-purple transition-colors">
                  +91 98765 43210
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-2xl">
                <Mail className="text-neon-blue animate-neon-pulse" />
                <a href="mailto:hello@chroniqai.com" className="text-neon-blue hover:text-neon-purple transition-colors">
                  hello@chroniqai.com
                </a>
              </div>
            </div>

            <Button size="lg" className="bg-neon-blue text-background hover:bg-neon-purple hover:text-foreground shadow-glow-primary text-xl px-12 py-6">
              Book a Consultation
            </Button>

            <div className="mt-16 text-sm text-muted-foreground">
              Already have access?{" "}
              <Link to="/login" className="text-neon-blue hover:text-neon-purple transition-colors underline">
                Login here
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
