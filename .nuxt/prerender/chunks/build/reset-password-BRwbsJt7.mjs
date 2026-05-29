import { _ as __nuxt_component_1 } from './AnimatedInput-EWtNoB2_.mjs';
import { _ as __nuxt_component_0, g as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-6fT9np-V.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_0 } from './virtual_public-_8r7wFR-.mjs';
import { useRouter, useRoute } from 'file:///Users/marquis/scpsn/member/node_modules/vue-router/vue-router.node.mjs';
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
import 'file:///Users/marquis/scpsn/member/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/axios/index.js';
import 'file:///Users/marquis/scpsn/member/node_modules/@iconify/utils/lib/css/icon.js';
import 'file:///Users/marquis/scpsn/member/node_modules/perfect-debounce/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/unhead/dist/server.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/devalue/index.js';
import 'file:///Users/marquis/scpsn/member/node_modules/unhead/dist/utils.mjs';

const useResetPassword = () => {
  const loading = ref(false);
  const error = ref(null);
  const resetPassword2 = async (token, password) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase || "http://localhost:3000/api";
      const response = await $fetch(`${apiBase}/auth/reset-password`, {
        method: "POST",
        body: { token, password }
      });
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to update password";
      return null;
    } finally {
      loading.value = false;
    }
  };
  return { loading, error, resetPassword: resetPassword2 };
};
const _sfc_main = {
  __name: "reset-password",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const { loading, error } = useResetPassword();
    const password = ref("");
    const confirmPassword = ref("");
    const token = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AnimatedInput = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 flex font-sans selection:bg-brand-cyan/20 overflow-hidden" }, _attrs))} data-v-f3567305><div class="hidden lg:flex lg:w-1/2 relative bg-[#033958] items-center justify-center p-20 overflow-hidden" data-v-f3567305><div class="absolute inset-0 opacity-40" data-v-f3567305><img${ssrRenderAttr("src", _imports_0)} class="w-full h-full object-cover animate-pulse duration-[10000ms]" data-v-f3567305></div><div class="absolute inset-0 bg-gradient-to-tr from-[#033958] via-transparent to-transparent" data-v-f3567305></div><div class="relative z-10 space-y-12 animate-in fade-in slide-in-from-bottom-12" data-v-f3567305><div class="h-20 w-20 bg-white rounded-3xl flex items-center justify-center text-[#033958] font-black text-3xl cursor-pointer hover:rotate-12 transition-transform" data-v-f3567305> SC </div><div class="space-y-6" data-v-f3567305><h1 class="text-6xl font-black text-white tracking-tighter leading-none" data-v-f3567305> New <br data-v-f3567305> <span class="text-brand-cyan" data-v-f3567305>Security</span>. </h1><p class="text-xl text-white/50 font-medium max-w-md leading-relaxed" data-v-f3567305> Create a strong, unique password to ensure the continued security of your scientific credentials. </p></div></div></div><div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-24 bg-white relative" data-v-f3567305><div class="w-full max-w-md space-y-12 relative z-10" data-v-f3567305><header class="space-y-4" data-v-f3567305><div class="inline-flex items-center gap-3 px-5 py-2 bg-slate-50 border border-slate-100 rounded-full" data-v-f3567305><div class="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-ping" data-v-f3567305></div><span class="text-xs font-semibold text-slate-500" data-v-f3567305>Security Update</span></div><h2 class="text-4xl font-black text-[#033958] tracking-tighter leading-none" data-v-f3567305>Reset Password.</h2><p class="text-sm text-slate-500 font-medium leading-relaxed" data-v-f3567305>Enter your new password below to finalize the update.</p></header><form class="space-y-8" data-v-f3567305><div class="space-y-6" data-v-f3567305>`);
      _push(ssrRenderComponent(_component_AnimatedInput, {
        modelValue: password.value,
        "onUpdate:modelValue": ($event) => password.value = $event,
        type: "password",
        label: "New Password",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
      }, null, _parent));
      _push(ssrRenderComponent(_component_AnimatedInput, {
        modelValue: confirmPassword.value,
        "onUpdate:modelValue": ($event) => confirmPassword.value = $event,
        type: "password",
        label: "Confirm New Password",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
      }, null, _parent));
      _push(`</div>`);
      if (unref(error)) {
        _push(`<div class="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs font-bold text-rose-500" data-v-f3567305>${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading) || !token.value) ? " disabled" : ""} class="w-full bg-[#033958] text-white py-6 rounded-[32px] font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50" data-v-f3567305>`);
      if (unref(loading)) {
        _push(`<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" data-v-f3567305></span>`);
      } else {
        _push(`<span data-v-f3567305>Update Password</span>`);
      }
      if (!unref(loading)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:arrow-right",
          size: 18
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button></form><div class="text-center" data-v-f3567305>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-sm font-bold px-6 text-slate-400 hover:text-[#033958] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Return to Sign In `);
          } else {
            return [
              createTextVNode(" Return to Sign In ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><footer class="absolute bottom-12 left-1/2 -translate-x-1/2 w-full text-center px-6" data-v-f3567305><p class="text-xs font-semibold text-slate-400" data-v-f3567305>\xA9 2026 Society for Cellular Pathology Scientists of Nigeria</p></footer></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f3567305"]]);

export { resetPassword as default };
//# sourceMappingURL=reset-password-BRwbsJt7.mjs.map
