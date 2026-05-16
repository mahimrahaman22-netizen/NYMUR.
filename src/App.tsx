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
  { id:"ca-1", title:"Facebook Carousel Ad 1", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview3_e9qj96.jpg" },
  { id:"ca-2", title:"Facebook Carousel Ad 2", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_10_c7eboa.jpg" },
  { id:"ca-3", title:"Facebook Carousel Ad 3", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_11_ymrkzd.jpg" },
  { id:"ca-4", title:"Facebook Carousel Ad 4", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_12_lbpktu.jpg" },
  { id:"ca-5", title:"Facebook Carousel Ad 5", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_13_szerbl.jpg" },
  { id:"ca-6", title:"Facebook Carousel Ad 6", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_14_n20msz.jpg" },
  { id:"ca-7", title:"Facebook Carousel Ad 7", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_3_xdlsrc.jpg" },
  { id:"ca-8", title:"Facebook Carousel Ad 8", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_4_nj7tyn.jpg" },
  { id:"ca-9", title:"Facebook Carousel Ad 9", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_5_i22ryn.jpg" },
  { id:"ca-10", title:"Facebook Carousel Ad 10", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_6_li1liq.jpg" },
  { id:"ca-11", title:"Facebook Carousel Ad 11", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/Preview_8_emidth.jpg" },
  { id:"ca-12", title:"Facebook Carousel Ad 12", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/preview-copy_fzpzy2.jpg" },
  { id:"ca-13", title:"Facebook Carousel Ad 13", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/preview.1_oisl3v.jpg" },
  { id:"ca-14", title:"Facebook Carousel Ad 14", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/preview_2_co2x9r.jpg" },
  { id:"ca-15", title:"Facebook Carousel Ad 15", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/preview_7_drklpl.jpg" },
  { id:"ca-16", title:"Facebook Carousel Ad 16", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/preview_9_bxfiil.jpg" },
  { id:"ca-17", title:"Facebook Carousel Ad 17", category:"Facebook Carousel Ads", img: "https://res.cloudinary.com/dpbclovni/image/upload/Facebook_Carousel_Ads/preview_pwl8df.jpg" },
];

const brandItems: Record<string, { id: string; title: string; brand: string; img: string }[]> = {


  secondcup: [
    { id:"sc-1", title:"Second Cup 1", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/03_iuxcmf.jpg" },
    { id:"sc-2", title:"Second Cup 2", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/04_kn9qwf.jpg" },
    { id:"sc-3", title:"Second Cup 3", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/06_cg0kv7.jpg" },
    { id:"sc-4", title:"Second Cup 4", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/07_jcwsu3.jpg" },
    { id:"sc-5", title:"Second Cup 5", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/08_h3quml.jpg" },
    { id:"sc-6", title:"Second Cup 6", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/09_crmemw.jpg" },
    { id:"sc-7", title:"Second Cup 7", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/10.1_tkoacc.jpg" },
    { id:"sc-8", title:"Second Cup 8", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/11.1_sckcce.jpg" },
    { id:"sc-9", title:"Second Cup 9", brand:"secondcup", img: "https://res.cloudinary.com/dpbclovni/image/upload/Second_Cup/5_an2iaf.jpg" },
  ],



  indulge: [
    { id:"in-1", title:"Indulge 1", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/01.1_zjngaj.jpg" },
    { id:"in-2", title:"Indulge 2", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/01_xbgehp.jpg" },
    { id:"in-3", title:"Indulge 3", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/02.7_xotony.jpg" },
    { id:"in-4", title:"Indulge 4", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/03.1_g8rdpx.jpg" },
    { id:"in-5", title:"Indulge 5", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/04.1_yrvtyb.jpg" },
    { id:"in-6", title:"Indulge 6", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/05.1_ejupsl.jpg" },
    { id:"in-7", title:"Indulge 7", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/06_tj5l8h.jpg" },
    { id:"in-8", title:"Indulge 8", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/07_be4uj8.jpg" },
    { id:"in-9", title:"Indulge 9", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/08.1_xjmnx6.jpg" },
    { id:"in-10", title:"Indulge 10", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/08.6_ukh5gw.jpg" },
    { id:"in-11", title:"Indulge 11", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/09_xu8zkt.jpg" },
    { id:"in-12", title:"Indulge 12", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/1.1._aailtv.jpg" },
    { id:"in-13", title:"Indulge 13", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/11.3_vmzmhv.jpg" },
    { id:"in-14", title:"Indulge 14", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/12_thxabc.jpg" },
    { id:"in-15", title:"Indulge 15", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/13_y42vvg.jpg" },
    { id:"in-16", title:"Indulge 16", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/14.2_lctesc.jpg" },
    { id:"in-17", title:"Indulge 17", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/15_gnnoe7.jpg" },
    { id:"in-18", title:"Indulge 18", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/16_br3p6a.jpg" },
    { id:"in-19", title:"Indulge 19", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/17_mbspjw.jpg" },
    { id:"in-20", title:"Indulge 20", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/18.1_yjk1uv.jpg" },
    { id:"in-21", title:"Indulge 21", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/19_ly7fuf.jpg" },
    { id:"in-22", title:"Indulge 22", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/20_cjkqbp.jpg" },
    { id:"in-23", title:"Indulge 23", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/21_pkvjhg.jpg" },
    { id:"in-24", title:"Indulge 24", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/22.1_gv5tlz.jpg" },
    { id:"in-25", title:"Indulge 25", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/22.2_yka5z3.jpg" },
    { id:"in-26", title:"Indulge 26", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/22_zomn5l.jpg" },
    { id:"in-27", title:"Indulge 27", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/23.jpg.1_mtcb8i.jpg" },
    { id:"in-28", title:"Indulge 28", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/24.2_m9coh8.jpg" },
    { id:"in-29", title:"Indulge 29", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/25_f9stw5.jpg" },
    { id:"in-30", title:"Indulge 30", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/27_nqkz3o.jpg" },
    { id:"in-31", title:"Indulge 31", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/28_jdcp9f.jpg" },
    { id:"in-32", title:"Indulge 32", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/29.1_l4iytt.jpg" },
    { id:"in-33", title:"Indulge 33", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/30.1_nvzbre.jpg" },
    { id:"in-34", title:"Indulge 34", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/31.4_fdx1oa.jpg" },
    { id:"in-35", title:"Indulge 35", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/33.1_nxzgpg.jpg" },
    { id:"in-36", title:"Indulge 36", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/34_kljfbq.jpg" },
    { id:"in-37", title:"Indulge 37", brand:"indulge", img: "https://res.cloudinary.com/dpbclovni/image/upload/Indulge/35_hewcjd.jpg" },
  ],

  easternagro: [
    { id:"ea-1", title:"Eastern Agro 1", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/01.1_b9bxgb.jpg" },
    { id:"ea-2", title:"Eastern Agro 2", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/02_z3mzpx.jpg" },
    { id:"ea-3", title:"Eastern Agro 3", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/03_qsfrrz.jpg" },
    { id:"ea-4", title:"Eastern Agro 4", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/06_kuhhis.jpg" },
    { id:"ea-5", title:"Eastern Agro 5", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/07_t9cyab.jpg" },
    { id:"ea-6", title:"Eastern Agro 6", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/08.1.3_we6s8o.jpg" },
    { id:"ea-7", title:"Eastern Agro 7", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/09.1_dhiaeb.jpg" },
    { id:"ea-8", title:"Eastern Agro 8", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/09_tp5391.jpg" },
    { id:"ea-9", title:"Eastern Agro 9", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/10_mscb4z.jpg" },
    { id:"ea-10", title:"Eastern Agro 10", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/11_svtacb.jpg" },
    { id:"ea-11", title:"Eastern Agro 11", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/12_kmenhg.jpg" },
    { id:"ea-12", title:"Eastern Agro 12", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/13.3_h6z4ax.jpg" },
    { id:"ea-13", title:"Eastern Agro 13", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/14.2_sheqit.jpg" },
    { id:"ea-14", title:"Eastern Agro 14", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/15.1_wvnqw3.jpg" },
    { id:"ea-15", title:"Eastern Agro 15", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/16.1_m4wsvq.jpg" },
    { id:"ea-16", title:"Eastern Agro 16", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/17_ajwgjj.jpg" },
    { id:"ea-17", title:"Eastern Agro 17", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/18_tknzad.jpg" },
    { id:"ea-18", title:"Eastern Agro 18", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/19.3_ykgdhr.jpg" },
    { id:"ea-19", title:"Eastern Agro 19", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/20_wnuqyt.jpg" },
    { id:"ea-20", title:"Eastern Agro 20", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/21_hgwik9.jpg" },
    { id:"ea-21", title:"Eastern Agro 21", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/22_ctgx3z.jpg" },
    { id:"ea-22", title:"Eastern Agro 22", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/23_u28umt.jpg" },
    { id:"ea-23", title:"Eastern Agro 23", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/24_googdf.jpg" },
    { id:"ea-24", title:"Eastern Agro 24", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/25_sjuctb.jpg" },
    { id:"ea-25", title:"Eastern Agro 25", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/26_rmwkrn.jpg" },
    { id:"ea-26", title:"Eastern Agro 26", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/27.2.1_bcr3uh.jpg" },
    { id:"ea-27", title:"Eastern Agro 27", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/28.2.1_e6tmq9.jpg" },
    { id:"ea-28", title:"Eastern Agro 28", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/29.1_bsbjwe.jpg" },
    { id:"ea-29", title:"Eastern Agro 29", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/29_t2j0pp.jpg" },
    { id:"ea-30", title:"Eastern Agro 30", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/30.1_ax7dmb.jpg" },
    { id:"ea-31", title:"Eastern Agro 31", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/30_mdqoia.jpg" },
    { id:"ea-32", title:"Eastern Agro 32", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/31_vdaj6y.jpg" },
    { id:"ea-33", title:"Eastern Agro 33", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/4.1_civmnc.jpg" },
    { id:"ea-34", title:"Eastern Agro 34", brand:"easternagro", img: "https://res.cloudinary.com/dpbclovni/image/upload/Eastern_Agro/5_sm3vwj.jpg" },
  ],

  wellness: makeBrandPlaceholders("wellness", "Wellness Cafe", 10),
  coffeelime: makeBrandPlaceholders("coffeelime", "Coffeelime & Bubbletime", 10),
  soojuicy: makeBrandPlaceholders("soojuicy", "So Juicy", 10),

  route66: [
    { id:"r6-1", title:"Route 66 1", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/01_2_bi02c9.jpg" },
    { id:"r6-2", title:"Route 66 2", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/01_l9uljt.jpg" },
    { id:"r6-3", title:"Route 66 3", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/02_2_mnqmzb.jpg" },
    { id:"r6-4", title:"Route 66 4", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/02_3_tmvdfe.jpg" },
    { id:"r6-5", title:"Route 66 5", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/02_wetvqy.jpg" },
    { id:"r6-6", title:"Route 66 6", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/03_2_va4arx.jpg" },
    { id:"r6-7", title:"Route 66 7", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/03_3_jlofkn.jpg" },
    { id:"r6-8", title:"Route 66 8", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/03_wdqvrm.jpg" },
    { id:"r6-9", title:"Route 66 9", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/04_xaum9b.jpg" },
    { id:"r6-10", title:"Route 66 10", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/05_dsfzj1.jpg" },
    { id:"r6-11", title:"Route 66 11", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/08_sf0cuh.jpg" },
    { id:"r6-12", title:"Route 66 12", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/10_f6qa37.jpg" },
    { id:"r6-13", title:"Route 66 13", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/12_p37njz.jpg" },
    { id:"r6-14", title:"Route 66 14", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/13_piy79u.jpg" },
    { id:"r6-15", title:"Route 66 15", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/14_ext7bi.jpg" },
    { id:"r6-16", title:"Route 66 16", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/15_j9m7ff.jpg" },
    { id:"r6-17", title:"Route 66 17", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/16_ljsdum.jpg" },
    { id:"r6-18", title:"Route 66 18", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/19_w1toiw.jpg" },
    { id:"r6-19", title:"Route 66 19", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/20.1_damnnt.jpg" },
    { id:"r6-20", title:"Route 66 20", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/21_tcvge5.jpg" },
    { id:"r6-21", title:"Route 66 21", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/22_ccynhk.jpg" },
    { id:"r6-22", title:"Route 66 22", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/23_yn0dq0.jpg" },
    { id:"r6-23", title:"Route 66 23", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/24_xhuhdg.jpg" },
    { id:"r6-24", title:"Route 66 24", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/25_wecgy0.jpg" },
    { id:"r6-25", title:"Route 66 25", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/26_f1vmld.jpg" },
    { id:"r6-26", title:"Route 66 26", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/27_m4uwwa.jpg" },
    { id:"r6-27", title:"Route 66 27", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/29_o1j7jk.jpg" },
    { id:"r6-28", title:"Route 66 28", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/30_zwipsy.jpg" },
    { id:"r6-29", title:"Route 66 29", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/31_a28nfn.jpg" },
    { id:"r6-30", title:"Route 66 30", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/33_t5zq9y.jpg" },
    { id:"r6-31", title:"Route 66 31", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/34_l531u8.jpg" },
    { id:"r6-32", title:"Route 66 32", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/35_cr1me1.jpg" },
    { id:"r6-33", title:"Route 66 33", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/36_hrat8s.jpg" },
    { id:"r6-34", title:"Route 66 34", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/37_lkx3kf.jpg" },
    { id:"r6-35", title:"Route 66 35", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/39_nr88fc.jpg" },
    { id:"r6-36", title:"Route 66 36", brand:"route66", img: "https://res.cloudinary.com/dpbclovni/image/upload/Route_66/40_cxxwsq.jpg" },
  ],

  alfredough: [
    { id:"af-1", title:"Alfredough 1", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/04_aqgaqd.jpg" },
    { id:"af-2", title:"Alfredough 2", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/07._o9uzaf.jpg" },
    { id:"af-3", title:"Alfredough 3", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/07_yapdez.jpg" },
    { id:"af-4", title:"Alfredough 4", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/08.1_mebv8m.jpg" },
    { id:"af-5", title:"Alfredough 5", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/09_uvs89i.jpg" },
    { id:"af-6", title:"Alfredough 6", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/10.2_lhzeoi.jpg" },
    { id:"af-7", title:"Alfredough 7", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/11.1_xuu8ou.jpg" },
    { id:"af-8", title:"Alfredough 8", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/12_lvgabx.jpg" },
    { id:"af-9", title:"Alfredough 9", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/13_e0ezhm.jpg" },
    { id:"af-10", title:"Alfredough 10", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/14_kn99fn.jpg" },
    { id:"af-11", title:"Alfredough 11", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/15.1_ulmtja.jpg" },
    { id:"af-12", title:"Alfredough 12", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/18.1.1_axi4pm.jpg" },
    { id:"af-13", title:"Alfredough 13", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/23_cco9jm.jpg" },
    { id:"af-14", title:"Alfredough 14", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/25_qxr1ff.jpg" },
    { id:"af-15", title:"Alfredough 15", brand:"alfredough", img: "https://res.cloudinary.com/dpbclovni/image/upload/alfredough/5_faf3km.jpg" },
  ],

  upstairs: [
    { id:"up-1", title:"Upstairs 1", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/01_lfud0x.jpg" },
    { id:"up-2", title:"Upstairs 2", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/02_ebds3z.jpg" },
    { id:"up-3", title:"Upstairs 3", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/03_yxhwfy.jpg" },
    { id:"up-4", title:"Upstairs 4", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/04.1_ithier.jpg" },
    { id:"up-5", title:"Upstairs 5", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/04.2_oiad0b.jpg" },
    { id:"up-6", title:"Upstairs 6", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/04_pflntv.jpg" },
    { id:"up-7", title:"Upstairs 7", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/05_npphab.jpg" },
    { id:"up-8", title:"Upstairs 8", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/06_kwbqlw.jpg" },
    { id:"up-9", title:"Upstairs 9", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/13_x2oaqo.jpg" },
    { id:"up-10", title:"Upstairs 10", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/14_kuy7m3.jpg" },
    { id:"up-11", title:"Upstairs 11", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/15_pwjjee.jpg" },
    { id:"up-12", title:"Upstairs 12", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/16_k5wyaa.jpg" },
    { id:"up-13", title:"Upstairs 13", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/17_zrgwsb.jpg" },
    { id:"up-14", title:"Upstairs 14", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/18_ijipb9.jpg" },
    { id:"up-15", title:"Upstairs 15", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/19_a8kmjf.jpg" },
    { id:"up-16", title:"Upstairs 16", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/20_pdln05.jpg" },
    { id:"up-17", title:"Upstairs 17", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/21_gwb35j.jpg" },
    { id:"up-18", title:"Upstairs 18", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/22_kg9npj.jpg" },
    { id:"up-19", title:"Upstairs 19", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/23_zbzukk.jpg" },
    { id:"up-20", title:"Upstairs 20", brand:"upstairs", img: "https://res.cloudinary.com/dpbclovni/image/upload/Upstairs/24_v5vvpj.jpg" },
  ],

  punjab: [
    { id:"pk-1", title:"Punjab Kitchen 1", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/03.1_rbucyk.jpg" },
    { id:"pk-2", title:"Punjab Kitchen 2", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/05.2_wdaiwz.jpg" },
    { id:"pk-3", title:"Punjab Kitchen 3", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/07_c8q0hw.jpg" },
    { id:"pk-4", title:"Punjab Kitchen 4", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/10_j7jnry.jpg" },
    { id:"pk-5", title:"Punjab Kitchen 5", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/12_iiiruw.jpg" },
    { id:"pk-6", title:"Punjab Kitchen 6", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/13_y6y35d.jpg" },
    { id:"pk-7", title:"Punjab Kitchen 7", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/15_lhaqsa.jpg" },
    { id:"pk-8", title:"Punjab Kitchen 8", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/16_vej2oy.jpg" },
    { id:"pk-9", title:"Punjab Kitchen 9", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/17.1_y0pf5p.jpg" },
    { id:"pk-10", title:"Punjab Kitchen 10", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/19_e56ohh.jpg" },
    { id:"pk-11", title:"Punjab Kitchen 11", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/21_uulico.jpg" },
    { id:"pk-12", title:"Punjab Kitchen 12", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/25_htqbsf.jpg" },
    { id:"pk-13", title:"Punjab Kitchen 13", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/27.2_uvcpds.jpg" },
    { id:"pk-14", title:"Punjab Kitchen 14", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/29_ufokyf.jpg" },
    { id:"pk-15", title:"Punjab Kitchen 15", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/33_md0dcx.jpg" },
    { id:"pk-16", title:"Punjab Kitchen 16", brand:"punjab", img: "https://res.cloudinary.com/dpbclovni/image/upload/Punjab_KItchen/36_r8kfcb.jpg" },
  ],

  other: [
    { id:"ot-1", title:"Other 1", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/01.1_2_dqhox3.jpg" },
    { id:"ot-2", title:"Other 2", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/01.1_ia4pqk.jpg" },
    { id:"ot-3", title:"Other 3", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/02_pfbizh.jpg" },
    { id:"ot-4", title:"Other 4", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/03.1_zaenrx.jpg" },
    { id:"ot-5", title:"Other 5", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/03_2_idglzt.jpg" },
    { id:"ot-6", title:"Other 6", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/03_uckj4g.jpg" },
    { id:"ot-7", title:"Other 7", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/04_2_vck0ts.jpg" },
    { id:"ot-8", title:"Other 8", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/04_3_ci5bee.jpg" },
    { id:"ot-9", title:"Other 9", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/04_pesruf.jpg" },
    { id:"ot-10", title:"Other 10", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/05.1_t440nc.jpg" },
    { id:"ot-11", title:"Other 11", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/06_2_in40vg.jpg" },
    { id:"ot-12", title:"Other 12", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/06_tvg1ht.jpg" },
    { id:"ot-13", title:"Other 13", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/07_axio5l.jpg" },
    { id:"ot-14", title:"Other 14", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/08_skhjok.jpg" },
    { id:"ot-15", title:"Other 15", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/09_ibndmj.jpg" },
    { id:"ot-16", title:"Other 16", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/1.1_2_rhin3k.jpg" },
    { id:"ot-17", title:"Other 17", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/1.1_jm8yqs.jpg" },
    { id:"ot-18", title:"Other 18", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/10.1jpg_ocbjwa.jpg" },
    { id:"ot-19", title:"Other 19", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/10.4_gceqxb.jpg" },
    { id:"ot-20", title:"Other 20", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/10_2_xtgdko.jpg" },
    { id:"ot-21", title:"Other 21", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/10_3_mc6wa2.jpg" },
    { id:"ot-22", title:"Other 22", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/10_tydelm.jpg" },
    { id:"ot-23", title:"Other 23", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/11_2_s98r6h.jpg" },
    { id:"ot-24", title:"Other 24", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/11_dy5aqy.jpg" },
    { id:"ot-25", title:"Other 25", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/123_znelrt.jpg" },
    { id:"ot-26", title:"Other 26", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/128_jof518.jpg" },
    { id:"ot-27", title:"Other 27", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/12_2_sw7lbf.jpg" },
    { id:"ot-28", title:"Other 28", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/12_3_kxhxue.jpg" },
    { id:"ot-29", title:"Other 29", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/12_4_d4pkrg.jpg" },
    { id:"ot-30", title:"Other 30", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/12_ll3lh9.jpg" },
    { id:"ot-31", title:"Other 31", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/13_2_qhgwo6.jpg" },
    { id:"ot-32", title:"Other 32", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/13_e0lbdh.jpg" },
    { id:"ot-33", title:"Other 33", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/14.3_nvaarg.jpg" },
    { id:"ot-34", title:"Other 34", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/14_y9bxab.jpg" },
    { id:"ot-35", title:"Other 35", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/15_gipmab.jpg" },
    { id:"ot-36", title:"Other 36", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/16_2_cuyxek.jpg" },
    { id:"ot-37", title:"Other 37", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/16_3_q3ffyd.jpg" },
    { id:"ot-38", title:"Other 38", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/16_dxwg06.jpg" },
    { id:"ot-39", title:"Other 39", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/17_2_dyabtq.jpg" },
    { id:"ot-40", title:"Other 40", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/17_3_kbenq9.jpg" },
    { id:"ot-41", title:"Other 41", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/17_v50bzo.jpg" },
    { id:"ot-42", title:"Other 42", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/18.3_obclhk.jpg" },
    { id:"ot-43", title:"Other 43", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/18_tv3lpe.jpg" },
    { id:"ot-44", title:"Other 44", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/19.1_hu2ulc.jpg" },
    { id:"ot-45", title:"Other 45", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/19_t3uood.jpg" },
    { id:"ot-46", title:"Other 46", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/1_2_fqo0dm.jpg" },
    { id:"ot-47", title:"Other 47", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/1_3_grdy6k.jpg" },
    { id:"ot-48", title:"Other 48", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/1_4_pp3dpm.jpg" },
    { id:"ot-49", title:"Other 49", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/1_w0xbng.jpg" },
    { id:"ot-50", title:"Other 50", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/2.2_n5efsj.jpg" },
    { id:"ot-51", title:"Other 51", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/20.1_uzsnsp.jpg" },
    { id:"ot-52", title:"Other 52", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/20_2_k7tydc.jpg" },
    { id:"ot-53", title:"Other 53", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/20_ddi3ck.jpg" },
    { id:"ot-54", title:"Other 54", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/21.1_hwsryb.jpg" },
    { id:"ot-55", title:"Other 55", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/22_wlniaz.jpg" },
    { id:"ot-56", title:"Other 56", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/23_nsvjnv.jpg" },
    { id:"ot-57", title:"Other 57", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/24.3_s0gmez.jpg" },
    { id:"ot-58", title:"Other 58", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/25_ly5sz0.jpg" },
    { id:"ot-59", title:"Other 59", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/27_kxuzlc.jpg" },
    { id:"ot-60", title:"Other 60", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/28_qulifl.jpg" },
    { id:"ot-61", title:"Other 61", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/29_um9ps7.jpg" },
    { id:"ot-62", title:"Other 62", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/2_2_lmmf4u.jpg" },
    { id:"ot-63", title:"Other 63", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/2_bvwbhx.jpg" },
    { id:"ot-64", title:"Other 64", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/31_ihwmeb.jpg" },
    { id:"ot-65", title:"Other 65", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/35_gkgva8.png" },
    { id:"ot-66", title:"Other 66", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/37_xrbgs3.jpg" },
    { id:"ot-67", title:"Other 67", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/39_pyalxc.png" },
    { id:"ot-68", title:"Other 68", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/3_2_rryooh.jpg" },
    { id:"ot-69", title:"Other 69", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/3_3_dq371g.jpg" },
    { id:"ot-70", title:"Other 70", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/3_4_zkvvh7.jpg" },
    { id:"ot-71", title:"Other 71", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/3_rx5q5r.jpg" },
    { id:"ot-72", title:"Other 72", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/4.2_pthzln.jpg" },
    { id:"ot-73", title:"Other 73", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/40_riuz80.jpg" },
    { id:"ot-74", title:"Other 74", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/44_kscazw.jpg" },
    { id:"ot-75", title:"Other 75", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/46_uamb1y.jpg" },
    { id:"ot-76", title:"Other 76", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/46_xpshmn.png" },
    { id:"ot-77", title:"Other 77", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/47_ndagv9.jpg" },
    { id:"ot-78", title:"Other 78", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/4_bzpgo5.jpg" },
    { id:"ot-79", title:"Other 79", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/5.1_tddeb5.jpg" },
    { id:"ot-80", title:"Other 80", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/5_2_nkphtx.jpg" },
    { id:"ot-81", title:"Other 81", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/5_3_unrxsy.jpg" },
    { id:"ot-82", title:"Other 82", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/5_zvnsxj.jpg" },
    { id:"ot-83", title:"Other 83", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/62_cyvcv9.jpg" },
    { id:"ot-84", title:"Other 84", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/63_a0mdfs.jpg" },
    { id:"ot-85", title:"Other 85", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/65_sfscyg.jpg" },
    { id:"ot-86", title:"Other 86", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/67_njo6kx.jpg" },
    { id:"ot-87", title:"Other 87", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/68_jhhk60.jpg" },
    { id:"ot-88", title:"Other 88", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/6_2_a3ywix.jpg" },
    { id:"ot-89", title:"Other 89", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/6_3_fgz7me.jpg" },
    { id:"ot-90", title:"Other 90", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/6_4_f6hitu.jpg" },
    { id:"ot-91", title:"Other 91", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/6_fktodi.jpg" },
    { id:"ot-92", title:"Other 92", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/71_laieqq.jpg" },
    { id:"ot-93", title:"Other 93", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/76_ztb3r6.jpg" },
    { id:"ot-94", title:"Other 94", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/77.1_rdkilo.jpg" },
    { id:"ot-95", title:"Other 95", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/77_c97eg4.jpg" },
    { id:"ot-96", title:"Other 96", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/7_2_lgsb0i.jpg" },
    { id:"ot-97", title:"Other 97", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/7_3_nysuut.jpg" },
    { id:"ot-98", title:"Other 98", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/7_4_sksj9w.jpg" },
    { id:"ot-99", title:"Other 99", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/7_q7oacf.jpg" },
    { id:"ot-100", title:"Other 100", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/8.4_aizyrk.jpg" },
    { id:"ot-101", title:"Other 101", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/84_noclsv.jpg" },
    { id:"ot-102", title:"Other 102", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/87_abmlen.jpg" },
    { id:"ot-103", title:"Other 103", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/89_eweh6u.jpg" },
    { id:"ot-104", title:"Other 104", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/8_2_ffrx3v.jpg" },
    { id:"ot-105", title:"Other 105", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/8_d7y0oi.jpg" },
    { id:"ot-106", title:"Other 106", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/9_2_rips9r.jpg" },
    { id:"ot-107", title:"Other 107", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/9_rfwpab.jpg" },
    { id:"ot-108", title:"Other 108", brand:"other", img: "https://res.cloudinary.com/dpbclovni/image/upload/Other/Untitled-3_ycjqle.jpg" },
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
const ImageGrid = ({ items }: { items: { id: string; title: string; img: string; category?: string; brand?: string }[] }) => {
  const [visible, setVisible] = useState(8);
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

  return (
    <>
      {lightbox && <Lightbox img={lightbox.img} title={lightbox.title} onClose={() => setLightbox(null)} />}

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

                <ImageGrid key={activeCategory} items={filtered} />
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
