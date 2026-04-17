import __nuxt_component_0 from "./index-Cngwfm37.js";
import { _ as _sfc_main$1 } from "./SideDrawer-o4j79hPK.js";
import { _ as _sfc_main$2 } from "./ConfirmModal-BvTSAwvq.js";
import { ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "../server.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mac/Documents/spsn/member/node_modules/hookable/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/unctx/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue-router";
import "/Users/mac/Documents/spsn/member/node_modules/defu/dist/defu.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/ufo/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/klona/dist/index.mjs";
import "./composables-tvv8AvD7.js";
import "/Users/mac/Documents/spsn/member/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/mac/Documents/spsn/member/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = {
  __name: "support",
  __ssrInlineRender: true,
  setup(__props) {
    const isDrawerOpen = ref(false);
    const showCancelModal = ref(false);
    const showNewTicketModal = ref(false);
    const selectedTicket = ref(null);
    const tickets = ref([
      {
        id: "TKT-9912",
        subject: "Cannot upload multiple abstract documents",
        category: "Technical Support",
        date: "Apr 07, 2026",
        priority: "Normal",
        status: "Open",
        content: "When I try to upload my PDF along with the images, the system says the payload is too large. What is the limit?",
        response: null
      },
      {
        id: "TKT-8451",
        subject: "Membership fee discrepancy",
        category: "Billing",
        date: "Jan 10, 2026",
        priority: "High",
        status: "Resolved",
        content: "My credit card was charged $350 but the invoice says $300.",
        response: "Apologies for the confusion. The additional $50 was the late penalty as outlined in the invoice footer. We have waived it for you and issued a refund."
      }
    ]);
    const requestCancel = () => {
      showCancelModal.value = true;
    };
    const confirmCancel = () => {
      showCancelModal.value = false;
      isDrawerOpen.value = false;
      if (selectedTicket.value) {
        selectedTicket.value.status = "Resolved";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_SideDrawer = _sfc_main$1;
      const _component_ConfirmModal = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-slate-800 tracking-tight">Support Tickets</h1><p class="text-slate-500 font-medium mt-1 text-sm">Need help? Open a ticket to reach our administrative or technical teams.</p></div><button class="btn-premium flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:life-buoy",
        size: "18"
      }, null, _parent));
      _push(` New Request </button></div><div class="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden mt-8"><div class="overflow-x-auto custom-scrollbar"><table class="w-full text-left border-collapse"><thead><tr class="bg-slate-50 border-b border-slate-100"><th class="px-8 py-5 text-xs font-bold text-slate-500">Ticket ID</th><th class="px-8 py-5 text-xs font-bold text-slate-500">Subject</th><th class="px-8 py-5 text-xs font-bold text-slate-500">Last Updated</th><th class="px-8 py-5 text-xs font-bold text-slate-500">Priority</th><th class="px-8 py-5 text-xs font-bold text-slate-500">Status</th></tr></thead><tbody class="divide-y divide-slate-50"><!--[-->`);
      ssrRenderList(unref(tickets), (ticket) => {
        _push(`<tr class="hover:bg-slate-50/50 cursor-pointer transition-colors group"><td class="px-8 py-5 text-xs font-semibold text-brand-dark group-hover:text-brand-cyan transition-colors"> #${ssrInterpolate(ticket.id)}</td><td class="px-8 py-5"><p class="text-sm font-bold text-slate-800">${ssrInterpolate(ticket.subject)}</p><p class="text-[11px] font-medium text-slate-400 mt-0.5">${ssrInterpolate(ticket.category)}</p></td><td class="px-8 py-5 text-xs font-medium text-slate-500">${ssrInterpolate(ticket.date)}</td><td class="px-8 py-5"><span class="text-xs font-bold text-slate-600 flex items-center gap-1.5">`);
        if (ticket.priority === "High") {
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:chevron-up",
            class: "text-rose-500",
            size: "14"
          }, null, _parent));
        } else if (ticket.priority === "Normal") {
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:minus",
            class: "text-slate-400",
            size: "14"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(ticket.priority)}</span></td><td class="px-8 py-5"><span class="${ssrRenderClass([
          "px-3 py-1 text-[10px] font-bold rounded-lg inline-flex items-center gap-1.5",
          ticket.status === "Resolved" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : ticket.status === "Open" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-slate-100 text-slate-600 border border-slate-200"
        ])}">`);
        if (ticket.status === "Open") {
          _push(`<span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(ticket.status)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      _push(ssrRenderComponent(_component_SideDrawer, {
        isOpen: unref(isDrawerOpen),
        title: "Ticket Conversation",
        subtitle: "#" + unref(selectedTicket)?.id,
        onClose: ($event) => isDrawerOpen.value = false
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-3"${_scopeId}><button class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all"${_scopeId}>Close</button>`);
            if (unref(selectedTicket)?.status === "Open") {
              _push2(`<button class="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex justify-center items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:x-circle",
                size: "16"
              }, null, _parent2, _scopeId));
              _push2(` Cancel Request </button>`);
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
                unref(selectedTicket)?.status === "Open" ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: requestCancel,
                  class: "flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex justify-center items-center gap-2"
                }, [
                  createVNode(_component_Icon, {
                    name: "lucide:x-circle",
                    size: "16"
                  }),
                  createTextVNode(" Cancel Request ")
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(selectedTicket)) {
              _push2(`<div class="p-8 space-y-6"${_scopeId}><div class="space-y-3"${_scopeId}><div class="flex items-center gap-3 mb-2"${_scopeId}><div class="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs"${_scopeId}>Me</div><p class="text-xs font-bold text-slate-500"${_scopeId}>${ssrInterpolate(unref(selectedTicket).date)}</p></div><div class="bg-slate-50 p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm"${_scopeId}><h4 class="text-sm font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2"${_scopeId}>${ssrInterpolate(unref(selectedTicket).subject)}</h4><p class="text-sm font-medium text-slate-600"${_scopeId}>${ssrInterpolate(unref(selectedTicket).content)}</p></div></div>`);
              if (unref(selectedTicket).response) {
                _push2(`<div class="space-y-3"${_scopeId}><div class="flex items-center justify-end gap-3 mb-2"${_scopeId}><p class="text-xs font-bold text-slate-500"${_scopeId}>Support Admin</p><div class="w-8 h-8 bg-brand-cyan text-brand-dark rounded-full flex items-center justify-center font-bold text-xs"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:bot",
                  size: "14"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="bg-brand-cyan/10 p-5 rounded-2xl rounded-tr-none border border-brand-cyan/20 shadow-sm ml-8"${_scopeId}><p class="text-sm font-medium text-brand-dark"${_scopeId}>${ssrInterpolate(unref(selectedTicket).response)}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(selectedTicket).status === "Resolved") {
                _push2(`<div class="text-center py-6"${_scopeId}><span class="text-xs font-bold text-slate-400"${_scopeId}>This ticket has been marked as resolved and is locked.</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(selectedTicket) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "p-8 space-y-6"
              }, [
                createVNode("div", { class: "space-y-3" }, [
                  createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                    createVNode("div", { class: "w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs" }, "Me"),
                    createVNode("p", { class: "text-xs font-bold text-slate-500" }, toDisplayString(unref(selectedTicket).date), 1)
                  ]),
                  createVNode("div", { class: "bg-slate-50 p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm" }, [
                    createVNode("h4", { class: "text-sm font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2" }, toDisplayString(unref(selectedTicket).subject), 1),
                    createVNode("p", { class: "text-sm font-medium text-slate-600" }, toDisplayString(unref(selectedTicket).content), 1)
                  ])
                ]),
                unref(selectedTicket).response ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-3"
                }, [
                  createVNode("div", { class: "flex items-center justify-end gap-3 mb-2" }, [
                    createVNode("p", { class: "text-xs font-bold text-slate-500" }, "Support Admin"),
                    createVNode("div", { class: "w-8 h-8 bg-brand-cyan text-brand-dark rounded-full flex items-center justify-center font-bold text-xs" }, [
                      createVNode(_component_Icon, {
                        name: "lucide:bot",
                        size: "14"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "bg-brand-cyan/10 p-5 rounded-2xl rounded-tr-none border border-brand-cyan/20 shadow-sm ml-8" }, [
                    createVNode("p", { class: "text-sm font-medium text-brand-dark" }, toDisplayString(unref(selectedTicket).response), 1)
                  ])
                ])) : createCommentVNode("", true),
                unref(selectedTicket).status === "Resolved" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-6"
                }, [
                  createVNode("span", { class: "text-xs font-bold text-slate-400" }, "This ticket has been marked as resolved and is locked.")
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ConfirmModal, {
        isOpen: unref(showCancelModal),
        title: "Close Ticket",
        message: "Are you sure you want to close this ticket? It will be marked as resolved.",
        confirmText: "Yes, close it",
        cancelText: "Keep open",
        confirmStyle: "primary",
        icon: "lucide:info",
        onConfirm: confirmCancel,
        onCancel: ($event) => showCancelModal.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_ConfirmModal, {
        isOpen: unref(showNewTicketModal),
        title: "Create New Ticket",
        message: "The direct messaging gateway is currently routing traffic. Please use the AI Chat Widget in the bottom right corner for immediate assistance.",
        confirmText: "Understood",
        cancelText: "Close",
        confirmStyle: "primary",
        icon: "lucide:help-circle",
        onConfirm: ($event) => showNewTicketModal.value = false,
        onCancel: ($event) => showNewTicketModal.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/support.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=support-Bz0bcah4.js.map
