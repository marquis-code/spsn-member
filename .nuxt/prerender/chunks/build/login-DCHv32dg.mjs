import { _ as __nuxt_component_0 } from './nuxt-link-BXZWVkx4.mjs';
import { reactive, mergeProps, unref, withCtx, createVNode, createTextVNode, ref, useSSRContext } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/server-renderer/index.mjs';
import { LucideShieldCheck, LucideMail, LucideArrowRight } from 'file:///Users/mac/Documents/spsn/member/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { A as AnimatedInput, G as GATEWAY_ENDPOINT, u as useCustomToast } from './axios.config-5c6VR9gi.mjs';
import { u as useUser } from './user-Cv7HJ_sz.mjs';
import { useRouter } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue-router/vue-router.node.mjs';
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
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/vue/dist/iconify.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/axios/index.js';

const auth_api = {
  login: (payload) => GATEWAY_ENDPOINT.post("/auth/login", payload),
  register: (payload) => GATEWAY_ENDPOINT.post("/auth/register", payload)
};
const useLogin = () => {
  const loading = ref(false);
  const { setUser } = useUser();
  const { showToast } = useCustomToast();
  const login = async (payload) => {
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
  return { loading, login };
};
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { loading } = useLogin();
    useRouter();
    const form = reactive({
      email: "",
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden font-sans" }, _attrs))}><div class="absolute inset-0 overflow-hidden pointer-events-none opacity-40"><div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#003366]/5 rounded-full blur-[100px]"></div><div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00707E]/5 rounded-full blur-[100px]"></div></div><main class="w-full max-w-[440px] relative z-10"><header class="text-center mb-10 space-y-4"><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white shadow-sm border border-slate-200">`);
      _push(ssrRenderComponent(unref(LucideShieldCheck), {
        size: 14,
        class: "text-[#003366]"
      }, null, _parent));
      _push(`<span class="text-xs font-bold text-slate-500">Practitioner Portal</span></div><h1 class="text-4xl font-bold text-slate-800 tracking-tight"> SCPSN <span class="text-[#003366]">Member Login</span></h1><p class="text-slate-500 text-sm font-medium leading-relaxed px-4"> Access your professional dashboard and scientific resources. </p></header><section class="bg-white border border-slate-200 p-10 lg:p-12 rounded-3xl shadow-xl shadow-slate-200/40"><form class="space-y-6">`);
      _push(ssrRenderComponent(AnimatedInput, {
        modelValue: form.email,
        "onUpdate:modelValue": ($event) => form.email = $event,
        type: "email",
        label: "Email Address",
        placeholder: "practitioner@institution.edu.ng"
      }, {
        right: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LucideMail), {
              size: 18,
              class: "text-slate-400 group-focus-within:text-[#003366] transition-colors"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(LucideMail), {
                size: 18,
                class: "text-slate-400 group-focus-within:text-[#003366] transition-colors"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative">`);
      _push(ssrRenderComponent(AnimatedInput, {
        modelValue: form.password,
        "onUpdate:modelValue": ($event) => form.password = $event,
        type: "password",
        label: "Password",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
      }, null, _parent));
      _push(`</div><div class="pt-4"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full flex items-center justify-center gap-4 bg-[#003366] hover:bg-[#004080] text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50">`);
      if (unref(loading)) {
        _push(`<span class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>`);
      } else {
        _push(`<span class="flex items-center gap-2"> Sign In `);
        _push(ssrRenderComponent(unref(LucideArrowRight), { size: 16 }, null, _parent));
        _push(`</span>`);
      }
      _push(`</button></div></form><footer class="mt-10 pt-8 border-t border-slate-100 italic text-center"><p class="text-slate-400 text-[11px] font-medium leading-relaxed"> &quot;Advancing Pathology through Scientific Excellence &amp; Innovation&quot; </p></footer></section><nav class="mt-8 text-center"><p class="text-slate-500 text-xs font-medium"> Not yet a registered member? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "text-[#003366] font-bold hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Apply for Membership`);
          } else {
            return [
              createTextVNode("Apply for Membership")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></nav></main><footer class="absolute bottom-8 left-0 w-full text-center"><p class="text-xs font-bold text-slate-300">\xA9 2024 Society of Clinical Pathologists</p></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DCHv32dg.mjs.map
