/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
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
  Facebook,
  Phone,
  ChevronDown,
  Sparkles,
  Star,
  ExternalLink,
} from "lucide-react";

// ─── CATEGORIES (removed "All") ───────────────────────────────
const CATEGORIES = [
  "Social Media Post",
  "Carousel Post",
  "Print Item",
  "Branding",
  "AI Food Photography",
  "Edited Image (Before/After)",
];

// ─── BRANDS ───────────────────────────────────────────────────
const BRANDS = [
  { id: "wokwot", name: "Wokwot", color: "#FF6B35" },
  { id: "soojuicy", name: "Soo Juicy", color: "#FF3CAC" },
  { id: "kebab", name: "Kebab N Curries", color: "#F9A825" },
  { id: "secondcup", name: "Second Cup", color: "#6D4C41" },
  { id: "indulge", name: "Indulge", color: "#D57E80" },
  { id: "coffeelime", name: "Coffeelime", color: "#76FF03" },
  { id: "utshob", name: "Utshob Sweets", color: "#FF80AB" },
  { id: "other", name: "Other Works", color: "#78909C" },
];

function makePlaceholders(category: string, count: number, seed: string) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${seed}-${i + 1}`,
    title: `${category} ${i + 1}`,
    category,
    img: `https://picsum.photos/seed/${seed}${i + 1}/800/800`,
  }));
}

function makeBrandPlaceholders(brandId: string, brandName: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${brandId}-${i + 1}`,
    title: `${brandName} Design ${i + 1}`,
    brand: brandId,
    img: `https://picsum.photos/seed/${brandId}${i + 1}/800/800`,
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

const brandItems: Record<string, { id: string; title: string; brand: string; img: string }[]> = {
  wokwot: makeBrandPlaceholders("wokwot", "Wokwot", 20),
  soojuicy: makeBrandPlaceholders("soojuicy", "Soo Juicy", 20),
  kebab: makeBrandPlaceholders("kebab", "Kebab N Curries", 20),
  secondcup: makeBrandPlaceholders("secondcup", "Second Cup", 20),
  indulge: makeBrandPlaceholders("indulge", "Indulge", 20),
  coffeelime: makeBrandPlaceholders("coffeelime", "Coffeelime", 20),
  utshob: makeBrandPlaceholders("utshob", "Utshob Sweets", 20),
  other: makeBrandPlaceholders("other", "Other Works", 20),
};

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
  { icon: <Sparkles className="w-6 h-6" />, name: "Motion Graphics" },
];

// ─── TOOLS ────────────────────────────────────────────────────
const designTools = [
  { name: "Photoshop", type: "design", icon: "🖼️" },
  { name: "Illustrator", type: "design", icon: "✏️" },
  { name: "After Effects", type: "motion", icon: "🎬" },
  { name: "Premiere Pro", type: "video", icon: "🎞️" },
];

const aiTools = [
  { name: "Adobe Firefly", type: "ai", icon: "🔥" },
  { name: "Midjourney", type: "ai", icon: "🌀" },
  { name: "ChatGPT", type: "ai", icon: "🤖" },
  { name: "Claude", type: "ai", icon: "⚡" },
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

// ─── IMAGE GRID with See More ──────────────────────────────────
const ImageGrid = ({ items }: { items: { id: string; title: string; img: string; category?: string; brand?: string }[] }) => {
  const [visible, setVisible] = useState(8);
  return (
    <>
      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {items.slice(0, visible).map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: Math.min(index * 0.03, 0.3) }}
              className="group relative overflow-hidden rounded-2xl bg-primary border border-white/5 hover:neon-border cursor-pointer break-inside-avoid mb-6"
            >
              <img
                src={item.img}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-neon-cyan text-xs font-bold tracking-widest uppercase mb-2">
                  {item.category || item.brand}
                </span>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible < items.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-10"
        >
          <button
            onClick={() => setVisible((v) => v + 8)}
            className="group px-8 py-3 rounded-full border border-neon-blue/40 text-sm font-semibold text-neon-blue hover:bg-neon-blue/10 hover:neon-glow transition-all flex items-center gap-2"
          >
            See More
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </>
  );
};

