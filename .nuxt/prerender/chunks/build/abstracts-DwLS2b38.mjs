import { a as useCMS, b as useCustomToast, _ as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_1 } from './SideDrawer-BQ9HavFF.mjs';
import { _ as __nuxt_component_1$1 } from './AnimatedInput-EWtNoB2_.mjs';
import { _ as _sfc_main$1 } from './ConfirmModal-D0gIV_87.mjs';
import { ref, reactive, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
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
import 'file:///Users/marquis/scpsn/member/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/axios/index.js';
import 'file:///Users/marquis/scpsn/member/node_modules/@iconify/utils/lib/css/icon.js';
import 'file:///Users/marquis/scpsn/member/node_modules/perfect-debounce/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/unhead/dist/server.mjs';
import 'file:///Users/marquis/scpsn/member/node_modules/devalue/index.js';
import 'file:///Users/marquis/scpsn/member/node_modules/unhead/dist/utils.mjs';

const _sfc_main = {
  __name: "abstracts",
  __ssrInlineRender: true,
  setup(__props) {
    const { cmsConfig } = useCMS();
    const { showToast } = useCustomToast();
    const isDrawerOpen = ref(false);
    const isSubmitDrawerOpen = ref(false);
    const isSubmitting = ref(false);
    const showRetractModal = ref(false);
    const selectedAbstract = ref(null);
    const submissionForm = reactive({
      title: "",
      authors: "",
      content: "",
      file: null,
      fileName: ""
    });
    const abstracts2 = ref([
      {
        id: "AB-2045",
        title: "Cellular Morphology Irregularities in Early Stage Type-2 Diabetes",
        authors: "Dr. John Doe, Dr. Jane Smith",
        date: "Feb 10, 2026",
        status: "Under Review",
        content: "We present a microscopic analysis evaluating cellular malformations typically undiagnosed in early onset T2D...",
        feedback: "Fascinating approach. Please clarify the sample size selection criteria in section 2 before final approval."
      },
      {
        id: "AB-1092",
        title: "Advancements in Cytodiagnostics: A Review",
        authors: "Dr. John Doe",
        date: "Aug 14, 2025",
        status: "Accepted",
        content: "A comprehensive review examining machine learning methodologies applied to traditional cytodiagnostics...",
        feedback: null
      }
    ]);
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        submissionForm.file = file;
        submissionForm.fileName = file.name;
      }
    };
    const submitAbstract = async () => {
      if (!submissionForm.title || !submissionForm.authors || !submissionForm.content) {
        showToast({ title: "Missing Fields", message: "Please complete all required fields.", toastType: "warning" });
        return;
      }
      isSubmitting.value = true;
      setTimeout(() => {
        const newAbstract = {
          id: `AB-${Math.floor(1e3 + Math.random() * 9e3)}`,
          title: submissionForm.title,
          authors: submissionForm.authors,
          content: submissionForm.content,
          date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          status: "Under Review",
          feedback: null
        };
        abstracts2.value.unshift(newAbstract);
        isSubmitting.value = false;
        isSubmitDrawerOpen.value = false;
        submissionForm.title = "";
        submissionForm.authors = "";
        submissionForm.content = "";
        submissionForm.file = null;
        submissionForm.fileName = "";
        showToast({ title: "Success", message: "Research abstract submitted successfully.", toastType: "success" });
      }, 2e3);
    };
    const requestRetract = () => {
      showRetractModal.value = true;
    };
    const confirmRetract = () => {
      showRetractModal.value = false;
      isDrawerOpen.value = false;
      if (selectedAbstract.value) {
        abstracts2.value = abstracts2.value.filter((a) => a.id !== selectedAbstract.value.id);
        showToast({ title: "Retracted", message: "Submission has been removed.", toastType: "info" });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      const _component_Icon = __nuxt_component_0;
      const _component_SideDrawer = __nuxt_component_1;
      const _component_AnimatedInput = __nuxt_component_1$1;
      const _component_ConfirmModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20" }, _attrs))} data-v-66356cc9><div class="flex items-center justify-between" data-v-66356cc9><div data-v-66356cc9><h1 class="text-3xl font-bold text-slate-800 tracking-tight" data-v-66356cc9>${ssrInterpolate(((_d = (_c = (_b = (_a = unref(cmsConfig)) == null ? void 0 : _a.member) == null ? void 0 : _b.pages) == null ? void 0 : _c.abstracts) == null ? void 0 : _d.title) || "Abstracts")}</h1><p class="text-slate-500 font-medium mt-1 text-sm" data-v-66356cc9>${ssrInterpolate(((_h = (_g = (_f = (_e = unref(cmsConfig)) == null ? void 0 : _e.member) == null ? void 0 : _f.pages) == null ? void 0 : _g.abstracts) == null ? void 0 : _h.subtitle) || "Submit and manage your scientific papers and conference abstracts.")}</p></div><button class="btn-premium flex items-center gap-2 px-8 py-4" data-v-66356cc9>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        size: "18"
      }, null, _parent));
      _push(` New Submission </button></div><div class="bg-white rounded-[2rem] border border-slate-200 overflow-hidden mt-8" data-v-66356cc9><div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50" data-v-66356cc9><h3 class="text-xs font-black text-slate-400 lowercase" data-v-66356cc9>submission archives</h3><div class="flex gap-2" data-v-66356cc9><span class="w-2 h-2 rounded-full bg-emerald-500 border border-white mt-1" data-v-66356cc9></span><p class="text-xs font-semibold text-slate-500 line-clamp-1 max-w-[200px]" data-v-66356cc9>${ssrInterpolate(((_l = (_k = (_j = (_i = unref(cmsConfig)) == null ? void 0 : _i.member) == null ? void 0 : _j.pages) == null ? void 0 : _k.abstracts) == null ? void 0 : _l.deadlineText) || "Call for Papers is Open until May 2026")}</p></div></div><div class="overflow-x-auto custom-scrollbar" data-v-66356cc9><table class="w-full text-left border-collapse" data-v-66356cc9><thead data-v-66356cc9><tr class="bg-slate-50 border-b border-slate-100" data-v-66356cc9><th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest" data-v-66356cc9>ID</th><th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest" data-v-66356cc9>Scientific Title</th><th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest" data-v-66356cc9>Date</th><th class="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest" data-v-66356cc9>Status</th></tr></thead><tbody class="divide-y divide-slate-50" data-v-66356cc9><!--[-->`);
      ssrRenderList(abstracts2.value, (paper) => {
        _push(`<tr class="hover:bg-slate-50/50 cursor-pointer transition-colors group" data-v-66356cc9><td class="px-8 py-5 text-xs font-semibold text-brand-dark group-hover:text-brand-cyan transition-colors" data-v-66356cc9> #${ssrInterpolate(paper.id)}</td><td class="px-8 py-5" data-v-66356cc9><p class="text-sm font-bold text-slate-800" data-v-66356cc9>${ssrInterpolate(paper.title)}</p><p class="text-[11px] font-medium text-slate-400 mt-0.5 line-clamp-1 w-64" data-v-66356cc9>${ssrInterpolate(paper.authors)}</p></td><td class="px-8 py-5 text-xs font-medium text-slate-500" data-v-66356cc9>${ssrInterpolate(paper.date)}</td><td class="px-8 py-5" data-v-66356cc9><span class="${ssrRenderClass([
          "px-3 py-1 text-[10px] font-bold rounded-lg",
          paper.status === "Accepted" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : paper.status === "Under Review" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-slate-100 text-slate-600 border border-slate-200"
        ])}" data-v-66356cc9>${ssrInterpolate(paper.status)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (abstracts2.value.length === 0) {
        _push(`<div class="p-16 text-center" data-v-66356cc9><div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4" data-v-66356cc9>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-text",
          size: "24"
        }, null, _parent));
        _push(`</div><h4 class="text-base font-bold text-slate-800" data-v-66356cc9>No Submissions Found</h4><p class="text-sm font-medium text-slate-500 mt-1" data-v-66356cc9>You haven&#39;t submitted any abstracts yet.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_SideDrawer, {
        isOpen: isDrawerOpen.value,
        title: "Abstract Details",
        subtitle: "#" + ((_m = selectedAbstract.value) == null ? void 0 : _m.id),
        onClose: ($event) => isDrawerOpen.value = false
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="flex gap-3" data-v-66356cc9${_scopeId}><button class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all" data-v-66356cc9${_scopeId}>Close</button>`);
            if (((_a2 = selectedAbstract.value) == null ? void 0 : _a2.status) !== "Accepted") {
              _push2(`<button class="flex-1 py-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 hover:border-rose-300 transition-all flex justify-center items-center gap-2" data-v-66356cc9${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:trash-2",
                size: "16"
              }, null, _parent2, _scopeId));
              _push2(` Retract Submission </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-3" }, [
                createVNode("button", {
                  onClick: ($event) => isDrawerOpen.value = false,
                  class: "flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all"
                }, "Close", 8, ["onClick"]),
                ((_b2 = selectedAbstract.value) == null ? void 0 : _b2.status) !== "Accepted" ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: requestRetract,
                  class: "flex-1 py-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 hover:border-rose-300 transition-all flex justify-center items-center gap-2"
                }, [
                  createVNode(_component_Icon, {
                    name: "lucide:trash-2",
                    size: "16"
                  }),
                  createTextVNode(" Retract Submission ")
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (selectedAbstract.value) {
              _push2(`<div class="p-8 space-y-8" data-v-66356cc9${_scopeId}><div data-v-66356cc9${_scopeId}><span class="${ssrRenderClass([
                "px-3 py-1 text-[10px] font-bold rounded-lg inline-block mb-4",
                selectedAbstract.value.status === "Accepted" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : selectedAbstract.value.status === "Under Review" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-slate-100 text-slate-600 border border-slate-200"
              ])}" data-v-66356cc9${_scopeId}> Status: ${ssrInterpolate(selectedAbstract.value.status)}</span><h3 class="text-xl font-bold text-slate-800 leading-snug" data-v-66356cc9${_scopeId}>${ssrInterpolate(selectedAbstract.value.title)}</h3><p class="text-sm font-medium text-brand-cyan mt-2" data-v-66356cc9${_scopeId}>${ssrInterpolate(selectedAbstract.value.authors)}</p></div><div class="space-y-4" data-v-66356cc9${_scopeId}><h4 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2" data-v-66356cc9${_scopeId}>Full Abstract</h4><p class="text-sm text-slate-600 leading-relaxed indent-4" data-v-66356cc9${_scopeId}>${ssrInterpolate(selectedAbstract.value.content)}</p></div>`);
              if (selectedAbstract.value.feedback) {
                _push2(`<div class="space-y-4" data-v-66356cc9${_scopeId}><h4 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2" data-v-66356cc9${_scopeId}>Reviewer Feedback</h4><div class="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm font-medium text-amber-800" data-v-66356cc9${_scopeId}> &quot;${ssrInterpolate(selectedAbstract.value.feedback)}&quot; </div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              selectedAbstract.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "p-8 space-y-8"
              }, [
                createVNode("div", null, [
                  createVNode("span", {
                    class: [
                      "px-3 py-1 text-[10px] font-bold rounded-lg inline-block mb-4",
                      selectedAbstract.value.status === "Accepted" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : selectedAbstract.value.status === "Under Review" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-slate-100 text-slate-600 border border-slate-200"
                    ]
                  }, " Status: " + toDisplayString(selectedAbstract.value.status), 3),
                  createVNode("h3", { class: "text-xl font-bold text-slate-800 leading-snug" }, toDisplayString(selectedAbstract.value.title), 1),
                  createVNode("p", { class: "text-sm font-medium text-brand-cyan mt-2" }, toDisplayString(selectedAbstract.value.authors), 1)
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h4", { class: "text-sm font-bold text-slate-800 border-b border-slate-100 pb-2" }, "Full Abstract"),
                  createVNode("p", { class: "text-sm text-slate-600 leading-relaxed indent-4" }, toDisplayString(selectedAbstract.value.content), 1)
                ]),
                selectedAbstract.value.feedback ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  createVNode("h4", { class: "text-sm font-bold text-slate-800 border-b border-slate-100 pb-2" }, "Reviewer Feedback"),
                  createVNode("div", { class: "p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm font-medium text-amber-800" }, ' "' + toDisplayString(selectedAbstract.value.feedback) + '" ', 1)
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_SideDrawer, {
        isOpen: isSubmitDrawerOpen.value,
        title: "New Abstract Submission",
        subtitle: "Complete the form to submit your research",
        onClose: ($event) => isSubmitDrawerOpen.value = false
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-3" data-v-66356cc9${_scopeId}><button class="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold" data-v-66356cc9${_scopeId}>Cancel</button><button${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="flex-1 py-3 bg-brand-dark text-white rounded-xl text-xs font-bold hover:bg-[#002244] transition-all flex justify-center items-center gap-2 disabled:opacity-50" data-v-66356cc9${_scopeId}>`);
            if (isSubmitting.value) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:loader-2",
                class: "animate-spin",
                size: "16"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:send",
                size: "16"
              }, null, _parent2, _scopeId));
            }
            _push2(` Submit Abstract </button></div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-3" }, [
                createVNode("button", {
                  onClick: ($event) => isSubmitDrawerOpen.value = false,
                  class: "flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold"
                }, "Cancel", 8, ["onClick"]),
                createVNode("button", {
                  onClick: submitAbstract,
                  disabled: isSubmitting.value,
                  class: "flex-1 py-3 bg-brand-dark text-white rounded-xl text-xs font-bold hover:bg-[#002244] transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                }, [
                  isSubmitting.value ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    name: "lucide:loader-2",
                    class: "animate-spin",
                    size: "16"
                  })) : (openBlock(), createBlock(_component_Icon, {
                    key: 1,
                    name: "lucide:send",
                    size: "16"
                  })),
                  createTextVNode(" Submit Abstract ")
                ], 8, ["disabled"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-8 space-y-8" data-v-66356cc9${_scopeId}><div class="space-y-6" data-v-66356cc9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AnimatedInput, {
              modelValue: submissionForm.title,
              "onUpdate:modelValue": ($event) => submissionForm.title = $event,
              label: "Research Title",
              placeholder: "e.g. Analysis of Cellular Morphologies...",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AnimatedInput, {
              modelValue: submissionForm.authors,
              "onUpdate:modelValue": ($event) => submissionForm.authors = $event,
              label: "Authors",
              placeholder: "e.g. Dr. Jane Doe, Prof. Mark Smith",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AnimatedInput, {
              modelValue: submissionForm.content,
              "onUpdate:modelValue": ($event) => submissionForm.content = $event,
              type: "textarea",
              label: "Abstract Content",
              placeholder: "Paste your research abstract here...",
              rows: 10,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`<div class="p-6 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-3 group hover:border-brand-cyan transition-all cursor-pointer" data-v-66356cc9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:upload-cloud",
              size: "32",
              class: "text-slate-300 group-hover:text-brand-cyan transition-colors mx-auto"
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-1" data-v-66356cc9${_scopeId}><p class="text-xs font-bold text-slate-700" data-v-66356cc9${_scopeId}>Attach Supplementary PDF</p><p class="text-[10px] text-slate-400" data-v-66356cc9${_scopeId}>Optional: Charts, graphs, or full paper (Max 10MB)</p></div><input type="file" class="hidden" accept=".pdf" data-v-66356cc9${_scopeId}>`);
            if (submissionForm.fileName) {
              _push2(`<p class="text-xs font-bold text-brand-cyan mt-2" data-v-66356cc9${_scopeId}>${ssrInterpolate(submissionForm.fileName)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-8 space-y-8" }, [
                createVNode("div", { class: "space-y-6" }, [
                  createVNode(_component_AnimatedInput, {
                    modelValue: submissionForm.title,
                    "onUpdate:modelValue": ($event) => submissionForm.title = $event,
                    label: "Research Title",
                    placeholder: "e.g. Analysis of Cellular Morphologies...",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_AnimatedInput, {
                    modelValue: submissionForm.authors,
                    "onUpdate:modelValue": ($event) => submissionForm.authors = $event,
                    label: "Authors",
                    placeholder: "e.g. Dr. Jane Doe, Prof. Mark Smith",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_AnimatedInput, {
                    modelValue: submissionForm.content,
                    "onUpdate:modelValue": ($event) => submissionForm.content = $event,
                    type: "textarea",
                    label: "Abstract Content",
                    placeholder: "Paste your research abstract here...",
                    rows: 10,
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", {
                    class: "p-6 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-3 group hover:border-brand-cyan transition-all cursor-pointer",
                    onClick: ($event) => _ctx.$refs.docInput.click()
                  }, [
                    createVNode(_component_Icon, {
                      name: "lucide:upload-cloud",
                      size: "32",
                      class: "text-slate-300 group-hover:text-brand-cyan transition-colors mx-auto"
                    }),
                    createVNode("div", { class: "space-y-1" }, [
                      createVNode("p", { class: "text-xs font-bold text-slate-700" }, "Attach Supplementary PDF"),
                      createVNode("p", { class: "text-[10px] text-slate-400" }, "Optional: Charts, graphs, or full paper (Max 10MB)")
                    ]),
                    createVNode("input", {
                      type: "file",
                      ref: "docInput",
                      class: "hidden",
                      accept: ".pdf",
                      onChange: handleFileChange
                    }, null, 544),
                    submissionForm.fileName ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs font-bold text-brand-cyan mt-2"
                    }, toDisplayString(submissionForm.fileName), 1)) : createCommentVNode("", true)
                  ], 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ConfirmModal, {
        isOpen: showRetractModal.value,
        title: "Retract Submission",
        message: "Are you sure you want to completely retract your abstract? You cannot undo this action.",
        confirmText: "Yes, retract it",
        cancelText: "Keep it",
        confirmStyle: "danger",
        icon: "lucide:alert-triangle",
        onConfirm: confirmRetract,
        onCancel: ($event) => showRetractModal.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/abstracts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const abstracts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-66356cc9"]]);

export { abstracts as default };
//# sourceMappingURL=abstracts-DwLS2b38.mjs.map
