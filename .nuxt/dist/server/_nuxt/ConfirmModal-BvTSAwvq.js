import __nuxt_component_0 from "./index-Cngwfm37.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
const _sfc_main = {
  __name: "ConfirmModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    title: String,
    message: String,
    confirmText: String,
    cancelText: String,
    confirmStyle: {
      type: String,
      default: "danger"
    },
    icon: String
  },
  emits: ["confirm", "cancel"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4" }, _attrs))}><div class="bg-white w-full max-w-sm rounded-[2rem] p-8 shadow-2xl relative"><div class="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: __props.icon || "lucide:alert-triangle",
          size: "28"
        }, null, _parent));
        _push(`</div><div class="text-center mb-8"><h3 class="text-xl font-bold text-slate-800 tracking-tight">${ssrInterpolate(__props.title)}</h3><p class="text-sm font-medium text-slate-500 mt-2">${ssrInterpolate(__props.message)}</p></div><div class="flex gap-3"><button class="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all">${ssrInterpolate(__props.cancelText || "Cancel")}</button><button class="${ssrRenderClass([
          "flex-1 py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg text-white",
          __props.confirmStyle === "danger" ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20" : "bg-brand-cyan hover:bg-[#0090A0] shadow-brand-cyan/20"
        ])}">${ssrInterpolate(__props.confirmText || "Confirm")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=ConfirmModal-BvTSAwvq.js.map
