import __nuxt_component_0 from './index-Cngwfm37.mjs';
import { ref, computed, mergeProps, unref, useSSRContext } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/server-renderer/index.mjs';
import { u as useUser } from './user-Cv7HJ_sz.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/utils/lib/css/icon.js';
import './server.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/h3/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ufo/dist/index.mjs';
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
import './composables-tvv8AvD7.mjs';
import '../_/renderer.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unhead/dist/server.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/devalue/index.js';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/perfect-debounce/dist/index.mjs';

const _sfc_main = {
  __name: "portfolio",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const { user } = useUser();
    const isSaving = ref(false);
    const profileData = ref({
      bio: ((_b = (_a = user.value) == null ? void 0 : _a.professionalProfile) == null ? void 0 : _b.bio) || "",
      education: ((_d = (_c = user.value) == null ? void 0 : _c.professionalProfile) == null ? void 0 : _d.education) || [],
      experience: ((_f = (_e = user.value) == null ? void 0 : _e.professionalProfile) == null ? void 0 : _f.experience) || []
    });
    const documentStatus = computed(() => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h;
      return {
        "Practicing License": ((_b2 = (_a2 = user.value) == null ? void 0 : _a2.documents) == null ? void 0 : _b2.license) ? "verified" : "missing",
        "Scientific BSc/MSc": ((_d2 = (_c2 = user.value) == null ? void 0 : _c2.documents) == null ? void 0 : _d2.qualification) ? "verified" : "missing",
        "National Passport": ((_f2 = (_e2 = user.value) == null ? void 0 : _e2.documents) == null ? void 0 : _f2.passport) ? "verified" : "missing",
        "Professional CV": ((_h = (_g = user.value) == null ? void 0 : _g.documents) == null ? void 0 : _h.cv) ? "verified" : "missing"
      };
    });
    const userInitials = computed(() => {
      var _a2;
      if (!((_a2 = user.value) == null ? void 0 : _a2.fullName)) return "M";
      return user.value.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2;
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-10 max-w-7xl mx-auto animate-fade-in" }, _attrs))} data-v-7dacede1><header class="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden" data-v-7dacede1><div class="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" data-v-7dacede1></div><div class="flex flex-col md:flex-row gap-10 items-center relative z-10" data-v-7dacede1><div class="w-32 h-32 rounded-3xl bg-[#003366] text-white flex items-center justify-center text-5xl font-black border-4 border-white shadow-2xl relative group" data-v-7dacede1>${ssrInterpolate(unref(userInitials))} <button class="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-cyan text-[#003366] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all border-4 border-white" data-v-7dacede1>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:camera",
        size: "16"
      }, null, _parent));
      _push(`</button></div><div class="flex-1 text-center md:text-left space-y-2" data-v-7dacede1><div class="flex flex-wrap items-center gap-4 justify-center md:justify-start" data-v-7dacede1><h1 class="text-4xl font-bold text-slate-800 tracking-tight leading-none" data-v-7dacede1>${ssrInterpolate((_a2 = unref(user)) == null ? void 0 : _a2.fullName)}</h1><span class="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-xs font-bold mt-1" data-v-7dacede1>Verified Practitioner</span></div><p class="text-sm font-semibold text-slate-400" data-v-7dacede1>${ssrInterpolate((_b2 = unref(user)) == null ? void 0 : _b2.category)} Member \u2022 Registry ID: ${ssrInterpolate(((_c2 = unref(user)) == null ? void 0 : _c2.membershipId) || "SC-PENDING")}</p><p class="text-sm font-medium text-slate-500 max-w-xl leading-relaxed italic" data-v-7dacede1>&quot;${ssrInterpolate(unref(profileData).bio || "Scientific bio not yet provided. Update your profile to showcase your expertise.")}&quot;</p></div><div class="flex flex-col gap-4" data-v-7dacede1><button${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="bg-[#003366] text-white px-10 py-4 rounded-xl text-xs font-bold shadow-xl shadow-[#003366]/20 hover:scale-105 transition-all disabled:opacity-50" data-v-7dacede1>${ssrInterpolate(unref(isSaving) ? "Syncing..." : "Sync Portfolio")}</button><button class="bg-white border border-slate-200 text-slate-400 px-10 py-4 rounded-xl text-xs font-bold hover:border-slate-800 hover:text-slate-800 transition-all" data-v-7dacede1>Export CV</button></div></div></header><div class="grid grid-cols-1 lg:grid-cols-3 gap-10" data-v-7dacede1><div class="lg:col-span-2 space-y-10" data-v-7dacede1><div class="bg-white rounded-[2rem] border border-slate-200 p-10 space-y-8" data-v-7dacede1><div class="flex items-center justify-between mb-4" data-v-7dacede1><h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]" data-v-7dacede1>Scientific Background</h3>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:file-edit",
        size: "16",
        class: "text-slate-300"
      }, null, _parent));
      _push(`</div><div class="space-y-6" data-v-7dacede1><div class="space-y-2" data-v-7dacede1><label class="text-[9px] font-black text-[#003366] uppercase tracking-widest ml-1" data-v-7dacede1>Professional Biography</label><textarea rows="4" placeholder="Scientific background and research priorities..." class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-[13px] font-medium text-slate-600 focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366]/20 outline-none transition-all resize-none shadow-inner" data-v-7dacede1>${ssrInterpolate(unref(profileData).bio)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-7dacede1><div class="space-y-4" data-v-7dacede1><div class="flex items-center justify-between" data-v-7dacede1><label class="text-[9px] font-black text-[#003366] uppercase tracking-widest" data-v-7dacede1>Education History</label><button class="p-1 hover:bg-slate-100 rounded-lg text-brand-cyan transition-all" data-v-7dacede1>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus-circle",
        size: "16"
      }, null, _parent));
      _push(`</button></div><div class="space-y-3" data-v-7dacede1><!--[-->`);
      ssrRenderList(unref(profileData).education, (edu, i) => {
        _push(`<div class="flex items-center gap-3 group" data-v-7dacede1><input${ssrRenderAttr("value", unref(profileData).education[i])} class="flex-1 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-[11px] font-bold text-slate-600 outline-none transition-all focus:border-brand-cyan focus:bg-white" data-v-7dacede1><button class="p-2 text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" data-v-7dacede1>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trash-2",
          size: "16"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--></div></div><div class="space-y-4" data-v-7dacede1><div class="flex items-center justify-between" data-v-7dacede1><label class="text-xs font-bold text-[#003366]" data-v-7dacede1>Clinical Experience</label><button class="p-1 hover:bg-slate-100 rounded-lg text-brand-cyan transition-all" data-v-7dacede1>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus-circle",
        size: "16"
      }, null, _parent));
      _push(`</button></div><div class="space-y-3" data-v-7dacede1><!--[-->`);
      ssrRenderList(unref(profileData).experience, (exp, i) => {
        _push(`<div class="flex items-center gap-3 group" data-v-7dacede1><input${ssrRenderAttr("value", unref(profileData).experience[i])} class="flex-1 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-xs font-medium text-slate-600 outline-none transition-all focus:border-brand-cyan focus:bg-white" data-v-7dacede1><button class="p-2 text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" data-v-7dacede1>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trash-2",
          size: "16"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div><div class="space-y-10" data-v-7dacede1><div class="bg-white rounded-[2rem] border border-slate-200 p-10 space-y-8 h-full" data-v-7dacede1><h3 class="text-sm font-bold text-slate-400" data-v-7dacede1>Validated Documents</h3><div class="space-y-6" data-v-7dacede1><!--[-->`);
      ssrRenderList(unref(documentStatus), (status, name) => {
        _push(`<div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-[#003366]/20 transition-all" data-v-7dacede1><div class="flex items-center gap-4" data-v-7dacede1><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#003366] shadow-sm border border-slate-100" data-v-7dacede1>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-text",
          size: "18"
        }, null, _parent));
        _push(`</div><div data-v-7dacede1><h5 class="text-xs font-bold text-slate-800" data-v-7dacede1>${ssrInterpolate(name)}</h5><p class="text-xs font-semibold text-slate-500 mt-0.5" data-v-7dacede1>${ssrInterpolate(status === "verified" ? "System Validated" : "Missing Requirement")}</p></div></div>`);
        if (status === "verified") {
          _push(`<div class="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20" data-v-7dacede1>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:check",
            size: "14"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<button class="text-xs font-bold text-brand-cyan hover:underline" data-v-7dacede1>Upload</button>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="p-8 bg-[#003366] text-white rounded-2xl space-y-4 shadow-xl shadow-[#003366]/10 text-center" data-v-7dacede1>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:shield-check",
        size: "32",
        class: "text-brand-cyan mx-auto"
      }, null, _parent));
      _push(`<p class="text-xs font-bold leading-relaxed" data-v-7dacede1>Your professional data is encrypted and validated by the SCPSN registry protocol.</p></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/portfolio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const portfolio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7dacede1"]]);

export { portfolio as default };
//# sourceMappingURL=portfolio-CXyWKGxM.mjs.map