// ─── FLOATING PARTICLES ───────────────────────────────────────
const FloatingParticles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-neon-blue/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// ─── TYPEWRITER ───────────────────────────────────────────────
const Typewriter = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    } else if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }
  }, [displayed, deleting, index, texts]);

  return (
    <span className="text-gradient">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// ─── MAIN APP ──────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState("Social Media Post");
  const [activeBrand, setActiveBrand] = useState("wokwot");
  const [workTab, setWorkTab] = useState<"category" | "brand">("category");
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  const filtered = portfolioItems.filter((item) => item.category === activeCategory);
  const brandFiltered = brandItems[activeBrand] || [];
  const activeBrandData = BRANDS.find((b) => b.id === activeBrand);

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
            <a href="#intro" className="hover:text-white transition-colors">Home</a>
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

      {/* ── INTRO SECTION (NEW) ── */}
      <section id="intro" className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
        <FloatingParticles />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] bg-neon-blue/5 blur-[150px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-cyan text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              Available for Work
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
              Hi, I'm<br />
              <span className="text-gradient">Nymur Rahman</span>
            </h1>

            <div className="text-2xl md:text-3xl font-semibold text-subtext mb-6 h-10">
              <Typewriter texts={["Graphic Designer", "Brand Strategist", "AI Visual Artist", "Content Creator"]} />
            </div>

            <p className="text-lg text-subtext leading-relaxed mb-8 max-w-lg">
              Crafting high-impact visuals for bold brands. With 4+ years of experience,
              I turn ideas into stunning designs that convert and captivate.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#work"
                className="group px-8 py-4 bg-neon-gradient rounded-full text-white font-bold text-lg flex items-center gap-2 hover:neon-glow transition-all active:scale-95"
              >
                View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 rounded-full font-bold text-lg hover:border-neon-blue/50 hover:text-neon-blue transition-all"
              >
                Hire Me
              </a>
            </div>

            <div className="flex items-center gap-8 mt-10 pt-10 border-t border-white/5">
              {[["4+", "Years Exp."], ["200+", "Projects"], ["50+", "Happy Clients"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-gradient">{num}</div>
                  <div className="text-xs text-subtext mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Decorative ring */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-neon-blue/30 scale-110"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-neon-cyan/20 scale-125"
              />

              {/* Profile image placeholder */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-neon-blue/30 bg-secondary">
                <img
                  src="https://picsum.photos/seed/nymur-profile/500/500"
                  alt="Nymur Rahman"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl bg-primary border border-neon-blue/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">Top Rated Designer</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 px-4 py-3 rounded-2xl bg-primary border border-neon-cyan/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm font-bold text-neon-cyan">AI Enhanced</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Hero (original) ── */}
      <section className="relative pt-20 pb-20 px-6 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neon-blue/8 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              Crafting <span className="text-gradient">Visual Impact.</span>
            </h2>
            <p className="text-xl md:text-2xl text-subtext max-w-3xl mx-auto mb-10 leading-relaxed">
              High-end graphic design and motion graphics for bold brands and creators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio / My Designs ── */}
      <section id="work" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Browse by category or explore work done for specific brands.">
            My Designs
          </SectionTitle>

          {/* ── Work Tab Toggle ── */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setWorkTab("category")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                workTab === "category"
                  ? "bg-neon-blue text-white border-neon-blue neon-glow"
                  : "border-white/10 text-subtext hover:border-neon-blue/50 hover:text-white"
              }`}
            >
              By Category
            </button>
            <button
              onClick={() => setWorkTab("brand")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                workTab === "brand"
                  ? "bg-neon-blue text-white border-neon-blue neon-glow"
                  : "border-white/10 text-subtext hover:border-neon-blue/50 hover:text-white"
              }`}
            >
              By Brand
            </button>
          </div>

          <AnimatePresence mode="wait">
            {workTab === "category" ? (
              <motion.div
                key="category"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Category filter pills */}
                <div className="flex flex-wrap gap-3 mb-6">
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

                {/* Show first few items immediately as preview */}
                <div className="mb-4">
                  <p className="text-subtext text-sm mb-6">
                    Showing designs in <span className="text-white font-semibold">{activeCategory}</span>
                  </p>
                </div>

                <ImageGrid key={activeCategory} items={filtered} />
              </motion.div>
            ) : (
              <motion.div
                key="brand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Brand tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setActiveBrand(brand.id)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                        activeBrand === brand.id
                          ? "text-white border-transparent"
                          : "border-white/10 text-subtext hover:text-white"
                      }`}
                      style={
                        activeBrand === brand.id
                          ? { backgroundColor: brand.color, borderColor: brand.color, boxShadow: `0 0 16px ${brand.color}60` }
                          : {}
                      }
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>

                {/* Brand header */}
                <motion.div
                  key={activeBrand}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 mb-8 p-5 rounded-2xl bg-primary/60 border border-white/5"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: activeBrandData?.color + "30", border: `1px solid ${activeBrandData?.color}60` }}
                  >
                    {activeBrandData?.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{activeBrandData?.name}</h3>
                    <p className="text-subtext text-sm">{brandFiltered.length} designs</p>
                  </div>
                </motion.div>

                <ImageGrid key={activeBrand} items={brandFiltered} />
              </motion.div>
            )}
          </AnimatePresence>
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

      {/* ── About & Tools ── */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* About Me */}
          <div>
            <SectionTitle>About Me</SectionTitle>
            <div className="space-y-5 text-lg text-body leading-relaxed">
              <p>
                I'm <span className="text-white font-semibold">Nymur Rahman</span> — a creative graphic designer and digital content creator with <span className="text-neon-cyan font-semibold">4+ years of hands-on experience</span> in the design industry.
              </p>
              <p>
                I specialize in crafting visually powerful content for food & beverage brands, social media platforms, and digital marketing campaigns. My work spans from brand identity and social media posts to AI-enhanced food photography and motion graphics.
              </p>
              <p>
                Over the years, I've had the privilege of working with <span className="text-white font-semibold">50+ clients</span> and delivering <span className="text-white font-semibold">200+ design projects</span> — including campaigns for brands like Wokwot, Soo Juicy, Kebab N Curries, Second Cup, Indulge, Coffeelime, and Utshob Sweets.
              </p>
              <p>
                I blend strong design fundamentals with cutting-edge AI tools to deliver results that are not just beautiful — but <span className="text-neon-cyan font-semibold">strategically effective</span>. Every pixel I place has a purpose.
              </p>
              <p className="text-subtext">
                Based in Kaliganj, Dhaka, Bangladesh. Available for local and international projects.
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-4 mt-8">
              <a href="https://www.facebook.com/mahim.rahman.165470/" target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-blue-600/20 transition-colors text-subtext hover:text-blue-400">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/nymur_rahman22/" target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-pink-600/20 transition-colors text-subtext hover:text-pink-400">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="mailto:mahimrahaman22@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-neon-blue/10 transition-colors text-subtext hover:text-neon-blue">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-neon-blue" />
              Tools I Use
            </h3>

            <div className="mb-8">
              <p className="text-subtext text-sm font-semibold uppercase tracking-widest mb-4">Design & Video</p>
              <div className="grid grid-cols-2 gap-3">
                {designTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary/40 border border-white/5 hover:border-neon-blue/20 transition-colors"
                  >
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="font-medium text-sm">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-subtext text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-cyan" /> AI Tools
              </p>
              <div className="grid grid-cols-2 gap-3">
                {aiTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + 0.3 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-neon-blue/5 border border-neon-blue/15 hover:border-neon-cyan/30 transition-colors group"
                  >
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="font-medium text-sm group-hover:text-neon-cyan transition-colors">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-neon-blue" />
                What Clients Say
              </h3>
              <div className="space-y-4">
                {testimonials.map((t, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 rounded-2xl bg-secondary/30 border border-white/5"
                  >
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-body italic mb-4 text-sm">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-bold text-sm">
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
            <FloatingParticles />
            <h2 className="text-4xl md:text-6xl font-bold mb-4 relative z-10">Let's Work Together</h2>
            <p className="text-xl text-subtext mb-10 relative z-10">
              Ready to elevate your visual presence? Let's discuss your next project.
            </p>

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left relative z-10">
              <div className="p-4 rounded-xl bg-secondary/50 border border-white/5 flex items-center gap-3">
                <Phone className="w-5 h-5 text-neon-cyan shrink-0" />
                <div>
                  <p className="text-xs text-subtext mb-1">Phone / WhatsApp</p>
                  <p className="font-semibold text-sm">+880 1923-291397</p>
                  <p className="font-semibold text-sm">+880 1873-133686</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-white/5 flex items-center gap-3">
                <Mail className="w-5 h-5 text-neon-cyan shrink-0" />
                <div>
                  <p className="text-xs text-subtext mb-1">Email</p>
                  <p className="font-semibold text-sm">mahimrahaman22@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <a
                href="mailto:mahimrahaman22@gmail.com"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-neon-cyan transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" /> Email Me
              </a>
              <a
                href="https://wa.me/8801923291397"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 border border-white/20 font-bold rounded-full hover:border-neon-blue hover:text-neon-blue transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a
                href="https://www.facebook.com/mahim.rahman.165470/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 border border-white/20 font-bold rounded-full hover:border-blue-400 hover:text-blue-400 transition-all flex items-center justify-center gap-2"
              >
                <Facebook className="w-5 h-5" /> Facebook
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
          <div className="flex gap-4 items-center">
            <a href="https://www.facebook.com/mahim.rahman.165470/" target="_blank" rel="noopener noreferrer"
              className="text-subtext hover:text-blue-400 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/nymur_rahman22/" target="_blank" rel="noopener noreferrer"
              className="text-subtext hover:text-pink-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:mahimrahaman22@gmail.com"
              className="text-subtext hover:text-neon-blue transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
