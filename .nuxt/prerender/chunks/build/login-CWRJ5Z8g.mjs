import { _ as __nuxt_component_1 } from './AnimatedInput-EWtNoB2_.mjs';
import { a as useCMS, _ as __nuxt_component_0, c as useUser, b as useCustomToast, G as GATEWAY_ENDPOINT } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-6fT9np-V.mjs';
import { ref, reactive, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/marquis/scpsn/member/node_modules/vue-router/vue-router.node.mjs';
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

const auth_api = {
  login: (payload) => GATEWAY_ENDPOINT.post("/auth/login", payload),
  register: (payload) => GATEWAY_ENDPOINT.post("/auth/register", payload)
};
const useLogin = () => {
  const loading = ref(false);
  const { setUser } = useUser();
  const { showToast } = useCustomToast();
  const login2 = async (payload) => {
    var _a, _b;
    loading.value = true;
    try {
      const res = await auth_api.login(payload);
      const { user, token } = res.data;
      setUser(user, token);
      showToast({
        title: "Success",
        message: "Logged in successfully",
        toastType: "success"
      });
      return res.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Login failed",
        toastType: "error"
      });
    } finally {
      loading.value = false;
    }
  };
  return { loading, login: login2 };
};
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { cmsConfig } = useCMS();
    const { loading } = useLogin();
    useRouter();
    ref(false);
    const form = reactive({
      email: "",
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const _component_AnimatedInput = __nuxt_component_1;
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 flex font-sans selection:bg-brand-cyan/20 overflow-hidden" }, _attrs))} data-v-a5a697c5><div class="hidden lg:flex lg:w-1/2 relative bg-brand-dark items-center justify-center p-20 overflow-hidden" data-v-a5a697c5><div class="absolute inset-0 opacity-40" data-v-a5a697c5><img${ssrRenderAttr("src", ((_c = (_b = (_a = unref(cmsConfig)) == null ? void 0 : _a.member) == null ? void 0 : _b.portal) == null ? void 0 : _c.loginBg) || "/images/hero/1.png")} class="w-full h-full object-cover animate-pulse duration-[10000ms]" data-v-a5a697c5></div><div class="absolute inset-0 bg-gradient-to-tr from-[#033958] via-transparent to-transparent" data-v-a5a697c5></div><div class="relative z-10 space-y-12 animate-in fade-in slide-in-from-bottom-12" data-v-a5a697c5><div class="h-20 w-20 bg-white rounded-3xl flex items-center justify-center text-[#033958] font-black text-3xl" data-v-a5a697c5>${ssrInterpolate(((_e = (_d = unref(cmsConfig)) == null ? void 0 : _d.global) == null ? void 0 : _e.siteName) ? unref(cmsConfig).global.siteName.split(" ").map((n) => n[0]).join("").substring(0, 2) : "SC")}</div><div class="space-y-6" data-v-a5a697c5><h1 class="text-6xl font-black text-white tracking-tighter leading-none" data-v-a5a697c5> Welcome <br data-v-a5a697c5> <span class="text-brand-cyan" data-v-a5a697c5>Back</span>. </h1><p class="text-xl text-white/50 font-medium max-w-md leading-relaxed" data-v-a5a697c5> Sign in to access your ${ssrInterpolate(((_g = (_f = unref(cmsConfig)) == null ? void 0 : _f.global) == null ? void 0 : _g.siteName) || "SCPSN")} account. </p></div><div class="flex items-center gap-6" data-v-a5a697c5><div class="flex -space-x-3" data-v-a5a697c5><!--[-->`);
      ssrRenderList(4, (i) => {
        _push(`<div class="w-10 h-10 rounded-full border-2 border-brand-dark bg-slate-200" data-v-a5a697c5></div>`);
      });
      _push(`<!--]--></div><p class="text-sm font-semibold text-white/60" data-v-a5a697c5>500+ members joined</p></div></div></div><div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-24 bg-white relative" data-v-a5a697c5><div class="w-full max-w-md space-y-12 relative z-10" data-v-a5a697c5><header class="space-y-4" data-v-a5a697c5><div class="inline-flex items-center gap-3 px-5 py-2 bg-slate-50 border border-slate-100 rounded-full" data-v-a5a697c5><div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" data-v-a5a697c5></div><span class="text-xs font-semibold text-slate-500" data-v-a5a697c5>Secure Connection</span></div><h2 class="text-4xl font-black text-[#033958] tracking-tighter leading-none" data-v-a5a697c5>Sign In.</h2><p class="text-sm text-slate-500 font-medium leading-relaxed" data-v-a5a697c5>Enter your details below to continue.</p></header><form class="space-y-8" data-v-a5a697c5><div class="space-y-6" data-v-a5a697c5><div class="space-y-3" data-v-a5a697c5>`);
      _push(ssrRenderComponent(_component_AnimatedInput, {
        modelValue: form.email,
        "onUpdate:modelValue": ($event) => form.email = $event,
        type: "email",
        label: "Email Address",
        placeholder: "john@example.com"
      }, {
        right: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:mail",
              class: "text-slate-300 group-focus-within:text-brand-cyan transition-colors",
              size: 20
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:mail",
                class: "text-slate-300 group-focus-within:text-brand-cyan transition-colors",
                size: 20
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-3" data-v-a5a697c5><div class="flex justify-between items-center mb-1" data-v-a5a697c5>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/forgot-password",
        class: "text-xs font-semibold text-brand-cyan hover:underline ml-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Forgot Password?`);
          } else {
            return [
              createTextVNode("Forgot Password?")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AnimatedInput, {
        modelValue: form.password,
        "onUpdate:modelValue": ($event) => form.password = $event,
        type: "password",
        label: "Password",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
      }, null, _parent));
      _push(`</div></div><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full bg-[#033958] text-white py-3 rounded-[32px] font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100" data-v-a5a697c5>`);
      if (unref(loading)) {
        _push(`<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" data-v-a5a697c5></span>`);
      } else {
        _push(`<span data-v-a5a697c5>Sign In</span>`);
      }
      if (!unref(loading)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:arrow-right",
          size: 18
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button></form><div class="text-center" data-v-a5a697c5><p class="text-sm font-medium text-slate-500 leading-relaxed" data-v-a5a697c5> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "text-brand-cyan font-bold hover:underline ml-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create an account`);
          } else {
            return [
              createTextVNode("Create an account")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><footer class="absolute bottom-12 left-1/2 -translate-x-1/2 w-full text-center px-6" data-v-a5a697c5><p class="text-xs font-semibold text-slate-400" data-v-a5a697c5>\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} ${ssrInterpolate(((_i = (_h = unref(cmsConfig)) == null ? void 0 : _h.global) == null ? void 0 : _i.siteName) || "Society for Cellular Pathology Scientists of Nigeria")}</p></footer></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a5a697c5"]]);

export { login as default };
//# sourceMappingURL=login-CWRJ5Z8g.mjs.map
