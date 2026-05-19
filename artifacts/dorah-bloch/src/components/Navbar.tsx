import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import badge from "@assets/Parents_of_Dorah_Bloch_International_College_20260403_135951_1779184910292.jpg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "Campus Life", href: "#campus-life" },
    { name: "Admissions", href: "#admissions" },
    { name: "Scholarships", href: "#scholarships" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-4 z-50">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-accent shadow-lg bg-white shrink-0">
            <img src={badge} alt="Dorah Bloch College Badge" className="w-full h-full object-cover" />
          </div>
          <div className={`flex flex-col ${scrolled ? "text-foreground" : "text-white"}`}>
            <span className="font-serif font-bold text-lg md:text-xl leading-tight tracking-wide">
              DORAH BLOCH
            </span>
            <span className="font-sans text-xs md:text-sm font-medium tracking-widest opacity-90">
              INTERNATIONAL COLLEGE
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`font-medium text-sm transition-colors hover:text-accent ${
                    scrolled ? "text-foreground" : "text-white/90"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#admissions"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2.5 rounded-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={scrolled ? "text-foreground" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-foreground" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-foreground z-40 lg:hidden flex flex-col justify-center items-center"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl text-white hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-accent text-accent-foreground px-8 py-3 mt-4 rounded-sm font-bold text-lg inline-block"
                >
                  Apply Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
