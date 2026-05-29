import { _ as __nuxt_component_0 } from './nuxt-link-6fT9np-V.mjs';
import { i as useRoute, d as useRouter, c as useUser, a as useCMS, _ as __nuxt_component_0$1 } from './server.mjs';
import { useSSRContext, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, createVNode, createTextVNode, toDisplayString } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderSlot } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
import { u as useNotifications } from './useNotifications-Dn8u0OVl.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as _sfc_main$2 } from './ConfirmModal-D0gIV_87.mjs';
import { u as useChat } from './useChat-Bdsdhj_f.mjs';
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

const _sfc_main$1 = {
  __name: "NotificationDropdown",
  __ssrInlineRender: true,
  emits: ["close", "select"],
  setup(__props, { emit: __emit }) {
    const { notifications } = useNotifications();
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
      const _component_Icon = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute right-0 mt-4 w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-right" }, _attrs))} data-v-dd7b4022><div class="p-6 border-b border-slate-50 flex items-center justify-between" data-v-dd7b4022><h3 class="text-base font-bold text-slate-800" data-v-dd7b4022>Notifications</h3><button class="text-[10px] font-black uppercase tracking-widest text-brand-cyan hover:text-[#003366] transition-colors" data-v-dd7b4022>Mark all as read</button></div><div class="max-h-[400px] overflow-y-auto custom-scrollbar-light" data-v-dd7b4022>`);
      if (unref(notifications).length === 0) {
        _push(`<div class="p-12 text-center" data-v-dd7b4022>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:bell-off",
          size: "32",
          class: "text-slate-200 mx-auto mb-3"
        }, null, _parent));
        _push(`<p class="text-xs font-bold text-slate-400" data-v-dd7b4022>No new notifications</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(notifications), (notif) => {
        _push(`<div class="${ssrRenderClass([{ "bg-blue-50/30": !notif.read }, "p-5 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-none flex gap-4 items-start"])}" data-v-dd7b4022><div class="${ssrRenderClass([
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
          notif.type === "success" ? "bg-emerald-50 text-emerald-500 border-emerald-100" : notif.type === "warning" ? "bg-amber-50 text-amber-500 border-amber-100" : notif.type === "error" ? "bg-rose-50 text-rose-500 border-rose-100" : "bg-blue-50 text-blue-500 border-blue-100"
        ])}" data-v-dd7b4022>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: getIcon(notif.type),
          size: "18"
        }, null, _parent));
        _push(`</div><div class="space-y-1 flex-1" data-v-dd7b4022><div class="flex items-center justify-between" data-v-dd7b4022><h4 class="text-sm font-bold text-slate-800" data-v-dd7b4022>${ssrInterpolate(notif.title)}</h4><span class="text-[10px] font-medium text-slate-400" data-v-dd7b4022>${ssrInterpolate(notif.time)}</span></div><p class="text-xs text-slate-500 leading-relaxed line-clamp-2" data-v-dd7b4022>${ssrInterpolate(notif.message)}</p></div>`);
        if (!notif.read) {
          _push(`<div class="w-2 h-2 bg-brand-cyan rounded-full mt-1.5 shrink-0" data-v-dd7b4022></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/notifications",
        class: "block p-4 text-center text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-[#003366] transition-all bg-slate-50/50",
        onClick: ($event) => _ctx.$emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View all notifications `);
          } else {
            return [
              createTextVNode(" View all notifications ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NotificationDropdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-dd7b4022"]]);
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { user, logOut: logOutUser } = useUser();
    const { unreadCount } = useNotifications();
    const { chats } = useChat();
    const { cmsConfig } = useCMS();
    const isSidebarOpen = ref(false);
    const isNotifOpen = ref(false);
    const showLogoutModal = ref(false);
    const unreadChatCount = computed(() => chats.value.reduce((acc, c) => acc + c.unreadCount, 0));
    const menuItems = [
      { label: "Dashboard", to: "/dashboard", icon: "lucide:layout-dashboard" },
      { label: "Scientific Chat", to: "/dashboard/chat", icon: "lucide:message-square" },
      { label: "Notifications", to: "/dashboard/notifications", icon: "lucide:bell" },
      { label: "Profile Registry", to: "/dashboard/portfolio", icon: "lucide:user-circle" },
      { label: "Scientific Library", to: "/dashboard/library", icon: "lucide:library" },
      { label: "Payments", to: "/dashboard/payments", icon: "lucide:credit-card" },
      { label: "Abstracts", to: "/dashboard/abstracts", icon: "lucide:file-text" },
      { label: "Support", to: "/dashboard/support", icon: "lucide:help-circle" }
    ];
    const pageTitle = computed(() => {
      const current = menuItems.find((item) => item.to === route.path);
      return current ? current.label : "Scientific Portal";
    });
    const userName = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.fullName) || "Practitioner";
    });
    const userStatus = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.status) || "Active Member";
    });
    const userInitials = computed(() => {
      var _a;
      if (!((_a = user.value) == null ? void 0 : _a.fullName)) return "SC";
      return user.value.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    });
    const handleNotifSelect = (notif) => {
      isNotifOpen.value = false;
      router.push("/dashboard/notifications");
    };
    const confirmLogout = () => {
      showLogoutModal.value = false;
      logOutUser();
      router.push("/login");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      const _component_NotificationDropdown = __nuxt_component_2;
      const _component_ConfirmModal = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden relative" }, _attrs))} data-v-dc0de846>`);
      if (isSidebarOpen.value) {
        _push(`<div class="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300" data-v-dc0de846></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "w-72 bg-[#003366] text-white flex-shrink-0 flex flex-col h-screen fixed lg:sticky top-0 z-[70] transition-transform duration-300 ease-in-out lg:translate-x-0",
        isSidebarOpen.value ? "translate-x-0" : "-translate-x-full"
      ])}" data-v-dc0de846><div class="p-8 border-b border-white/5" data-v-dc0de846><div class="flex items-center gap-4" data-v-dc0de846><div class="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-[#003366] font-black overflow-hidden" data-v-dc0de846>`);
      if ((_c = (_b = (_a = unref(cmsConfig)) == null ? void 0 : _a.member) == null ? void 0 : _b.portal) == null ? void 0 : _c.sidebarLogo) {
        _push(`<img${ssrRenderAttr("src", unref(cmsConfig).member.portal.sidebarLogo)} class="w-full h-full object-cover" data-v-dc0de846>`);
      } else {
        _push(`<span data-v-dc0de846>${ssrInterpolate(((_f = (_e = (_d = unref(cmsConfig)) == null ? void 0 : _d.member) == null ? void 0 : _e.portal) == null ? void 0 : _f.siteInitials) || "SC")}</span>`);
      }
      _push(`</div><div data-v-dc0de846><span class="font-bold text-white text-xs block uppercase tracking-widest" data-v-dc0de846>${ssrInterpolate(((_i = (_h = (_g = unref(cmsConfig)) == null ? void 0 : _g.member) == null ? void 0 : _h.portal) == null ? void 0 : _i.siteName) || "Scientific Hub")}</span><p class="text-[10px] text-white/60 font-medium mt-0.5" data-v-dc0de846>${ssrInterpolate(((_l = (_k = (_j = unref(cmsConfig)) == null ? void 0 : _j.member) == null ? void 0 : _k.portal) == null ? void 0 : _l.siteName) ? "Member Portal" : "Society for Cellular Pathology")}</p></div></div></div><nav class="flex-1 overflow-y-auto py-8 px-4 space-y-1.5 custom-scrollbar" data-v-dc0de846><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.label,
          to: item.to,
          onClick: ($event) => isSidebarOpen.value = false,
          class: ["flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all group relative overflow-hidden", unref(route).path === item.to ? "bg-white/10 text-white shadow-lg shadow-black/10" : "text-white/50 hover:text-white hover:bg-white/5"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(route).path === item.to) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand-cyan rounded-r-full" data-v-dc0de846${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                size: "18",
                class: unref(route).path === item.to ? "text-brand-cyan" : "text-white/20 group-hover:text-white/60"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.label)} `);
              if (item.label === "Chat" && unreadChatCount.value > 0) {
                _push2(`<span class="ml-auto w-5 h-5 bg-brand-cyan text-[#003366] text-[10px] font-black rounded-full flex items-center justify-center" data-v-dc0de846${_scopeId}>${ssrInterpolate(unreadChatCount.value)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.label === "Notifications" && unref(unreadCount) > 0) {
                _push2(`<span class="ml-auto w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center" data-v-dc0de846${_scopeId}>${ssrInterpolate(unref(unreadCount))}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(route).path === item.to ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand-cyan rounded-r-full"
                })) : createCommentVNode("", true),
                createVNode(_component_Icon, {
                  name: item.icon,
                  size: "18",
                  class: unref(route).path === item.to ? "text-brand-cyan" : "text-white/20 group-hover:text-white/60"
                }, null, 8, ["name", "class"]),
                createTextVNode(" " + toDisplayString(item.label) + " ", 1),
                item.label === "Chat" && unreadChatCount.value > 0 ? (openBlock(), createBlock("span", {
                  key: 1,
                  class: "ml-auto w-5 h-5 bg-brand-cyan text-[#003366] text-[10px] font-black rounded-full flex items-center justify-center"
                }, toDisplayString(unreadChatCount.value), 1)) : createCommentVNode("", true),
                item.label === "Notifications" && unref(unreadCount) > 0 ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: "ml-auto w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center"
                }, toDisplayString(unref(unreadCount)), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-6 border-t border-white/5 bg-black/10" data-v-dc0de846><div class="flex items-center gap-4 mb-4" data-v-dc0de846><div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/5" data-v-dc0de846>`);
      if ((_m = unref(user)) == null ? void 0 : _m.profilePicture) {
        _push(`<img${ssrRenderAttr("src", unref(user).profilePicture)} class="w-full h-full object-cover rounded-xl" data-v-dc0de846>`);
      } else {
        _push(`<span data-v-dc0de846>${ssrInterpolate(userInitials.value)}</span>`);
      }
      _push(`</div><div class="min-w-0" data-v-dc0de846><h4 class="text-sm font-bold tracking-tight truncate" data-v-dc0de846>${ssrInterpolate(userName.value)}</h4><span class="text-xs font-semibold text-emerald-400 block mt-0.5 uppercase tracking-tighter" data-v-dc0de846>${ssrInterpolate(userStatus.value)}</span></div></div><button class="w-full py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20 flex items-center justify-center gap-2" data-v-dc0de846>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:log-out",
        size: "14"
      }, null, _parent));
      _push(` Logout </button></div></aside><main class="flex-1 flex flex-col h-screen overflow-hidden w-full relative" data-v-dc0de846><header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-[50]" data-v-dc0de846><div class="flex items-center gap-4 lg:gap-8" data-v-dc0de846><button class="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors" data-v-dc0de846>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:menu",
        size: "24"
      }, null, _parent));
      _push(`</button><div class="hidden sm:block" data-v-dc0de846><h2 class="text-lg lg:text-xl font-black text-slate-800 tracking-tighter uppercase" data-v-dc0de846>${ssrInterpolate(pageTitle.value)}</h2></div><div class="hidden lg:block w-64 group relative" data-v-dc0de846><input type="text" placeholder="Search registry..." class="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#003366]/5 focus:border-[#003366]/20 outline-none transition-all placeholder:text-slate-400" data-v-dc0de846>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        size: "14",
        class: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003366] transition-colors"
      }, null, _parent));
      _push(`</div></div><div class="flex items-center gap-2 lg:gap-6" data-v-dc0de846><div class="relative" data-v-dc0de846><button class="${ssrRenderClass([{ "bg-slate-50 text-[#003366]": isNotifOpen.value }, "relative p-2.5 text-slate-400 hover:text-[#003366] hover:bg-slate-50 rounded-xl transition-all"])}" data-v-dc0de846>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:bell",
        size: "20"
      }, null, _parent));
      if (unref(unreadCount) > 0) {
        _push(`<span class="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" data-v-dc0de846></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (isNotifOpen.value) {
        _push(ssrRenderComponent(_component_NotificationDropdown, {
          onClose: ($event) => isNotifOpen.value = false,
          onSelect: handleNotifSelect
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden sm:block h-8 w-[1px] bg-slate-100 mx-2" data-v-dc0de846></div><div class="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100" data-v-dc0de846><div class="text-right hidden sm:block" data-v-dc0de846><p class="text-[10px] font-black text-[#003366] leading-none uppercase tracking-widest" data-v-dc0de846>Cycle 2026</p><span class="text-[9px] font-bold text-emerald-500 uppercase mt-1 block" data-v-dc0de846>Active Registry</span></div></div></div></header><div class="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar-light bg-[#F8FAFC]" data-v-dc0de846>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ConfirmModal, {
        isOpen: showLogoutModal.value,
        title: "Secure Logout",
        message: "Are you sure you want to end your current session? You will need to re-authenticate to access the registry.",
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
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc0de846"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-AOdQf5va.mjs.map
