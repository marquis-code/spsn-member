import { _ as __nuxt_component_0$1 } from "./nuxt-link-6fT9np-V.js";
import { ref, computed, watch, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _imports_1 } from "./logo-Dbq8v19V.js";
import { i as useRoute, _ as __nuxt_component_0$2 } from "../server.mjs";
import { _ as _imports_0 } from "./virtual_public-DtxzyI0p.js";
import "/Users/marquis/scpsn/member/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "/Users/marquis/scpsn/member/node_modules/ufo/dist/index.mjs";
import "/Users/marquis/scpsn/member/node_modules/defu/dist/defu.mjs";
import "/Users/marquis/scpsn/member/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/marquis/scpsn/member/node_modules/hookable/dist/index.mjs";
import "/Users/marquis/scpsn/member/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "@iconify/vue";
import "/Users/marquis/scpsn/member/node_modules/klona/dist/index.mjs";
import "axios";
import "@iconify/utils/lib/css/icon";
import "/Users/marquis/scpsn/member/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/marquis/scpsn/member/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main$1 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const isHomePage = computed(() => route.path === "/");
    const navigation = [
      { label: "Home", to: "/" },
      { label: "About Us", to: "#about" },
      { label: "Features", to: "#features" },
      { label: "Pricing", to: "#pricing" },
      { label: "Community", to: "#community" }
    ];
    watch(() => route.path, () => {
      isMobileMenuOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["fixed top-0 left-0 right-0 z-[100] transition-all duration-500", [
          isScrolled.value || !isHomePage.value ? "py-4" : "py-6",
          isMobileMenuOpen.value ? "h-screen bg-brand-dark lg:h-auto" : ""
        ]]
      }, _attrs))}><div class="container mx-auto px-4"><nav class="${ssrRenderClass([
        "w-full transition-all duration-700 rounded-3xl flex items-center justify-between px-6 py-3",
        isScrolled.value || !isHomePage.value ? "glass-premium border-b border-white/10" : "bg-transparent border-transparent"
      ])}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3 relative z-[110]",
        onClick: ($event) => isMobileMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-11 h-11 rounded-2xl flex items-center justify-center p-0.5 hover:rotate-[360deg] transition-transform duration-1000 bg-white shadow-lg overflow-hidden border border-white/20"${_scopeId}><img${ssrRenderAttr("src", _imports_1)} class="w-full h-full object-contain" alt="Logo"${_scopeId}></div><div class="flex flex-col"${_scopeId}><span class="${ssrRenderClass([isScrolled.value || !isHomePage.value || isHomePage.value ? "text-white" : "text-white", "text-lg font-black tracking-tighter leading-none"])}"${_scopeId}>SCPSN</span><span class="text-[10px] font-bold text-brand-cyan tracking-wide"${_scopeId}>Member Hub</span></div>`);
          } else {
            return [
              createVNode("div", { class: "w-11 h-11 rounded-2xl flex items-center justify-center p-0.5 hover:rotate-[360deg] transition-transform duration-1000 bg-white shadow-lg overflow-hidden border border-white/20" }, [
                createVNode("img", {
                  src: _imports_1,
                  class: "w-full h-full object-contain",
                  alt: "Logo"
                })
              ]),
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("span", {
                  class: ["text-lg font-black tracking-tighter leading-none", isScrolled.value || !isHomePage.value || isHomePage.value ? "text-white" : "text-white"]
                }, "SCPSN", 2),
                createVNode("span", { class: "text-[10px] font-bold text-brand-cyan tracking-wide" }, "Member Hub")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden lg:flex items-center gap-2"><!--[-->`);
      ssrRenderList(navigation, (link) => {
        _push(`<div class="relative">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.to,
          class: [
            "px-5 py-2.5 text-sm font-bold transition-all duration-300 rounded-2xl relative flex items-center gap-1",
            isScrolled.value || !isHomePage.value ? "text-white/80 hover:text-white hover:bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10"
          ],
          "active-class": "!text-brand-cyan !bg-white/5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="hidden lg:flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "px-5 py-2.5 text-sm font-bold transition-colors text-white hover:text-brand-cyan"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login `);
          } else {
            return [
              createTextVNode(" Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "bg-brand-cyan text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-white hover:text-brand-dark hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-cyan/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign Up `);
          } else {
            return [
              createTextVNode(" Sign Up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-3 lg:hidden relative z-[110]"><button class="${ssrRenderClass([isScrolled.value || !isHomePage.value || isMobileMenuOpen.value ? "bg-white/10 border-white/20" : "bg-slate-50 border-slate-200", "w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-500 border"])}"><div class="${ssrRenderClass(["w-5 h-0.5 rounded-full transition-all duration-500", isScrolled.value || !isHomePage.value || isMobileMenuOpen.value ? "bg-white" : "bg-[#033958]", isMobileMenuOpen.value ? "rotate-45 translate-y-[8px]" : ""])}"></div><div class="${ssrRenderClass(["w-3 h-0.5 rounded-full transition-all duration-300", isScrolled.value || !isHomePage.value || isMobileMenuOpen.value ? "bg-white" : "bg-[#033958]", isMobileMenuOpen.value ? "opacity-0 -translate-x-2" : ""])}"></div><div class="${ssrRenderClass(["w-5 h-0.5 rounded-full transition-all duration-500", isScrolled.value || !isHomePage.value || isMobileMenuOpen.value ? "bg-white" : "bg-[#033958]", isMobileMenuOpen.value ? "-rotate-45 -translate-y-[8px]" : ""])}"></div></button></div></nav></div>`);
      if (isMobileMenuOpen.value) {
        _push(`<div class="lg:hidden fixed inset-0 bg-[#033958] z-[105] flex flex-col pt-28 pb-10 px-6 overflow-y-auto"><div class="flex flex-col gap-1 relative z-10"><!--[-->`);
        ssrRenderList(navigation, (link, i) => {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: link.to,
            onClick: ($event) => isMobileMenuOpen.value = false,
            class: "block py-4 text-2xl font-semibold text-white tracking-tight group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center gap-4"${_scopeId}><span class="text-sm font-medium text-brand-cyan/60 font-mono"${_scopeId}>0${ssrInterpolate(i + 1)}</span><span class="group-hover:translate-x-3 transition-transform duration-500"${_scopeId}>${ssrInterpolate(link.label)}</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("span", { class: "text-sm font-medium text-brand-cyan/60 font-mono" }, "0" + toDisplayString(i + 1), 1),
                    createVNode("span", { class: "group-hover:translate-x-3 transition-transform duration-500" }, toDisplayString(link.label), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="mt-auto pt-10 relative z-10"><div class="grid grid-cols-2 gap-3 mb-10">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          onClick: ($event) => isMobileMenuOpen.value = false,
          class: "btn-outline-premium !w-full !py-4 !text-base !normal-case !font-semibold !text-white !border-white/20 flex items-center justify-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/signup",
          onClick: ($event) => isMobileMenuOpen.value = false,
          class: "btn-cyan !w-full !py-4 !text-base !normal-case !font-semibold flex items-center justify-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign Up `);
            } else {
              return [
                createTextVNode(" Sign Up ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "Header" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const currentSlide = ref(0);
    const slides = [
      {
        image: "/images/hero/1.png",
        tagline: "Excellence in Pathology 2026",
        titlePart1: "Advancing",
        titlePart2: "Diagnostics",
        description: "The professional network for pathology scientists in Nigeria. We verify credentials and promote high standards."
      },
      {
        image: "/images/hero/2.png",
        tagline: "Working Together",
        titlePart1: "Fostering",
        titlePart2: "Collaboration",
        description: "Connect with pathology professionals worldwide. Share knowledge and collaborate on research."
      },
      {
        image: "/images/hero/3.png",
        tagline: "Accurate Results",
        titlePart1: "Mastering",
        titlePart2: "The Cell",
        description: "Using advanced research and standard procedures to improve pathology services in Nigeria."
      }
    ];
    const stats = [
      { value: "1,200+", label: "Active Members" },
      { value: "₦2.4B+", label: "Research Funding" },
      { value: "Top 5%", label: "Global Rank" }
    ];
    const values = [
      { title: "Standardization", desc: "Implementing national protocols for diagnostic precision and laboratory excellence.", icon: "lucide:microscope" },
      { title: "Collaboration", desc: "Fostering partnerships with global scientific bodies and research institutions.", icon: "lucide:globe" },
      { title: "Innovation", desc: "Pioneering Al-driven diagnostics and cutting-edge molecular pathology research.", icon: "lucide:dna" },
      { title: "Integrity", desc: "Upholding the highest ethical standards in laboratory medicine and scientific reporting.", icon: "lucide:shield-check" }
    ];
    const benefits = [
      { title: "Scientific Repository", desc: "Access to peer-reviewed journals, monographs, and research databases." },
      { title: "Global Recognition", desc: "SCPSN credentials recognized by international laboratory bodies." },
      { title: "Grant Eligibility", desc: "Priority access to research grants and institutional funding." },
      { title: "Event Access", desc: "Guaranteed access to the International Scientific Congress." }
    ];
    const tiers = [
      { tag: "Academic Entry", title: "Student Member", price: "15,000", features: ["Repository Access", "Forum Entry", "Congress Discounts"] },
      { tag: "Core Practitioner", title: "Full Member", price: "35,000", features: ["Board Certification", "Voting Privileges", "Grant Eligibility", "Directory Listing"] },
      { tag: "Strategic Leadership", title: "Fellow", price: "75,000", features: ["Advisory Role", "Peer Review Board", "Fellowship Title", "VIP Event Access"] }
    ];
    const footerLinks = [
      { title: "Ecosystem", links: ["Vision", "Protocols", "Research Hub", "Ethics Board"] },
      { title: "Resources", links: ["Archive", "Peer Journals", "Clinical Guidelines"] },
      { title: "Strategic", links: ["Directory", "Affiliated Colleges", "Global Hub"] }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white font-sans selection:bg-brand-cyan/20 selection:text-brand-dark overflow-x-hidden" }, _attrs))} data-v-39c047d8>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(`<section class="h-screen relative overflow-hidden bg-brand-dark" data-v-39c047d8><!--[-->`);
      ssrRenderList(slides, (slide, i) => {
        _push(`<div class="${ssrRenderClass([currentSlide.value === i ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-110", "absolute inset-0 transition-all duration-[1500ms] ease-in-out"])}" data-v-39c047d8><img${ssrRenderAttr("src", slide.image)} class="absolute inset-0 w-full h-full object-cover" data-v-39c047d8><div class="absolute inset-0 bg-gradient-to-r from-[#033958] via-[#033958]/80 to-transparent" data-v-39c047d8></div><div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent h-40" data-v-39c047d8></div><div class="container mx-auto px-6 h-full flex items-center relative z-20" data-v-39c047d8><div class="${ssrRenderClass([currentSlide.value === i ? "animate-in fade-in slide-in-from-bottom-12 duration-1000" : "opacity-0", "max-w-4xl space-y-8"])}" data-v-39c047d8><div class="inline-flex items-center gap-3 px-4 py-1.5 glass-dark rounded-lg border border-white/10" data-v-39c047d8><span class="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" data-v-39c047d8></span><span class="text-sm font-semibold text-white/90" data-v-39c047d8>${ssrInterpolate(slide.tagline)}</span></div><h1 class="text-6xl md:text-[90px] font-black text-white tracking-tighter leading-[0.9]" data-v-39c047d8>${ssrInterpolate(slide.titlePart1)} <br data-v-39c047d8> <span class="text-brand-cyan" data-v-39c047d8>${ssrInterpolate(slide.titlePart2)}</span>. </h1><p class="text-lg md:text-xl text-white/70 font-medium max-w-2xl leading-relaxed" data-v-39c047d8>${ssrInterpolate(slide.description)}</p><div class="flex flex-wrap items-center gap-6 pt-4" data-v-39c047d8>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/signup",
          class: "btn-cyan !normal-case !text-base"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign Up `);
            } else {
              return [
                createTextVNode(" Sign Up ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<button class="flex items-center gap-4 text-sm font-semibold text-white group" data-v-39c047d8><span data-v-39c047d8>View pricing plans</span><div class="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-brand-cyan group-hover:border-brand-cyan group-hover:text-white transition-all" data-v-39c047d8>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:arrow-right",
          size: 16
        }, null, _parent));
        _push(`</div></button></div></div></div></div>`);
      });
      _push(`<!--]--><div class="absolute bottom-12 left-6 md:left-24 flex gap-3 z-30" data-v-39c047d8><!--[-->`);
      ssrRenderList(slides, (_, i) => {
        _push(`<button class="${ssrRenderClass([currentSlide.value === i ? "w-12 bg-brand-cyan" : "w-4 bg-white/20 hover:bg-white/40", "h-1 rounded-full transition-all duration-700"])}" data-v-39c047d8></button>`);
      });
      _push(`<!--]--></div></section><section id="about" class="py-32 bg-white" data-v-39c047d8><div class="container mx-auto px-6" data-v-39c047d8><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" data-v-39c047d8><!--[-->`);
      ssrRenderList(values, (v, i) => {
        _push(`<div class="space-y-6 group p-8 rounded-3xl border border-transparent hover:bg-slate-50 transition-all duration-500" data-v-39c047d8><div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#033958] border border-slate-100 group-hover:bg-[#033958] group-hover:text-white transition-all duration-500" data-v-39c047d8>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: v.icon,
          size: 24
        }, null, _parent));
        _push(`</div><div class="space-y-3" data-v-39c047d8><h3 class="text-lg font-semibold text-[#033958]" data-v-39c047d8>${ssrInterpolate(v.title)}</h3><p class="text-slate-500 text-sm font-medium leading-relaxed" data-v-39c047d8>${ssrInterpolate(v.desc)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section><section id="features" class="py-32 bg-slate-50 relative overflow-hidden" data-v-39c047d8><div class="container mx-auto px-6" data-v-39c047d8><div class="flex flex-col lg:flex-row gap-24 items-center" data-v-39c047d8><div class="lg:w-1/2 space-y-12" data-v-39c047d8><div class="space-y-6" data-v-39c047d8><span class="inline-block px-4 py-1.5 bg-[#033958]/5 text-[#033958] font-semibold text-sm rounded-lg border border-[#033958]/10" data-v-39c047d8> Scientific Excellence </span><h2 class="text-5xl md:text-6xl font-black text-[#033958] tracking-tighter leading-none" data-v-39c047d8>Precision in <br data-v-39c047d8> <span class="text-brand-cyan" data-v-39c047d8>Diagnostics</span>.</h2><p class="text-slate-500 font-medium text-lg leading-relaxed max-w-xl" data-v-39c047d8> We are committed to standardizing cellular pathology through rigorous research and global collaboration. </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-39c047d8><!--[-->`);
      ssrRenderList(benefits, (b) => {
        _push(`<div class="space-y-4 p-8 bg-white rounded-3xl border border-slate-100 transition-all hover:-translate-y-1" data-v-39c047d8><div class="w-10 h-10 bg-brand-cyan/10 rounded-xl flex items-center justify-center text-brand-cyan" data-v-39c047d8>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:activity",
          size: 20
        }, null, _parent));
        _push(`</div><h4 class="font-semibold text-[#033958] tracking-tight text-lg" data-v-39c047d8>${ssrInterpolate(b.title)}</h4><p class="text-sm text-slate-500 font-medium leading-relaxed" data-v-39c047d8>${ssrInterpolate(b.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div><div class="lg:w-1/2 relative" data-v-39c047d8><div class="rounded-[40px] overflow-hidden aspect-[4/5] relative border border-slate-200 p-4 bg-white" data-v-39c047d8><img${ssrRenderAttr("src", _imports_0)} class="w-full h-full object-cover rounded-[28px]" data-v-39c047d8><div class="absolute inset-0 bg-gradient-to-t from-[#033958]/40 to-transparent m-4 rounded-[28px]" data-v-39c047d8></div></div></div></div></div></section><section id="pricing" class="py-32 bg-white" data-v-39c047d8><div class="container mx-auto px-6" data-v-39c047d8><div class="max-w-2xl mx-auto text-center space-y-4 mb-20" data-v-39c047d8><span class="text-sm font-semibold text-brand-cyan mb-2 inline-block" data-v-39c047d8>Member Tiers</span><h2 class="text-5xl md:text-6xl font-black text-[#033958] tracking-tighter leading-none" data-v-39c047d8>Choose Your Path.</h2><p class="text-base font-medium text-slate-500" data-v-39c047d8>Select a professional tier to begin your enrollment.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-39c047d8><!--[-->`);
      ssrRenderList(tiers, (tier, i) => {
        _push(`<div class="${ssrRenderClass([i === 1 ? "bg-slate-50" : "bg-white", "p-10 rounded-[32px] border border-slate-100 flex flex-col space-y-8 group transition-all duration-500 hover:border-brand-cyan"])}" data-v-39c047d8><div class="space-y-3" data-v-39c047d8><span class="text-sm font-semibold text-brand-cyan" data-v-39c047d8>${ssrInterpolate(tier.tag)}</span><h3 class="text-2xl font-bold text-[#033958] tracking-tight" data-v-39c047d8>${ssrInterpolate(tier.title)}</h3></div><div class="text-4xl font-black text-[#033958] tracking-tighter flex items-baseline" data-v-39c047d8><span class="text-sm font-bold mr-1" data-v-39c047d8>₦</span>${ssrInterpolate(tier.price)}<span class="text-sm font-medium text-slate-400 ml-2 opacity-50" data-v-39c047d8> / Year</span></div><div class="h-[1px] bg-slate-200/60 w-full" data-v-39c047d8></div><ul class="space-y-4 flex-1" data-v-39c047d8><!--[-->`);
        ssrRenderList(tier.features, (feat) => {
          _push(`<li class="text-slate-500 text-sm font-medium flex items-center gap-3" data-v-39c047d8>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:check",
            size: 14,
            class: "text-brand-cyan shrink-0"
          }, null, _parent));
          _push(`<span class="tracking-wide" data-v-39c047d8>${ssrInterpolate(feat)}</span></li>`);
        });
        _push(`<!--]--></ul>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/signup?tier=" + tier.title.toLowerCase(),
          class: ["block w-full text-center py-5 rounded-2xl text-base font-semibold transition-all", i === 1 ? "bg-[#033958] text-white hover:bg-brand-cyan hover:text-white" : "bg-slate-100 text-slate-600 hover:bg-[#033958] hover:text-white"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Choose Plan `);
            } else {
              return [
                createTextVNode(" Choose Plan ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><section id="community" class="py-32 bg-[#033958] text-white relative overflow-hidden" data-v-39c047d8><div class="container mx-auto px-6 relative z-10 text-center space-y-12" data-v-39c047d8><div class="max-w-3xl mx-auto space-y-6" data-v-39c047d8><h2 class="text-5xl md:text-7xl font-black tracking-tighter leading-none" data-v-39c047d8>Leading the <span class="text-brand-cyan" data-v-39c047d8>Future</span>.</h2><p class="text-lg text-white/60 font-medium max-w-xl mx-auto leading-relaxed" data-v-39c047d8> Join a specialized community of pathology scientists advancing laboratory diagnostics. </p></div><div class="flex flex-wrap justify-center gap-16" data-v-39c047d8><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="space-y-1 text-center" data-v-39c047d8><p class="text-5xl font-black text-brand-cyan tracking-tighter" data-v-39c047d8>${ssrInterpolate(stat.value)}</p><p class="text-sm font-semibold text-white/60" data-v-39c047d8>${ssrInterpolate(stat.label)}</p></div>`);
      });
      _push(`<!--]--></div><div class="pt-8" data-v-39c047d8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "btn-cyan !px-16 !py-3 !normal-case !text-lg !font-semibold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Join Now `);
          } else {
            return [
              createTextVNode(" Join Now ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><footer class="py-20 bg-white text-slate-800 border-t border-slate-100" data-v-39c047d8><div class="container mx-auto px-6" data-v-39c047d8><div class="flex flex-col md:flex-row items-start justify-between gap-16" data-v-39c047d8><div class="space-y-6 max-w-xs" data-v-39c047d8><div class="h-16 w-16 rounded-xl flex items-center justify-center font-black text-xl" data-v-39c047d8><img${ssrRenderAttr("src", _imports_1)} data-v-39c047d8></div><p class="text-sm font-medium text-slate-500 leading-relaxed opacity-80" data-v-39c047d8>Society for Cellular Pathology Scientists of Nigeria. Advancing pathological science through innovation and integrity.</p></div><div class="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-24" data-v-39c047d8><!--[-->`);
      ssrRenderList(footerLinks, (col) => {
        _push(`<div class="space-y-6" data-v-39c047d8><h5 class="text-sm font-semibold text-brand-cyan" data-v-39c047d8>${ssrInterpolate(col.title)}</h5><ul class="space-y-3" data-v-39c047d8><!--[-->`);
        ssrRenderList(col.links, (link) => {
          _push(`<li class="text-sm font-medium text-slate-500 hover:text-[#033958] transition-colors cursor-pointer" data-v-39c047d8>${ssrInterpolate(link)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div><div class="mt-20 pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6" data-v-39c047d8><p class="text-xs font-medium text-slate-400" data-v-39c047d8>© 2026 Society for Cellular Pathology Scientists of Nigeria • All Rights Reserved.</p><div class="flex gap-8" data-v-39c047d8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "text-xs font-medium text-slate-400 hover:text-[#033958]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign Up`);
          } else {
            return [
              createTextVNode("Sign Up")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-xs font-medium text-slate-400 hover:text-[#033958]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Login`);
          } else {
            return [
              createTextVNode("Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="#" class="text-xs font-medium text-slate-400 hover:text-[#033958]" data-v-39c047d8>Privacy</a></div></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39c047d8"]]);
export {
  index as default
};
//# sourceMappingURL=index-CEblwd7v.js.map
