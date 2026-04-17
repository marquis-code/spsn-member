import { _ as __nuxt_component_0 } from './nuxt-link-BXZWVkx4.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderVNode } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue-router/vue-router.node.mjs';
import { LucideArrowRight, LucideMicroscope, LucideGlobe, LucideDna, LucideShieldCheck, LucideCheck } from 'file:///Users/mac/Documents/spsn/member/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ufo/dist/index.mjs';
import './server.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/h3/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/destr/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ohash/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/klona/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/defu/dist/defu.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/scule/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unctx/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/mac/Documents/spsn/member/node_modules/pathe/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/utils/lib/index.js';
import 'file:///Users/mac/Documents/spsn/member/node_modules/consola/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/hookable/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/vue/dist/iconify.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const isScrolled = ref(false);
    const stats = [
      { value: "1.2k+", label: "Active Fellows" },
      { value: "24/7", label: "Lab Support" },
      { value: "\u20A62B+", label: "Research Grants" }
    ];
    const values = [
      { title: "Standardization", desc: "Implementing national protocols for diagnostic precision.", icon: LucideMicroscope },
      { title: "Collaboration", desc: "Fostering partnerships with global scientific bodies.", icon: LucideGlobe },
      { title: "Innovation", desc: "Pioneering Al-driven and molecular pathology.", icon: LucideDna },
      { title: "Integrity", desc: "Upholding highest ethical standards in medicine.", icon: LucideShieldCheck }
    ];
    const benefits = [
      { title: "Scientific Repository", desc: "Access to peer-reviewed journals and monographs." },
      { title: "Global Recognition", desc: "SCPSN certified credentials recognized internationally." },
      { title: "Grant Eligibility", desc: "Priority access to research grants and funding." },
      { title: "Scientific Congress", desc: "Discounted VIP access to International Scientific Congress." }
    ];
    const tiers = [
      { tag: "Academic Entry", title: "Student Member", price: "15,000", features: ["Library Access", "Student Forum", "Congress Discounts"] },
      { tag: "Core Practitioner", title: "Full Member", price: "35,000", features: ["Board Certification", "Voting Privileges", "Grant Eligibility", "Expert Listing"] },
      { tag: "Strategic Leadership", title: "Fellow", price: "75,000", features: ["Advisory Role", "Review Board", "Fellowship Title", "VIP Access"] }
    ];
    const footerLinks = [
      { title: "Ecosystem", links: ["Vision", "Protocols", "Research", "Integrity"] },
      { title: "Resources", links: ["Archive", "Journals", "Monographs", "Guidelines"] },
      { title: "Network", links: ["Directory", "Colleges", "Global Hub", "Ethics"] }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white font-sans text-slate-900 selection:bg-brand-cyan/20 selection:text-brand-dark overflow-x-hidden" }, _attrs))} data-v-16c9bc07><header class="${ssrRenderClass([isScrolled.value ? "glass py-3 shadow-xl shadow-brand-dark/5" : "bg-transparent", "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4"])}" data-v-16c9bc07><div class="container mx-auto px-6 flex justify-between items-center" data-v-16c9bc07><div class="flex items-center gap-4 group cursor-pointer" data-v-16c9bc07><div class="h-10 w-10 bg-[#003366] rounded-xl flex items-center justify-center text-brand-cyan font-black border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500" data-v-16c9bc07> SC </div><div class="hidden md:block" data-v-16c9bc07><span class="font-black text-[#003366] uppercase tracking-[0.3em] text-[10px]" data-v-16c9bc07>Scientific Portal</span><p class="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5" data-v-16c9bc07>Society for Cellular Pathology</p></div></div><nav class="hidden lg:flex items-center gap-8" data-v-16c9bc07><!--[-->`);
      ssrRenderList(["Vision", "Benefits", "Pathways", "Network"], (link) => {
        _push(`<a${ssrRenderAttr("href", "#" + link.toLowerCase())} class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#003366] transition-colors relative group" data-v-16c9bc07>${ssrInterpolate(link)} <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all duration-300 group-hover:w-full" data-v-16c9bc07></span></a>`);
      });
      _push(`<!--]--></nav><div class="flex items-center gap-4" data-v-16c9bc07>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-[9px] font-black uppercase tracking-widest text-[#003366] hover:text-brand-cyan transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Portal Login `);
          } else {
            return [
              createTextVNode(" Portal Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "bg-[#003366] text-white px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#003366]/20 hover:bg-[#004080] transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Join Network `);
          } else {
            return [
              createTextVNode(" Join Network ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><section class="min-h-screen flex items-center relative overflow-hidden bg-[#003366]" data-v-16c9bc07><img src="https://images.unsplash.com/photo-1532187875605-1ef6c20090d8?q=80&amp;w=2070&amp;auto=format&amp;fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay grayscale" data-v-16c9bc07><div class="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#003366]/90 to-transparent" data-v-16c9bc07></div><div class="container mx-auto px-6 relative z-10 pt-20" data-v-16c9bc07><div class="max-w-4xl space-y-8 animate-fade-in" data-v-16c9bc07><div class="inline-flex items-center gap-3 px-4 py-1.5 glass-dark rounded-full border border-white/10" data-v-16c9bc07><span class="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(0,184,212,0.8)]" data-v-16c9bc07></span><span class="text-[9px] font-black text-white/70 uppercase tracking-widest" data-v-16c9bc07>Enrollment Cycle 2026 Active</span></div><h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase" data-v-16c9bc07> Advancing <br data-v-16c9bc07> <span class="text-brand-cyan" data-v-16c9bc07>Diagnostic</span> <br data-v-16c9bc07> Mastery. </h1><p class="text-lg md:text-xl text-white/60 font-medium max-w-2xl leading-relaxed" data-v-16c9bc07> The elite registry for practitioners of Cellular Pathology Scientists in Nigeria. Validating credentials, fostering research, and leading laboratory excellence. </p><div class="flex flex-wrap items-center gap-6 pt-4" data-v-16c9bc07>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "bg-brand-cyan text-[#003366] px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-cyan/20 hover:scale-105 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Begin Enrollment Process `);
          } else {
            return [
              createTextVNode(" Begin Enrollment Process ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="#benefits" class="flex items-center gap-3 text-[10px] font-black text-white hover:text-brand-cyan transition-colors uppercase tracking-widest" data-v-16c9bc07> Review Membership Tiers `);
      _push(ssrRenderComponent(unref(LucideArrowRight), { size: 16 }, null, _parent));
      _push(`</a></div><div class="pt-12 grid grid-cols-3 gap-12 max-w-2xl" data-v-16c9bc07><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="space-y-1 border-l border-white/10 pl-6" data-v-16c9bc07><p class="text-3xl font-black text-white tracking-tighter" data-v-16c9bc07>${ssrInterpolate(stat.value)}</p><p class="text-[9px] font-bold text-white/40 uppercase tracking-widest" data-v-16c9bc07>${ssrInterpolate(stat.label)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></section><section id="vision" class="py-24 bg-white relative border-b border-slate-100" data-v-16c9bc07><div class="container mx-auto px-6" data-v-16c9bc07><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" data-v-16c9bc07><!--[-->`);
      ssrRenderList(values, (v, i) => {
        _push(`<div class="space-y-4 group" data-v-16c9bc07><div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#003366] border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-500" data-v-16c9bc07>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(v.icon), { size: 20 }, null), _parent);
        _push(`</div><h3 class="text-sm font-black text-[#003366] uppercase tracking-wider" data-v-16c9bc07>${ssrInterpolate(v.title)}</h3><p class="text-slate-400 text-[11px] font-medium leading-relaxed max-w-[220px]" data-v-16c9bc07>${ssrInterpolate(v.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section id="benefits" class="py-24 relative overflow-hidden" data-v-16c9bc07><div class="container mx-auto px-6" data-v-16c9bc07><div class="flex flex-col lg:flex-row gap-20 items-center" data-v-16c9bc07><div class="lg:w-1/2 space-y-10" data-v-16c9bc07><div class="space-y-4" data-v-16c9bc07><span class="text-[9px] font-black text-brand-cyan uppercase tracking-widest" data-v-16c9bc07>Why SCPSN Membership?</span><h2 class="text-4xl font-black text-[#003366] tracking-tighter leading-tight uppercase" data-v-16c9bc07>Scientific <br data-v-16c9bc07> Empowerment.</h2><p class="text-slate-400 font-medium text-xs leading-relaxed max-w-md" data-v-16c9bc07>Access international monographs, peer-reviewed journals, and a global network of pathological excellence.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-16c9bc07><!--[-->`);
      ssrRenderList(benefits, (b) => {
        _push(`<div class="space-y-2 border-t border-slate-50 pt-4" data-v-16c9bc07><h4 class="font-black text-[#003366] uppercase tracking-tight text-[10px]" data-v-16c9bc07>${ssrInterpolate(b.title)}</h4><p class="text-[10px] text-slate-400 font-medium leading-normal" data-v-16c9bc07>${ssrInterpolate(b.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div><div class="lg:w-1/2" data-v-16c9bc07><div class="rounded-3xl overflow-hidden aspect-video relative group border border-slate-200 shadow-2xl" data-v-16c9bc07><img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&amp;w=2070&amp;auto=format&amp;fit=crop" class="w-full h-full object-cover" data-v-16c9bc07><div class="absolute inset-0 bg-[#003366]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" data-v-16c9bc07>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "bg-white text-[#003366] px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Secure Your Seat`);
          } else {
            return [
              createTextVNode("Secure Your Seat")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></section><section id="pathways" class="py-24 bg-slate-50 relative" data-v-16c9bc07><div class="container mx-auto px-6" data-v-16c9bc07><div class="text-center space-y-4 mb-20 animate-fade-in" data-v-16c9bc07><h2 class="text-4xl font-black text-[#003366] tracking-tighter uppercase" data-v-16c9bc07>Professional Pathways.</h2><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed" data-v-16c9bc07>Select your tier to begin the automated verification process.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-16c9bc07><!--[-->`);
      ssrRenderList(tiers, (tier, i) => {
        _push(`<div class="bg-white p-10 rounded-2xl border border-slate-100 space-y-8 group hover:border-brand-cyan transition-all duration-500 hover:shadow-2xl" data-v-16c9bc07><div class="space-y-4" data-v-16c9bc07><span class="text-[8px] font-black text-brand-cyan uppercase tracking-[0.4em]" data-v-16c9bc07>${ssrInterpolate(tier.tag)}</span><h3 class="text-xl font-black text-[#003366] tracking-tight uppercase leading-none" data-v-16c9bc07>${ssrInterpolate(tier.title)}</h3></div><div class="text-4xl font-black text-[#003366] tracking-tighter flex items-baseline" data-v-16c9bc07><span class="text-sm font-bold mr-1" data-v-16c9bc07>\u20A6</span>${ssrInterpolate(tier.price)}<span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2" data-v-16c9bc07> / Year</span></div><ul class="space-y-3 border-t border-slate-50 pt-6" data-v-16c9bc07><!--[-->`);
        ssrRenderList(tier.features, (feat) => {
          _push(`<li class="text-slate-400 text-[10px] font-medium flex items-center gap-3" data-v-16c9bc07>`);
          _push(ssrRenderComponent(unref(LucideCheck), {
            size: 12,
            class: "text-brand-cyan"
          }, null, _parent));
          _push(` ${ssrInterpolate(feat)}</li>`);
        });
        _push(`<!--]--></ul>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/signup?tier=" + tier.title.toLowerCase(),
          class: "block w-full text-center bg-[#003366] text-white py-4 rounded-xl text-[9px] font-extrabold uppercase tracking-widest group-hover:bg-brand-cyan group-hover:text-[#003366] transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`SELECT PATHWAY`);
            } else {
              return [
                createTextVNode("SELECT PATHWAY")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><footer class="py-16 bg-[#003366] text-white" data-v-16c9bc07><div class="container mx-auto px-6" data-v-16c9bc07><div class="flex flex-col md:flex-row items-center justify-between gap-12" data-v-16c9bc07><div class="space-y-4 text-center md:text-left" data-v-16c9bc07><div class="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-[#003366] font-black shadow-lg mx-auto md:mx-0" data-v-16c9bc07>SC</div><p class="text-[10px] font-medium text-white/50 max-w-xs leading-relaxed uppercase tracking-wider" data-v-16c9bc07>Advancing the science of cellular pathology through elite collaboration and rigorous standardization.</p></div><div class="grid grid-cols-2 md:grid-cols-3 gap-16" data-v-16c9bc07><!--[-->`);
      ssrRenderList(footerLinks, (col) => {
        _push(`<div class="space-y-4" data-v-16c9bc07><h5 class="text-[10px] font-black text-brand-cyan uppercase tracking-widest" data-v-16c9bc07>${ssrInterpolate(col.title)}</h5><ul class="space-y-2" data-v-16c9bc07><!--[-->`);
        ssrRenderList(col.links, (link) => {
          _push(`<li class="text-[10px] font-medium text-white/40 hover:text-white transition-colors cursor-pointer uppercase tracking-wider" data-v-16c9bc07>${ssrInterpolate(link)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div><div class="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4" data-v-16c9bc07><p class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]" data-v-16c9bc07>\xA9 2026 SCPSN Scientific Network. SECURE PORTAL ACCESS.</p><div class="flex gap-8" data-v-16c9bc07>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-brand-cyan transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Apply Now`);
          } else {
            return [
              createTextVNode("Apply Now")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-brand-cyan transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Member Sign-In`);
          } else {
            return [
              createTextVNode("Member Sign-In")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="#" class="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-brand-cyan transition-colors" data-v-16c9bc07>Privacy Shield</a></div></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-16c9bc07"]]);

export { index as default };
//# sourceMappingURL=index-B92OaUQJ.mjs.map
