import { Link } from "react-router-dom";
import { TrendingUp, Twitter, Linkedin, Github, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const navigationLinks = [
    { title: "Dashboard", url: "/" },
    { title: "Reports", url: "/reports" },
    { title: "Export", url: "/export" },
    { title: "About Founder", url: "/about-founder" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">ChroniqAI</h3>
                <p className="text-sm text-muted-foreground">AI-Powered Analytics</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Advanced LinkedIn outreach analytics with real-time metrics, conversion tracking, 
              and AI-powered insights to grow your business 2-5x faster.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 bg-secondary/50 hover:bg-neon-blue/10 border border-border/30 hover:border-neon-blue/30 rounded-lg flex items-center justify-center text-muted-foreground hover:text-neon-blue transition-all duration-300 hover:shadow-glow-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about-founder"
                  className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
                >
                  About Founder
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ChroniqAI. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Built with ❤️ by <Link to="/about-founder" className="text-neon-blue hover:text-neon-purple transition-colors duration-300 font-medium">Vedansh Pandey</Link></span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span>AI Analytics Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}