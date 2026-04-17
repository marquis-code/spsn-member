import { _ as __nuxt_component_0 } from './nuxt-link-BXZWVkx4.mjs';
import __nuxt_component_0$1 from './index-Cngwfm37.mjs';
import { computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderList } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/server-renderer/index.mjs';
import { u as useUser } from './user-Cv7HJ_sz.mjs';
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
import 'file:///Users/mac/Documents/spsn/member/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/utils/lib/css/icon.js';
import './composables-tvv8AvD7.mjs';
import '../_/renderer.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unhead/dist/server.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/devalue/index.js';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/perfect-debounce/dist/index.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useUser();
    const statusClass = computed(() => {
      var _a;
      const status = ((_a = user.value) == null ? void 0 : _a.status) || "Active";
      switch (status) {
        case "Active":
          return "bg-emerald-50 text-emerald-600 border border-emerald-100";
        case "Pending":
          return "bg-amber-50 text-amber-600 border border-amber-100";
        case "Expired":
          return "bg-rose-50 text-rose-600 border border-rose-100";
        default:
          return "bg-slate-50 text-slate-600 border border-slate-100";
      }
    });
    const renewalDate = computed(() => {
      var _a;
      if ((_a = user.value) == null ? void 0 : _a.expiryDate) return new Date(user.value.expiryDate).toLocaleDateString(void 0, { year: "numeric", month: "long", day: "numeric" });
      return "Dec 31, 2026";
    });
    const metrics = [
      { label: "Publications Read", value: "24", icon: "lucide:book-open", growth: "12" },
      { label: "Conference Points", value: "450", icon: "lucide:award", growth: "8" },
      { label: "Global Rank", value: "#128", icon: "lucide:trending-up", growth: "3" },
      { label: "Abstracts", value: "03", icon: "lucide:file-text", growth: "0" }
    ];
    const publications = [
      { title: "Cytopathology National Journal v4", desc: "Case studies on cellular variance in West African pathology diagnostic modules.", category: "Journal", date: "Mar 2026", size: "4.2 MB" },
      { title: "Lab Safety Protocol 2026", desc: "Revised national standards for safety in cellular science laboratories.", category: "Guidelines", date: "Feb 2026", size: "1.8 MB" },
      { title: "Annual Scientific Digest", desc: "A collection of the most significant research papers from last years congress.", category: "Digest", date: "Jan 2026", size: "8.4 MB" },
      { title: "Histology Research Paper", desc: "Advancements in molecular markers for early detection techniques.", category: "Research", date: "Dec 2025", size: "2.1 MB" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-10 max-w-7xl mx-auto animate-fade-in" }, _attrs))} data-v-9d11a1a6><section class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-v-9d11a1a6><div class="lg:col-span-2 bg-gradient-to-br from-[#003366] to-[#004080] rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-[#003366]/20 group" data-v-9d11a1a6><div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" data-v-9d11a1a6></div><div class="relative z-10 space-y-6" data-v-9d11a1a6><div class="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10" data-v-9d11a1a6><span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" data-v-9d11a1a6></span><span class="text-xs font-bold" data-v-9d11a1a6>Scientific Network Active</span></div><h1 class="text-4xl font-bold tracking-tight leading-none" data-v-9d11a1a6> Welcome Back, <br data-v-9d11a1a6> <span class="text-brand-cyan" data-v-9d11a1a6>${ssrInterpolate(((_b = (_a = unref(user)) == null ? void 0 : _a.fullName) == null ? void 0 : _b.split(" ")[0]) || "Practitioner")}</span></h1><p class="text-white/80 text-sm font-medium max-w-md leading-relaxed" data-v-9d11a1a6> Your credentials have been re-validated for the 2026 diagnostic cycle. You have access to the latest pathological archives. </p><div class="flex items-center gap-6 pt-4" data-v-9d11a1a6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/library",
        class: "bg-brand-cyan text-[#003366] px-8 py-3 rounded-xl text-xs font-bold hover:scale-105 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Explore Archives`);
          } else {
            return [
              createTextVNode("Explore Archives")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/portfolio",
        class: "text-xs font-bold text-white/80 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Update Profile`);
          } else {
            return [
              createTextVNode("Update Profile")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="bg-white rounded-[2rem] border border-slate-200 p-10 flex flex-col justify-between shadow-xl shadow-slate-200/50" data-v-9d11a1a6><div class="space-y-4" data-v-9d11a1a6><span class="text-xs font-bold text-slate-400" data-v-9d11a1a6>Membership Identity</span><div class="flex items-center justify-between" data-v-9d11a1a6><h3 class="text-2xl font-bold text-[#003366] tracking-tight leading-none" data-v-9d11a1a6>${ssrInterpolate(((_c = unref(user)) == null ? void 0 : _c.category) || "Professional")}</h3><div class="${ssrRenderClass([unref(statusClass), "px-3 py-1 rounded-lg text-xs font-bold"])}" data-v-9d11a1a6>${ssrInterpolate(((_d = unref(user)) == null ? void 0 : _d.status) || "Active")}</div></div><div class="pt-6 space-y-3" data-v-9d11a1a6><div class="flex justify-between items-center text-xs font-bold" data-v-9d11a1a6><span class="text-slate-400" data-v-9d11a1a6>Renewal Date</span><span class="text-slate-800" data-v-9d11a1a6>${ssrInterpolate(unref(renewalDate))}</span></div><div class="h-2 bg-slate-100 rounded-full overflow-hidden" data-v-9d11a1a6><div style="${ssrRenderStyle({ width: "75%" })}" class="h-full bg-brand-cyan" data-v-9d11a1a6></div></div><p class="text-xs text-slate-400 font-medium" data-v-9d11a1a6>75% of membership cycle remaining</p></div></div><button class="w-full mt-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-[#003366] hover:bg-slate-100 transition-all" data-v-9d11a1a6>Download Virtual ID</button></div></section><section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-v-9d11a1a6><!--[-->`);
      ssrRenderList(metrics, (metric) => {
        _push(`<div class="bg-white p-8 rounded-[1.5rem] border border-slate-200 shadow-lg shadow-slate-200/20 group hover:border-[#003366]/20 transition-all" data-v-9d11a1a6><div class="flex justify-between items-start mb-4" data-v-9d11a1a6><div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#003366] border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-500" data-v-9d11a1a6>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: metric.icon,
          size: "20"
        }, null, _parent));
        _push(`</div><span class="text-xs font-bold text-emerald-500 leading-none" data-v-9d11a1a6>+${ssrInterpolate(metric.growth)}%</span></div><p class="text-sm font-semibold text-slate-500" data-v-9d11a1a6>${ssrInterpolate(metric.label)}</p><h4 class="text-3xl font-bold text-slate-800 tracking-tight mt-1" data-v-9d11a1a6>${ssrInterpolate(metric.value)}</h4></div>`);
      });
      _push(`<!--]--></section><div class="grid grid-cols-1 lg:grid-cols-3 gap-10" data-v-9d11a1a6><div class="lg:col-span-2 space-y-6" data-v-9d11a1a6><div class="flex items-center justify-between" data-v-9d11a1a6><h3 class="text-sm font-bold text-slate-500" data-v-9d11a1a6>Latest Scientific Publications</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/library",
        class: "text-xs font-bold text-brand-cyan hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View All Library`);
          } else {
            return [
              createTextVNode("View All Library")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-9d11a1a6><!--[-->`);
      ssrRenderList(publications, (pub) => {
        _push(`<div class="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition-all cursor-pointer group" data-v-9d11a1a6><div class="flex items-start gap-5" data-v-9d11a1a6><div class="w-16 h-20 bg-slate-100 rounded-lg flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform" data-v-9d11a1a6>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-text",
          size: "24",
          class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300"
        }, null, _parent));
        _push(`</div><div class="flex-1 min-w-0" data-v-9d11a1a6><span class="text-xs font-bold text-brand-cyan" data-v-9d11a1a6>${ssrInterpolate(pub.category)}</span><h4 class="text-sm font-bold text-slate-800 tracking-tight truncate mt-1" data-v-9d11a1a6>${ssrInterpolate(pub.title)}</h4><p class="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mt-2" data-v-9d11a1a6>${ssrInterpolate(pub.desc)}</p><div class="flex items-center gap-4 mt-4 text-xs font-medium text-slate-400" data-v-9d11a1a6><span data-v-9d11a1a6>${ssrInterpolate(pub.date)}</span><div class="w-1 h-1 bg-slate-200 rounded-full" data-v-9d11a1a6></div><span data-v-9d11a1a6>${ssrInterpolate(pub.size)}</span></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="space-y-6" data-v-9d11a1a6><h3 class="text-sm font-bold text-slate-500" data-v-9d11a1a6>Quick Support</h3><div class="bg-white p-8 rounded-[2rem] border border-slate-200 space-y-6 shadow-xl shadow-slate-200/30" data-v-9d11a1a6><div class="space-y-2" data-v-9d11a1a6><h4 class="text-sm font-bold text-[#003366]" data-v-9d11a1a6>Scientific Abstract Due</h4><p class="text-xs text-slate-500 font-medium leading-relaxed" data-v-9d11a1a6>The International Scientific Congress abstract submission closes in 14 days.</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/abstracts",
        class: "block w-full text-center bg-[#003366] text-white py-4 rounded-xl text-sm font-bold hover:bg-[#004080] transition-all shadow-lg shadow-[#003366]/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Submit Abstract Now`);
          } else {
            return [
              createTextVNode("Submit Abstract Now")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="h-[1px] bg-slate-100" data-v-9d11a1a6></div><div class="flex items-center gap-4 text-slate-500 hover:text-[#003366] cursor-pointer transition-colors" data-v-9d11a1a6><div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100" data-v-9d11a1a6>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:help-circle",
        size: "18"
      }, null, _parent));
      _push(`</div><span class="text-sm font-bold text-[#003366]" data-v-9d11a1a6>Enquiry Helpdesk</span></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d11a1a6"]]);

export { index as default };
//# sourceMappingURL=index-BLQIeLVf.mjs.map
