import { _ as __nuxt_component_0 } from './server.mjs';
import { mergeProps, unref, useSSRContext } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
import { u as useNotifications } from './useNotifications-Dn8u0OVl.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/h3/dist/index.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/ufo/dist/index.mjs';
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
  __name: "notifications",
  __ssrInlineRender: true,
  setup(__props) {
    const { notifications: notifications2 } = useNotifications();
    const getIcon = (type) => {
      switch (type) {
        case "success":
          return "lucide:check-circle";
        case "warning":
          return "lucide:alert-triangle";
        case "error":
          return "lucide:x-circle";
        default:
          return "lucide:info";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" }, _attrs))} data-v-839ec212><div class="flex items-center justify-between" data-v-839ec212><div data-v-839ec212><h1 class="text-3xl font-bold text-slate-800 tracking-tight" data-v-839ec212>Notifications</h1><p class="text-slate-500 font-medium mt-1 text-sm" data-v-839ec212>Stay updated with the latest activity in the scientific network.</p></div><button class="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:border-[#003366] hover:text-[#003366] transition-all" data-v-839ec212> Mark all as read </button></div><div class="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm" data-v-839ec212><div class="divide-y divide-slate-50" data-v-839ec212>`);
      if (unref(notifications2).length === 0) {
        _push(`<div class="p-20 text-center" data-v-839ec212><div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6" data-v-839ec212>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:bell-off",
          size: "32",
          class: "text-slate-200"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-slate-800" data-v-839ec212>No Notifications Yet</h3><p class="text-sm text-slate-400 mt-2" data-v-839ec212>When you receive updates, they will appear here.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(notifications2), (notif) => {
        _push(`<div class="${ssrRenderClass([{ "bg-blue-50/20": !notif.read }, "p-8 hover:bg-slate-50/50 transition-all flex gap-6 items-start group"])}" data-v-839ec212><div class="${ssrRenderClass([
          "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-transform group-hover:scale-110",
          notif.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : notif.type === "warning" ? "bg-amber-50 text-amber-600 border-amber-100" : notif.type === "error" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-blue-50 text-blue-600 border-blue-100"
        ])}" data-v-839ec212>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: getIcon(notif.type),
          size: "24"
        }, null, _parent));
        _push(`</div><div class="flex-1 space-y-2" data-v-839ec212><div class="flex items-center justify-between" data-v-839ec212><div class="flex items-center gap-3" data-v-839ec212><h4 class="text-base font-bold text-slate-800" data-v-839ec212>${ssrInterpolate(notif.title)}</h4>`);
        if (!notif.read) {
          _push(`<span class="px-2 py-0.5 bg-brand-cyan text-[#003366] text-[9px] font-black rounded-full tracking-widest" data-v-839ec212>New</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="text-xs font-medium text-slate-400" data-v-839ec212>${ssrInterpolate(notif.time)}</span></div><p class="text-sm text-slate-500 leading-relaxed max-w-3xl" data-v-839ec212>${ssrInterpolate(notif.message)}</p><div class="pt-4 flex items-center gap-4" data-v-839ec212>`);
        if (!notif.read) {
          _push(`<button class="text-[10px] font-black text-brand-cyan hover:underline" data-v-839ec212>Mark as read</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="text-[10px] font-black text-slate-400 hover:text-slate-800 transition-colors" data-v-839ec212>Archive</button></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/notifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const notifications = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-839ec212"]]);

export { notifications as default };
//# sourceMappingURL=notifications-D6P26woQ.mjs.map
