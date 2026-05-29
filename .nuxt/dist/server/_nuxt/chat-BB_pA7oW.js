import { _ as __nuxt_component_0 } from "./nuxt-link-6fT9np-V.js";
import { _ as __nuxt_component_0$1, c as useUser } from "../server.mjs";
import { computed, mergeProps, withCtx, createVNode, unref, toDisplayString, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "/Users/marquis/scpsn/member/node_modules/ufo/dist/index.mjs";
import "/Users/marquis/scpsn/member/node_modules/defu/dist/defu.mjs";
import "/Users/marquis/scpsn/member/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/marquis/scpsn/member/node_modules/hookable/dist/index.mjs";
import "/Users/marquis/scpsn/member/node_modules/unctx/dist/index.mjs";
import "/Users/marquis/scpsn/member/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue-router";
import "@iconify/vue";
import "/Users/marquis/scpsn/member/node_modules/klona/dist/index.mjs";
import "axios";
import "@iconify/utils/lib/css/icon";
import "/Users/marquis/scpsn/member/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/marquis/scpsn/member/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = {
  __name: "chat",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useUser();
    const userInitials = computed(() => {
      if (!user.value?.fullName) return "SC";
      return user.value.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen w-screen bg-[#F0F2F5] overflow-hidden flex flex-col font-sans antialiased" }, _attrs))} data-v-35d0fc7d><header class="h-16 bg-[#003366] text-white flex items-center justify-between px-6 shrink-0 shadow-lg z-[100]" data-v-35d0fc7d><div class="flex items-center gap-4" data-v-35d0fc7d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group",
        title: "Back to Dashboard"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-left",
              size: "20",
              class: "group-hover:-translate-x-1 transition-transform"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:arrow-left",
                size: "20",
                class: "group-hover:-translate-x-1 transition-transform"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-3" data-v-35d0fc7d><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#003366] font-black" data-v-35d0fc7d> SC </div><div data-v-35d0fc7d><h1 class="text-sm font-bold tracking-tight" data-v-35d0fc7d>Scientific Communication Hub</h1><p class="text-[10px] text-white/60 font-medium" data-v-35d0fc7d>Secure registry network</p></div></div></div><div class="flex items-center gap-6" data-v-35d0fc7d><div class="hidden md:flex items-center gap-6 pr-6 border-r border-white/10" data-v-35d0fc7d><div class="text-right" data-v-35d0fc7d><p class="text-[10px] font-bold text-brand-cyan" data-v-35d0fc7d>Network status</p><p class="text-[11px] font-medium text-emerald-400" data-v-35d0fc7d>Encrypted &amp; Online</p></div><div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10" data-v-35d0fc7d>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:shield-check",
        size: "20",
        class: "text-brand-cyan"
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/portfolio",
        class: "flex items-center gap-3 hover:opacity-80 transition-opacity"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-right hidden sm:block" data-v-35d0fc7d${_scopeId}><p class="text-xs font-bold" data-v-35d0fc7d${_scopeId}>${ssrInterpolate(unref(user)?.fullName || "Practitioner")}</p><p class="text-[10px] text-white/50" data-v-35d0fc7d${_scopeId}>${ssrInterpolate(unref(user)?.category || "Member")}</p></div><div class="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden" data-v-35d0fc7d${_scopeId}>`);
            if (unref(user)?.profilePicture) {
              _push2(`<img${ssrRenderAttr("src", unref(user).profilePicture)} class="w-full h-full object-cover" data-v-35d0fc7d${_scopeId}>`);
            } else {
              _push2(`<span class="font-bold text-xs" data-v-35d0fc7d${_scopeId}>${ssrInterpolate(userInitials.value)}</span>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "text-right hidden sm:block" }, [
                createVNode("p", { class: "text-xs font-bold" }, toDisplayString(unref(user)?.fullName || "Practitioner"), 1),
                createVNode("p", { class: "text-[10px] text-white/50" }, toDisplayString(unref(user)?.category || "Member"), 1)
              ]),
              createVNode("div", { class: "w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden" }, [
                unref(user)?.profilePicture ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: unref(user).profilePicture,
                  class: "w-full h-full object-cover"
                }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                  key: 1,
                  class: "font-bold text-xs"
                }, toDisplayString(userInitials.value), 1))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><main class="flex-1 relative overflow-hidden" data-v-35d0fc7d>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/chat.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const chat = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-35d0fc7d"]]);
export {
  chat as default
};
//# sourceMappingURL=chat-BB_pA7oW.js.map
