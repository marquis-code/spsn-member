import { resolveComponent, mergeProps, defineAsyncComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
const __nuxt_component_0_lazy = defineAsyncComponent(() => import("./AIChatWidget-CQoxMv5Q.js").then((c) => c.default || c));
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LazyAIChatWidget = __nuxt_component_0_lazy;
      const _component_LazyToast = resolveComponent("LazyToast");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_LazyAIChatWidget, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyToast, null, null, _parent));
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
//# sourceMappingURL=default-CbwDyGRn.js.map
