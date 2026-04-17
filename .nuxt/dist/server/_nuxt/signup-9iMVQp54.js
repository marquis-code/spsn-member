import { _ as __nuxt_component_0$1 } from "./nuxt-link-BXZWVkx4.js";
import { defineComponent, useSlots, ref, useId, computed, mergeProps, unref, useSSRContext, reactive, withCtx, createVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { LucideChevronDown, LucidePhone, LucideCheck, LucideGlobe, LucideArrowLeft, LucideCheckCircle, LucideUpload, LucideArrowRight } from "lucide-vue-next";
import { G as GATEWAY_ENDPOINT, u as useCustomToast, A as AnimatedInput } from "./axios.config-5c6VR9gi.js";
import __nuxt_component_0 from "./index-Cngwfm37.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { useRouter } from "vue-router";
import "/Users/mac/Documents/spsn/member/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mac/Documents/spsn/member/node_modules/hookable/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/unctx/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/defu/dist/defu.mjs";
import "@iconify/vue";
import "/Users/mac/Documents/spsn/member/node_modules/klona/dist/index.mjs";
import "axios";
import "./user-Cv7HJ_sz.js";
import "@iconify/utils/lib/css/icon";
import "./composables-tvv8AvD7.js";
import "/Users/mac/Documents/spsn/member/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SelectInput.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SelectInput = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-83a8f6b6"]]), { __name: "SelectInput" });
const _sfc_main$1 = {
  __name: "PhoneInput",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    label: String,
    placeholder: { type: String, default: "801 234 5678" },
    required: Boolean,
    error: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const isOpen = ref(false);
    const searchQuery = ref("");
    const localNumber = ref("");
    const countries = [
      { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬", pattern: /^[0-9]{10,11}$/ },
      { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧", pattern: /^[0-9]{10}$/ },
      { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸", pattern: /^[0-9]{10}$/ },
      { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦", pattern: /^[0-9]{10}$/ },
      { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭", pattern: /^[0-9]{9}$/ },
      { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦", pattern: /^[0-9]{9}$/ },
      { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪", pattern: /^[0-9]{10,11}$/ },
      { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳", pattern: /^[0-9]{10}$/ }
    ];
    const selectedCountry = ref(countries[0]);
    const filteredCountries = computed(() => {
      if (!searchQuery.value) return countries;
      return countries.filter(
        (c) => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || c.dialCode.includes(searchQuery.value)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5 group" }, _attrs))} data-v-77c758e5>`);
      if (__props.label) {
        _push(`<label class="text-xs font-bold text-slate-400 pl-1 pointer-events-none group-focus-within:text-[#003366] transition-colors" data-v-77c758e5>${ssrInterpolate(__props.label)} `);
        if (__props.required) {
          _push(`<span class="text-red-500" data-v-77c758e5>*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative flex transition-all duration-300" data-v-77c758e5><div class="relative min-w-[100px]" data-v-77c758e5><button type="button" class="h-[60px] w-full flex items-center justify-between px-4 bg-gray-50 border border-slate-200 rounded-l-2xl hover:bg-white transition-all text-sm font-bold text-slate-700" data-v-77c758e5><span class="flex items-center gap-2" data-v-77c758e5><span class="text-lg" data-v-77c758e5>${ssrInterpolate(selectedCountry.value.flag)}</span><span data-v-77c758e5>${ssrInterpolate(selectedCountry.value.dialCode)}</span></span>`);
      _push(ssrRenderComponent(unref(LucideChevronDown), {
        size: 14,
        class: "text-slate-400"
      }, null, _parent));
      _push(`</button>`);
      if (isOpen.value) {
        _push(`<div class="absolute z-50 mt-2 w-[280px] bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-[#003366]/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200" data-v-77c758e5><div class="p-2 border-b border-slate-50" data-v-77c758e5><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search country..." class="w-full px-4 py-2 text-xs font-bold bg-slate-50 border-none rounded-xl focus:ring-0 outline-none" data-v-77c758e5></div><div class="max-h-[300px] overflow-y-auto custom-scrollbar" data-v-77c758e5><!--[-->`);
        ssrRenderList(filteredCountries.value, (country) => {
          _push(`<button type="button" class="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none" data-v-77c758e5><div class="flex items-center gap-3" data-v-77c758e5><span class="text-xl" data-v-77c758e5>${ssrInterpolate(country.flag)}</span><span class="text-[11px] font-bold text-slate-700" data-v-77c758e5>${ssrInterpolate(country.name)}</span></div><span class="text-[10px] font-black text-[#003366]" data-v-77c758e5>${ssrInterpolate(country.dialCode)}</span></button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex-grow" data-v-77c758e5><input${ssrRenderAttr("value", localNumber.value)} type="tel"${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""} class="${ssrRenderClass([
        "w-full h-[60px] px-5 bg-white border border-l-0 border-slate-200 rounded-r-2xl text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-[#003366]/5 focus:border-[#003366] outline-none transition-all",
        __props.error ? "border-red-300 bg-red-50/10" : ""
      ])}" data-v-77c758e5></div><div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" data-v-77c758e5>`);
      _push(ssrRenderComponent(unref(LucidePhone), {
        size: 18,
        class: __props.error ? "text-red-400" : "text-slate-300 group-focus-within:text-[#003366] transition-colors"
      }, null, _parent));
      _push(`</div></div>`);
      if (__props.error) {
        _push(`<p class="text-xs font-bold text-red-500 pl-4" data-v-77c758e5>${ssrInterpolate(__props.error)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PhoneInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PhoneInput = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-77c758e5"]]);
const members_api = {
  register: (payload) => GATEWAY_ENDPOINT.post("/members/register", payload),
  getProfile: (id) => GATEWAY_ENDPOINT.get(`/members/${id}`),
  updateProfile: (id, payload) => GATEWAY_ENDPOINT.patch(`/members/${id}`, payload)
};
const useRegisterMember = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const register = async (payload) => {
    loading.value = true;
    try {
      const res = await members_api.register(payload);
      showToast({
        title: "Success",
        message: "Membership application submitted successfully",
        toastType: "success"
      });
      return res.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: error.response?.data?.message || "Failed to submit application",
        toastType: "error"
      });
    } finally {
      loading.value = false;
    }
  };
  return { loading, register };
};
const media_api = {
  upload: (payload) => GATEWAY_ENDPOINT.post("/media/upload", payload, {
    headers: { "Content-Type": "multipart/form-data" }
  })
};
const useUploadFile = () => {
  const uploading = ref(false);
  const uploadResponse = ref(null);
  const { showToast } = useCustomToast();
  const uploadFile = async (file) => {
    uploading.value = true;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await media_api.upload(formData);
      uploadResponse.value = res.data;
      return res.data;
    } catch (error) {
      showToast({
        title: "Upload Error",
        message: error.response?.data?.message || "Failed to upload document",
        toastType: "error"
      });
      throw error;
    } finally {
      uploading.value = false;
    }
  };
  return { uploading, uploadResponse, uploadFile };
};
const useFormValidation = (form) => {
  const errors = ref({});
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePhone = (phone) => {
    if (!phone) return false;
    const stripped = phone.replace(/[^0-9]/g, "");
    return stripped.length >= 10;
  };
  const validateStep = (step) => {
    errors.value = {};
    let isValid = true;
    if (step === 1) {
      if (!form.fullName?.trim()) {
        errors.value.fullName = "Full Name is required for official certification";
        isValid = false;
      }
      if (!form.email?.trim() || !validateEmail(form.email)) {
        errors.value.email = "A valid scientific email address is required";
        isValid = false;
      }
      if (!form.password || form.password.length < 8) {
        errors.value.password = "Password must be at least 8 characters";
        isValid = false;
      }
      if (!form.phoneNumber?.trim() || !validatePhone(form.phoneNumber)) {
        errors.value.phoneNumber = "A valid contact number with country code is required";
        isValid = false;
      }
      if (!form.organization?.trim()) {
        errors.value.organization = "Host Institution/Organization is required";
        isValid = false;
      }
      if (!form.category) {
        errors.value.category = "Membership Segment must be selected";
        isValid = false;
      }
    }
    if (step === 3) {
      if (!form.professionalProfile?.bio?.trim() || form.professionalProfile.bio.length < 50) {
        errors.value.bio = "Scientific biography must be at least 50 characters";
        isValid = false;
      }
      if (!form.refereeName?.trim()) {
        errors.value.refereeName = "An active Fellow or Full Member referee is required";
        isValid = false;
      }
    }
    return isValid;
  };
  return {
    errors,
    validateStep,
    validateEmail,
    validatePhone
  };
};
const _sfc_main = {
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    const step = ref(1);
    const { loading } = useRegisterMember();
    useUploadFile();
    useRouter();
    const previews = reactive({});
    const fileTypes = reactive({});
    const uploadStatuses = reactive({});
    const categories = [
      { label: "Student Affiliate", value: "Student" },
      { label: "Associate Researcher", value: "Associate" },
      { label: "Full Practitioner", value: "Full" },
      { label: "Distinguished Fellow", value: "Fellow" }
    ];
    const documentFields = [
      { key: "passport", label: "Clinical Passport" },
      { key: "qualification", label: "Academic Standing" },
      { key: "license", label: "Practice Authorization" },
      { key: "cv", label: "Professional Dossier" },
      { key: "id", label: "Strategic Identity" },
      { key: "proofOfPayment", label: "Financial Verification" }
    ];
    const form = reactive({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      organization: "",
      category: "",
      professionalProfile: {
        bio: ""
      },
      refereeName: "",
      documents: {}
      // Store Cloudinary URLs here
    });
    const { errors } = useFormValidation(form);
    const isImage = (key) => {
      const type = fileTypes[key];
      if (type) return type.startsWith("image/");
      const url = previews[key];
      if (!url) return false;
      return url.toString().match(/\.(jpg|jpeg|png|webp|gif)/i);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-sans" }, _attrs))} data-v-5f646ddc><section class="hidden lg:flex lg:w-[45%] h-full relative overflow-hidden bg-[#003366] shrink-0" data-v-5f646ddc><img src="https://images.unsplash.com/photo-1579154235828-451993319242?q=80&amp;w=2070&amp;auto=format&amp;fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt="Scientific Research" data-v-5f646ddc><div class="absolute inset-0 bg-gradient-to-br from-[#003366]/80 to-transparent" data-v-5f646ddc></div><div class="relative z-10 p-16 flex flex-col justify-between h-full text-white" data-v-5f646ddc><div data-v-5f646ddc><div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#003366] font-bold mb-8 shadow-xl" data-v-5f646ddc> SP </div><h1 class="text-4xl font-extrabold tracking-tighter leading-tight mb-6" data-v-5f646ddc> Pioneering the Future of <br data-v-5f646ddc><span class="text-brand-cyan" data-v-5f646ddc>Cellular Science</span>. </h1><p class="text-white/70 text-sm font-medium leading-relaxed max-w-sm" data-v-5f646ddc> Join the elite network of practitioners dedicated to advancing diagnostic excellence across Nigeria. </p></div><div class="space-y-6" data-v-5f646ddc><div class="flex items-center gap-4 group" data-v-5f646ddc><div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors" data-v-5f646ddc>`);
      _push(ssrRenderComponent(unref(LucideCheck), { size: 16 }, null, _parent));
      _push(`</div><p class="text-xs font-bold" data-v-5f646ddc>Verified Credentials</p></div><div class="flex items-center gap-4 group" data-v-5f646ddc><div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors" data-v-5f646ddc>`);
      _push(ssrRenderComponent(unref(LucideGlobe), { size: 16 }, null, _parent));
      _push(`</div><p class="text-xs font-bold" data-v-5f646ddc>Global Recognition</p></div></div></div></section><main class="flex-1 overflow-y-auto bg-slate-50 relative custom-scrollbar" data-v-5f646ddc><div class="p-6 md:p-12 lg:p-16 xl:p-20 max-w-2xl mx-auto" data-v-5f646ddc><header class="mb-10 space-y-2" data-v-5f646ddc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "lg:hidden inline-flex items-center gap-2 mb-6 text-[#003366] font-bold text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LucideArrowLeft), { size: 14 }, null, _parent2, _scopeId));
            _push2(` Main Site `);
          } else {
            return [
              createVNode(unref(LucideArrowLeft), { size: 14 }),
              createTextVNode(" Main Site ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center justify-between" data-v-5f646ddc><h2 class="text-2xl font-bold text-slate-800 tracking-tight" data-v-5f646ddc>Membership Enrollment</h2><span class="text-xs font-bold text-slate-400" data-v-5f646ddc>Step ${ssrInterpolate(step.value)} of 3</span></div><div class="h-1 w-full bg-slate-200 rounded-full overflow-hidden" data-v-5f646ddc><div class="h-full bg-brand-cyan transition-all duration-700 ease-out" style="${ssrRenderStyle({ width: `${step.value / 3 * 100}%` })}" data-v-5f646ddc></div></div></header><form class="space-y-6 bg-white p-8 lg:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100" data-v-5f646ddc>`);
      if (step.value === 1) {
        _push(`<div class="space-y-4 animate-fade-in" data-v-5f646ddc><div class="flex flex-col gap-4" data-v-5f646ddc>`);
        _push(ssrRenderComponent(AnimatedInput, {
          modelValue: form.fullName,
          "onUpdate:modelValue": ($event) => form.fullName = $event,
          label: "Full Name & Rank",
          placeholder: "Dr. Jane Smith, FMCLS",
          required: "",
          error: unref(errors).fullName
        }, null, _parent));
        _push(ssrRenderComponent(AnimatedInput, {
          modelValue: form.email,
          "onUpdate:modelValue": ($event) => form.email = $event,
          type: "email",
          label: "Scientific Email",
          placeholder: "jane@institution.edu.ng",
          required: "",
          error: unref(errors).email
        }, null, _parent));
        _push(ssrRenderComponent(AnimatedInput, {
          modelValue: form.password,
          "onUpdate:modelValue": ($event) => form.password = $event,
          type: "password",
          label: "Create Access Password",
          placeholder: "Minimum 8 characters",
          required: "",
          error: unref(errors).password
        }, null, _parent));
        _push(ssrRenderComponent(PhoneInput, {
          modelValue: form.phoneNumber,
          "onUpdate:modelValue": ($event) => form.phoneNumber = $event,
          label: "Primary Contact",
          placeholder: "801 234 5678",
          required: "",
          error: unref(errors).phoneNumber
        }, null, _parent));
        _push(ssrRenderComponent(AnimatedInput, {
          modelValue: form.organization,
          "onUpdate:modelValue": ($event) => form.organization = $event,
          label: "Host Institution",
          placeholder: "University Teaching Hospital",
          required: "",
          error: unref(errors).organization
        }, null, _parent));
        _push(ssrRenderComponent(SelectInput, {
          modelValue: form.category,
          "onUpdate:modelValue": ($event) => form.category = $event,
          label: "Membership Segment",
          options: categories,
          required: "",
          error: unref(errors).category
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (step.value === 2) {
        _push(`<div class="space-y-6 animate-fade-in" data-v-5f646ddc><p class="text-xs text-slate-500 font-bold italic" data-v-5f646ddc>Please upload clear, digital scans of your professional documents.</p><div class="flex flex-col gap-6" data-v-5f646ddc><!--[-->`);
        ssrRenderList(documentFields, (doc) => {
          _push(`<div class="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100" data-v-5f646ddc><div class="flex items-center justify-between px-1" data-v-5f646ddc><label class="text-xs font-bold text-slate-500" data-v-5f646ddc>${ssrInterpolate(doc.label)} <span class="text-red-500" data-v-5f646ddc>*</span></label>`);
          if (uploadStatuses[doc.key] === "uploading") {
            _push(`<span class="text-xs font-bold text-amber-500 animate-pulse" data-v-5f646ddc>Uploading...</span>`);
          } else if (uploadStatuses[doc.key] === "success") {
            _push(`<span class="text-xs font-bold text-green-500 flex items-center gap-1" data-v-5f646ddc>`);
            _push(ssrRenderComponent(unref(LucideCheckCircle), { size: 10 }, null, _parent));
            _push(` Securely Stored </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="relative group" data-v-5f646ddc><input type="file" class="hidden" accept=".jpg,.jpeg,.png,.pdf" data-v-5f646ddc><div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all" data-v-5f646ddc>`);
          if (previews[doc.key]) {
            _push(`<div class="h-36 w-full relative group bg-slate-100/50" data-v-5f646ddc>`);
            if (isImage(doc.key)) {
              _push(`<img${ssrRenderAttr("src", previews[doc.key])} class="w-full h-full object-cover" data-v-5f646ddc>`);
            } else {
              _push(`<div class="w-full h-full relative group/pdf" data-v-5f646ddc><iframe${ssrRenderAttr("src", previews[doc.key] + "#toolbar=0&navpanes=0&scrollbar=0")} class="w-full h-full border-none pointer-events-none bg-white rounded-lg" data-v-5f646ddc></iframe><div class="absolute inset-0 bg-white/10 flex items-center justify-center opacity-0 group-hover/pdf:opacity-100 transition-opacity" data-v-5f646ddc>`);
              if (form.documents[doc.key]) {
                _push(`<a${ssrRenderAttr("href", form.documents[doc.key])} target="_blank" class="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#003366] shadow-2xl flex items-center gap-2 hover:scale-105 transition-all pointer-events-auto" data-v-5f646ddc>`);
                _push(ssrRenderComponent(unref(LucideGlobe), { size: 12 }, null, _parent));
                _push(` Inspect Document </a>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            }
            _push(`<button type="button" class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold backdrop-blur-md" data-v-5f646ddc><div class="flex flex-col items-center gap-2" data-v-5f646ddc>`);
            _push(ssrRenderComponent(unref(LucideUpload), { size: 20 }, null, _parent));
            _push(` Replace Document </div></button></div>`);
          } else {
            _push(`<button type="button"${ssrIncludeBooleanAttr(uploadStatuses[doc.key] === "uploading") ? " disabled" : ""} class="w-full flex items-center justify-center gap-4 py-8 border-2 border-dashed border-slate-200 hover:border-[#003366]/30 hover:bg-slate-50/50 transition-all rounded-xl group" data-v-5f646ddc><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003366] group-hover:bg-white transition-all" data-v-5f646ddc>`);
            _push(ssrRenderComponent(unref(LucideUpload), { size: 20 }, null, _parent));
            _push(`</div><div class="text-left" data-v-5f646ddc><p class="text-xs font-bold text-slate-700" data-v-5f646ddc>Select ${ssrInterpolate(doc.label)}</p><p class="text-xs text-slate-400 font-medium" data-v-5f646ddc>PDF, JPG, or PNG (Max 5MB)</p></div></button>`);
          }
          if (uploadStatuses[doc.key] === "uploading") {
            _push(`<div class="absolute bottom-0 left-0 h-1 bg-amber-400 animate-progress-indefinite w-full" data-v-5f646ddc></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (step.value === 3) {
        _push(`<div class="space-y-6 animate-fade-in" data-v-5f646ddc>`);
        _push(ssrRenderComponent(AnimatedInput, {
          modelValue: form.professionalProfile.bio,
          "onUpdate:modelValue": ($event) => form.professionalProfile.bio = $event,
          type: "textarea",
          label: "Professional Biography",
          placeholder: "Contextualize your research impact and institutional role...",
          rows: 4,
          required: "",
          error: unref(errors).bio
        }, null, _parent));
        _push(ssrRenderComponent(AnimatedInput, {
          modelValue: form.refereeName,
          "onUpdate:modelValue": ($event) => form.refereeName = $event,
          label: "Referee Full Name",
          placeholder: "Active Fellow or Full Member name",
          required: "",
          error: unref(errors).refereeName
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between pt-6 border-t border-slate-50" data-v-5f646ddc>`);
      if (step.value > 1) {
        _push(`<button type="button" class="text-sm font-bold text-[#003366] flex items-center gap-2 hover:translate-x-[-4px] transition-transform" data-v-5f646ddc>`);
        _push(ssrRenderComponent(unref(LucideArrowLeft), { size: 16 }, null, _parent));
        _push(` Back </button>`);
      } else {
        _push(`<div data-v-5f646ddc></div>`);
      }
      if (step.value < 3) {
        _push(`<button type="button"${ssrIncludeBooleanAttr(Object.values(uploadStatuses).includes("uploading")) ? " disabled" : ""} class="bg-[#003366] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-[#003366]/20 flex items-center gap-2 hover:bg-[#004080] transition-all active:scale-95 disabled:opacity-50" data-v-5f646ddc> Next Step `);
        _push(ssrRenderComponent(unref(LucideArrowRight), { size: 16 }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading) || Object.values(uploadStatuses).includes("uploading")) ? " disabled" : ""} class="bg-brand-cyan text-brand-dark px-10 py-4 rounded-xl text-sm font-bold shadow-lg shadow-brand-cyan/20 flex items-center gap-2 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50" data-v-5f646ddc>`);
        if (unref(loading)) {
          _push(`<span class="w-4 h-4 border-2 border-brand-dark/20 border-t-brand-dark rounded-full animate-spin" data-v-5f646ddc></span>`);
        } else {
          _push(`<span data-v-5f646ddc>Complete Enrollment</span>`);
        }
        _push(`</button>`);
      }
      _push(`</div></form><footer class="mt-12 text-center space-y-4" data-v-5f646ddc><p class="text-xs text-slate-500 font-medium" data-v-5f646ddc> Already a registered practitioner? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-[#003366] font-bold hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign In Here`);
          } else {
            return [
              createTextVNode("Sign In Here")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p class="text-xs text-slate-300 font-bold" data-v-5f646ddc> © 2026 Society for Cellular Pathology Scientists of Nigeria </p></footer></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5f646ddc"]]);
export {
  signup as default
};
//# sourceMappingURL=signup-9iMVQp54.js.map
