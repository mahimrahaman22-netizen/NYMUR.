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
  { id: "monno", name: "Monno", color: "#00C9FF" },
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

// ─── SHUFFLE helper (Fisher-Yates — no duplicates) ────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Social Media Post — real Monno images (same 35, no duplicates)
const monnoAsSocialMedia = [
  { id: "smp-1",  title: "Monno Design 1",  category: "Social Media Post", img: "https://i.imgur.com/9QsN7zu.jpeg" },
  { id: "smp-2",  title: "Monno Design 2",  category: "Social Media Post", img: "https://i.imgur.com/hEBD40J.jpeg" },
  { id: "smp-3",  title: "Monno Design 3",  category: "Social Media Post", img: "https://i.imgur.com/AeBOOOI.jpeg" },
  { id: "smp-4",  title: "Monno Design 4",  category: "Social Media Post", img: "https://i.imgur.com/h68CsP5.jpeg" },
  { id: "smp-5",  title: "Monno Design 5",  category: "Social Media Post", img: "https://i.imgur.com/h4cXyTL.jpeg" },
  { id: "smp-6",  title: "Monno Design 6",  category: "Social Media Post", img: "https://i.imgur.com/eWHynVz.jpeg" },
  { id: "smp-7",  title: "Monno Design 7",  category: "Social Media Post", img: "https://i.imgur.com/ZUjBSYt.jpeg" },
  { id: "smp-8",  title: "Monno Design 8",  category: "Social Media Post", img: "https://i.imgur.com/VaCiAM3.jpeg" },
  { id: "smp-9",  title: "Monno Design 9",  category: "Social Media Post", img: "https://i.imgur.com/5spgvES.jpeg" },
  { id: "smp-10", title: "Monno Design 10", category: "Social Media Post", img: "https://i.imgur.com/3WHBsLk.jpeg" },
  { id: "smp-11", title: "Monno Design 11", category: "Social Media Post", img: "https://i.imgur.com/Vq0tPwB.jpeg" },
  { id: "smp-12", title: "Monno Design 12", category: "Social Media Post", img: "https://i.imgur.com/gfJwJdG.jpeg" },
  { id: "smp-13", title: "Monno Design 13", category: "Social Media Post", img: "https://i.imgur.com/E6bZzL7.jpeg" },
  { id: "smp-14", title: "Monno Design 14", category: "Social Media Post", img: "https://i.imgur.com/CaxbxaH.jpeg" },
  { id: "smp-15", title: "Monno Design 15", category: "Social Media Post", img: "https://i.imgur.com/biOXwdw.jpeg" },
  { id: "smp-16", title: "Monno Design 16", category: "Social Media Post", img: "https://i.imgur.com/y4y5BF2.jpeg" },
  { id: "smp-17", title: "Monno Design 17", category: "Social Media Post", img: "https://i.imgur.com/3TYuQdP.jpeg" },
  { id: "smp-18", title: "Monno Design 18", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczO0EVQTFAtsMZcbBYPN26U9VCTeMmNb4noLY7DhrBn1r8HoN9U119N6hWCl3FPmcaT4YbSawnJW6FlSV9Ps3aqja0CFGDHuWDelXdP-4Q_sbCh4ht8=w1280-no" },
  { id: "smp-19", title: "Monno Design 19", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczMCVorKHhrKzwaHC0XZhA1lyus358wk3JZxHzPZO3beGvStkYNDjR6AQIZbsyvufjmRexwaokWhmZ4-0JTlLbMsacgP1qBYHSvwXA-iN1hAu6eV8VY=w1280-no" },
  { id: "smp-20", title: "Monno Design 20", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczOow7ZfYXjis5JM_a9NY7aJh2So9AHK0xCiv5SBJbbUd33WHWg4r9jMAOZ2v2TSFW8DuLih03QEzNA8AbssXILcgwON_15eFUfMIZIKfI0SZw3uhCo=w1280-no" },
  { id: "smp-21", title: "Monno Design 21", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczNfA6yI_3vbBbrtn16aJJ45Vf9285nwMxAyk8hPXPd2HFY32CCQHNg97Ig5fCLRGUzTAlOy_fvyQdr0kBAp0MN9R0VSxGN6Mrt7Xw947Fq1GU8A7jA=w1280-no" },
  { id: "smp-22", title: "Monno Design 22", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczPhmZd7mlCPYulC4EHCuO9bKCYLdew0JxdO-cr3i-T96qf5KMrqDXI7JaUTM4hxXXsWg4k7UXXEC96_RyUxRUqddtEBdTk1n9zoJd2Fvwto49BITrY=w1280-no" },
  { id: "smp-23", title: "Monno Design 23", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczNKz7vznS5Lt5f-XsTMT4LmTEz9Z5CbpZYFby5lOEw628DRp71o9xEY0SveFRK9GIH8a6iKPdr_9zwYZ-ZrTYT1bkZrrlwmqOfQZ1MSATpuE8kMOlQ=w1280-no" },
  { id: "smp-24", title: "Monno Design 24", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczNAB2I3Zu0CH7emHt8CTGhQ28OhuViZmWBE_v6s7637ormpYpW4d8YKVCk7JYP0ajJdIXzyjb5k6ouk5mqiA9C0GvZ5PbUZB0Z71GYOIMvbyIloAaY=w1280-no" },
  { id: "smp-25", title: "Monno Design 25", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczO661Z9chpTi2G5jPsLpLVFMkGJPN97JXcHp5r27kIog0ah0Rj31Mijxt10zLQNUhRciptX7myNc1yJR5jA97aXERshpsdSTZL6w1uuvwwBdamai78=w1280-no" },
  { id: "smp-26", title: "Monno Design 26", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczOnUvVMWbmtxXeN1z35flImwWyoeydVRFA7BvIPVcxAr9MaIlGvPZvgKbulKVopkPTrU9gwvoAOi7acITalcbi6wkb5WGNLJD1QyVYFqRNsw90Wv34=w1280-no" },
  { id: "smp-27", title: "Monno Design 27", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczPxbQLd18H1ASYyr_TkqyFbLsApbTHs1eS8f_U0YnqGvkKurvd4o5xXBlBJha-Kok7rwTLp4yuXnLkmYpztobDAyrq3fqgYp3s3XI6lMSOYmy-lVS4=w1280-no" },
  { id: "smp-28", title: "Monno Design 28", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczOaRybBLKkiKV8ZzXz_RvPEPKLK1-tzqq_PRf3lO-cEdDNEzBG-_cwW2Vq5c4tpsOvN-D-wVk-meC_UcCn12JtAGdlwYeO7KO4YnTnr_kAWcO8pJEI=w1280-no" },
  { id: "smp-29", title: "Monno Design 29", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczPiJK83Kyl9WAVGx159VaLmjSNaDTVzcHzbPGJheA7HODI-JJkYQtgOHSYJBnXpl-jDQtYRSf5pfg2QePofEPVl1eVjg5F4RElVjaigieuwOUHteKQ=w1280-no" },
  { id: "smp-30", title: "Monno Design 30", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczNcIJ170FHA_v4xp3JkWJ-dw1DIo6F14DzWK9LiqV8lEjklXbvoMNhMfBEC42h1dzotB9xJjVWrVDDEjCOTSo1S70OFbpGPXcABjAhL8EjsIRZ5eM8=w1280-no" },
  { id: "smp-31", title: "Monno Design 31", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczPMRPHn1kUI52355PoUs-Gfd_8cXLQMVzk5iwR1Vr7HfEpXofryKeJGI5yJwW3aHKPwJf5AKNO8nhuQ9OldGX5otc7rsIc9DmgbGex-hXmpf4gEHoY=w1280-no" },
  { id: "smp-32", title: "Monno Design 32", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczO2_4xRcu7aLoXaXbTEsSNn67Vv3jaoAivCVcm2mzJDIxK-r75DgBq8j0SNMye2Fq22xI0OWmbJXfbeTLFaUhOP6qc8lBPSmsU_fqLE1VSCsnr8nBs=w1280-no" },
  { id: "smp-33", title: "Monno Design 33", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczMj61gHb3umRdEgqK4yf8fHPjGSeEZt-Gn7GhSGhrGEi--1jb1CozoxfHn5mMAPjFj7mR9Vp8Pj07rrLSWzAlX4-OzSkPOWf32iuNt1oM2BZQ_lN8g=w1280-no" },
  { id: "smp-34", title: "Monno Design 34", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczN0xu6Ds5fxlZbG3mzqp3dDLuz6Oic0iP9MY0rgYF0mFetsHFijUKFaD7X6gPYMOKhSSprRdFAB9Qin663NKqLpXfJ9V57w_GvyqrNNYNHb7YUv5w0=w1280-no" },
  { id: "smp-35", title: "Monno Design 35", category: "Social Media Post", img: "https://lh3.googleusercontent.com/pw/AP1GczNpdEcIqNGMvXaojj-GKoIKMSvMc-0rGaW1pOtcTiL7H5XVVD2CaWhFI2rR4d1HUo8aWj0Tpafk4wduHYho00fYmNyfil8coqGFc11PX0s6Pp31vVU=w1280-no" },
];

// portfolioItems — Social Media Post gets real images, rest stay as placeholders
// shuffle() runs once at page load — stable until reload or tab switch
const portfolioItems = [
  ...shuffle(monnoAsSocialMedia),
  ...makePlaceholders("Carousel Post", 20, "crp"),
  ...makePlaceholders("Print Item", 20, "prt"),
  ...makePlaceholders("Branding", 20, "brd"),
  ...makePlaceholders("AI Food Photography", 20, "afp"),
  ...makePlaceholders("Edited Image (Before/After)", 20, "eba"),
];

const brandItems: Record<string, { id: string; title: string; brand: string; img: string }[]> = {
  monno: [
    { id: "monno-1",  title: "Monno Design 1",  brand: "monno", img: "https://i.imgur.com/9QsN7zu.jpeg" },
    { id: "monno-2",  title: "Monno Design 2",  brand: "monno", img: "https://i.imgur.com/hEBD40J.jpeg" },
    { id: "monno-3",  title: "Monno Design 3",  brand: "monno", img: "https://i.imgur.com/AeBOOOI.jpeg" },
    { id: "monno-4",  title: "Monno Design 4",  brand: "monno", img: "https://i.imgur.com/h68CsP5.jpeg" },
    { id: "monno-5",  title: "Monno Design 5",  brand: "monno", img: "https://i.imgur.com/h4cXyTL.jpeg" },
    { id: "monno-6",  title: "Monno Design 6",  brand: "monno", img: "https://i.imgur.com/eWHynVz.jpeg" },
    { id: "monno-7",  title: "Monno Design 7",  brand: "monno", img: "https://i.imgur.com/ZUjBSYt.jpeg" },
    { id: "monno-8",  title: "Monno Design 8",  brand: "monno", img: "https://i.imgur.com/VaCiAM3.jpeg" },
    { id: "monno-9",  title: "Monno Design 9",  brand: "monno", img: "https://i.imgur.com/5spgvES.jpeg" },
    { id: "monno-10", title: "Monno Design 10", brand: "monno", img: "https://i.imgur.com/3WHBsLk.jpeg" },
    { id: "monno-11", title: "Monno Design 11", brand: "monno", img: "https://i.imgur.com/Vq0tPwB.jpeg" },
    { id: "monno-12", title: "Monno Design 12", brand: "monno", img: "https://i.imgur.com/gfJwJdG.jpeg" },
    { id: "monno-13", title: "Monno Design 13", brand: "monno", img: "https://i.imgur.com/E6bZzL7.jpeg" },
    { id: "monno-14", title: "Monno Design 14", brand: "monno", img: "https://i.imgur.com/CaxbxaH.jpeg" },
    { id: "monno-15", title: "Monno Design 15", brand: "monno", img: "https://i.imgur.com/biOXwdw.jpeg" },
    { id: "monno-16", title: "Monno Design 16", brand: "monno", img: "https://i.imgur.com/y4y5BF2.jpeg" },
    { id: "monno-17", title: "Monno Design 17", brand: "monno", img: "https://i.imgur.com/3TYuQdP.jpeg" },
    { id: "monno-18", title: "Monno Design 18", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczO0EVQTFAtsMZcbBYPN26U9VCTeMmNb4noLY7DhrBn1r8HoN9U119N6hWCl3FPmcaT4YbSawnJW6FlSV9Ps3aqja0CFGDHuWDelXdP-4Q_sbCh4ht8=w1280-no" },
    { id: "monno-19", title: "Monno Design 19", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczMCVorKHhrKzwaHC0XZhA1lyus358wk3JZxHzPZO3beGvStkYNDjR6AQIZbsyvufjmRexwaokWhmZ4-0JTlLbMsacgP1qBYHSvwXA-iN1hAu6eV8VY=w1280-no" },
    { id: "monno-20", title: "Monno Design 20", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczOow7ZfYXjis5JM_a9NY7aJh2So9AHK0xCiv5SBJbbUd33WHWg4r9jMAOZ2v2TSFW8DuLih03QEzNA8AbssXILcgwON_15eFUfMIZIKfI0SZw3uhCo=w1280-no" },
    { id: "monno-21", title: "Monno Design 21", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczNfA6yI_3vbBbrtn16aJJ45Vf9285nwMxAyk8hPXPd2HFY32CCQHNg97Ig5fCLRGUzTAlOy_fvyQdr0kBAp0MN9R0VSxGN6Mrt7Xw947Fq1GU8A7jA=w1280-no" },
    { id: "monno-22", title: "Monno Design 22", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczPhmZd7mlCPYulC4EHCuO9bKCYLdew0JxdO-cr3i-T96qf5KMrqDXI7JaUTM4hxXXsWg4k7UXXEC96_RyUxRUqddtEBdTk1n9zoJd2Fvwto49BITrY=w1280-no" },
    { id: "monno-23", title: "Monno Design 23", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczNKz7vznS5Lt5f-XsTMT4LmTEz9Z5CbpZYFby5lOEw628DRp71o9xEY0SveFRK9GIH8a6iKPdr_9zwYZ-ZrTYT1bkZrrlwmqOfQZ1MSATpuE8kMOlQ=w1280-no" },
    { id: "monno-24", title: "Monno Design 24", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczNAB2I3Zu0CH7emHt8CTGhQ28OhuViZmWBE_v6s7637ormpYpW4d8YKVCk7JYP0ajJdIXzyjb5k6ouk5mqiA9C0GvZ5PbUZB0Z71GYOIMvbyIloAaY=w1280-no" },
    { id: "monno-25", title: "Monno Design 25", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczO661Z9chpTi2G5jPsLpLVFMkGJPN97JXcHp5r27kIog0ah0Rj31Mijxt10zLQNUhRciptX7myNc1yJR5jA97aXERshpsdSTZL6w1uuvwwBdamai78=w1280-no" },
    { id: "monno-26", title: "Monno Design 26", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczOnUvVMWbmtxXeN1z35flImwWyoeydVRFA7BvIPVcxAr9MaIlGvPZvgKbulKVopkPTrU9gwvoAOi7acITalcbi6wkb5WGNLJD1QyVYFqRNsw90Wv34=w1280-no" },
    { id: "monno-27", title: "Monno Design 27", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczPxbQLd18H1ASYyr_TkqyFbLsApbTHs1eS8f_U0YnqGvkKurvd4o5xXBlBJha-Kok7rwTLp4yuXnLkmYpztobDAyrq3fqgYp3s3XI6lMSOYmy-lVS4=w1280-no" },
    { id: "monno-28", title: "Monno Design 28", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczOaRybBLKkiKV8ZzXz_RvPEPKLK1-tzqq_PRf3lO-cEdDNEzBG-_cwW2Vq5c4tpsOvN-D-wVk-meC_UcCn12JtAGdlwYeO7KO4YnTnr_kAWcO8pJEI=w1280-no" },
    { id: "monno-29", title: "Monno Design 29", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczPiJK83Kyl9WAVGx159VaLmjSNaDTVzcHzbPGJheA7HODI-JJkYQtgOHSYJBnXpl-jDQtYRSf5pfg2QePofEPVl1eVjg5F4RElVjaigieuwOUHteKQ=w1280-no" },
    { id: "monno-30", title: "Monno Design 30", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczNcIJ170FHA_v4xp3JkWJ-dw1DIo6F14DzWK9LiqV8lEjklXbvoMNhMfBEC42h1dzotB9xJjVWrVDDEjCOTSo1S70OFbpGPXcABjAhL8EjsIRZ5eM8=w1280-no" },
    { id: "monno-31", title: "Monno Design 31", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczPMRPHn1kUI52355PoUs-Gfd_8cXLQMVzk5iwR1Vr7HfEpXofryKeJGI5yJwW3aHKPwJf5AKNO8nhuQ9OldGX5otc7rsIc9DmgbGex-hXmpf4gEHoY=w1280-no" },
    { id: "monno-32", title: "Monno Design 32", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczO2_4xRcu7aLoXaXbTEsSNn67Vv3jaoAivCVcm2mzJDIxK-r75DgBq8j0SNMye2Fq22xI0OWmbJXfbeTLFaUhOP6qc8lBPSmsU_fqLE1VSCsnr8nBs=w1280-no" },
    { id: "monno-33", title: "Monno Design 33", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczMj61gHb3umRdEgqK4yf8fHPjGSeEZt-Gn7GhSGhrGEi--1jb1CozoxfHn5mMAPjFj7mR9Vp8Pj07rrLSWzAlX4-OzSkPOWf32iuNt1oM2BZQ_lN8g=w1280-no" },
    { id: "monno-34", title: "Monno Design 34", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczN0xu6Ds5fxlZbG3mzqp3dDLuz6Oic0iP9MY0rgYF0mFetsHFijUKFaD7X6gPYMOKhSSprRdFAB9Qin663NKqLpXfJ9V57w_GvyqrNNYNHb7YUv5w0=w1280-no" },
    { id: "monno-35", title: "Monno Design 35", brand: "monno", img: "https://lh3.googleusercontent.com/pw/AP1GczNpdEcIqNGMvXaojj-GKoIKMSvMc-0rGaW1pOtcTiL7H5XVVD2CaWhFI2rR4d1HUo8aWj0Tpafk4wduHYho00fYmNyfil8coqGFc11PX0s6Pp31vVU=w1280-no" },
  ],
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

// ─── LIGHTBOX ─────────────────────────────────────────────────
const Lightbox = ({ img, title, onClose }: { img: string; title: string; onClose: () => void }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all text-white text-xl font-bold z-10"
        >
          ✕
        </button>

        {/* Image */}
        <motion.img
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          src={img}
          alt={title}
          onClick={(e) => e.stopPropagation()}
          referrerPolicy="no-referrer"
          className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
        />
      </motion.div>
    </AnimatePresence>
  );
};

// ─── IMAGE GRID with See More + Lightbox ──────────────────────
// shuffleOnChange=true → re-shuffles when items change (category tab switch)
// shuffleOnChange=false → stable order (brand section)
const ImageGrid = ({
  items,
  shuffleOnChange = false,
}: {
  items: { id: string; title: string; img: string; category?: string; brand?: string }[];
  shuffleOnChange?: boolean;
}) => {
  const [visible, setVisible] = useState(8);
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);
  const [displayedItems, setDisplayedItems] = useState(() =>
    shuffleOnChange ? shuffle(items) : items
  );

  // When category tab changes → reshuffle + reset visible count
  useEffect(() => {
    setDisplayedItems(shuffleOnChange ? shuffle(items) : items);
    setVisible(8);
  }, [items, shuffleOnChange]);

  return (
    <>
      {lightbox && <Lightbox img={lightbox.img} title={lightbox.title} onClose={() => setLightbox(null)} />}

      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence initial={false}>
          {displayedItems.slice(0, visible).map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
              onClick={() => setLightbox({ img: item.img, title: item.title })}
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

      {visible < displayedItems.length && (
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
  const [activeBrand, setActiveBrand] = useState("monno");
  const [workTab, setWorkTab] = useState<"category" | "brand">("category");
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  const filtered = portfolioItems.filter((item) => item.category === activeCategory);

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

      {/* ── INTRO SECTION — Full landscape bg + left overlay ── */}
      <section id="intro" className="relative min-h-screen flex items-end overflow-hidden">

        {/* Full background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.imgur.com/k4Sxwll.jpeg"
            alt="Nymur Rahman"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient from left so text is readable, fades to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          {/* Bottom fade into site bg */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        </div>

        {/* Floating particles on top */}
        <FloatingParticles />

        {/* Content — left aligned, sitting above the bottom fade */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 pt-40">
          <div className="max-w-xl">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/15 border border-neon-blue/30 text-neon-cyan text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              Available for Work
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight text-white drop-shadow-2xl"
            >
              Hi, I'm<br />
              <span className="text-gradient">Nymur Rahman</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-2xl md:text-3xl font-semibold mb-6 h-10"
            >
              <Typewriter texts={["Graphic Designer", "Brand Strategist", "AI Visual Artist", "Content Creator"]} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-lg text-white/70 leading-relaxed mb-8"
            >
              Crafting high-impact visuals for bold brands. With 4+ years of experience,
              I turn ideas into stunning designs that convert and captivate.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <a
                href="#work"
                className="group px-8 py-4 bg-neon-gradient rounded-full text-white font-bold text-lg flex items-center gap-2 hover:neon-glow transition-all active:scale-95"
              >
                View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/30 rounded-full font-bold text-lg text-white hover:border-neon-blue/70 hover:text-neon-blue backdrop-blur-sm transition-all"
              >
                Hire Me
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 pt-8 border-t border-white/10"
            >
              {[["4+", "Years Exp."], ["200+", "Projects"], ["50+", "Happy Clients"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-gradient">{num}</div>
                  <div className="text-xs text-white/50 mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating badges — bottom right corner over image */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-10 z-10 px-5 py-3 rounded-2xl bg-black/60 border border-neon-blue/30 backdrop-blur-sm hidden md:flex items-center gap-2"
        >
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-bold text-white">Top Rated Designer</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-36 right-10 z-10 px-4 py-3 rounded-2xl bg-black/60 border border-neon-cyan/30 backdrop-blur-sm hidden md:flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm font-bold text-neon-cyan">AI Enhanced</span>
        </motion.div>
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

                <ImageGrid key={activeCategory} items={filtered} shuffleOnChange={true} />
              </motion.div>
            ) : (
              <motion.div
                key="brand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Brand buttons — horizontal side by side */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {BRANDS.map((brand) => {
                    const isOpen = activeBrand === brand.id;
                    return (
                      <button
                        key={brand.id}
                        onClick={() => setActiveBrand(isOpen ? "" : brand.id)}
                        className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border"
                        style={
                          isOpen
                            ? { backgroundColor: brand.color + "20", borderColor: brand.color, color: brand.color, boxShadow: `0 0 14px ${brand.color}40` }
                            : { borderColor: "rgba(255,255,255,0.1)", color: "#9ca3af" }
                        }
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: brand.color + "30", color: brand.color }}
                        >
                          {brand.name[0]}
                        </span>
                        {brand.name}
                        <span className="text-xs opacity-60">({(brandItems[brand.id] || []).length})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Brand content — expands below */}
                <AnimatePresence mode="wait">
                  {activeBrand && (
                    <motion.div
                      key={activeBrand}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Brand header strip */}
                      {(() => {
                        const brand = BRANDS.find(b => b.id === activeBrand);
                        const items = brandItems[activeBrand] || [];
                        return (
                          <>
                            <div
                              className="flex items-center gap-3 mb-6 px-5 py-3 rounded-xl"
                              style={{ backgroundColor: brand?.color + "10", border: `1px solid ${brand?.color}30` }}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                                style={{ backgroundColor: brand?.color + "25", color: brand?.color }}
                              >
                                {brand?.name[0]}
                              </div>
                              <div>
                                <p className="font-bold text-white">{brand?.name}</p>
                                <p className="text-xs text-subtext">{items.length} designs</p>
                              </div>
                            </div>
                            <ImageGrid key={activeBrand} items={items} />
                          </>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
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
