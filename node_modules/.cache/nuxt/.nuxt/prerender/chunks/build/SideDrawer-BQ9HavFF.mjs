import { _ as __nuxt_component_0 } from './server.mjs';
import { watch, useSSRContext } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {
  __name: "SideDrawer",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    title: String,
    subtitle: String,
    size: {
      type: String,
      default: "xl"
      // sm, md, lg, xl, full
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const sizeClasses = {
      sm: "lg:w-[400px]",
      md: "lg:w-[500px]",
      lg: "lg:w-[650px]",
      xl: "lg:w-1/2",
      full: "lg:w-full"
    };
    const paddingClasses = {
      sm: "px-5 py-5",
      md: "px-6 py-6",
      lg: "px-8 py-8",
      xl: "px-10 py-10",
      full: "px-12 py-12"
    };
    watch(() => props.isOpen, (newVal) => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="fixed inset-0 z-[9999] flex justify-end overflow-hidden" data-v-dbbba9a4><div class="absolute inset-0 bg-[#003366]/40 backdrop-blur-md" data-v-dbbba9a4></div>`);
          if (__props.isOpen) {
            _push2(`<div class="${ssrRenderClass([
              "relative h-full bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col pointer-events-auto transition-all duration-500 w-full",
              sizeClasses[__props.size] || sizeClasses.xl
            ])}" data-v-dbbba9a4><div class="${ssrRenderClass(["border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10", paddingClasses[__props.size] || paddingClasses.xl])}" data-v-dbbba9a4><div class="flex items-center gap-5" data-v-dbbba9a4><div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#003366] border border-slate-100" data-v-dbbba9a4>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:layers",
              size: "20"
            }, null, _parent));
            _push2(`</div><div data-v-dbbba9a4><h2 class="text-lg lg:text-xl font-black text-slate-800 tracking-tight leading-tight lowercase" data-v-dbbba9a4>${ssrInterpolate(__props.title)}</h2>`);
            if (__props.subtitle) {
              _push2(`<p class="text-[10px] font-black text-slate-400 mt-0.5 lowercase" data-v-dbbba9a4>${ssrInterpolate(__props.subtitle)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><button class="w-10 h-10 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center border border-slate-100 group" data-v-dbbba9a4>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:x",
              size: "20",
              class: "group-hover:rotate-90 transition-transform duration-300"
            }, null, _parent));
            _push2(`</button></div><div class="flex-1 overflow-y-auto w-full custom-scrollbar bg-white" data-v-dbbba9a4><div class="${ssrRenderClass(paddingClasses[__props.size] || paddingClasses.xl)}" data-v-dbbba9a4>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
            _push2(`</div></div>`);
            if (_ctx.$slots.footer) {
              _push2(`<div class="${ssrRenderClass(["border-t border-slate-100 bg-white shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]", paddingClasses[__props.size] || paddingClasses.xl])}" data-v-dbbba9a4>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SideDrawer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-dbbba9a4"]]), { __name: "SideDrawer" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=SideDrawer-BQ9HavFF.mjs.map
