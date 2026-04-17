import __nuxt_component_0 from "./index-Cngwfm37.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "SideDrawer",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    title: String,
    subtitle: String
  },
  emits: ["close"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[100]" }, _attrs, {
        style: __props.isOpen ? null : { display: "none" }
      }))}><div class="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col pointer-events-auto" style="${ssrRenderStyle(__props.isOpen ? null : { display: "none" })}"><div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50"><div><h2 class="text-xl font-bold text-slate-800 tracking-tight">${ssrInterpolate(__props.title)}</h2>`);
      if (__props.subtitle) {
        _push(`<p class="text-xs font-semibold text-slate-500 mt-1">${ssrInterpolate(__props.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:x",
        size: "20"
      }, null, _parent));
      _push(`</button></div><div class="flex-1 overflow-y-auto w-full custom-scrollbar">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (_ctx.$slots.footer) {
        _push(`<div class="p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SideDrawer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=SideDrawer-o4j79hPK.js.map
