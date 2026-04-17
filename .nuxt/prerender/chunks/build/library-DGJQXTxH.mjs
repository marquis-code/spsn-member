import __nuxt_component_0 from './index-Cngwfm37.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BXZWVkx4.mjs';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/server-renderer/index.mjs';
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
  __name: "library",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useUser();
    const searchQuery = ref("");
    const selectedCategory = ref("all");
    const publications = ref([]);
    const filteredPublications = computed(() => {
      return publications.value.filter((pub) => {
        const matchesSearch = pub.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || pub.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = selectedCategory.value === "all" || pub.category === selectedCategory.value;
        return matchesSearch && matchesCategory;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-10 max-w-7xl mx-auto animate-fade-in" }, _attrs))} data-v-68f009a9><header class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/20 flex flex-col md:flex-row gap-8 items-center justify-between" data-v-68f009a9><div class="flex-1 min-w-0" data-v-68f009a9><h1 class="text-3xl font-bold text-slate-800 tracking-tight leading-none" data-v-68f009a9>Digital Library</h1><p class="text-sm font-semibold text-slate-400 mt-2" data-v-68f009a9>Authenticated Access to SCPSN Scientific Archives</p></div><div class="flex items-center gap-4 w-full md:w-auto" data-v-68f009a9><div class="relative flex-1 md:w-80 group" data-v-68f009a9><input${ssrRenderAttr("value", unref(searchQuery))} placeholder="Search publications..." class="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-6 rounded-2xl text-[11px] font-bold text-slate-600 focus:ring-4 focus:ring-brand-cyan/5 focus:border-brand-cyan/20 outline-none transition-all placeholder:text-slate-300" data-v-68f009a9>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        size: "18",
        class: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-cyan transition-colors"
      }, null, _parent));
      _push(`</div><select class="bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-xs font-bold text-[#003366] outline-none hover:border-brand-cyan/20 transition-all cursor-pointer" data-v-68f009a9><option value="all" data-v-68f009a9${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "all") : ssrLooseEqual(unref(selectedCategory), "all")) ? " selected" : ""}>All Categories</option><option value="journal" data-v-68f009a9${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "journal") : ssrLooseEqual(unref(selectedCategory), "journal")) ? " selected" : ""}>Scientific Journals</option><option value="guidelines" data-v-68f009a9${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "guidelines") : ssrLooseEqual(unref(selectedCategory), "guidelines")) ? " selected" : ""}>Clinical Guidelines</option><option value="monograph" data-v-68f009a9${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "monograph") : ssrLooseEqual(unref(selectedCategory), "monograph")) ? " selected" : ""}>Monographs</option><option value="digest" data-v-68f009a9${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "digest") : ssrLooseEqual(unref(selectedCategory), "digest")) ? " selected" : ""}>Congress Digests</option></select></div></header>`);
      if (((_a = unref(user)) == null ? void 0 : _a.status) !== "Active") {
        _push(`<div class="bg-amber-50 border border-amber-200 rounded-2xl p-8 flex items-center gap-8 shadow-lg shadow-amber-500/5" data-v-68f009a9><div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shrink-0 border border-amber-100" data-v-68f009a9>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:lock",
          size: "28"
        }, null, _parent));
        _push(`</div><div class="space-y-1" data-v-68f009a9><h4 class="text-sm font-bold text-amber-900" data-v-68f009a9>Access Restricted \u2022 Verification Required</h4><p class="text-xs text-amber-700/80 font-medium leading-relaxed" data-v-68f009a9>Full access to the digital library is exclusive to active members. Your status is currently <span class="font-bold text-amber-900" data-v-68f009a9>Pending</span>. Please complete your registration documents to unlock the archives.</p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/portfolio",
          class: "ml-auto bg-amber-500 text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-amber-600 transition-all whitespace-nowrap"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Verify Status`);
            } else {
              return [
                createTextVNode("Verify Status")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(filteredPublications).length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-v-68f009a9><!--[-->`);
        ssrRenderList(unref(filteredPublications), (pub) => {
          var _a2;
          _push(`<div class="${ssrRenderClass([((_a2 = unref(user)) == null ? void 0 : _a2.status) !== "Active" ? "opacity-50 grayscale pointer-events-none" : "cursor-pointer", "bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col group hover:border-brand-cyan/20 hover:shadow-2xl transition-all relative"])}" data-v-68f009a9><div class="mb-6 flex justify-between items-start" data-v-68f009a9><span class="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[8px] font-black text-brand-cyan uppercase tracking-widest" data-v-68f009a9>${ssrInterpolate(pub.category)}</span><button class="p-2 text-slate-300 hover:text-[#003366] transition-colors" data-v-68f009a9>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:bookmark",
            size: "18"
          }, null, _parent));
          _push(`</button></div><div class="w-full aspect-[4/5] bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 mb-8 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-inner" data-v-68f009a9>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:book-marked",
            size: "48",
            class: "text-slate-200"
          }, null, _parent));
          _push(`<div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" data-v-68f009a9></div></div><div class="space-y-3 flex-grow" data-v-68f009a9><h3 class="text-sm font-bold text-slate-800 tracking-tight leading-tight line-clamp-2 group-hover:text-[#003366] transition-colors" data-v-68f009a9>${ssrInterpolate(pub.title)}</h3><p class="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-3 italic" data-v-68f009a9>&quot;${ssrInterpolate(pub.description)}&quot;</p></div><div class="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between" data-v-68f009a9><div class="text-[8px] font-bold text-slate-400 uppercase tracking-widest" data-v-68f009a9>${ssrInterpolate(pub.publishDate)}</div><button class="flex items-center gap-3 text-[9px] font-black text-[#003366] uppercase tracking-widest group-hover:text-brand-cyan transition-colors" data-v-68f009a9> Secure Link `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:external-link",
            size: "14"
          }, null, _parent));
          _push(`</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="py-40 text-center flex flex-col items-center justify-center bg-white rounded-[4rem] border border-slate-100 shadow-inner group" data-v-68f009a9><div class="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center border border-slate-100 mb-8 group-hover:rotate-12 transition-transform duration-500" data-v-68f009a9>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-search",
          size: "32",
          class: "text-slate-200"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-slate-800 tracking-tight mb-2" data-v-68f009a9>No scientific matches found</h3><p class="text-xs text-slate-400 font-medium max-w-xs mx-auto leading-relaxed" data-v-68f009a9>Adjust your search parameters or filter by a different scientific category.</p><button class="mt-8 text-sm font-bold text-brand-cyan hover:underline" data-v-68f009a9>Reset Diagnostic Filter</button></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/library.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const library = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-68f009a9"]]);

export { library as default };
//# sourceMappingURL=library-DGJQXTxH.mjs.map
