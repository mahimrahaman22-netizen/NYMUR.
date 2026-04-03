/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Youtube, 
  Mail, 
  MessageCircle, 
  ArrowRight, 
  Layout, 
  Video, 
  Palette, 
  Zap, 
  CheckCircle2,
} from "lucide-react";

// ─── CATEGORIES ───────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Social Media Post",
  "Carousel Post",
  "Print Item",
  "Branding",
  "AI Food Photography",
  "Edited Image (Before/After)",
];

// ─── PORTFOLIO DATA ────────────────────────────────────────────
// প্রতিটা category তে 20টা করে placeholder আছে।
// পরে img এর জায়গায় তোমার real Imgur link বসাবে।

function makePlaceholders(category: string, count: number, seed: string) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${seed}-${i + 1}`,
    title: `${category} ${i + 1}`,
    category,
    img: `https://picsum.photos/seed/${seed}${i + 1}/800/800`,
  }));
}

const portfolioItems = [
  ...makePlaceholders("Social Media Post", 20, "smp"),
  ...makePlaceholders("Carousel Post", 20, "crp"),
  ...makePlaceholders("Print Item", 20, "prt"),
  ...makePlaceholders("Branding", 20, "brd"),
  ...makePlaceholders("AI Food Photography", 20, "afp"),
  ...makePlaceholders("Edited Image (Before/After)", 20, "eba"),
];

// ─── VIDEO DATA ────────────────────────────────────────────────
const videoItems = [
  { id: 1, title: "Motion Graphics Reel", category: "Motion", img: "https://picsum.photos/seed/video1/1280/720" },
  { id: 2, title: "YouTube Video Edit", category: "Editing", img: "https://picsum.photos/seed/video2/1280/720" },
  { id: 3, title: "Product Promo", category: "Motion", img: "https://picsum.photos/seed/video3/1280/720" },
];

// ─── SERVICES ─────────────────────────────────────────────────
const services = [
  { icon: <Palette className="w-6 h-6" />, name: "Social Media Design" },
  { icon: <Zap className="w-6 h-6" />, name: "Ad Creatives" },
  { icon: <Youtube className="w-6 h-6" />, name: "YouTube Thumbnails" },
  { icon: <Layout className="w-6 h-6" />, name: "Branding" },
  { icon: <Video className="w-6 h-6" />, name: "Video Editing" },
  { icon: <Zap className="w-6 h-6" />, name: "Motion Graphics" },
];

// ─── TESTIMONIALS ──────────────────────────────────────────────
const testimonials = [
  { name: "Alex Johnson", role: "YouTuber", text: "Nymur's thumbnails increased my CTR by 15%. Highly recommended!" },
  { name: "Sarah Chen", role: "Marketing Director", text: "Professional, fast, and creative. The branding work was top-notch." },
  { name: "David Miller", role: "Startup Founder", text: "The motion graphics he created for our product launch were stunning." },
];

// ─── SECTION TITLE COMPONENT ──────────────────────────────────
const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-subtext text-lg max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// ─── MAIN APP ──────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-primary selection:bg-neon-blue selection:text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gradient"
          >
            NYMUR.
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-subtext">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#video" className="hover:text-white transition-colors">Video</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-5 py-2 rounded-full border border-neon-blue/50 text-sm font-medium hover:bg-neon-blue/10 transition-all hover:neon-glow"
          >
            Let's Talk
          </motion.a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neon-blue/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
              Crafting <span className="text-gradient">Visual Impact.</span>
            </h1>
            <p className="text-xl md:text-2xl text-subtext max-w-3xl mx-auto mb-10 leading-relaxed">
              High-end graphic design and motion graphics for bold brands and creators.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="#work"
                className="group px-8 py-4 bg-neon-gradient rounded-full text-white font-bold text-lg flex items-center gap-2 hover:neon-glow transition-all active:scale-95"
              >
                View Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-6 text-subtext font-medium">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-neon-cyan" /> 50+ Clients</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-neon-cyan" /> 200+ Designs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio / My Designs ── */}
      <section id="work" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Browse by category — social media, branding, print, AI food photography, and more.">
            My Designs
          </SectionTitle>

          {/* ── Filter Tabs ── */}
          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-neon-blue text-white border-neon-blue neon-glow"
                    : "border-white/10 text-subtext hover:border-neon-blue/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-subtext text-sm mb-6">
            Showing <span className="text-neon-cyan font-semibold">{filtered.length}</span> designs
            {activeCategory !== "All" && (
              <span> in <span className="text-white">{activeCategory}</span></span>
            )}
          </p>

          {/* ── Image Grid ── */}
          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(index * 0.02, 0.4) }}
                  className="group relative overflow-hidden rounded-2xl bg-primary border border-white/5 hover:neon-border cursor-pointer break-inside-avoid mb-6"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-neon-cyan text-xs font-bold tracking-widest uppercase mb-2">{item.category}</span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Video & Motion ── */}
      <section id="video" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Dynamic motion graphics and high-end video editing for modern platforms.">
            Video & Motion
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-secondary"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-neon-blue/20 group-hover:border-neon-blue transition-all">
                    <Video className="w-8 h-8 text-white group-hover:text-neon-cyan" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-primary to-transparent">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle>Services</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-primary/50 border border-white/5 flex flex-col items-center text-center gap-4 hover:border-neon-blue/30 transition-colors group"
              >
                <div className="text-neon-blue group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <span className="text-sm font-medium text-subtext group-hover:text-white transition-colors">{service.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About & Testimonials ── */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <SectionTitle>About Me</SectionTitle>
            <p className="text-xl text-body leading-relaxed mb-8">
              I'm Nymur Rahman, a creative designer focused on high-conversion visuals.
              With over 200 projects completed, I help brands and creators stand out in a crowded digital world.
              My approach combines aesthetic excellence with strategic thinking.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-full bg-secondary hover:bg-neon-blue/10 transition-colors text-subtext hover:text-neon-blue">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 rounded-full bg-secondary hover:bg-neon-blue/10 transition-colors text-subtext hover:text-neon-blue">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 rounded-full bg-secondary hover:bg-neon-blue/10 transition-colors text-subtext hover:text-neon-blue">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-neon-blue"></span>
              What Clients Say
            </h3>
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-secondary/30 border border-white/5"
              >
                <p className="text-body italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-subtext">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-6 bg-linear-to-b from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-primary border border-neon-blue/20 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl text-subtext mb-10">
              Ready to elevate your visual presence? Let's discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:hello@nymur.art"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-neon-cyan transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" /> Email Me
              </a>
              <a
                href="#"
                className="w-full sm:w-auto px-8 py-4 border border-white/20 font-bold rounded-full hover:border-neon-blue hover:text-neon-blue transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-gradient">NYMUR.</div>
          <p className="text-subtext text-sm">© 2026 Nymur Rahman. All rights reserved.</p>
          <div className="flex gap-6 text-subtext text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

