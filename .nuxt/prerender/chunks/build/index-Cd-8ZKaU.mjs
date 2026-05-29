import { _ as __nuxt_component_0 } from './nuxt-link-6fT9np-V.mjs';
import { c as useUser, a as useCMS, _ as __nuxt_component_0$1 } from './server.mjs';
import { computed, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/ufo/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/h3/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/destr/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/marquis/scpsn/member/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/ohash/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/klona/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/defu/dist/defu.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/scule/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/unctx/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/marquis/scpsn/member/node_modules/pathe/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/@iconify/utils/lib/index.js';
import 'file:///Users/marquis/scpsn/member/node_modules/consola/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/hookable/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/axios/index.js';
import 'file:///Users/marquis/scpsn/member/node_modules/@iconify/utils/lib/css/icon.js';
import 'file:///Users/marquis/scpsn/member/node_modules/perfect-debounce/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/unhead/dist/server.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/devalue/index.js';
import 'file:///Users/marquis/scpsn/member/node_modules/unhead/dist/utils.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useUser();
    const { cmsConfig } = useCMS();
    const statusClass = computed(() => {
      var _a, _b;
      const status = ((_b = (_a = user.value) == null ? void 0 : _a.status) == null ? void 0 : _b.toLowerCase()) || "active";
      return status === "active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100";
    });
    const renewalDate = computed(() => "Dec 31, 2026");
    const isDownloading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-10 max-w-7xl mx-auto animate-fade-in" }, _attrs))} data-v-5aac24a3><section class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-v-5aac24a3><div class="lg:col-span-2 bg-gradient-to-br from-[#003366] to-[#004080] rounded-[2rem] p-6 lg:p-10 text-white relative overflow-hidden group border border-white/10" style="${ssrRenderStyle(((_c = (_b = (_a = unref(cmsConfig)) == null ? void 0 : _a.member) == null ? void 0 : _b.portal) == null ? void 0 : _c.heroBg) ? { backgroundImage: `url(${unref(cmsConfig).member.portal.heroBg})`, backgroundSize: "cover", backgroundPosition: "center" } : {})}" data-v-5aac24a3>`);
      if (!((_f = (_e = (_d = unref(cmsConfig)) == null ? void 0 : _d.member) == null ? void 0 : _e.portal) == null ? void 0 : _f.heroBg)) {
        _push(`<div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" data-v-5aac24a3></div>`);
      } else {
        _push(`<div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]" data-v-5aac24a3></div>`);
      }
      _push(`<div class="relative z-10 space-y-6" data-v-5aac24a3><div class="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10" data-v-5aac24a3><span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" data-v-5aac24a3></span><span class="text-xs font-bold lowercase" data-v-5aac24a3>scientific network active</span></div><h1 class="text-4xl font-bold tracking-tight leading-none" data-v-5aac24a3>${ssrInterpolate(((_i = (_h = (_g = unref(cmsConfig)) == null ? void 0 : _g.member) == null ? void 0 : _h.portal) == null ? void 0 : _i.welcomeTitle) || "Welcome Back,")} <br data-v-5aac24a3> <span class="text-brand-cyan" data-v-5aac24a3>${ssrInterpolate(((_k = (_j = unref(user)) == null ? void 0 : _j.fullName) == null ? void 0 : _k.split(" ")[0]) || "Practitioner")}</span></h1><p class="text-white/80 text-sm font-medium max-w-md leading-relaxed" data-v-5aac24a3>${ssrInterpolate(((_n = (_m = (_l = unref(cmsConfig)) == null ? void 0 : _l.member) == null ? void 0 : _m.portal) == null ? void 0 : _n.welcomeSubtitle) || "Your credentials have been re-validated for the current diagnostic cycle. You have access to the latest pathological archives.")}</p><div class="flex items-center gap-6 pt-4" data-v-5aac24a3>`);
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
      _push(`</div></div></div><div class="bg-white rounded-[2rem] border border-slate-200 p-6 lg:p-10 flex flex-col justify-between" data-v-5aac24a3><div class="space-y-4" data-v-5aac24a3><span class="text-xs font-bold text-slate-400 lowercase" data-v-5aac24a3>membership identity</span><div class="flex items-center justify-between" data-v-5aac24a3><h3 class="text-2xl font-bold text-[#003366] tracking-tight leading-none" data-v-5aac24a3>${ssrInterpolate(((_o = unref(user)) == null ? void 0 : _o.category) || "Professional")}</h3><div class="${ssrRenderClass([unref(statusClass), "px-3 py-1 rounded-lg text-xs font-bold"])}" data-v-5aac24a3>${ssrInterpolate(((_p = unref(user)) == null ? void 0 : _p.status) || "Active")}</div></div><div class="pt-6 space-y-3" data-v-5aac24a3><div class="flex justify-between items-center text-xs font-bold" data-v-5aac24a3><span class="text-slate-400 lowercase" data-v-5aac24a3>renewal date</span><span class="text-slate-800" data-v-5aac24a3>${ssrInterpolate(unref(renewalDate))}</span></div><div class="h-2 bg-slate-100 rounded-full overflow-hidden" data-v-5aac24a3><div style="${ssrRenderStyle({ width: "75%" })}" class="h-full bg-brand-cyan" data-v-5aac24a3></div></div><p class="text-xs text-slate-400 font-medium" data-v-5aac24a3>75% of membership cycle remaining</p></div></div><button${ssrIncludeBooleanAttr(unref(isDownloading)) ? " disabled" : ""} class="w-full mt-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-[#003366] hover:bg-slate-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50" data-v-5aac24a3>`);
      if (unref(isDownloading)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:loader-2",
          class: "animate-spin",
          size: "18"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(isDownloading) ? "Generating ID..." : "Download Virtual ID")}</button></div></section><section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-v-5aac24a3><!--[-->`);
      ssrRenderList(_ctx.metrics, (metric) => {
        _push(`<div class="bg-white p-8 rounded-[1.5rem] border border-slate-200 group hover:border-[#003366]/20 transition-all" data-v-5aac24a3><div class="flex justify-between items-start mb-4" data-v-5aac24a3><div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#003366] border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-500" data-v-5aac24a3>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: metric.icon,
          size: "20"
        }, null, _parent));
        _push(`</div><span class="text-xs font-bold text-emerald-500 leading-none" data-v-5aac24a3>+${ssrInterpolate(metric.growth)}%</span></div><p class="text-sm font-semibold text-slate-500" data-v-5aac24a3>${ssrInterpolate(metric.label)}</p><h4 class="text-3xl font-bold text-slate-800 tracking-tight mt-1" data-v-5aac24a3>${ssrInterpolate(metric.value)}</h4></div>`);
      });
      _push(`<!--]--></section><div class="grid grid-cols-1 lg:grid-cols-3 gap-10" data-v-5aac24a3><div class="lg:col-span-2 space-y-6" data-v-5aac24a3><div class="flex items-center justify-between" data-v-5aac24a3><h3 class="text-xs font-black text-slate-400 lowercase" data-v-5aac24a3>latest scientific publications</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/library",
        class: "text-xs font-bold text-brand-cyan hover:underline lowercase"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`view all library`);
          } else {
            return [
              createTextVNode("view all library")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4" data-v-5aac24a3><!--[-->`);
      ssrRenderList(_ctx.recentPublications, (pub) => {
        _push(`<div class="bg-white p-5 rounded-2xl border border-slate-200 transition-all cursor-pointer group flex items-center gap-6 hover:border-brand-cyan hover:shadow-xl hover:shadow-[#003366]/5" data-v-5aac24a3><div class="w-14 h-16 bg-slate-50 rounded-xl flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-slate-100 group-hover:bg-[#003366] group-hover:text-white transition-all duration-300" data-v-5aac24a3>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-text",
          size: "24"
        }, null, _parent));
        _push(`<div class="absolute inset-x-0 bottom-0 h-1 bg-brand-cyan" data-v-5aac24a3></div></div><div class="flex-1 min-w-0" data-v-5aac24a3><div class="flex items-center gap-3" data-v-5aac24a3><h4 class="text-base font-bold text-slate-800 tracking-tight truncate group-hover:text-brand-cyan transition-colors" data-v-5aac24a3>${ssrInterpolate(pub.title)}</h4><span class="px-2 py-0.5 rounded-md text-[8px] font-black bg-slate-100 text-slate-500 lowercase" data-v-5aac24a3>${ssrInterpolate(pub.category)}</span></div><p class="text-xs text-slate-500 font-medium leading-relaxed line-clamp-1 mt-1" data-v-5aac24a3>${ssrInterpolate(pub.desc)}</p><div class="flex items-center gap-4 mt-2 text-[10px] font-bold text-slate-400 lowercase" data-v-5aac24a3><span data-v-5aac24a3>${ssrInterpolate(pub.date)}</span><div class="w-1 h-1 bg-slate-200 rounded-full" data-v-5aac24a3></div><span data-v-5aac24a3>${ssrInterpolate(pub.size)}</span></div></div><div class="p-3 text-slate-300 group-hover:text-brand-cyan transition-all group-hover:translate-x-1" data-v-5aac24a3>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:chevron-right",
          size: "20"
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div><div class="space-y-6" data-v-5aac24a3><h3 class="text-sm font-bold text-slate-500 lowercase" data-v-5aac24a3>quick support</h3><div class="bg-white p-6 lg:p-8 rounded-[2rem] border border-slate-200 space-y-6" data-v-5aac24a3><div class="space-y-2" data-v-5aac24a3><h4 class="text-sm font-bold text-[#003366]" data-v-5aac24a3>${ssrInterpolate(((_s = (_r = (_q = unref(cmsConfig)) == null ? void 0 : _q.member) == null ? void 0 : _r.portal) == null ? void 0 : _s.announcementTitle) || "Scientific Abstract Due")}</h4><p class="text-xs text-slate-500 font-medium leading-relaxed" data-v-5aac24a3>${ssrInterpolate(((_v = (_u = (_t = unref(cmsConfig)) == null ? void 0 : _t.member) == null ? void 0 : _u.portal) == null ? void 0 : _v.announcementText) || "The International Scientific Congress abstract submission is currently open for members.")}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: ((_y = (_x = (_w = unref(cmsConfig)) == null ? void 0 : _w.member) == null ? void 0 : _x.portal) == null ? void 0 : _y.announcementLink) || "/dashboard/abstracts",
        class: "block w-full text-center bg-[#003366] text-white py-4 rounded-xl text-sm font-bold hover:bg-[#004080] transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Take Action`);
          } else {
            return [
              createTextVNode("Take Action")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="h-[1px] bg-slate-100" data-v-5aac24a3></div><div class="flex items-center gap-4 text-slate-500 hover:text-[#003366] cursor-pointer transition-colors" data-v-5aac24a3><div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100" data-v-5aac24a3>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:help-circle",
        size: "18"
      }, null, _parent));
      _push(`</div><span class="text-sm font-bold text-[#003366]" data-v-5aac24a3>Enquiry Helpdesk</span></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5aac24a3"]]);

export { index as default };
//# sourceMappingURL=index-Cd-8ZKaU.mjs.map
