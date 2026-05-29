import { _ as __nuxt_component_0 } from './server.mjs';
import { ref, watch, mergeProps, unref, nextTick, useSSRContext } from 'file:///Users/marquis/scpsn/member/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'file:///Users/marquis/scpsn/member/node_modules/vue/server-renderer/index.mjs';
import { u as useChat } from './useChat-Bdsdhj_f.mjs';
import { u as useUploadFile } from './useUploadFile-BMDCbK5W.mjs';
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
  __name: "chat",
  __ssrInlineRender: true,
  setup(__props) {
    const { chats, activeChatId, activeChat } = useChat();
    useUploadFile();
    const newMessageText = ref("");
    const scrollAnchor = ref(null);
    const showAttachmentMenu = ref(false);
    ref(null);
    ref(null);
    const attachmentTypes = [
      { type: "pdf", label: "Document", icon: "lucide:file-text", color: "bg-indigo-500" },
      { type: "image", label: "Camera", icon: "lucide:camera", color: "bg-rose-500" },
      { type: "image", label: "Gallery", icon: "lucide:image", color: "bg-emerald-500" },
      { type: "audio", label: "Audio", icon: "lucide:headphones", color: "bg-amber-500" }
    ];
    const scrollToBottom = async () => {
      var _a;
      await nextTick();
      (_a = scrollAnchor.value) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    watch(activeChatId, () => {
      if (activeChatId.value) scrollToBottom();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex overflow-hidden" }, _attrs))} data-v-2c9f5a45><aside class="w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white shrink-0" data-v-2c9f5a45><div class="p-6 space-y-6" data-v-2c9f5a45><div class="flex items-center justify-between" data-v-2c9f5a45><h2 class="text-2xl font-black text-slate-800 tracking-tighter" data-v-2c9f5a45>Scientific chat</h2><div class="flex gap-2" data-v-2c9f5a45><button class="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#003366] hover:border-[#003366] transition-all" data-v-2c9f5a45>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:users",
        size: "18"
      }, null, _parent));
      _push(`</button><button class="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#003366] hover:border-[#003366] transition-all" data-v-2c9f5a45>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:edit-3",
        size: "18"
      }, null, _parent));
      _push(`</button></div></div><div class="relative group" data-v-2c9f5a45><input type="text" placeholder="Search registry..." class="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#003366]/5 focus:border-[#003366]/20 transition-all placeholder:text-slate-400 shadow-sm" data-v-2c9f5a45>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        size: "16",
        class: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#003366] transition-colors"
      }, null, _parent));
      _push(`</div></div><div class="flex-1 overflow-y-auto custom-scrollbar px-3 pb-6 space-y-1" data-v-2c9f5a45><!--[-->`);
      ssrRenderList(unref(chats), (chat2) => {
        _push(`<div class="${ssrRenderClass([
          "p-4 rounded-3xl cursor-pointer transition-all flex gap-4 items-center relative overflow-hidden group",
          unref(activeChatId) === chat2.id ? "bg-[#003366] text-white shadow-xl shadow-[#003366]/20" : "hover:bg-slate-50 text-slate-600"
        ])}" data-v-2c9f5a45><div class="relative shrink-0" data-v-2c9f5a45><div class="${ssrRenderClass([
          "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg border-2 shadow-sm",
          unref(activeChatId) === chat2.id ? "bg-white/10 border-white/20" : "bg-slate-100 border-white text-slate-400"
        ])}" data-v-2c9f5a45>`);
        if (chat2.avatar) {
          _push(`<img${ssrRenderAttr("src", chat2.avatar)} class="w-full h-full object-cover rounded-2xl" data-v-2c9f5a45>`);
        } else {
          _push(`<span data-v-2c9f5a45>${ssrInterpolate(chat2.name.split(" ").map((n) => n[0]).join("").substring(0, 2))}</span>`);
        }
        _push(`</div><span class="${ssrRenderClass([
          "absolute -bottom-1 -right-1 w-4 h-4 border-2 rounded-full transition-colors",
          unref(activeChatId) === chat2.id ? "border-[#003366]" : "border-white",
          chat2.status === "online" ? "bg-emerald-500" : chat2.status === "away" ? "bg-amber-500" : "bg-slate-300"
        ])}" data-v-2c9f5a45></span></div><div class="flex-1 min-w-0" data-v-2c9f5a45><div class="flex items-center justify-between mb-0.5" data-v-2c9f5a45><h4 class="${ssrRenderClass(["text-sm font-bold truncate", unref(activeChatId) === chat2.id ? "text-white" : "text-slate-800"])}" data-v-2c9f5a45>${ssrInterpolate(chat2.name)}</h4><span class="${ssrRenderClass(["text-[10px] font-medium", unref(activeChatId) === chat2.id ? "text-white/60" : "text-slate-400"])}" data-v-2c9f5a45>${ssrInterpolate(chat2.time)}</span></div><p class="${ssrRenderClass(["text-[11px] font-medium truncate pr-4", unref(activeChatId) === chat2.id ? "text-white/60" : "text-slate-500"])}" data-v-2c9f5a45>${ssrInterpolate(chat2.lastMessage)}</p></div>`);
        if (chat2.unreadCount > 0 && unref(activeChatId) !== chat2.id) {
          _push(`<div class="w-5 h-5 bg-brand-cyan text-[#003366] text-[10px] font-black rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-brand-cyan/20" data-v-2c9f5a45>${ssrInterpolate(chat2.unreadCount)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></aside><main class="flex-1 flex flex-col bg-[#F0F2F5] relative overflow-hidden" data-v-2c9f5a45>`);
      if (unref(activeChat)) {
        _push(`<div class="flex flex-col h-full" data-v-2c9f5a45><header class="p-6 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between z-10 shadow-sm" data-v-2c9f5a45><div class="flex items-center gap-4" data-v-2c9f5a45><div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200 shadow-sm" data-v-2c9f5a45>`);
        if (unref(activeChat).avatar) {
          _push(`<img${ssrRenderAttr("src", unref(activeChat).avatar)} class="w-full h-full object-cover rounded-xl" data-v-2c9f5a45>`);
        } else {
          _push(`<span data-v-2c9f5a45>${ssrInterpolate(unref(activeChat).name.split(" ").map((n) => n[0]).join("").substring(0, 2))}</span>`);
        }
        _push(`</div><div data-v-2c9f5a45><h3 class="text-base font-bold text-slate-800 leading-tight" data-v-2c9f5a45>${ssrInterpolate(unref(activeChat).name)}</h3><div class="flex items-center gap-1.5 mt-0.5" data-v-2c9f5a45><span class="${ssrRenderClass(["w-1.5 h-1.5 rounded-full", unref(activeChat).status === "online" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"])}" data-v-2c9f5a45></span><span class="text-[10px] font-bold text-slate-400 tracking-widest" data-v-2c9f5a45>${ssrInterpolate(unref(activeChat).status === "online" ? "Active in registry" : "Offline")}</span></div></div></div><div class="flex items-center gap-2" data-v-2c9f5a45><button class="p-3 text-slate-400 hover:text-[#003366] hover:bg-slate-100 rounded-2xl transition-all" data-v-2c9f5a45>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:search",
          size: "18"
        }, null, _parent));
        _push(`</button><button class="p-3 text-slate-400 hover:text-[#003366] hover:bg-slate-100 rounded-2xl transition-all" data-v-2c9f5a45>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:paperclip",
          size: "18"
        }, null, _parent));
        _push(`</button><button class="p-3 text-slate-400 hover:text-[#003366] hover:bg-slate-100 rounded-2xl transition-all" data-v-2c9f5a45>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:more-vertical",
          size: "18"
        }, null, _parent));
        _push(`</button></div></header><div class="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 custom-scrollbar bg-[url(&#39;https://w0.peakpx.com/wallpaper/580/650/HD-wallpaper-whatsapp-background-whatsapp-texture.jpg&#39;)] bg-repeat" data-v-2c9f5a45><!--[-->`);
        ssrRenderList(unref(activeChat).messages, (msg) => {
          _push(`<div class="${ssrRenderClass(["flex w-full animate-in fade-in slide-in-from-bottom-2", msg.isMe ? "justify-end" : "justify-start"])}" data-v-2c9f5a45><div class="${ssrRenderClass([
            "max-w-[85%] lg:max-w-[70%] rounded-3xl shadow-lg shadow-black/5 relative p-1 transition-all",
            msg.isMe ? "bg-brand-cyan rounded-tr-none" : "bg-white rounded-tl-none border border-slate-200"
          ])}" data-v-2c9f5a45>`);
          if (msg.attachments && msg.attachments.length > 0) {
            _push(`<div class="p-1 space-y-1" data-v-2c9f5a45><!--[-->`);
            ssrRenderList(msg.attachments, (att, i) => {
              _push(`<div class="rounded-2xl overflow-hidden bg-black/5" data-v-2c9f5a45>`);
              if (att.type === "image") {
                _push(`<div class="relative group" data-v-2c9f5a45><img${ssrRenderAttr("src", att.url)} class="w-full max-h-[400px] object-cover cursor-zoom-in" data-v-2c9f5a45><div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" data-v-2c9f5a45></div></div>`);
              } else if (att.type === "pdf" || att.type === "document") {
                _push(`<div class="p-4 flex items-center gap-4 bg-white/40 backdrop-blur-sm" data-v-2c9f5a45><div class="w-12 h-12 rounded-xl bg-[#003366] text-white flex items-center justify-center border-4 border-white/20 shadow-sm" data-v-2c9f5a45>`);
                _push(ssrRenderComponent(_component_Icon, {
                  name: att.type === "pdf" ? "lucide:file-text" : "lucide:file",
                  size: "20"
                }, null, _parent));
                _push(`</div><div class="flex-1 min-w-0" data-v-2c9f5a45><p class="text-xs font-bold text-slate-800 truncate" data-v-2c9f5a45>${ssrInterpolate(att.name)}</p><p class="text-[10px] font-medium text-slate-400 mt-0.5 tracking-tighter" data-v-2c9f5a45>${ssrInterpolate(att.size || "Scientific file")} \u2022 ${ssrInterpolate(att.type)}</p></div><button class="w-10 h-10 bg-white/60 hover:bg-white rounded-lg flex items-center justify-center text-[#003366] transition-all" data-v-2c9f5a45>`);
                _push(ssrRenderComponent(_component_Icon, {
                  name: "lucide:download",
                  size: "16"
                }, null, _parent));
                _push(`</button></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (msg.text) {
            _push(`<div class="px-5 py-4" data-v-2c9f5a45><p class="${ssrRenderClass(["text-sm font-medium leading-relaxed", msg.isMe ? "text-[#003366]" : "text-slate-700"])}" data-v-2c9f5a45>${ssrInterpolate(msg.text)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="px-4 pb-2 flex items-center justify-end gap-1.5 opacity-60" data-v-2c9f5a45><span class="text-[9px] font-black tracking-tighter" data-v-2c9f5a45>${ssrInterpolate(msg.time)}</span>`);
          if (msg.isMe) {
            _push(`<div class="flex" data-v-2c9f5a45>`);
            if (msg.status === "sent") {
              _push(ssrRenderComponent(_component_Icon, {
                name: "lucide:check",
                size: "12"
              }, null, _parent));
            } else if (msg.status === "delivered") {
              _push(ssrRenderComponent(_component_Icon, {
                name: "lucide:check-check",
                size: "12"
              }, null, _parent));
            } else if (msg.status === "read") {
              _push(ssrRenderComponent(_component_Icon, {
                name: "lucide:check-check",
                size: "12",
                class: "text-blue-600"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (msg.isMe) {
            _push(`<div class="absolute top-0 -right-2 w-4 h-4 bg-brand-cyan clip-path-bubble-right" data-v-2c9f5a45></div>`);
          } else {
            _push(`<div class="absolute top-0 -left-2 w-4 h-4 bg-white border-l border-t border-slate-200 clip-path-bubble-left" data-v-2c9f5a45></div>`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--><div data-v-2c9f5a45></div></div><footer class="p-6 bg-[#F0F2F5] z-10" data-v-2c9f5a45>`);
        if (showAttachmentMenu.value) {
          _push(`<div class="absolute bottom-28 left-8 w-48 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-3 grid grid-cols-2 gap-2 z-50" data-v-2c9f5a45><!--[-->`);
          ssrRenderList(attachmentTypes, (item) => {
            _push(`<button class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition-all group" data-v-2c9f5a45><div class="${ssrRenderClass(["w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110", item.color])}" data-v-2c9f5a45>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: item.icon,
              size: "18"
            }, null, _parent));
            _push(`</div><span class="text-[10px] font-black text-slate-400 tracking-widest" data-v-2c9f5a45>${ssrInterpolate(item.label)}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center gap-4" data-v-2c9f5a45><div class="flex-1 bg-white p-2 pl-4 lg:pl-6 rounded-[2.5rem] flex items-center gap-4 shadow-sm border border-slate-200 focus-within:ring-4 focus-within:ring-[#003366]/5 transition-all" data-v-2c9f5a45><button class="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#003366] transition-colors" data-v-2c9f5a45>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:plus",
          size: "24",
          class: ["transition-transform duration-300", showAttachmentMenu.value ? "rotate-45 text-rose-500" : ""]
        }, null, _parent));
        _push(`</button><input${ssrRenderAttr("value", newMessageText.value)} type="text" placeholder="Type scientific message..." class="flex-1 h-12 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-300" data-v-2c9f5a45><div class="flex items-center gap-1 pr-2" data-v-2c9f5a45><button class="p-2 text-slate-400 hover:text-brand-cyan transition-colors" data-v-2c9f5a45>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:smile",
          size: "20"
        }, null, _parent));
        _push(`</button><button class="p-2 text-slate-400 hover:text-brand-cyan transition-colors" data-v-2c9f5a45>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:camera",
          size: "20"
        }, null, _parent));
        _push(`</button></div></div><button class="w-14 h-14 bg-[#003366] text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#003366]/20 group" data-v-2c9f5a45>`);
        if (newMessageText.value.trim()) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:send",
            size: "22",
            class: "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:mic",
            size: "22"
          }, null, _parent));
        }
        _push(`</button></div></footer></div>`);
      } else {
        _push(`<div class="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-8 bg-white" data-v-2c9f5a45><div class="relative" data-v-2c9f5a45><div class="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center shadow-inner" data-v-2c9f5a45>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:messages-square",
          size: "64",
          class: "text-slate-200"
        }, null, _parent));
        _push(`</div><div class="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-cyan text-[#003366] rounded-full text-[10px] font-black tracking-widest shadow-xl" data-v-2c9f5a45> Registry network </div></div><div class="space-y-3 max-w-sm" data-v-2c9f5a45><h3 class="text-2xl font-black text-slate-800 tracking-tight" data-v-2c9f5a45>Society chat</h3><p class="text-sm text-slate-500 font-medium leading-relaxed" data-v-2c9f5a45>Select a practitioner, research group, or administrator to start a secure end-to-end encrypted scientific conversation.</p></div><div class="p-6 border border-slate-100 rounded-3xl bg-slate-50/50 text-[10px] font-bold text-slate-400 tracking-widest flex items-center gap-3" data-v-2c9f5a45>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:lock",
          size: "14",
          class: "text-emerald-500"
        }, null, _parent));
        _push(` End-to-End encrypted registry </div></div>`);
      }
      _push(`</main><input type="file" class="hidden" data-v-2c9f5a45></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/chat.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const chat = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c9f5a45"]]);

export { chat as default };
//# sourceMappingURL=chat-Ci4Q2TVU.mjs.map
