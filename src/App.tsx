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
  "Facebook Carousel Ads",
  "Print Item",
  "Branding",
  "AI Food Photography",
  "Edited Image (Before/After)",
];

// ─── BRANDS ───────────────────────────────────────────────────
const BRANDS = [
  { id: "monno",       name: "Monno Ceramic",        color: "#00C9FF" },
  { id: "secondcup",  name: "Second Cup",            color: "#6D4C41" },
  { id: "acineem",    name: "ACI Neem",              color: "#76FF03" },
  { id: "indulge",    name: "Indulge",               color: "#D57E80" },
  { id: "easternagro",name: "Eastern Agro",          color: "#F9A825" },
  { id: "wellness",   name: "Wellness Cafe",         color: "#00E5FF" },
  { id: "coffeelime", name: "Coffeelime & Bubbletime", color: "#FFEA00" },
  { id: "soojuicy",   name: "So Juicy",              color: "#FF3CAC" },
  { id: "route66",    name: "Route 66",              color: "#FF6B35" },
  { id: "alfredough", name: "Alfredough",            color: "#E040FB" },
  { id: "upstairs",   name: "Upstairs",              color: "#40C4FF" },
  { id: "punjab",     name: "Punjab Kitchen",        color: "#FF6E40" },
  { id: "other",      name: "Other",                 color: "#78909C" },
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

// Social Media Post — 52 real Cloudinary images
const socialMediaItems = [
  { id:"smp-1", title:"Social Media Post 001", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873604/New%20folder/001_wjbjfe.jpg" },
  { id:"smp-2", title:"Social Media Post 002", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873605/New%20folder/002_x6oo1p.jpg" },
  { id:"smp-3", title:"Social Media Post 003", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873605/New%20folder/003_uuohiw.jpg" },
  { id:"smp-4", title:"Social Media Post 004", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873606/New%20folder/004_xrpqr6.jpg" },
  { id:"smp-5", title:"Social Media Post 005", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873606/New%20folder/005_kctm6j.jpg" },
  { id:"smp-6", title:"Social Media Post 006", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873606/New%20folder/006_lwgwyr.jpg" },
  { id:"smp-7", title:"Social Media Post 007", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873607/New%20folder/007_li6vhy.jpg" },
  { id:"smp-8", title:"Social Media Post 008", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873606/New%20folder/008_o5thzi.jpg" },
  { id:"smp-9", title:"Social Media Post 009", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873607/New%20folder/009_scfzoz.jpg" },
  { id:"smp-10", title:"Social Media Post 010", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873608/New%20folder/010_sgt5no.jpg" },
  { id:"smp-11", title:"Social Media Post 011", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873608/New%20folder/011_aklps0.jpg" },
  { id:"smp-12", title:"Social Media Post 012", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873608/New%20folder/011.1_tv3kqe.jpg" },
  { id:"smp-13", title:"Social Media Post 013", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873605/New%20folder/012_rog0sz.jpg" },
  { id:"smp-14", title:"Social Media Post 014", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873604/New%20folder/013_oc7v2g.jpg" },
  { id:"smp-15", title:"Social Media Post 015", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873605/New%20folder/014_hkxhld.jpg" },
  { id:"smp-16", title:"Social Media Post 016", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873606/New%20folder/015_rxmjl4.jpg" },
  { id:"smp-17", title:"Social Media Post 017", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873606/New%20folder/016_cgzili.jpg" },
  { id:"smp-18", title:"Social Media Post 018", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873608/New%20folder/017_nfii1o.jpg" },
  { id:"smp-19", title:"Social Media Post 019", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873608/New%20folder/018_jpnttd.jpg" },
  { id:"smp-20", title:"Social Media Post 020", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873608/New%20folder/019_z7xihy.jpg" },
  { id:"smp-21", title:"Social Media Post 021", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873609/New%20folder/020_wmcwpx.jpg" },
  { id:"smp-22", title:"Social Media Post 022", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873609/New%20folder/021_vthrt9.jpg" },
  { id:"smp-23", title:"Social Media Post 023", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873609/New%20folder/022_lgdbnc.jpg" },
  { id:"smp-24", title:"Social Media Post 024", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873610/New%20folder/023_nereqd.jpg" },
  { id:"smp-25", title:"Social Media Post 025", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873610/New%20folder/024_yidxri.jpg" },
  { id:"smp-26", title:"Social Media Post 026", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873610/New%20folder/025_egxxk6.jpg" },
  { id:"smp-27", title:"Social Media Post 027", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873610/New%20folder/026_vjjzli.jpg" },
  { id:"smp-28", title:"Social Media Post 028", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873611/New%20folder/027_bepauv.jpg" },
  { id:"smp-29", title:"Social Media Post 029", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873611/New%20folder/028_iyahqj.jpg" },
  { id:"smp-30", title:"Social Media Post 030", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873613/New%20folder/029_aez8ge.jpg" },
  { id:"smp-31", title:"Social Media Post 031", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873611/New%20folder/030_dtfyqw.jpg" },
  { id:"smp-32", title:"Social Media Post 032", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873611/New%20folder/031_lvv6pk.jpg" },
  { id:"smp-33", title:"Social Media Post 033", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873616/New%20folder/032_eqrbkx.jpg" },
  { id:"smp-34", title:"Social Media Post 034", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873612/New%20folder/033_b1x7xg.jpg" },
  { id:"smp-35", title:"Social Media Post 035", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873612/New%20folder/034_qf1alz.jpg" },
  { id:"smp-36", title:"Social Media Post 036", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873612/New%20folder/035_cevcd6.jpg" },
  { id:"smp-37", title:"Social Media Post 037", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873612/New%20folder/036_xony2u.jpg" },
  { id:"smp-38", title:"Social Media Post 038", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873613/New%20folder/037_e53twg.jpg" },
  { id:"smp-39", title:"Social Media Post 039", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873613/New%20folder/038_krompu.jpg" },
  { id:"smp-40", title:"Social Media Post 040", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873613/New%20folder/039_xa1r6z.jpg" },
  { id:"smp-41", title:"Social Media Post 041", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873614/New%20folder/040_v96t9g.jpg" },
  { id:"smp-42", title:"Social Media Post 042", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873614/New%20folder/041_oc7scl.jpg" },
  { id:"smp-43", title:"Social Media Post 043", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873615/New%20folder/042_flwntd.jpg" },
  { id:"smp-44", title:"Social Media Post 044", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873614/New%20folder/043_htfarx.jpg" },
  { id:"smp-45", title:"Social Media Post 045", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873615/New%20folder/044_yjlp42.jpg" },
  { id:"smp-46", title:"Social Media Post 046", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873615/New%20folder/045_famkru.jpg" },
  { id:"smp-47", title:"Social Media Post 047", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873617/New%20folder/046_ut580j.jpg" },
  { id:"smp-48", title:"Social Media Post 048", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873616/New%20folder/047_ugvodc.jpg" },
  { id:"smp-49", title:"Social Media Post 049", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873616/New%20folder/048_nkzx2k.jpg" },
  { id:"smp-50", title:"Social Media Post 050", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873617/New%20folder/049_njonby.jpg" },
  { id:"smp-51", title:"Social Media Post 051", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873617/New%20folder/050_lq3fk0.jpg" },
  { id:"smp-52", title:"Social Media Post 052", category:"Social Media Post", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778873618/New%20folder/051_s6bya6.jpg" },
];

const carouselItems = [
  { id:"fc-1", title:"Facebook Carousel Ads 1", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview3_e9qj96.jpg" },
  { id:"fc-2", title:"Facebook Carousel Ads 2", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_10_c7eboa.jpg" },
  { id:"fc-3", title:"Facebook Carousel Ads 3", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_11_ymrkzd.jpg" },
  { id:"fc-4", title:"Facebook Carousel Ads 4", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_12_lbpktu.jpg" },
  { id:"fc-5", title:"Facebook Carousel Ads 5", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_13_szerbl.jpg" },
  { id:"fc-6", title:"Facebook Carousel Ads 6", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_14_n20msz.jpg" },
  { id:"fc-7", title:"Facebook Carousel Ads 7", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_3_xdlsrc.jpg" },
  { id:"fc-8", title:"Facebook Carousel Ads 8", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_4_nj7tyn.jpg" },
  { id:"fc-9", title:"Facebook Carousel Ads 9", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_5_i22ryn.jpg" },
  { id:"fc-10", title:"Facebook Carousel Ads 10", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_6_li1liq.jpg" },
  { id:"fc-11", title:"Facebook Carousel Ads 11", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_8_emidth.jpg" },
  { id:"fc-12", title:"Facebook Carousel Ads 12", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/preview-copy_fzpzy2.jpg" },
  { id:"fc-13", title:"Facebook Carousel Ads 13", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/preview.1_oisl3v.jpg" },
  { id:"fc-14", title:"Facebook Carousel Ads 14", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/preview_2_co2x9r.jpg" },
  { id:"fc-15", title:"Facebook Carousel Ads 15", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/preview_7_drklpl.jpg" },
  { id:"fc-16", title:"Facebook Carousel Ads 16", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/preview_9_bxfiil.jpg" },
  { id:"fc-17", title:"Facebook Carousel Ads 17", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/preview_pwl8df.jpg" },
];

const portfolioItems = [
  ...socialMediaItems,
  ...carouselItems,
  ...makePlaceholders("Print Item", 20, "prt"),
  ...makePlaceholders("Branding", 20, "brd"),
  ...makePlaceholders("AI Food Photography", 20, "afp"),
  ...makePlaceholders("Edited Image (Before/After)", 20, "eba"),
];

// Helper to build a Google Photos direct URL from photo ID
const gp = (id: string) => `https://lh3.googleusercontent.com/pw/${id}=w800-no`;

const brandItems: Record<string, { id: string; title: string; brand: string; img: string }[]> = {
  // 1. Monno Ceramic — 18 photos from album NXFvkAt9J5tb3gxDA
    monno: [
    { id:"mc-1", title:"Monno Ceramic 1", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Berry_Bowls_dtuyqa.jpg" },
    { id:"mc-2", title:"Monno Ceramic 2", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Bespoke.1_pcdtti.jpg" },
    { id:"mc-3", title:"Monno Ceramic 3", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Bijoy-2024.01_vf06xq.jpg" },
    { id:"mc-4", title:"Monno Ceramic 4", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Bijoy-2024.2_boie2v.jpg" },
    { id:"mc-5", title:"Monno Ceramic 5", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Bijoy-2024_fyccoa.jpg" },
    { id:"mc-6", title:"Monno Ceramic 6", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Black-Friday_sr70ii.jpg" },
    { id:"mc-7", title:"Monno Ceramic 7", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Blush-bloom_cfwpyx.jpg" },
    { id:"mc-8", title:"Monno Ceramic 8", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Corporate-Mug-Post-02_uru7rb.jpg" },
    { id:"mc-9", title:"Monno Ceramic 9", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Delivery-Post-02.1_xn39cw.jpg" },
    { id:"mc-10", title:"Monno Ceramic 10", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Delivery-Post-02_orn7bo.jpg" },
    { id:"mc-11", title:"Monno Ceramic 11", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Delivery-Post_aushsh.jpg" },
    { id:"mc-12", title:"Monno Ceramic 12", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Facebook_Cover_jalcik.jpg" },
    { id:"mc-13", title:"Monno Ceramic 13", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Location-Post6_levxi4.jpg" },
    { id:"mc-14", title:"Monno Ceramic 14", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Location-Post_ff53e5.jpg" },
    { id:"mc-15", title:"Monno Ceramic 15", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Louts_bvvbdq.jpg" },
    { id:"mc-16", title:"Monno Ceramic 16", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Onyx_gold_ac2tbz.jpg" },
    { id:"mc-17", title:"Monno Ceramic 17", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Preview_hphbg7.jpg" },
    { id:"mc-18", title:"Monno Ceramic 18", brand:"monno", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/bloom-blue-02_nnusxt.jpg" },
  ],

  // 2. Second Cup — 10 photos
    secondcup: [
    { id:"sc-1", title:"Second Cup 1", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03_iuxcmf.jpg" },
    { id:"sc-2", title:"Second Cup 2", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04_kn9qwf.jpg" },
    { id:"sc-3", title:"Second Cup 3", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/06_cg0kv7.jpg" },
    { id:"sc-4", title:"Second Cup 4", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/07_jcwsu3.jpg" },
    { id:"sc-5", title:"Second Cup 5", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/08_h3quml.jpg" },
    { id:"sc-6", title:"Second Cup 6", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/09_crmemw.jpg" },
    { id:"sc-7", title:"Second Cup 7", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10.1_tkoacc.jpg" },
    { id:"sc-8", title:"Second Cup 8", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/11.1_sckcce.jpg" },
    { id:"sc-9", title:"Second Cup 9", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/5_an2iaf.jpg" },
  ],

  // 3. ACI Neem — 22 photos
    acineem: [
    { id:"an-1", title:"Aci Neem 1", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/01.4_c6rzqv.jpg" },
    { id:"an-2", title:"Aci Neem 2", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/02_ujeuth.jpg" },
    { id:"an-3", title:"Aci Neem 3", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/03.9_ne29s7.jpg" },
    { id:"an-4", title:"Aci Neem 4", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/04.1_xigse0.jpg" },
    { id:"an-5", title:"Aci Neem 5", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/05.5_vqearh.jpg" },
    { id:"an-6", title:"Aci Neem 6", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/06_xhv7te.jpg" },
    { id:"an-7", title:"Aci Neem 7", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/07_lv0hxl.jpg" },
    { id:"an-8", title:"Aci Neem 8", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/08.1.1_q7lm1u.jpg" },
    { id:"an-9", title:"Aci Neem 9", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/09_xrds8d.jpg" },
    { id:"an-10", title:"Aci Neem 10", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/10.2_wj9zke.jpg" },
    { id:"an-11", title:"Aci Neem 11", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/11.1_mlx0mz.jpg" },
    { id:"an-12", title:"Aci Neem 12", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/12.2_uc1ypv.jpg" },
    { id:"an-13", title:"Aci Neem 13", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/13.1.3_vht2dc.jpg" },
    { id:"an-14", title:"Aci Neem 14", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/14.2_ydi1db.jpg" },
    { id:"an-15", title:"Aci Neem 15", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/15.1_gwkckp.jpg" },
    { id:"an-16", title:"Aci Neem 16", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/16.1.2_z0iefy.jpg" },
    { id:"an-17", title:"Aci Neem 17", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/17_tfsz9q.jpg" },
    { id:"an-18", title:"Aci Neem 18", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/18.1_ojxrri.jpg" },
    { id:"an-19", title:"Aci Neem 19", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/19_nuvk1e.jpg" },
    { id:"an-20", title:"Aci Neem 20", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/20_vqlu4j.jpg" },
    { id:"an-21", title:"Aci Neem 21", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/21.1_ouur1y.jpg" },
    { id:"an-22", title:"Aci Neem 22", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/22.1_urtkke.jpg" },
    { id:"an-23", title:"Aci Neem 23", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/23_lgzawb.jpg" },
    { id:"an-24", title:"Aci Neem 24", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/24.1_ngj2rn.jpg" },
    { id:"an-25", title:"Aci Neem 25", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/25.8_brjnyw.jpg" },
    { id:"an-26", title:"Aci Neem 26", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/26_q3k6wy.jpg" },
    { id:"an-27", title:"Aci Neem 27", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/27.3_adytzb.jpg" },
    { id:"an-28", title:"Aci Neem 28", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/29.1.3_eppmlq.jpg" },
    { id:"an-29", title:"Aci Neem 29", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/30.2_frfotk.jpg" },
    { id:"an-30", title:"Aci Neem 30", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/31.4_mfyr0y.jpg" },
    { id:"an-31", title:"Aci Neem 31", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/32_vwvid6.jpg" },
    { id:"an-32", title:"Aci Neem 32", brand:"acineem", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778908181/33.3_zgm9jp.jpg" },
  ],

  // 4. Indulge — 24 photos
    indulge: [
    { id:"ind-1", title:"Indulge 1", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/01.1_zjngaj.jpg" },
    { id:"ind-2", title:"Indulge 2", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/01_xbgehp.jpg" },
    { id:"ind-3", title:"Indulge 3", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/02.7_xotony.jpg" },
    { id:"ind-4", title:"Indulge 4", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03.1_g8rdpx.jpg" },
    { id:"ind-5", title:"Indulge 5", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04.1_yrvtyb.jpg" },
    { id:"ind-6", title:"Indulge 6", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/05.1_ejupsl.jpg" },
    { id:"ind-7", title:"Indulge 7", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/06_tj5l8h.jpg" },
    { id:"ind-8", title:"Indulge 8", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/07_be4uj8.jpg" },
    { id:"ind-9", title:"Indulge 9", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/08.1_xjmnx6.jpg" },
    { id:"ind-10", title:"Indulge 10", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/08.6_ukh5gw.jpg" },
    { id:"ind-11", title:"Indulge 11", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/09_xu8zkt.jpg" },
    { id:"ind-12", title:"Indulge 12", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/1.1._aailtv.jpg" },
    { id:"ind-13", title:"Indulge 13", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/11.3_vmzmhv.jpg" },
    { id:"ind-14", title:"Indulge 14", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_thxabc.jpg" },
    { id:"ind-15", title:"Indulge 15", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/13_y42vvg.jpg" },
    { id:"ind-16", title:"Indulge 16", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/14.2_lctesc.jpg" },
    { id:"ind-17", title:"Indulge 17", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/15_gnnoe7.jpg" },
    { id:"ind-18", title:"Indulge 18", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/16_br3p6a.jpg" },
    { id:"ind-19", title:"Indulge 19", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/17_mbspjw.jpg" },
    { id:"ind-20", title:"Indulge 20", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/18.1_yjk1uv.jpg" },
    { id:"ind-21", title:"Indulge 21", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/19_ly7fuf.jpg" },
    { id:"ind-22", title:"Indulge 22", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/20_cjkqbp.jpg" },
    { id:"ind-23", title:"Indulge 23", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/21_pkvjhg.jpg" },
    { id:"ind-24", title:"Indulge 24", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/22.1_gv5tlz.jpg" },
    { id:"ind-25", title:"Indulge 25", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/22.2_yka5z3.jpg" },
    { id:"ind-26", title:"Indulge 26", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/22_zomn5l.jpg" },
    { id:"ind-27", title:"Indulge 27", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/23.jpg.1_mtcb8i.jpg" },
    { id:"ind-28", title:"Indulge 28", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/24.2_m9coh8.jpg" },
    { id:"ind-29", title:"Indulge 29", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/25_f9stw5.jpg" },
    { id:"ind-30", title:"Indulge 30", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/27_nqkz3o.jpg" },
    { id:"ind-31", title:"Indulge 31", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/28_jdcp9f.jpg" },
    { id:"ind-32", title:"Indulge 32", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/29.1_l4iytt.jpg" },
    { id:"ind-33", title:"Indulge 33", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/30.1_nvzbre.jpg" },
    { id:"ind-34", title:"Indulge 34", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/31.4_fdx1oa.jpg" },
    { id:"ind-35", title:"Indulge 35", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/33.1_nxzgpg.jpg" },
    { id:"ind-36", title:"Indulge 36", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/34_kljfbq.jpg" },
    { id:"ind-37", title:"Indulge 37", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/35_hewcjd.jpg" },
  ],

  // 5. Eastern Agro — 24 photos
    easternagro: [
    { id:"ea-1", title:"Eastern Agro 1", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/01.1_b9bxgb.jpg" },
    { id:"ea-2", title:"Eastern Agro 2", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/02_z3mzpx.jpg" },
    { id:"ea-3", title:"Eastern Agro 3", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03_qsfrrz.jpg" },
    { id:"ea-4", title:"Eastern Agro 4", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/06_kuhhis.jpg" },
    { id:"ea-5", title:"Eastern Agro 5", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/07_t9cyab.jpg" },
    { id:"ea-6", title:"Eastern Agro 6", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/08.1.3_we6s8o.jpg" },
    { id:"ea-7", title:"Eastern Agro 7", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/09.1_dhiaeb.jpg" },
    { id:"ea-8", title:"Eastern Agro 8", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/09_tp5391.jpg" },
    { id:"ea-9", title:"Eastern Agro 9", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10_mscb4z.jpg" },
    { id:"ea-10", title:"Eastern Agro 10", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/11_svtacb.jpg" },
    { id:"ea-11", title:"Eastern Agro 11", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_kmenhg.jpg" },
    { id:"ea-12", title:"Eastern Agro 12", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/13.3_h6z4ax.jpg" },
    { id:"ea-13", title:"Eastern Agro 13", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/14.2_sheqit.jpg" },
    { id:"ea-14", title:"Eastern Agro 14", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/15.1_wvnqw3.jpg" },
    { id:"ea-15", title:"Eastern Agro 15", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/16.1_m4wsvq.jpg" },
    { id:"ea-16", title:"Eastern Agro 16", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/17_ajwgjj.jpg" },
    { id:"ea-17", title:"Eastern Agro 17", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/18_tknzad.jpg" },
    { id:"ea-18", title:"Eastern Agro 18", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/19.3_ykgdhr.jpg" },
    { id:"ea-19", title:"Eastern Agro 19", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/20_wnuqyt.jpg" },
    { id:"ea-20", title:"Eastern Agro 20", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/21_hgwik9.jpg" },
    { id:"ea-21", title:"Eastern Agro 21", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/22_ctgx3z.jpg" },
    { id:"ea-22", title:"Eastern Agro 22", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/23_u28umt.jpg" },
    { id:"ea-23", title:"Eastern Agro 23", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/24_googdf.jpg" },
    { id:"ea-24", title:"Eastern Agro 24", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/25_sjuctb.jpg" },
    { id:"ea-25", title:"Eastern Agro 25", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/26_rmwkrn.jpg" },
    { id:"ea-26", title:"Eastern Agro 26", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/27.2.1_bcr3uh.jpg" },
    { id:"ea-27", title:"Eastern Agro 27", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/28.2.1_e6tmq9.jpg" },
    { id:"ea-28", title:"Eastern Agro 28", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/29.1_bsbjwe.jpg" },
    { id:"ea-29", title:"Eastern Agro 29", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/29_t2j0pp.jpg" },
    { id:"ea-30", title:"Eastern Agro 30", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/30.1_ax7dmb.jpg" },
    { id:"ea-31", title:"Eastern Agro 31", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/30_mdqoia.jpg" },
    { id:"ea-32", title:"Eastern Agro 32", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/31_vdaj6y.jpg" },
    { id:"ea-33", title:"Eastern Agro 33", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/4.1_civmnc.jpg" },
    { id:"ea-34", title:"Eastern Agro 34", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/5_sm3vwj.jpg" },
  ],

  // 6. Wellness Cafe — 17 photos
  wellness: [
    { id:"wc-1",  title:"Wellness Cafe 1",  brand:"wellness", img: "https://picsum.photos/seed/brand59/800/800" },
    { id:"wc-2",  title:"Wellness Cafe 2",  brand:"wellness", img: "https://picsum.photos/seed/brand60/800/800" },
    { id:"wc-3",  title:"Wellness Cafe 3",  brand:"wellness", img: "https://picsum.photos/seed/brand61/800/800" },
    { id:"wc-4",  title:"Wellness Cafe 4",  brand:"wellness", img: "https://picsum.photos/seed/brand62/800/800" },
    { id:"wc-5",  title:"Wellness Cafe 5",  brand:"wellness", img: "https://picsum.photos/seed/brand63/800/800" },
    { id:"wc-6",  title:"Wellness Cafe 6",  brand:"wellness", img: "https://picsum.photos/seed/brand64/800/800" },
    { id:"wc-7",  title:"Wellness Cafe 7",  brand:"wellness", img: "https://picsum.photos/seed/brand65/800/800" },
    { id:"wc-8",  title:"Wellness Cafe 8",  brand:"wellness", img: "https://picsum.photos/seed/brand66/800/800" },
    { id:"wc-9",  title:"Wellness Cafe 9",  brand:"wellness", img: "https://picsum.photos/seed/brand67/800/800" },
    { id:"wc-10", title:"Wellness Cafe 10", brand:"wellness", img: "https://picsum.photos/seed/brand68/800/800" },
    { id:"wc-11", title:"Wellness Cafe 11", brand:"wellness", img: "https://picsum.photos/seed/brand69/800/800" },
    { id:"wc-12", title:"Wellness Cafe 12", brand:"wellness", img: "https://picsum.photos/seed/brand70/800/800" },
    { id:"wc-13", title:"Wellness Cafe 13", brand:"wellness", img: "https://picsum.photos/seed/brand71/800/800" },
    { id:"wc-14", title:"Wellness Cafe 14", brand:"wellness", img: "https://picsum.photos/seed/brand72/800/800" },
    { id:"wc-15", title:"Wellness Cafe 15", brand:"wellness", img: "https://picsum.photos/seed/brand73/800/800" },
    { id:"wc-16", title:"Wellness Cafe 16", brand:"wellness", img: "https://picsum.photos/seed/brand74/800/800" },
    { id:"wc-17", title:"Wellness Cafe 17", brand:"wellness", img: "https://picsum.photos/seed/brand75/800/800" },
  ],

  // 7. Coffeelime & Bubbletime — placeholder (no album link)
  coffeelime: makeBrandPlaceholders("coffeelime", "Coffeelime & Bubbletime", 10),

  // 8. So Juicy — placeholder (no album link)
  soojuicy: makeBrandPlaceholders("soojuicy", "So Juicy", 10),

  // 9. Route 66 — 24 photos
    route66: [
    { id:"r66-1", title:"Route 66 1", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/01_2_bi02c9.jpg" },
    { id:"r66-2", title:"Route 66 2", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/01_l9uljt.jpg" },
    { id:"r66-3", title:"Route 66 3", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/02_2_mnqmzb.jpg" },
    { id:"r66-4", title:"Route 66 4", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/02_3_tmvdfe.jpg" },
    { id:"r66-5", title:"Route 66 5", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/02_wetvqy.jpg" },
    { id:"r66-6", title:"Route 66 6", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03_2_va4arx.jpg" },
    { id:"r66-7", title:"Route 66 7", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03_3_jlofkn.jpg" },
    { id:"r66-8", title:"Route 66 8", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03_wdqvrm.jpg" },
    { id:"r66-9", title:"Route 66 9", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04_xaum9b.jpg" },
    { id:"r66-10", title:"Route 66 10", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/05_dsfzj1.jpg" },
    { id:"r66-11", title:"Route 66 11", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/08_sf0cuh.jpg" },
    { id:"r66-12", title:"Route 66 12", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10_f6qa37.jpg" },
    { id:"r66-13", title:"Route 66 13", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_p37njz.jpg" },
    { id:"r66-14", title:"Route 66 14", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/13_piy79u.jpg" },
    { id:"r66-15", title:"Route 66 15", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/14_ext7bi.jpg" },
    { id:"r66-16", title:"Route 66 16", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/15_j9m7ff.jpg" },
    { id:"r66-17", title:"Route 66 17", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/16_ljsdum.jpg" },
    { id:"r66-18", title:"Route 66 18", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/19_w1toiw.jpg" },
    { id:"r66-19", title:"Route 66 19", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/20.1_damnnt.jpg" },
    { id:"r66-20", title:"Route 66 20", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/21_tcvge5.jpg" },
    { id:"r66-21", title:"Route 66 21", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/22_ccynhk.jpg" },
    { id:"r66-22", title:"Route 66 22", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/23_yn0dq0.jpg" },
    { id:"r66-23", title:"Route 66 23", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/24_xhuhdg.jpg" },
    { id:"r66-24", title:"Route 66 24", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/25_wecgy0.jpg" },
    { id:"r66-25", title:"Route 66 25", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/26_f1vmld.jpg" },
    { id:"r66-26", title:"Route 66 26", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/27_m4uwwa.jpg" },
    { id:"r66-27", title:"Route 66 27", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/29_o1j7jk.jpg" },
    { id:"r66-28", title:"Route 66 28", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/30_zwipsy.jpg" },
    { id:"r66-29", title:"Route 66 29", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/31_a28nfn.jpg" },
    { id:"r66-30", title:"Route 66 30", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/33_t5zq9y.jpg" },
    { id:"r66-31", title:"Route 66 31", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/34_l531u8.jpg" },
    { id:"r66-32", title:"Route 66 32", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/35_cr1me1.jpg" },
    { id:"r66-33", title:"Route 66 33", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/36_hrat8s.jpg" },
    { id:"r66-34", title:"Route 66 34", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/37_lkx3kf.jpg" },
    { id:"r66-35", title:"Route 66 35", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/39_nr88fc.jpg" },
    { id:"r66-36", title:"Route 66 36", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/40_cxxwsq.jpg" },
  ],

  // 10. Alfredough — 18 photos
    alfredough: [
    { id:"al-1", title:"alfredough 1", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04_aqgaqd.jpg" },
    { id:"al-2", title:"alfredough 2", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/07._o9uzaf.jpg" },
    { id:"al-3", title:"alfredough 3", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/07_yapdez.jpg" },
    { id:"al-4", title:"alfredough 4", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/08.1_mebv8m.jpg" },
    { id:"al-5", title:"alfredough 5", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/09_uvs89i.jpg" },
    { id:"al-6", title:"alfredough 6", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10.2_lhzeoi.jpg" },
    { id:"al-7", title:"alfredough 7", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/11.1_xuu8ou.jpg" },
    { id:"al-8", title:"alfredough 8", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_lvgabx.jpg" },
    { id:"al-9", title:"alfredough 9", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/13_e0ezhm.jpg" },
    { id:"al-10", title:"alfredough 10", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/14_kn99fn.jpg" },
    { id:"al-11", title:"alfredough 11", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/15.1_ulmtja.jpg" },
    { id:"al-12", title:"alfredough 12", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/18.1.1_axi4pm.jpg" },
    { id:"al-13", title:"alfredough 13", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/23_cco9jm.jpg" },
    { id:"al-14", title:"alfredough 14", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/25_qxr1ff.jpg" },
    { id:"al-15", title:"alfredough 15", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/5_faf3km.jpg" },
  ],

  // 11. Upstairs — 19 photos
    upstairs: [
    { id:"up-1", title:"Upstairs 1", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/01_lfud0x.jpg" },
    { id:"up-2", title:"Upstairs 2", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/02_ebds3z.jpg" },
    { id:"up-3", title:"Upstairs 3", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03_yxhwfy.jpg" },
    { id:"up-4", title:"Upstairs 4", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04.1_ithier.jpg" },
    { id:"up-5", title:"Upstairs 5", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04.2_oiad0b.jpg" },
    { id:"up-6", title:"Upstairs 6", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04_pflntv.jpg" },
    { id:"up-7", title:"Upstairs 7", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/05_npphab.jpg" },
    { id:"up-8", title:"Upstairs 8", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/06_kwbqlw.jpg" },
    { id:"up-9", title:"Upstairs 9", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/13_x2oaqo.jpg" },
    { id:"up-10", title:"Upstairs 10", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/14_kuy7m3.jpg" },
    { id:"up-11", title:"Upstairs 11", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/15_pwjjee.jpg" },
    { id:"up-12", title:"Upstairs 12", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/16_k5wyaa.jpg" },
    { id:"up-13", title:"Upstairs 13", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/17_zrgwsb.jpg" },
    { id:"up-14", title:"Upstairs 14", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/18_ijipb9.jpg" },
    { id:"up-15", title:"Upstairs 15", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/19_a8kmjf.jpg" },
    { id:"up-16", title:"Upstairs 16", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/20_pdln05.jpg" },
    { id:"up-17", title:"Upstairs 17", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/21_gwb35j.jpg" },
    { id:"up-18", title:"Upstairs 18", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/22_kg9npj.jpg" },
    { id:"up-19", title:"Upstairs 19", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/23_zbzukk.jpg" },
    { id:"up-20", title:"Upstairs 20", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/24_v5vvpj.jpg" },
  ],

  // 12. Punjab Kitchen — 15 photos
    punjab: [
    { id:"pk-1", title:"Punjab KItchen 1", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03.1_rbucyk.jpg" },
    { id:"pk-2", title:"Punjab KItchen 2", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/05.2_wdaiwz.jpg" },
    { id:"pk-3", title:"Punjab KItchen 3", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/07_c8q0hw.jpg" },
    { id:"pk-4", title:"Punjab KItchen 4", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10_j7jnry.jpg" },
    { id:"pk-5", title:"Punjab KItchen 5", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_iiiruw.jpg" },
    { id:"pk-6", title:"Punjab KItchen 6", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/13_y6y35d.jpg" },
    { id:"pk-7", title:"Punjab KItchen 7", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/15_lhaqsa.jpg" },
    { id:"pk-8", title:"Punjab KItchen 8", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/16_vej2oy.jpg" },
    { id:"pk-9", title:"Punjab KItchen 9", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/17.1_y0pf5p.jpg" },
    { id:"pk-10", title:"Punjab KItchen 10", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/19_e56ohh.jpg" },
    { id:"pk-11", title:"Punjab KItchen 11", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/21_uulico.jpg" },
    { id:"pk-12", title:"Punjab KItchen 12", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/25_htqbsf.jpg" },
    { id:"pk-13", title:"Punjab KItchen 13", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/27.2_uvcpds.jpg" },
    { id:"pk-14", title:"Punjab KItchen 14", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/29_ufokyf.jpg" },
    { id:"pk-15", title:"Punjab KItchen 15", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/33_md0dcx.jpg" },
    { id:"pk-16", title:"Punjab KItchen 16", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/36_r8kfcb.jpg" },
  ],

  // 13. Other — 25 photos
    other: [
    { id:"oth-1", title:"Other 1", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/01.1_2_dqhox3.jpg" },
    { id:"oth-2", title:"Other 2", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/01.1_ia4pqk.jpg" },
    { id:"oth-3", title:"Other 3", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/02_pfbizh.jpg" },
    { id:"oth-4", title:"Other 4", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03.1_zaenrx.jpg" },
    { id:"oth-5", title:"Other 5", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03_2_idglzt.jpg" },
    { id:"oth-6", title:"Other 6", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/03_uckj4g.jpg" },
    { id:"oth-7", title:"Other 7", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04_2_vck0ts.jpg" },
    { id:"oth-8", title:"Other 8", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04_3_ci5bee.jpg" },
    { id:"oth-9", title:"Other 9", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/04_pesruf.jpg" },
    { id:"oth-10", title:"Other 10", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/05.1_t440nc.jpg" },
    { id:"oth-11", title:"Other 11", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/06_2_in40vg.jpg" },
    { id:"oth-12", title:"Other 12", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/06_tvg1ht.jpg" },
    { id:"oth-13", title:"Other 13", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/07_axio5l.jpg" },
    { id:"oth-14", title:"Other 14", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/08_skhjok.jpg" },
    { id:"oth-15", title:"Other 15", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/09_ibndmj.jpg" },
    { id:"oth-16", title:"Other 16", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/1.1_2_rhin3k.jpg" },
    { id:"oth-17", title:"Other 17", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/1.1_jm8yqs.jpg" },
    { id:"oth-18", title:"Other 18", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10.1jpg_ocbjwa.jpg" },
    { id:"oth-19", title:"Other 19", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10.4_gceqxb.jpg" },
    { id:"oth-20", title:"Other 20", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10_2_xtgdko.jpg" },
    { id:"oth-21", title:"Other 21", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10_3_mc6wa2.jpg" },
    { id:"oth-22", title:"Other 22", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/10_tydelm.jpg" },
    { id:"oth-23", title:"Other 23", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/11_2_s98r6h.jpg" },
    { id:"oth-24", title:"Other 24", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/11_dy5aqy.jpg" },
    { id:"oth-25", title:"Other 25", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/123_znelrt.jpg" },
    { id:"oth-26", title:"Other 26", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/128_jof518.jpg" },
    { id:"oth-27", title:"Other 27", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_2_sw7lbf.jpg" },
    { id:"oth-28", title:"Other 28", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_3_kxhxue.jpg" },
    { id:"oth-29", title:"Other 29", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_4_d4pkrg.jpg" },
    { id:"oth-30", title:"Other 30", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/12_ll3lh9.jpg" },
    { id:"oth-31", title:"Other 31", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/13_2_qhgwo6.jpg" },
    { id:"oth-32", title:"Other 32", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/13_e0lbdh.jpg" },
    { id:"oth-33", title:"Other 33", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/14.3_nvaarg.jpg" },
    { id:"oth-34", title:"Other 34", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/14_y9bxab.jpg" },
    { id:"oth-35", title:"Other 35", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/15_gipmab.jpg" },
    { id:"oth-36", title:"Other 36", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/16_2_cuyxek.jpg" },
    { id:"oth-37", title:"Other 37", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/16_3_q3ffyd.jpg" },
    { id:"oth-38", title:"Other 38", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/16_dxwg06.jpg" },
    { id:"oth-39", title:"Other 39", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/17_2_dyabtq.jpg" },
    { id:"oth-40", title:"Other 40", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/17_3_kbenq9.jpg" },
    { id:"oth-41", title:"Other 41", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/17_v50bzo.jpg" },
    { id:"oth-42", title:"Other 42", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/18.3_obclhk.jpg" },
    { id:"oth-43", title:"Other 43", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/18_tv3lpe.jpg" },
    { id:"oth-44", title:"Other 44", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/19.1_hu2ulc.jpg" },
    { id:"oth-45", title:"Other 45", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/19_t3uood.jpg" },
    { id:"oth-46", title:"Other 46", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/1_2_fqo0dm.jpg" },
    { id:"oth-47", title:"Other 47", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/1_3_grdy6k.jpg" },
    { id:"oth-48", title:"Other 48", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/1_4_pp3dpm.jpg" },
    { id:"oth-49", title:"Other 49", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/1_w0xbng.jpg" },
    { id:"oth-50", title:"Other 50", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/2.2_n5efsj.jpg" },
    { id:"oth-51", title:"Other 51", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/20.1_uzsnsp.jpg" },
    { id:"oth-52", title:"Other 52", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/20_2_k7tydc.jpg" },
    { id:"oth-53", title:"Other 53", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/20_ddi3ck.jpg" },
    { id:"oth-54", title:"Other 54", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/21.1_hwsryb.jpg" },
    { id:"oth-55", title:"Other 55", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/22_wlniaz.jpg" },
    { id:"oth-56", title:"Other 56", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/23_nsvjnv.jpg" },
    { id:"oth-57", title:"Other 57", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/24.3_s0gmez.jpg" },
    { id:"oth-58", title:"Other 58", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/25_ly5sz0.jpg" },
    { id:"oth-59", title:"Other 59", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/27_kxuzlc.jpg" },
    { id:"oth-60", title:"Other 60", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/28_qulifl.jpg" },
    { id:"oth-61", title:"Other 61", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/29_um9ps7.jpg" },
    { id:"oth-62", title:"Other 62", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/2_2_lmmf4u.jpg" },
    { id:"oth-63", title:"Other 63", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/2_bvwbhx.jpg" },
    { id:"oth-64", title:"Other 64", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/31_ihwmeb.jpg" },
    { id:"oth-65", title:"Other 65", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/35_gkgva8.png" },
    { id:"oth-66", title:"Other 66", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/37_xrbgs3.jpg" },
    { id:"oth-67", title:"Other 67", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/39_pyalxc.png" },
    { id:"oth-68", title:"Other 68", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/3_2_rryooh.jpg" },
    { id:"oth-69", title:"Other 69", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/3_3_dq371g.jpg" },
    { id:"oth-70", title:"Other 70", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/3_4_zkvvh7.jpg" },
    { id:"oth-71", title:"Other 71", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/3_rx5q5r.jpg" },
    { id:"oth-72", title:"Other 72", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/4.2_pthzln.jpg" },
    { id:"oth-73", title:"Other 73", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/40_riuz80.jpg" },
    { id:"oth-74", title:"Other 74", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/44_kscazw.jpg" },
    { id:"oth-75", title:"Other 75", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/46_uamb1y.jpg" },
    { id:"oth-76", title:"Other 76", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/46_xpshmn.png" },
    { id:"oth-77", title:"Other 77", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/47_ndagv9.jpg" },
    { id:"oth-78", title:"Other 78", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/4_bzpgo5.jpg" },
    { id:"oth-79", title:"Other 79", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/5.1_tddeb5.jpg" },
    { id:"oth-80", title:"Other 80", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/5_2_nkphtx.jpg" },
    { id:"oth-81", title:"Other 81", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/5_3_unrxsy.jpg" },
    { id:"oth-82", title:"Other 82", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/5_zvnsxj.jpg" },
    { id:"oth-83", title:"Other 83", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/62_cyvcv9.jpg" },
    { id:"oth-84", title:"Other 84", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/63_a0mdfs.jpg" },
    { id:"oth-85", title:"Other 85", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/65_sfscyg.jpg" },
    { id:"oth-86", title:"Other 86", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/67_njo6kx.jpg" },
    { id:"oth-87", title:"Other 87", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/68_jhhk60.jpg" },
    { id:"oth-88", title:"Other 88", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/6_2_a3ywix.jpg" },
    { id:"oth-89", title:"Other 89", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/6_3_fgz7me.jpg" },
    { id:"oth-90", title:"Other 90", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/6_4_f6hitu.jpg" },
    { id:"oth-91", title:"Other 91", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/6_fktodi.jpg" },
    { id:"oth-92", title:"Other 92", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/71_laieqq.jpg" },
    { id:"oth-93", title:"Other 93", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/76_ztb3r6.jpg" },
    { id:"oth-94", title:"Other 94", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/77.1_rdkilo.jpg" },
    { id:"oth-95", title:"Other 95", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/77_c97eg4.jpg" },
    { id:"oth-96", title:"Other 96", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/7_2_lgsb0i.jpg" },
    { id:"oth-97", title:"Other 97", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/7_3_nysuut.jpg" },
    { id:"oth-98", title:"Other 98", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/7_4_sksj9w.jpg" },
    { id:"oth-99", title:"Other 99", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/7_q7oacf.jpg" },
    { id:"oth-100", title:"Other 100", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/8.4_aizyrk.jpg" },
    { id:"oth-101", title:"Other 101", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/84_noclsv.jpg" },
    { id:"oth-102", title:"Other 102", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/87_abmlen.jpg" },
    { id:"oth-103", title:"Other 103", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/89_eweh6u.jpg" },
    { id:"oth-104", title:"Other 104", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/8_2_ffrx3v.jpg" },
    { id:"oth-105", title:"Other 105", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/8_d7y0oi.jpg" },
    { id:"oth-106", title:"Other 106", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/9_2_rips9r.jpg" },
    { id:"oth-107", title:"Other 107", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/9_rfwpab.jpg" },
    { id:"oth-108", title:"Other 108", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Untitled-3_ycjqle.jpg" },
  ],
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
const ImageGrid = ({ items, brandName }: { items: { id: string; title: string; img: string; category?: string; brand?: string }[]; brandName?: string }) => {
  const [visible, setVisible] = useState(8);
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);
  const remaining = items.length - visible;

  const getLabel = (item: { brand?: string; category?: string }) => {
    if (brandName) return brandName;
    if (item.brand) {
      const parts = item.brand.replace(/_/g, ' ').split(' ');
      return parts.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }
    return item.category || '';
  };

  return (
    <>
      {lightbox && <Lightbox img={lightbox.img} title={lightbox.title} onClose={() => setLightbox(null)} />}

      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence>
          {items.slice(0, visible).map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: Math.min(index * 0.03, 0.3) }}
              onClick={() => setLightbox({ img: item.img, title: item.title })}
              className="group relative overflow-hidden rounded-xl border border-white/5 hover:border-white/15 cursor-pointer break-inside-avoid mb-4"
            >
              <img
                src={item.img}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block text-white text-xs font-medium px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
                  {getLabel(item)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible < items.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-8">
          <button
            onClick={() => setVisible((v) => v + 8)}
            className="group px-5 py-2 rounded-full border border-neon-blue/40 text-sm font-medium text-neon-blue hover:bg-neon-blue/10 transition-all flex items-center gap-2"
          >
            Show More Designs
            <span className="text-xs opacity-60 bg-neon-blue/10 px-2 py-0.5 rounded-full">{remaining} left</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
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
                {/* Brand buttons — minimal horizontal */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {BRANDS.map((brand) => {
                    const isOpen = activeBrand === brand.id;
                    return (
                      <button
                        key={brand.id}
                        onClick={() => setActiveBrand(isOpen ? "" : brand.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border"
                        style={
                          isOpen
                            ? { backgroundColor: brand.color + "20", borderColor: brand.color, color: brand.color, boxShadow: `0 0 10px ${brand.color}30` }
                            : { borderColor: "rgba(255,255,255,0.08)", color: "#6b7280" }
                        }
                      >
                        {brand.name}
                      </button>
                    );
                  })}
                </div>

                {/* Brand content */}
                <AnimatePresence mode="wait">
                  {activeBrand && (
                    <motion.div
                      key={activeBrand}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {(() => {
                        const brand = BRANDS.find(b => b.id === activeBrand);
                        const items = brandItems[activeBrand] || [];
                        return (
                          <ImageGrid key={activeBrand} items={items} brandName={brand?.name} />
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

      {/* ── Clients Section ── */}
      <section id="clients" className="py-16 px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Brands I've had the privilege to work with.">
            Clients
          </SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Monno Ceramic",  id: "monno",       logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Monno_ljareq.jpg" },
              { name: "Second Cup",     id: "secondcup",   logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Secondcup_uhjdl5.jpg" },
              { name: "ACI Neem",       id: "acineem",     logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Aci-Neem_dauklr.jpg" },
              { name: "Indulge",        id: "indulge",     logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Indulge_cvxbip.jpg" },
              { name: "Eastern Agro",   id: "easternagro", logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Eastern-Agro_yevvyd.jpg" },
              { name: "Wellness Cafe",  id: "wellness",    logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Wellness_br8rce.jpg" },
              { name: "Coffeelime",     id: "coffeelime",  logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Coffeelime_uvxfle.jpg" },
              { name: "So Juicy",       id: "soojuicy",    logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/So-Juicy_deloir.jpg" },
              { name: "Route 66",       id: "route66",     logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Route-66_oklhbq.jpg" },
              { name: "Alfredough",     id: "alfredough",  logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Alfredough_faequn.jpg" },
              { name: "Upstairs",       id: "upstairs",    logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Upsatirs_ejprn9.jpg" },
              { name: "Punjab Kitchen", id: "punjab",      logo: "https://res.cloudinary.com/dpbclovni/image/upload/v1778909968/Punjab-Kitchen_deaiq1.jpg" },
            ].map((client, i) => (
              <motion.a
                key={client.name}
                href="#work"
                onClick={() => {
                  setWorkTab("brand");
                  setActiveBrand(client.id);
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-primary/50 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="w-full h-16 flex items-center justify-center mb-2 overflow-hidden rounded-xl bg-white/5 p-2">
                  <img
                    src={client.logo}
                    alt={client.name}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-xs font-medium text-center text-subtext group-hover:text-white transition-colors leading-tight">
                  {client.name}
                </span>
              </motion.a>
            ))}
          </div>
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
