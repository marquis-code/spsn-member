import __nuxt_component_0 from './index-Cngwfm37.mjs';
import { _ as _sfc_main$1 } from './SideDrawer-o4j79hPK.mjs';
import { _ as _sfc_main$2 } from './ConfirmModal-BvTSAwvq.mjs';
import { ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createTextVNode, createCommentVNode, useSSRContext } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'file:///Users/mac/Documents/spsn/member/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/utils/lib/css/icon.js';
import './server.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/h3/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ufo/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/destr/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/ohash/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/klona/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/defu/dist/defu.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/scule/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unctx/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/mac/Documents/spsn/member/node_modules/pathe/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/@iconify/utils/lib/index.js';
import 'file:///Users/mac/Documents/spsn/member/node_modules/consola/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/hookable/dist/index.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/vue-router/vue-router.node.mjs';
import './composables-tvv8AvD7.mjs';
import '../_/renderer.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unhead/dist/server.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/devalue/index.js';
import 'file:///Users/mac/Documents/spsn/member/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/mac/Documents/spsn/member/node_modules/perfect-debounce/dist/index.mjs';

const _sfc_main = {
  __name: "payments",
  __ssrInlineRender: true,
  setup(__props) {
    const isDrawerOpen = ref(false);
    const showPaymentModal = ref(false);
    const selectedTransaction = ref(null);
    const transactions = ref([
      { id: "TXN-0012A", description: "Annual Membership Renewal", type: "Membership", date: "Jan 15, 2026", amount: 350, status: "Paid", cardLast4: "4242" },
      { id: "TXN-0098F", description: "Winter Conference Registration", type: "Events", date: "Dec 02, 2025", amount: 100, status: "Paid", cardLast4: "4242" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_0;
      const _component_SideDrawer = _sfc_main$1;
      const _component_ConfirmModal = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-slate-800 tracking-tight">Payments</h1><p class="text-slate-500 font-medium mt-1 text-sm">Manage your membership dues, conference tickets, and transaction history.</p></div><button class="btn-premium flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        size: "18"
      }, null, _parent));
      _push(` New Payment </button></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="stat-glass"><div class="flex items-center gap-3 mb-2"><div class="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:check-circle",
        size: "20"
      }, null, _parent));
      _push(`</div><span class="text-xs font-bold text-slate-500">Account Status</span></div><h3 class="text-2xl font-bold text-brand-dark">Active</h3><p class="text-[11px] font-medium text-emerald-500">Next renewal: Jan 2027</p></div><div class="stat-glass"><div class="flex items-center gap-3 mb-2"><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:history",
        size: "20"
      }, null, _parent));
      _push(`</div><span class="text-xs font-bold text-slate-500">Total Spent</span></div><h3 class="text-2xl font-bold text-brand-dark">$450.00</h3><p class="text-[11px] font-medium text-slate-400">Lifetime contribution</p></div></div><div class="flex flex-wrap gap-4 items-center justify-between mt-8"><div class="flex items-center gap-2"><button class="px-5 py-2.5 bg-white border-2 border-brand-dark text-brand-dark rounded-full text-xs font-bold shadow-sm transition-all focus:ring-2 focus:ring-brand-dark/20">All Transactions</button><button class="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-full text-xs font-bold hover:border-slate-300 transition-all focus:ring-2 focus:ring-slate-200">Membership</button><button class="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-full text-xs font-bold hover:border-slate-300 transition-all focus:ring-2 focus:ring-slate-200">Events</button></div></div><div class="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden"><div class="overflow-x-auto custom-scrollbar"><table class="w-full text-left border-collapse"><thead><tr class="bg-slate-50 border-b border-slate-100"><th class="px-8 py-5 text-xs font-bold text-slate-500">Reference ID</th><th class="px-8 py-5 text-xs font-bold text-slate-500">Description</th><th class="px-8 py-5 text-xs font-bold text-slate-500">Date</th><th class="px-8 py-5 text-xs font-bold text-slate-500">Amount</th><th class="px-8 py-5 text-xs font-bold text-slate-500">Status</th></tr></thead><tbody class="divide-y divide-slate-50"><!--[-->`);
      ssrRenderList(unref(transactions), (tx) => {
        _push(`<tr class="hover:bg-slate-50/50 cursor-pointer transition-colors group"><td class="px-8 py-5 text-xs font-semibold text-brand-dark group-hover:text-brand-cyan transition-colors">${ssrInterpolate(tx.id)}</td><td class="px-8 py-5"><p class="text-sm font-bold text-slate-800">${ssrInterpolate(tx.description)}</p><p class="text-[11px] font-medium text-slate-400 mt-0.5">${ssrInterpolate(tx.type)}</p></td><td class="px-8 py-5 text-xs font-medium text-slate-500">${ssrInterpolate(tx.date)}</td><td class="px-8 py-5 text-sm font-bold text-slate-800">$${ssrInterpolate(tx.amount.toFixed(2))}</td><td class="px-8 py-5"><span class="${ssrRenderClass([
          "px-3 py-1 text-[10px] font-bold rounded-lg",
          tx.status === "Paid" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
        ])}">${ssrInterpolate(tx.status)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      _push(ssrRenderComponent(_component_SideDrawer, {
        isOpen: unref(isDrawerOpen),
        title: "Transaction Details",
        subtitle: (_a = unref(selectedTransaction)) == null ? void 0 : _a.id,
        onClose: ($event) => isDrawerOpen.value = false
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-3"${_scopeId}><button class="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all"${_scopeId}>Close</button><button class="flex-1 py-3 bg-brand-dark text-white rounded-xl text-xs font-bold shadow-lg hover:bg-[#002244] transition-all flex justify-center items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:download",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` Download Receipt </button></div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-3" }, [
                createVNode("button", {
                  onClick: ($event) => isDrawerOpen.value = false,
                  class: "flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-xs font-bold transition-all"
                }, "Close", 8, ["onClick"]),
                createVNode("button", { class: "flex-1 py-3 bg-brand-dark text-white rounded-xl text-xs font-bold shadow-lg hover:bg-[#002244] transition-all flex justify-center items-center gap-2" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:download",
                    size: "16"
                  }),
                  createTextVNode(" Download Receipt ")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(selectedTransaction)) {
              _push2(`<div class="p-8 space-y-8"${_scopeId}><div class="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100"${_scopeId}><p class="text-xs font-bold text-slate-500 mb-2"${_scopeId}>Amount Paid</p><h2 class="text-4xl font-extrabold text-brand-dark tracking-tight"${_scopeId}>$${ssrInterpolate(unref(selectedTransaction).amount.toFixed(2))}</h2><div class="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:check-circle",
                size: "14"
              }, null, _parent2, _scopeId));
              _push2(` Successful Payment </div></div><div class="space-y-6"${_scopeId}><h4 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2"${_scopeId}>Invoice Summary</h4><div class="grid grid-cols-2 gap-y-4"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-slate-400 mb-1"${_scopeId}>Date</p><p class="text-sm font-bold text-slate-800"${_scopeId}>${ssrInterpolate(unref(selectedTransaction).date)}</p></div><div${_scopeId}><p class="text-xs font-semibold text-slate-400 mb-1"${_scopeId}>Payment Method</p><p class="text-sm font-bold text-slate-800 flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:credit-card",
                size: "16",
                class: "text-slate-400"
              }, null, _parent2, _scopeId));
              _push2(` \u2022\u2022\u2022\u2022 ${ssrInterpolate(unref(selectedTransaction).cardLast4)}</p></div><div class="col-span-2"${_scopeId}><p class="text-xs font-semibold text-slate-400 mb-1"${_scopeId}>Description</p><p class="text-sm font-bold text-slate-800"${_scopeId}>${ssrInterpolate(unref(selectedTransaction).description)}</p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(selectedTransaction) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "p-8 space-y-8"
              }, [
                createVNode("div", { class: "text-center p-8 bg-slate-50 rounded-3xl border border-slate-100" }, [
                  createVNode("p", { class: "text-xs font-bold text-slate-500 mb-2" }, "Amount Paid"),
                  createVNode("h2", { class: "text-4xl font-extrabold text-brand-dark tracking-tight" }, "$" + toDisplayString(unref(selectedTransaction).amount.toFixed(2)), 1),
                  createVNode("div", { class: "mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100" }, [
                    createVNode(_component_Icon, {
                      name: "lucide:check-circle",
                      size: "14"
                    }),
                    createTextVNode(" Successful Payment ")
                  ])
                ]),
                createVNode("div", { class: "space-y-6" }, [
                  createVNode("h4", { class: "text-sm font-bold text-slate-800 border-b border-slate-100 pb-2" }, "Invoice Summary"),
                  createVNode("div", { class: "grid grid-cols-2 gap-y-4" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs font-semibold text-slate-400 mb-1" }, "Date"),
                      createVNode("p", { class: "text-sm font-bold text-slate-800" }, toDisplayString(unref(selectedTransaction).date), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs font-semibold text-slate-400 mb-1" }, "Payment Method"),
                      createVNode("p", { class: "text-sm font-bold text-slate-800 flex items-center gap-2" }, [
                        createVNode(_component_Icon, {
                          name: "lucide:credit-card",
                          size: "16",
                          class: "text-slate-400"
                        }),
                        createTextVNode(" \u2022\u2022\u2022\u2022 " + toDisplayString(unref(selectedTransaction).cardLast4), 1)
                      ])
                    ]),
                    createVNode("div", { class: "col-span-2" }, [
                      createVNode("p", { class: "text-xs font-semibold text-slate-400 mb-1" }, "Description"),
                      createVNode("p", { class: "text-sm font-bold text-slate-800" }, toDisplayString(unref(selectedTransaction).description), 1)
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ConfirmModal, {
        isOpen: unref(showPaymentModal),
        title: "Initiate Payment",
        message: "This will open the secure gateway to process your new invoice. Proceed?",
        confirmText: "Continue to Gateway",
        cancelText: "Cancel",
        confirmStyle: "primary",
        icon: "lucide:credit-card",
        onConfirm: ($event) => showPaymentModal.value = false,
        onCancel: ($event) => showPaymentModal.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/payments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=payments-BMTzVf85.mjs.map
