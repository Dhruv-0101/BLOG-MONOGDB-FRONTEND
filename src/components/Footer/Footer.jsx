import React from "react";
import { Link } from "react-router-dom";
import {
  FaBlog,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/posts", label: "Articles" },
    { to: "/ranking", label: "Creators" },
    { to: "/pricing", label: "Pricing" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-[-80px] right-[10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[-80px] left-[5%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 pt-16 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/40">
                <FaBlog size="16" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Story
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                  Flow
                </span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-7">
              StoryFlow is a premium blogging platform where writers earn, grow, and connect with a global audience of readers.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { href: "https://github.com", icon: <FaGithub size="15" />, label: "GitHub" },
                { href: "https://linkedin.com", icon: <FaLinkedin size="15" />, label: "LinkedIn" },
                { href: "https://twitter.com", icon: <FaTwitter size="15" />, label: "Twitter" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Creator column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Creator</h4>
            <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                  D
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Dhruv Patel</p>
                  <p className="text-slate-500 text-xs">Full-Stack Developer</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Passionate developer building premium tools and educational platforms for the next generation of creators.
              </p>
              <a
                href="https://dhruvs-digital-nexus.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                <FaGlobe size="11" />
                Get In Touch →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} StoryFlow by Dhruv Patel. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span>Built with</span>
            <span className="text-rose-600">♥</span>
            <span>using React &amp; Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
