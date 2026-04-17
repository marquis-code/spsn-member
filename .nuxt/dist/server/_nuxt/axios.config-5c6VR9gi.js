import { defineComponent, ref, useId, computed, watch, unref, useSSRContext } from "vue";
import { ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderSlot, ssrRenderTeleport, ssrRenderList, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import axios from "axios";
import { u as useUser } from "./user-Cv7HJ_sz.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AnimatedInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    label: {},
    type: { default: "text" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    autocomplete: { default: "off" },
    errorMessage: { default: "" },
    showError: { type: Boolean, default: true },
    position: { default: "standalone" },
    hasError: { type: Boolean, default: false },
    rows: { default: 4 }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isFocused = ref(false);
    const showPassword = ref(false);
    const showDatePicker = ref(false);
    const showTimePicker = ref(false);
    const showDateTimePicker = ref(false);
    const inputId = useId();
    ref(null);
    const currentMonth = ref((/* @__PURE__ */ new Date()).getMonth());
    const currentYear = ref((/* @__PURE__ */ new Date()).getFullYear());
    const selectedDate = ref(null);
    const dtSelectedDate = ref(null);
    const selectedHour = ref("12");
    const selectedMinute = ref("00");
    const selectedPeriod = ref("PM");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const computedType = computed(() => {
      if (props.type === "password") return showPassword.value ? "text" : "password";
      if (props.type === "date" || props.type === "time" || props.type === "datetime-local") return "text";
      return props.type;
    });
    const displayValue = computed(() => {
      if (props.type === "date" && props.modelValue) return formatDateDisplay(new Date(props.modelValue));
      if (props.type === "time" && props.modelValue) return props.modelValue;
      if (props.type === "datetime-local" && props.modelValue) {
        const parsed = parseDTString(props.modelValue);
        return parsed ? `${formatDateDisplay(parsed.date)} • ${parsed.hour}:${parsed.minute} ${parsed.period}` : props.modelValue;
      }
      return props.modelValue;
    });
    const roundedClasses = computed(() => {
      switch (props.position) {
        case "top":
          return "rounded-t-xl rounded-b-sm";
        case "middle":
          return "rounded-sm";
        case "bottom":
          return "rounded-b-xl rounded-t-sm";
        default:
          return "rounded-xl";
      }
    });
    const yearRange = computed(() => {
      const current = (/* @__PURE__ */ new Date()).getFullYear();
      return Array.from({ length: 111 }, (_, i) => current - 100 + i);
    });
    const calendarDays = computed(() => {
      return generateCalendar(selectedDate.value);
    });
    const dtCalendarDays = computed(() => {
      return generateCalendar(dtSelectedDate.value);
    });
    function generateCalendar(compareDate) {
      const firstDay = new Date(currentYear.value, currentMonth.value, 1);
      const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
      const prevLastDay = new Date(currentYear.value, currentMonth.value, 0);
      const firstDayOfWeek = firstDay.getDay();
      const days = [];
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = prevLastDay.getDate() - i;
        const fullDate = new Date(currentYear.value, currentMonth.value - 1, date);
        fullDate.setHours(0, 0, 0, 0);
        days.push({
          date,
          fullDate,
          isCurrentMonth: false,
          isToday: fullDate.getTime() === today.getTime(),
          isSelected: compareDate ? fullDate.getTime() === compareDate.getTime() : false
        });
      }
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const fullDate = new Date(currentYear.value, currentMonth.value, i);
        fullDate.setHours(0, 0, 0, 0);
        days.push({
          date: i,
          fullDate,
          isCurrentMonth: true,
          isToday: fullDate.getTime() === today.getTime(),
          isSelected: compareDate ? fullDate.getTime() === compareDate.getTime() : false
        });
      }
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        const fullDate = new Date(currentYear.value, currentMonth.value + 1, i);
        fullDate.setHours(0, 0, 0, 0);
        days.push({
          date: i,
          fullDate,
          isCurrentMonth: false,
          isToday: fullDate.getTime() === today.getTime(),
          isSelected: compareDate ? fullDate.getTime() === compareDate.getTime() : false
        });
      }
      return days;
    }
    function getDayClass(day) {
      return [
        "aspect-square p-2 text-sm font-semibold rounded-xl transition-all relative",
        day.isCurrentMonth ? "hover:bg-gray-100 hover:scale-105 cursor-pointer" : "text-gray-300 opacity-40 cursor-not-allowed",
        day.isToday && !day.isSelected ? "bg-blue-50 text-[#033958] ring-2 ring-[#033958] ring-inset font-bold" : "",
        day.isSelected ? "bg-[#033958] text-white shadow-lg scale-105" : ""
      ];
    }
    function getDTDayClass(day) {
      return [
        "aspect-square p-2 text-xs font-medium rounded-lg transition-all",
        day.isCurrentMonth ? "hover:bg-gray-100 cursor-pointer" : "text-gray-300 opacity-30 cursor-not-allowed",
        day.isToday && !day.isSelected ? "border-2 border-[#033958] text-[#033958] font-bold" : "",
        day.isSelected ? "bg-[#033958] text-white shadow-md" : ""
      ];
    }
    const formatDateDisplay = (date) => {
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };
    const parseDTString = (dtStr) => {
      const parts = dtStr.split(",").map((p) => p.trim());
      if (parts.length >= 3) {
        const datePart = `${parts[0]}, ${parts[1]}, ${parts[2]}`;
        const date = new Date(datePart);
        const timePart = parts[3] || "12:00 PM";
        const match = timePart.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (match && !isNaN(date.getTime())) {
          return {
            date,
            hour: match[1].padStart(2, "0"),
            minute: match[2],
            period: match[3].toUpperCase()
          };
        }
      }
      return null;
    };
    watch(() => props.modelValue, (val) => {
      if (props.type === "date" && val) {
        selectedDate.value = new Date(val);
      } else if (props.type === "time" && val) {
        const match = val.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (match) {
          selectedHour.value = match[1].padStart(2, "0");
          selectedMinute.value = match[2];
          selectedPeriod.value = match[3].toUpperCase();
        }
      } else if (props.type === "datetime-local" && val) {
        const parsed = parseDTString(val);
        if (parsed) {
          dtSelectedDate.value = parsed.date;
          selectedHour.value = parsed.hour;
          selectedMinute.value = parsed.minute;
          selectedPeriod.value = parsed.period;
        }
      }
    }, { immediate: true });
    watch(showDatePicker, (val) => {
      if (val) {
        (void 0).body.style.overflow = "hidden";
        if (props.modelValue) {
          const date = new Date(props.modelValue);
          currentMonth.value = date.getMonth();
          currentYear.value = date.getFullYear();
        }
      } else {
        (void 0).body.style.overflow = "";
      }
    });
    watch(showTimePicker, (val) => {
      (void 0).body.style.overflow = val ? "hidden" : "";
    });
    watch(showDateTimePicker, (val) => {
      (void 0).body.style.overflow = val ? "hidden" : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="mb-2 relative" data-v-c47c0ab5><div class="relative input-container" data-v-c47c0ab5><label${ssrRenderAttr("for", unref(inputId))} class="${ssrRenderClass([
        "absolute transition-all duration-300 ease-in-out pointer-events-none z-10",
        isFocused.value || __props.modelValue ? "text-xs text-gray-500 left-3 top-2" : `text-base text-gray-500 left-3 ${__props.type === "textarea" ? "top-4" : "top-1/2 transform -translate-y-1/2"}`
      ])}" data-v-c47c0ab5>${ssrInterpolate(__props.label)}</label>`);
      if (__props.type === "textarea") {
        _push(`<textarea${ssrRenderAttr("id", unref(inputId))}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(__props.readonly) ? " readonly" : ""}${ssrRenderAttr("rows", __props.rows)} class="${ssrRenderClass([
          "w-full py-4 pt-6 px-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#033958] focus:border-[#033958] transition-all duration-300 resize-none",
          roundedClasses.value,
          __props.disabled ? "opacity-50 cursor-not-allowed" : "",
          __props.hasError || __props.errorMessage && __props.showError ? "border-red-500 ring-red-500" : ""
        ])}" data-v-c47c0ab5>${ssrInterpolate(__props.modelValue)}</textarea>`);
      } else {
        _push(`<input${ssrRenderAttr("id", unref(inputId))}${ssrRenderAttr("type", computedType.value)}${ssrRenderAttr("value", displayValue.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(__props.readonly || __props.type === "date" || __props.type === "time" || __props.type === "datetime-local") ? " readonly" : ""}${ssrRenderAttr("autocomplete", __props.autocomplete)} class="${ssrRenderClass([
          "w-full py-4 pt-6 px-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#033958] focus:border-[#033958] transition-all duration-300",
          roundedClasses.value,
          __props.disabled ? "opacity-50 cursor-not-allowed" : "",
          __props.type === "date" || __props.type === "time" || __props.type === "datetime-local" ? "cursor-pointer" : "",
          __props.hasError || __props.errorMessage && __props.showError ? "border-red-500 ring-red-500" : ""
        ])}" data-v-c47c0ab5>`);
      }
      if (__props.type === "password") {
        _push(`<button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-20" data-v-c47c0ab5>`);
        if (showPassword.value) {
          _push(`<svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20" data-v-c47c0ab5><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" data-v-c47c0ab5></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" data-v-c47c0ab5></path></svg>`);
        } else {
          _push(`<svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20" data-v-c47c0ab5><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" data-v-c47c0ab5></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" data-v-c47c0ab5></path></svg>`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$slots.right && __props.type !== "password" && __props.type !== "date" && __props.type !== "time" && __props.type !== "datetime-local") {
        _push(`<div class="absolute right-3 top-1/2 transform -translate-y-1/2 z-20" data-v-c47c0ab5>`);
        ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.errorMessage && __props.showError) {
        _push(`<p class="text-xs text-red-500 mt-1 ml-3" data-v-c47c0ab5>${ssrInterpolate(__props.errorMessage)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showDatePicker.value) {
          _push2(`<div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" data-v-c47c0ab5><div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform" data-v-c47c0ab5><div class="bg-gradient-to-br from-[#033958] to-[#055a8c] p-6 text-white" data-v-c47c0ab5><div class="flex items-center justify-between mb-2" data-v-c47c0ab5><h3 class="text-xl font-bold" data-v-c47c0ab5>Select Date</h3><button type="button" class="p-2 hover:bg-white/20 rounded-full transition-all" data-v-c47c0ab5><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M18 6L6 18M6 6l12 12" data-v-c47c0ab5></path></svg></button></div><p class="text-white/80 text-sm" data-v-c47c0ab5>${ssrInterpolate(selectedDate.value ? formatDateDisplay(selectedDate.value) : "No date selected")}</p></div><div class="p-6" data-v-c47c0ab5><div class="flex items-center justify-between mb-6" data-v-c47c0ab5><button type="button" class="p-3 hover:bg-gray-100 rounded-xl transition-all group" data-v-c47c0ab5><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="group-hover:scale-110 transition-transform" data-v-c47c0ab5><path d="M15 18l-6-6 6-6" data-v-c47c0ab5></path></svg></button><div class="flex gap-3" data-v-c47c0ab5><select class="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-[#033958] rounded-xl font-bold focus:outline-none focus:border-[#033958] transition-all" data-v-c47c0ab5><!--[-->`);
          ssrRenderList(months, (m, i) => {
            _push2(`<option${ssrRenderAttr("value", i)} data-v-c47c0ab5${ssrIncludeBooleanAttr(Array.isArray(currentMonth.value) ? ssrLooseContain(currentMonth.value, i) : ssrLooseEqual(currentMonth.value, i)) ? " selected" : ""}>${ssrInterpolate(m)}</option>`);
          });
          _push2(`<!--]--></select><select class="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-[#033958] rounded-xl font-bold focus:outline-none focus:border-[#033958] transition-all" data-v-c47c0ab5><!--[-->`);
          ssrRenderList(yearRange.value, (y) => {
            _push2(`<option${ssrRenderAttr("value", y)} data-v-c47c0ab5${ssrIncludeBooleanAttr(Array.isArray(currentYear.value) ? ssrLooseContain(currentYear.value, y) : ssrLooseEqual(currentYear.value, y)) ? " selected" : ""}>${ssrInterpolate(y)}</option>`);
          });
          _push2(`<!--]--></select></div><button type="button" class="p-3 hover:bg-gray-100 rounded-xl transition-all group" data-v-c47c0ab5><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="group-hover:scale-110 transition-transform" data-v-c47c0ab5><path d="M9 18l6-6-6-6" data-v-c47c0ab5></path></svg></button></div><div class="grid grid-cols-7 gap-2 mb-3" data-v-c47c0ab5><!--[-->`);
          ssrRenderList(weekDays, (d) => {
            _push2(`<div class="text-center text-sm font-bold text-gray-500 py-2" data-v-c47c0ab5>${ssrInterpolate(d)}</div>`);
          });
          _push2(`<!--]--></div><div class="grid grid-cols-7 gap-2" data-v-c47c0ab5><!--[-->`);
          ssrRenderList(calendarDays.value, (day, i) => {
            _push2(`<button type="button"${ssrIncludeBooleanAttr(!day.isCurrentMonth) ? " disabled" : ""} class="${ssrRenderClass(getDayClass(day))}" data-v-c47c0ab5>${ssrInterpolate(day.date)}</button>`);
          });
          _push2(`<!--]--></div></div><div class="px-6 pb-6 pt-2 flex justify-between border-t" data-v-c47c0ab5><button type="button" class="px-5 py-2.5 text-sm text-[#033958] hover:text-white hover:bg-[#033958] font-bold rounded-xl transition-all border-2 border-[#033958]" data-v-c47c0ab5> Today </button><button type="button" class="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-semibold hover:bg-gray-100 rounded-xl transition-all" data-v-c47c0ab5> Clear </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (showTimePicker.value) {
          _push2(`<div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" data-v-c47c0ab5><div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform" data-v-c47c0ab5><div class="bg-gradient-to-br from-[#033958] to-[#055a8c] p-6 text-white" data-v-c47c0ab5><div class="flex items-center justify-between mb-2" data-v-c47c0ab5><h3 class="text-xl font-bold" data-v-c47c0ab5>Select Time</h3><button type="button" class="p-2 hover:bg-white/20 rounded-full transition-all" data-v-c47c0ab5><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M18 6L6 18M6 6l12 12" data-v-c47c0ab5></path></svg></button></div><p class="text-white/80 text-2xl font-mono" data-v-c47c0ab5>${ssrInterpolate(selectedHour.value)}:${ssrInterpolate(selectedMinute.value)} ${ssrInterpolate(selectedPeriod.value)}</p></div><div class="p-8" data-v-c47c0ab5><div class="flex items-center justify-center gap-6 mb-8" data-v-c47c0ab5><div class="flex flex-col items-center" data-v-c47c0ab5><button type="button" class="p-3 hover:bg-gray-100 rounded-xl mb-3 transition-all group" data-v-c47c0ab5><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" class="group-hover:scale-110 transition-transform" data-v-c47c0ab5><path d="M18 15l-6-6-6 6" data-v-c47c0ab5></path></svg></button><input type="text"${ssrRenderAttr("value", selectedHour.value)} maxlength="2" class="w-20 text-center text-4xl font-bold border-2 border-gray-200 focus:border-[#033958] rounded-2xl py-4 focus:outline-none focus:ring-4 focus:ring-[#033958]/20 transition-all bg-gray-50" data-v-c47c0ab5><button type="button" class="p-3 hover:bg-gray-100 rounded-xl mt-3 transition-all group" data-v-c47c0ab5><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" class="group-hover:scale-110 transition-transform" data-v-c47c0ab5><path d="M6 9l6 6 6-6" data-v-c47c0ab5></path></svg></button></div><span class="text-5xl font-bold text-gray-300 select-none" data-v-c47c0ab5>:</span><div class="flex flex-col items-center" data-v-c47c0ab5><button type="button" class="p-3 hover:bg-gray-100 rounded-xl mb-3 transition-all group" data-v-c47c0ab5><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" class="group-hover:scale-110 transition-transform" data-v-c47c0ab5><path d="M18 15l-6-6-6 6" data-v-c47c0ab5></path></svg></button><input type="text"${ssrRenderAttr("value", selectedMinute.value)} maxlength="2" class="w-20 text-center text-4xl font-bold border-2 border-gray-200 focus:border-[#033958] rounded-2xl py-4 focus:outline-none focus:ring-4 focus:ring-[#033958]/20 transition-all bg-gray-50" data-v-c47c0ab5><button type="button" class="p-3 hover:bg-gray-100 rounded-xl mt-3 transition-all group" data-v-c47c0ab5><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" class="group-hover:scale-110 transition-transform" data-v-c47c0ab5><path d="M6 9l6 6 6-6" data-v-c47c0ab5></path></svg></button></div></div><div class="flex gap-3" data-v-c47c0ab5><button type="button" class="${ssrRenderClass([
            "flex-1 px-6 py-4 text-lg font-bold rounded-2xl transition-all transform",
            selectedPeriod.value === "AM" ? "bg-[#033958] text-white shadow-lg scale-105" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          ])}" data-v-c47c0ab5> AM </button><button type="button" class="${ssrRenderClass([
            "flex-1 px-6 py-4 text-lg font-bold rounded-2xl transition-all transform",
            selectedPeriod.value === "PM" ? "bg-[#033958] text-white shadow-lg scale-105" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          ])}" data-v-c47c0ab5> PM </button></div></div><div class="px-6 pb-6 flex justify-between border-t pt-4" data-v-c47c0ab5><button type="button" class="px-5 py-2.5 text-sm text-[#033958] hover:text-white hover:bg-[#033958] font-bold rounded-xl transition-all border-2 border-[#033958]" data-v-c47c0ab5> Now </button><div class="flex gap-3" data-v-c47c0ab5><button type="button" class="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-semibold hover:bg-gray-100 rounded-xl transition-all" data-v-c47c0ab5> Clear </button><button type="button" class="px-6 py-2.5 text-sm text-white bg-[#033958] hover:bg-[#022f42] rounded-xl font-bold shadow-lg hover:shadow-xl transition-all" data-v-c47c0ab5> Confirm </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (showDateTimePicker.value) {
          _push2(`<div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto" data-v-c47c0ab5><div class="bg-white rounded-3xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden transform" data-v-c47c0ab5><div class="bg-gradient-to-br from-[#033958] to-[#055a8c] p-6 text-white" data-v-c47c0ab5><div class="flex items-center justify-between mb-2" data-v-c47c0ab5><h3 class="text-2xl font-bold" data-v-c47c0ab5>Select Date &amp; Time</h3><button type="button" class="p-2 hover:bg-white/20 rounded-full transition-all" data-v-c47c0ab5><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M18 6L6 18M6 6l12 12" data-v-c47c0ab5></path></svg></button></div><p class="text-white/80" data-v-c47c0ab5>${ssrInterpolate(dtSelectedDate.value ? `${formatDateDisplay(dtSelectedDate.value)} • ${selectedHour.value}:${selectedMinute.value} ${selectedPeriod.value}` : "No date & time selected")}</p></div><div class="p-6 md:p-8 grid md:grid-cols-2 gap-8" data-v-c47c0ab5><div data-v-c47c0ab5><h4 class="text-lg font-bold mb-4 flex items-center gap-2" data-v-c47c0ab5><span class="p-2 bg-[#033958]/10 rounded-lg" data-v-c47c0ab5>📅</span> DATE </h4><div class="flex items-center justify-between mb-4" data-v-c47c0ab5><button type="button" class="p-2 hover:bg-gray-100 rounded-xl" data-v-c47c0ab5><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M15 18l-6-6 6-6" data-v-c47c0ab5></path></svg></button><div class="flex gap-2" data-v-c47c0ab5><select class="px-3 py-2 bg-gray-50 border-2 border-transparent hover:border-[#033958] rounded-xl font-bold text-sm" data-v-c47c0ab5><!--[-->`);
          ssrRenderList(months, (m, i) => {
            _push2(`<option${ssrRenderAttr("value", i)} data-v-c47c0ab5${ssrIncludeBooleanAttr(Array.isArray(currentMonth.value) ? ssrLooseContain(currentMonth.value, i) : ssrLooseEqual(currentMonth.value, i)) ? " selected" : ""}>${ssrInterpolate(m.slice(0, 3))}</option>`);
          });
          _push2(`<!--]--></select><select class="px-3 py-2 bg-gray-50 border-2 border-transparent hover:border-[#033958] rounded-xl font-bold text-sm" data-v-c47c0ab5><!--[-->`);
          ssrRenderList(yearRange.value, (y) => {
            _push2(`<option${ssrRenderAttr("value", y)} data-v-c47c0ab5${ssrIncludeBooleanAttr(Array.isArray(currentYear.value) ? ssrLooseContain(currentYear.value, y) : ssrLooseEqual(currentYear.value, y)) ? " selected" : ""}>${ssrInterpolate(y)}</option>`);
          });
          _push2(`<!--]--></select></div><button type="button" class="p-2 hover:bg-gray-100 rounded-xl" data-v-c47c0ab5><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M9 18l6-6-6-6" data-v-c47c0ab5></path></svg></button></div><div class="grid grid-cols-7 gap-1 mb-2" data-v-c47c0ab5><!--[-->`);
          ssrRenderList(weekDays, (d) => {
            _push2(`<div class="text-center text-xs font-bold text-gray-500 py-1" data-v-c47c0ab5>${ssrInterpolate(d)}</div>`);
          });
          _push2(`<!--]--></div><div class="grid grid-cols-7 gap-1 mb-4" data-v-c47c0ab5><!--[-->`);
          ssrRenderList(dtCalendarDays.value, (day, i) => {
            _push2(`<button type="button"${ssrIncludeBooleanAttr(!day.isCurrentMonth) ? " disabled" : ""} class="${ssrRenderClass(getDTDayClass(day))}" data-v-c47c0ab5>${ssrInterpolate(day.date)}</button>`);
          });
          _push2(`<!--]--></div></div><div data-v-c47c0ab5><h4 class="text-lg font-bold mb-4 flex items-center gap-2" data-v-c47c0ab5><span class="p-2 bg-[#033958]/10 rounded-lg" data-v-c47c0ab5>🕐</span> TIME </h4><div class="flex items-center justify-center gap-4 mb-6" data-v-c47c0ab5><div class="flex flex-col items-center" data-v-c47c0ab5><button type="button" class="p-2 hover:bg-gray-100 rounded-lg mb-2" data-v-c47c0ab5><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M18 15l-6-6-6 6" data-v-c47c0ab5></path></svg></button><input type="text"${ssrRenderAttr("value", selectedHour.value)} maxlength="2" class="w-16 text-center text-3xl font-bold border-2 border-gray-200 focus:border-[#033958] rounded-xl py-3 focus:outline-none bg-gray-50" data-v-c47c0ab5><button type="button" class="p-2 hover:bg-gray-100 rounded-lg mt-2" data-v-c47c0ab5><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M6 9l6 6 6-6" data-v-c47c0ab5></path></svg></button></div><span class="text-4xl font-bold text-gray-300" data-v-c47c0ab5>:</span><div class="flex flex-col items-center" data-v-c47c0ab5><button type="button" class="p-2 hover:bg-gray-100 rounded-lg mb-2" data-v-c47c0ab5><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M18 15l-6-6-6 6" data-v-c47c0ab5></path></svg></button><input type="text"${ssrRenderAttr("value", selectedMinute.value)} maxlength="2" class="w-16 text-center text-3xl font-bold border-2 border-gray-200 focus:border-[#033958] rounded-xl py-3 focus:outline-none bg-gray-50" data-v-c47c0ab5><button type="button" class="p-2 hover:bg-gray-100 rounded-lg mt-2" data-v-c47c0ab5><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-c47c0ab5><path d="M6 9l6 6 6-6" data-v-c47c0ab5></path></svg></button></div></div><div class="flex gap-2" data-v-c47c0ab5><button type="button" class="${ssrRenderClass(["flex-1 px-4 py-3 text-base font-bold rounded-xl transition-all", selectedPeriod.value === "AM" ? "bg-[#033958] text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"])}" data-v-c47c0ab5> AM </button><button type="button" class="${ssrRenderClass(["flex-1 px-4 py-3 text-base font-bold rounded-xl transition-all", selectedPeriod.value === "PM" ? "bg-[#033958] text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"])}" data-v-c47c0ab5> PM </button></div></div></div><div class="px-6 pb-6 flex justify-between border-t pt-4" data-v-c47c0ab5><button type="button" class="px-5 py-2.5 text-sm text-[#033958] hover:text-white hover:bg-[#033958] font-bold rounded-xl transition-all border-2 border-[#033958]" data-v-c47c0ab5> Now </button><div class="flex gap-3" data-v-c47c0ab5><button type="button" class="px-5 py-2.5 text-sm text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-all" data-v-c47c0ab5> Clear </button><button type="button" class="px-6 py-2.5 text-sm text-white bg-[#033958] hover:bg-[#022f42] rounded-xl font-bold shadow-lg transition-all" data-v-c47c0ab5> Confirm </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AnimatedInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AnimatedInput = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-c47c0ab5"]]), { __name: "AnimatedInput" });
const useCustomToast = () => {
  const showToast2 = async (options) => {
    return;
  };
  return {
    showToast: showToast2
  };
};
const useTokenManager = () => {
  const isRefreshing = ref(false);
  const isTokenRefreshing = () => isRefreshing.value;
  const queueFailedRequest = () => Promise.resolve(null);
  const refreshAccessToken = () => Promise.resolve(null);
  const clearTokens = () => {
    localStorage.removeItem("token");
  };
  return { isTokenRefreshing, queueFailedRequest, refreshAccessToken, clearTokens };
};
const { showToast } = useCustomToast();
const { token, logOut } = useUser();
useTokenManager();
const $GATEWAY_ENDPOINT = "http://localhost:3000/api";
const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT
});
GATEWAY_ENDPOINT.interceptors.request.use((config) => {
  if (token.value) {
    config.headers.Authorization = `Bearer ${token.value}`;
  }
  return config;
});
GATEWAY_ENDPOINT.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status === 401) {
      logOut();
      showToast({ title: "Session Expired", message: "Please login again", toastType: "error" });
    }
    return Promise.reject(err);
  }
);
export {
  AnimatedInput as A,
  GATEWAY_ENDPOINT as G,
  useCustomToast as u
};
//# sourceMappingURL=axios.config-5c6VR9gi.js.map
