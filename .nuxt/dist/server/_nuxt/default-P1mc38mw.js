import { ref, mergeProps, unref, useSSRContext, customRef } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot } from "vue/server-renderer";
import { LucideCheckCircle, LucideXCircle, LucideAlertCircle, LucideInfo, LucideX } from "lucide-vue-next";
import __nuxt_component_0 from "./index-Cngwfm37.js";
import "socket.io-client";
import { parse } from "/Users/mac/Documents/spsn/member/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import { getRequestHeader, setCookie, getCookie, deleteCookie } from "/Users/mac/Documents/spsn/member/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import { isEqual } from "/Users/mac/Documents/spsn/member/node_modules/ohash/dist/index.mjs";
import { klona } from "/Users/mac/Documents/spsn/member/node_modules/klona/dist/index.mjs";
import { b as useNuxtApp, g as useRequestEvent, c as useRuntimeConfig } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "./composables-tvv8AvD7.js";
import "/Users/mac/Documents/spsn/member/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/defu/dist/defu.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mac/Documents/spsn/member/node_modules/hookable/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/mac/Documents/spsn/member/node_modules/ufo/dist/index.mjs";
const _sfc_main$2 = {
  __name: "CoreToast",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const toasts = ref([]);
    let nextId = 0;
    const showToast = (title, message, type = "info", duration = 5e3) => {
      const id = nextId++;
      toasts.value.push({ id, title, message, type });
      if (duration > 0) {
        setTimeout(() => {
          remove(id);
        }, duration);
      }
    };
    const remove = (id) => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    };
    __expose({
      showToast
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "enter-active-class": "transform ease-out duration-300 transition",
        "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
        "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
        "leave-active-class": "transition ease-in duration-100",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0",
        class: "fixed inset-0 flex flex-col items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-[9999]"
      }, _attrs))}>`);
      ssrRenderList(toasts.value, (toast) => {
        _push(`<div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden mb-3"><div class="p-4"><div class="flex items-start"><div class="flex-shrink-0">`);
        if (toast.type === "success") {
          _push(ssrRenderComponent(unref(LucideCheckCircle), { class: "h-6 w-6 text-green-400" }, null, _parent));
        } else if (toast.type === "error") {
          _push(ssrRenderComponent(unref(LucideXCircle), { class: "h-6 w-6 text-red-400" }, null, _parent));
        } else if (toast.type === "warning") {
          _push(ssrRenderComponent(unref(LucideAlertCircle), { class: "h-6 w-6 text-yellow-400" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(LucideInfo), { class: "h-6 w-6 text-blue-400" }, null, _parent));
        }
        _push(`</div><div class="ml-3 w-0 flex-1 pt-0.5"><p class="text-sm font-medium text-gray-900">${ssrInterpolate(toast.title)}</p><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(toast.message)}</p></div><div class="ml-4 flex-shrink-0 flex"><button class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"><span class="sr-only">Close</span>`);
        _push(ssrRenderComponent(unref(LucideX), { class: "h-5 w-5" }, null, _parent));
        _push(`</button></div></div></div></div>`);
      });
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/core/Toast.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
function parseCookieValue(value) {
  if (value === "undefined") {
    return void 0;
  }
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "number" && String(parsed) !== value) {
      return value;
    }
    return parsed;
  } catch {
    return value;
  }
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => parseCookieValue(decodeURIComponent(val)),
  encode: (val) => {
    if (typeof val !== "string" || val === "undefined") {
      return encodeURIComponent(JSON.stringify(val));
    }
    try {
      if (typeof JSON.parse(val) !== "string") {
        return encodeURIComponent(JSON.stringify(val));
      }
    } catch {
    }
    return encodeURIComponent(val);
  },
  refresh: false
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = cookieServerRef(name, cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      const valueIsSame = isEqual(cookie.value, cookies[name]);
      if (opts.readonly || valueIsSame && !opts.refresh) {
        return;
      }
      nuxtApp._cookiesChanged ||= {};
      if (valueIsSame && opts.refresh && !nuxtApp._cookiesChanged[name]) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function cookieServerRef(name, value) {
  const internalRef = ref(value);
  const nuxtApp = useNuxtApp();
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return internalRef.value;
      },
      set(newValue) {
        nuxtApp._cookiesChanged ||= {};
        nuxtApp._cookiesChanged[name] = true;
        internalRef.value = newValue;
        trigger();
      }
    };
  });
}
const _sfc_main$1 = {
  __name: "AIChatWidget",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    const input = ref("");
    ref(null);
    ref(null);
    const unreadCount = ref(0);
    useCookie("chat_room_id", { default: () => `guest_${Date.now()}` });
    const config = useRuntimeConfig();
    config.public.apiBase || "http://localhost:3001";
    const messages = ref([]);
    const formatTime = (ts) => {
      if (!ts) return "";
      return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-6 right-6 z-[100] font-sans" }, _attrs))} data-v-ed60a1b5><button class="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative group" aria-label="Open Chat" data-v-ed60a1b5>`);
      if (unreadCount.value > 0) {
        _push(`<div class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce" data-v-ed60a1b5>${ssrInterpolate(unreadCount.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isOpen.value) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "logos:whatsapp-icon",
          size: "32"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:x",
          size: "28"
        }, null, _parent));
      }
      _push(`<span class="absolute right-20 bg-white text-slate-800 px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100" data-v-ed60a1b5> Chat with us! </span></button>`);
      if (isOpen.value) {
        _push(`<div class="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] bg-[#E5DDD5] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-white/20" data-v-ed60a1b5><div class="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url(&#39;https://w0.peakpx.com/wallpaper/508/606/HD-wallpaper-whatsapp-l-light-patron-patrones.jpg&#39;)] bg-repeat" data-v-ed60a1b5></div><div class="bg-[#075E54] p-4 text-white flex items-center justify-between z-10 shadow-lg" data-v-ed60a1b5><div class="flex items-center gap-3" data-v-ed60a1b5><div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/10" data-v-ed60a1b5>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:bot",
          size: "20"
        }, null, _parent));
        _push(`</div><div data-v-ed60a1b5><h4 class="font-bold text-sm leading-tight" data-v-ed60a1b5>SCPSN Assistant</h4><p class="text-[10px] text-white/70 flex items-center gap-1.5 font-bold uppercase tracking-wider" data-v-ed60a1b5><span class="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" data-v-ed60a1b5></span> Online &amp; Secure </p></div></div><div class="flex gap-2" data-v-ed60a1b5><button class="p-2 hover:bg-white/10 rounded-full transition-colors" data-v-ed60a1b5>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:video",
          size: "18"
        }, null, _parent));
        _push(`</button><button class="p-2 hover:bg-white/10 rounded-full transition-colors" data-v-ed60a1b5>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:phone",
          size: "18"
        }, null, _parent));
        _push(`</button><button class="p-2 hover:bg-white/10 rounded-full transition-colors" data-v-ed60a1b5>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:more-vertical",
          size: "18"
        }, null, _parent));
        _push(`</button></div></div><div class="flex-grow overflow-y-auto p-4 space-y-3 z-10 scrollbar-thin" data-v-ed60a1b5><div class="flex justify-center my-4" data-v-ed60a1b5><span class="bg-[#D1E9FF] text-[9px] font-black text-[#075E54] px-3 py-1 rounded-lg uppercase tracking-[0.2em] shadow-sm" data-v-ed60a1b5> Today </span></div><!--[-->`);
        ssrRenderList(messages.value, (msg, i) => {
          _push(`<div class="${ssrRenderClass([
            "max-w-[85%] p-3 rounded-xl text-[13px] leading-relaxed relative shadow-md group animate-in fade-in slide-in-from-bottom-2 duration-300",
            msg.sender === "user" ? "ml-auto bg-[#DCF8C6] text-slate-800 rounded-tr-none" : "mr-auto bg-white text-slate-800 rounded-tl-none"
          ])}" data-v-ed60a1b5>`);
          if (msg.sender === "user") {
            _push(`<div class="absolute -top-0 -right-2 w-4 h-4 text-[#DCF8C6] fill-current" data-v-ed60a1b5><svg viewBox="0 0 16 16" data-v-ed60a1b5><path d="M16 0H0v16L16 0z" data-v-ed60a1b5></path></svg></div>`);
          } else {
            _push(`<div class="absolute -top-0 -left-2 w-4 h-4 text-white fill-current" data-v-ed60a1b5><svg viewBox="0 0 16 16" data-v-ed60a1b5><path d="M0 0h16v16L0 0z" data-v-ed60a1b5></path></svg></div>`);
          }
          if (msg.sender !== "user") {
            _push(`<div class="text-[9px] font-black text-[#075E54]/60 uppercase tracking-widest mb-1 flex items-center gap-1" data-v-ed60a1b5>`);
            if (msg.sender === "ai") {
              _push(ssrRenderComponent(_component_Icon, {
                name: "lucide:bot",
                size: "10"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(` ${ssrInterpolate(msg.senderName || "Assistant")}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="font-medium whitespace-pre-wrap" data-v-ed60a1b5>${ssrInterpolate(msg.text)}</p><div class="flex items-center justify-end gap-1 mt-1 opacity-70" data-v-ed60a1b5><span class="text-[9px] font-bold uppercase" data-v-ed60a1b5>${ssrInterpolate(formatTime(msg.createdAt))}</span>`);
          if (msg.sender === "user") {
            _push(`<div class="flex items-center" data-v-ed60a1b5>`);
            if (msg.status === "read") {
              _push(ssrRenderComponent(_component_Icon, {
                name: "lucide:check-check",
                size: "12",
                class: "text-sky-500"
              }, null, _parent));
            } else if (msg.status === "delivered") {
              _push(ssrRenderComponent(_component_Icon, {
                name: "lucide:check-check",
                size: "12",
                class: "text-slate-400"
              }, null, _parent));
            } else {
              _push(ssrRenderComponent(_component_Icon, {
                name: "lucide:check",
                size: "12",
                class: "text-slate-400"
              }, null, _parent));
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div><div class="p-3 bg-[#F0F2F5] flex items-center gap-2 z-10 border-t border-black/5" data-v-ed60a1b5><button class="p-2 hover:bg-black/5 rounded-full text-slate-500 transition-colors" data-v-ed60a1b5>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:smile",
          size: "24"
        }, null, _parent));
        _push(`</button><button class="p-2 hover:bg-black/5 rounded-full text-slate-500 transition-colors" data-v-ed60a1b5>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:paperclip",
          size: "24"
        }, null, _parent));
        _push(`</button><div class="flex-grow" data-v-ed60a1b5><input${ssrRenderAttr("value", input.value)} type="text" placeholder="Type a message" class="w-full px-5 py-3 bg-white border-none rounded-2xl text-sm font-medium focus:ring-0 outline-none shadow-sm" data-v-ed60a1b5></div><button${ssrIncludeBooleanAttr(!input.value.trim()) ? " disabled" : ""} class="w-12 h-12 bg-[#075E54] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-all active:scale-90 disabled:opacity-50 disabled:scale-100" data-v-ed60a1b5>`);
        if (input.value.trim()) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:send",
            size: "20",
            class: "ml-0.5"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:mic",
            size: "20"
          }, null, _parent));
        }
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AIChatWidget.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AIChatWidget = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ed60a1b5"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(AIChatWidget, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-P1mc38mw.js.map
