import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, useSlots, ref, useId, computed, mergeProps, unref, useSSRContext } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderComponent } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    label: {},
    options: { default: () => [] },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false },
    errorMessage: { default: "" },
    showError: { type: Boolean, default: true },
    hasError: { type: Boolean, default: false },
    position: { default: "standalone" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const slots = useSlots();
    const showDropdown = ref(false);
    const isFocused = ref(false);
    ref(null);
    ref(null);
    const searchQuery = ref("");
    const inputId = useId();
    const getLabel = (option) => {
      if (typeof option === "string") return option;
      return option.label || option.name || option.value || option.code || String(option);
    };
    const getValue = (option) => {
      if (typeof option === "string") return option;
      return option.value || option.code || option.name || option;
    };
    const selectedLabel = computed(() => {
      const found = props.options.find((opt) => {
        const optValue = getValue(opt);
        return optValue === props.modelValue;
      });
      return found ? getLabel(found) : "";
    });
    const selectedOption = computed(() => {
      return props.options.find((opt) => {
        const optValue = getValue(opt);
        return optValue === props.modelValue;
      });
    });
    const filteredOptions = computed(() => {
      if (!searchQuery.value.trim()) {
        return props.options;
      }
      const query = searchQuery.value.toLowerCase();
      return props.options.filter((option) => {
        const label = getLabel(option).toLowerCase();
        return label.includes(query);
      });
    });
    const roundedClasses = computed(() => {
      switch (props.position) {
        case "top":
          return "rounded-t-xl rounded-b-sm";
        case "middle":
          return "rounded-sm";
        case "bottom":
          return "rounded-b-xl rounded-t-sm";
        case "standalone":
        default:
          return "rounded-xl";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-2" }, _attrs))} data-v-83a8f6b6><div class="relative input-container" data-v-83a8f6b6><label${ssrRenderAttr("for", unref(inputId))} class="${ssrRenderClass([
        "absolute transition-all duration-300 ease-in-out pointer-events-none z-10",
        isFocused.value || __props.modelValue ? "text-xs text-gray-500 left-3 top-2" : "text-base text-gray-500 left-3 top-1/2 transform -translate-y-1/2"
      ])}" data-v-83a8f6b6>${ssrInterpolate(__props.label)}</label><div class="${ssrRenderClass([
        "w-full py-4 pt-6 px-3 bg-gray-50 border border-gray-200 flex justify-between items-center cursor-pointer",
        "focus:outline-none focus:ring-1 focus:ring-[#033958] focus:border-[#033958] transition-all duration-300",
        roundedClasses.value,
        __props.disabled ? "opacity-50 cursor-not-allowed" : "",
        __props.hasError || __props.errorMessage && __props.showError ? "ring-1 ring-red-500 border-red-500" : ""
      ])}" data-v-83a8f6b6><span class="text-gray-900" data-v-83a8f6b6>`);
      if (slots["selected-label"] && selectedOption.value) {
        ssrRenderSlot(_ctx.$slots, "selected-label", { option: selectedOption.value }, null, _push, _parent);
      } else {
        _push(`<!--[-->${ssrInterpolate(selectedLabel.value)}<!--]-->`);
      }
      _push(`</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "transform rotate-180": showDropdown.value }, "w-4 h-4 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-83a8f6b6><path d="M6 9l6 6 6-6" data-v-83a8f6b6></path></svg></div>`);
      if (showDropdown.value) {
        _push(`<div class="absolute z-20 mt-1 w-full bg-white shadow-xl rounded-md overflow-hidden" data-v-83a8f6b6><div class="p-2 border-b-[0.5px] border-gray-50 sticky top-0 bg-white" data-v-83a8f6b6><div class="relative" data-v-83a8f6b6><svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-83a8f6b6><circle cx="11" cy="11" r="8" data-v-83a8f6b6></circle><path d="m21 21-4.35-4.35" data-v-83a8f6b6></path></svg><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search..." class="w-full pl-9 pr-3 py-3 border border-gray-100 rounded-xl focus:border-[#033958]/30 outline-none text-sm bg-gray-50" data-v-83a8f6b6></div></div><div class="max-h-60 overflow-y-auto p-1" data-v-83a8f6b6><!--[-->`);
        ssrRenderList(filteredOptions.value, (option, index) => {
          _push(`<div class="p-3 font-semibold hover:bg-gray-50 rounded-xl cursor-pointer transition-all text-sm text-gray-700 flex items-center justify-between group" data-v-83a8f6b6><div class="flex-1" data-v-83a8f6b6>`);
          if (slots.default) {
            ssrRenderSlot(_ctx.$slots, "default", {
              option,
              index
            }, null, _push, _parent);
          } else {
            _push(`<!--[-->${ssrInterpolate(getLabel(option))}<!--]-->`);
          }
          _push(`</div>`);
          if (getValue(option) === __props.modelValue) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:check",
              class: "w-4 h-4 text-[#033958]"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if (filteredOptions.value.length === 0) {
          _push(`<div class="p-4 text-center text-sm text-gray-500" data-v-83a8f6b6> No results found for &quot;${ssrInterpolate(searchQuery.value)}&quot; </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.errorMessage && __props.showError) {
        _push(`<div class="mt-2 flex items-center text-red-600 text-sm" data-v-83a8f6b6><svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" data-v-83a8f6b6><circle cx="12" cy="12" r="10" data-v-83a8f6b6></circle><line x1="12" x2="12" y1="8" y2="12" data-v-83a8f6b6></line><line x1="12" x2="12.01" y1="16" y2="16" data-v-83a8f6b6></line></svg> ${ssrInterpolate(__props.errorMessage)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SelectInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-83a8f6b6"]]), { __name: "SelectInput" });

export { __nuxt_component_4 as _ };
//# sourceMappingURL=SelectInput-DKSyFlyk.mjs.map
