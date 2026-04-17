import { _ as __nuxt_component_0 } from './nuxt-link-BXZWVkx4.mjs';
import __nuxt_component_0$1 from './index-Cngwfm37.mjs';
import { _ as _sfc_main$1 } from './ConfirmModal-BvTSAwvq.mjs';
import { useSSRContext, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/server-renderer/index.mjs';
import { u as useRoute, a as useRouter } from './server.mjs';
import { u as useUser } from './user-Cv7HJ_sz.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ufo/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/utils/lib/css/icon.js';
import './composables-tvv8AvD7.mjs';
import '../_/renderer.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/h3/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/destr/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ofetch/dist/node.mjs';
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
import 'file:///Users/mac/Documents/spsn/member/node_modules/unhead/dist/server.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/devalue/index.js';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/perfect-debounce/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/hookable/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/vue-router/vue-router.node.mjs';

const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { user, logOut: logOutUser } = useUser();
    const showLogoutModal = ref(false);
    const menuItems = [
      { label: "Dashboard", to: "/dashboard", icon: "lucide:layout-dashboard" },
      { label: "Profile", to: "/dashboard/portfolio", icon: "lucide:user-circle" },
      { label: "Library", to: "/dashboard/library", icon: "lucide:library" },
      { label: "Payments", to: "/dashboard/payments", icon: "lucide:credit-card" },
      { label: "Abstracts", to: "/dashboard/abstracts", icon: "lucide:file-text" },
      { label: "Support", to: "/dashboard/support", icon: "lucide:help-circle" }
    ];
    const pageTitle = computed(() => {
      const current = menuItems.find((item) => item.to === route.path);
      return current ? current.label : "Society Portal";
    });
    const userName = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.fullName) || "Member";
    });
    const userStatus = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.status) || "Active Member";
    });
    const userInitials = computed(() => {
      var _a;
      if (!((_a = user.value) == null ? void 0 : _a.fullName)) return "M";
      return user.value.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    });
    const confirmLogout = () => {
      showLogoutModal.value = false;
      logOutUser();
      router.push("/login");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      const _component_ConfirmModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden" }, _attrs))} data-v-e1a6edec><aside class="w-72 bg-[#003366] text-white flex-shrink-0 flex flex-col h-screen sticky top-0 z-50 transition-all duration-300" data-v-e1a6edec><div class="p-8 border-b border-white/5" data-v-e1a6edec><div class="flex items-center gap-4" data-v-e1a6edec><div class="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-[#003366] font-black shadow-lg" data-v-e1a6edec> SC </div><div data-v-e1a6edec><span class="font-bold text-white text-xs block" data-v-e1a6edec>Scientific Hub</span><p class="text-[10px] text-white/60 font-medium mt-0.5" data-v-e1a6edec>Society for Cellular Pathology</p></div></div></div><nav class="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar" data-v-e1a6edec><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.label,
          to: item.to,
          class: ["flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all group", unref(route).path === item.to ? "bg-white/10 text-white shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                size: "18",
                class: unref(route).path === item.to ? "text-brand-cyan" : "text-white/20 group-hover:text-white/60"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.label)}`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: item.icon,
                  size: "18",
                  class: unref(route).path === item.to ? "text-brand-cyan" : "text-white/20 group-hover:text-white/60"
                }, null, 8, ["name", "class"]),
                createTextVNode(" " + toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-6 border-t border-white/5 bg-black/10" data-v-e1a6edec><div class="flex items-center gap-4 mb-4" data-v-e1a6edec><div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/5" data-v-e1a6edec>${ssrInterpolate(unref(userInitials))}</div><div class="min-w-0" data-v-e1a6edec><h4 class="text-sm font-bold tracking-tight truncate" data-v-e1a6edec>${ssrInterpolate(unref(userName))}</h4><span class="text-xs font-semibold text-emerald-400 block mt-0.5" data-v-e1a6edec>${ssrInterpolate(unref(userStatus))}</span></div></div><button class="w-full py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20" data-v-e1a6edec> Secure Logout </button></div></aside><main class="flex-1 flex flex-col h-screen overflow-hidden" data-v-e1a6edec><header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0" data-v-e1a6edec><div class="flex items-center gap-10" data-v-e1a6edec><h2 class="text-2xl font-bold text-slate-800 tracking-tight" data-v-e1a6edec>${ssrInterpolate(unref(pageTitle))}</h2><div class="hidden md:flex items-center gap-4 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-full" data-v-e1a6edec>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        size: "16",
        class: "text-slate-400"
      }, null, _parent));
      _push(`<input placeholder="Search scientific journals..." class="bg-transparent text-xs font-medium outline-none w-64 text-slate-600" data-v-e1a6edec></div></div><div class="flex items-center gap-6" data-v-e1a6edec><button class="relative p-2 text-slate-400 hover:text-[#003366] transition-colors" data-v-e1a6edec>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:bell",
        size: "20"
      }, null, _parent));
      _push(`<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full" data-v-e1a6edec></span></button><div class="h-8 w-[1px] bg-slate-200" data-v-e1a6edec></div><div class="flex items-center gap-3" data-v-e1a6edec><div class="text-right hidden sm:block" data-v-e1a6edec><p class="text-xs font-bold text-slate-800 leading-none" data-v-e1a6edec>Cycle 2026</p><span class="text-[11px] font-medium text-slate-500" data-v-e1a6edec>Enrollment Active</span></div></div></div></header><div class="flex-1 overflow-y-auto p-10 custom-scrollbar-light bg-[#F8FAFC]" data-v-e1a6edec>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ConfirmModal, {
        isOpen: unref(showLogoutModal),
        title: "Secure Logout",
        message: "Are you sure you want to end your current session?",
        confirmText: "Logout",
        confirmStyle: "danger",
        icon: "lucide:log-out",
        onConfirm: confirmLogout,
        onCancel: ($event) => showLogoutModal.value = false
      }, null, _parent));
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e1a6edec"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-CcXOWKmc.mjs.map
