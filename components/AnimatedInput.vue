<template>
  <div class="mb-2 relative font-body">
    <!-- ── Input wrapper ── -->
    <div class="relative input-container">
      <label
        :for="inputId"
        :class="[
          'absolute transition-all duration-250 ease-in-out pointer-events-none z-10 font-semibold',
          isFocused || modelValue
            ? 'text-[11px] text-[#1d4e89] left-4 top-2.5 tracking-wide'
            : `text-[14px] text-slate-400 left-4 ${type === 'textarea' ? 'top-4' : 'top-1/2 -translate-y-1/2'}`
        ]"
      >
        {{ label }}
      </label>

      <!-- Textarea -->
      <textarea
        v-if="type === 'textarea'"
        :id="inputId"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :class="[
          'w-full pb-3 pt-7 px-4 bg-slate-50 border text-[14px] text-slate-800 font-medium focus:outline-none transition-all duration-200 resize-none placeholder:text-slate-300',
          roundedClasses,
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          (hasError || (errorMessage && showError))
            ? 'border-rose-400 ring-2 ring-rose-100'
            : isFocused
              ? 'border-[#1d4e89]/40 ring-2 ring-[#1d4e89]/8 bg-white'
              : 'border-slate-200 hover:border-slate-300'
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Input -->
      <input
        v-else
        :id="inputId"
        ref="inputRef"
        :type="computedType"
        :value="displayValue"
        :disabled="disabled"
        :readonly="readonly || type === 'date' || type === 'time' || type === 'datetime-local'"
        :autocomplete="autocomplete"
        :class="[
          'w-full pb-3 pt-7 px-4 bg-slate-50 border text-[14px] text-slate-800 font-medium focus:outline-none transition-all duration-200',
          roundedClasses,
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          (type === 'date' || type === 'time' || type === 'datetime-local') ? 'cursor-pointer' : '',
          (hasError || (errorMessage && showError))
            ? 'border-rose-400 ring-2 ring-rose-100'
            : isFocused
              ? 'border-[#1d4e89]/40 ring-2 ring-[#1d4e89]/8 bg-white'
              : 'border-slate-200 hover:border-slate-300'
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="handleInputClick"
      />

      <!-- Password toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1d4e89] hover:bg-[#1d4e89]/8 transition-all z-20"
      >
        <svg v-if="showPassword" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
        </svg>
        <svg v-else width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
        </svg>
      </button>

      <!-- Right slot -->
      <div
        v-if="$slots.right && type !== 'password' && type !== 'date' && type !== 'time' && type !== 'datetime-local'"
        class="absolute right-3.5 top-1/2 -translate-y-1/2 z-20"
      >
        <slot name="right" />
      </div>

      <!-- Calendar / clock icon for pickers -->
      <div
        v-if="type === 'date' || type === 'time' || type === 'datetime-local'"
        class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-20 text-slate-400"
      >
        <svg v-if="type === 'time'" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
        <svg v-else width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
      </div>
    </div>

    <!-- Error message -->
    <Transition name="slide-fade">
      <p v-if="errorMessage && showError" class="text-[12px] font-semibold text-rose-500 mt-1.5 ml-4 flex items-center gap-1.5">
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        {{ errorMessage }}
      </p>
    </Transition>
  </div>


  <!-- ══════════════════════════════════════════════════════════════
       PICKERS (teleported to body)
  ══════════════════════════════════════════════════════════════ -->
  <Teleport to="body">

    <!-- ── DATE PICKER ── -->
    <Transition name="picker-fade">
      <div
        v-if="showDatePicker"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1f3c]/50 backdrop-blur-sm p-4"
        @click="closeDatePicker"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden font-body" @click.stop>

          <!-- Header -->
          <div class="relative px-6 py-5 flex items-center justify-between" style="background:linear-gradient(175deg,#0d2d55 0%,#1d4e89 60%,#163d6e 100%);">
            <div class="absolute top-0 left-0 right-0 h-[3px]" style="background:linear-gradient(90deg,transparent,#c9993f 30%,#e8c97a 60%,transparent);" />
            <div>
              <p class="text-[10px] font-bold text-[#93c5fd] tracking-[0.18em] uppercase mb-0.5">Select Date</p>
              <p class="text-[17px] font-extrabold text-white">{{ selectedDate ? formatDateDisplay(selectedDate) : 'No date selected' }}</p>
            </div>
            <button type="button" @click.stop="closeDatePicker" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-rose-500 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Calendar -->
          <div class="p-5">
            <!-- Month/Year nav -->
            <div class="flex items-center justify-between mb-5">
              <button type="button" @click.stop="prevMonth" class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all group">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div class="flex gap-2">
                <select v-model="currentMonth" @click.stop class="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-[#1d4e89]/40 rounded-xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-[#1d4e89]/50 transition-all cursor-pointer">
                  <option v-for="(m, i) in months" :key="i" :value="i">{{ m }}</option>
                </select>
                <select v-model="currentYear" @click.stop class="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-[#1d4e89]/40 rounded-xl text-[13px] font-bold text-slate-700 focus:outline-none focus:border-[#1d4e89]/50 transition-all cursor-pointer">
                  <option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
                </select>
              </div>
              <button type="button" @click.stop="nextMonth" class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            <!-- Day headers -->
            <div class="grid grid-cols-7 mb-2">
              <div v-for="d in weekDays" :key="d" class="text-center text-[11px] font-bold text-slate-400 tracking-wider py-1">{{ d }}</div>
            </div>

            <!-- Days -->
            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="(day, i) in calendarDays"
                :key="i"
                type="button"
                :disabled="!day.isCurrentMonth"
                :class="getDayClass(day)"
                @click.stop="selectDay(day)"
              >{{ day.date }}</button>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button type="button" @click.stop="setToday" class="px-4 py-2 text-[13px] font-bold text-[#1d4e89] hover:bg-[#1d4e89] hover:text-white rounded-xl border border-[#1d4e89]/30 hover:border-[#1d4e89] transition-all">Today</button>
            <button type="button" @click.stop="clearDateValue" class="px-4 py-2 text-[13px] font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-all">Clear</button>
          </div>
        </div>
      </div>
    </Transition>


    <!-- ── TIME PICKER ── -->
    <Transition name="picker-fade">
      <div
        v-if="showTimePicker"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1f3c]/50 backdrop-blur-sm p-4"
        @click="closeTimePicker"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-xs overflow-hidden font-body" @click.stop>

          <!-- Header -->
          <div class="relative px-6 py-5 flex items-center justify-between" style="background:linear-gradient(175deg,#0d2d55 0%,#1d4e89 60%,#163d6e 100%);">
            <div class="absolute top-0 left-0 right-0 h-[3px]" style="background:linear-gradient(90deg,transparent,#c9993f 30%,#e8c97a 60%,transparent);" />
            <div>
              <p class="text-[10px] font-bold text-[#93c5fd] tracking-[0.18em] uppercase mb-0.5">Select Time</p>
              <p class="text-[24px] font-black text-white font-mono tracking-wider">{{ selectedHour }}:{{ selectedMinute }} <span class="text-[#e8c97a]">{{ selectedPeriod }}</span></p>
            </div>
            <button type="button" @click.stop="closeTimePicker" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-rose-500 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="p-6">
            <!-- Hour / Min spinners -->
            <div class="flex items-center justify-center gap-4 mb-6">
              <!-- Hour -->
              <div class="flex flex-col items-center gap-2">
                <button type="button" @click.stop="incHour" class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <input type="text" v-model="selectedHour" @blur="valHour" @focus="($event.target as HTMLInputElement).select()" @click.stop maxlength="2"
                  class="w-16 h-16 text-center text-[28px] font-black text-slate-800 border-2 border-slate-200 focus:border-[#1d4e89]/50 focus:ring-2 focus:ring-[#1d4e89]/10 rounded-xl bg-slate-50 focus:bg-white focus:outline-none transition-all" />
                <button type="button" @click.stop="decHour" class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>

              <span class="text-[36px] font-black text-slate-200 select-none -mt-1">:</span>

              <!-- Minute -->
              <div class="flex flex-col items-center gap-2">
                <button type="button" @click.stop="incMin" class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <input type="text" v-model="selectedMinute" @blur="valMin" @focus="($event.target as HTMLInputElement).select()" @click.stop maxlength="2"
                  class="w-16 h-16 text-center text-[28px] font-black text-slate-800 border-2 border-slate-200 focus:border-[#1d4e89]/50 focus:ring-2 focus:ring-[#1d4e89]/10 rounded-xl bg-slate-50 focus:bg-white focus:outline-none transition-all" />
                <button type="button" @click.stop="decMin" class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
            </div>

            <!-- AM / PM -->
            <div class="grid grid-cols-2 gap-2">
              <button type="button" @click.stop="setPeriod('AM')"
                :class="['py-3 rounded-xl text-[13px] font-bold transition-all border', selectedPeriod === 'AM' ? 'bg-[#1d4e89] text-white border-[#1d4e89] shadow-md shadow-[#1d4e89]/20' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#1d4e89]/30 hover:text-[#1d4e89]']">
                AM
              </button>
              <button type="button" @click.stop="setPeriod('PM')"
                :class="['py-3 rounded-xl text-[13px] font-bold transition-all border', selectedPeriod === 'PM' ? 'bg-[#1d4e89] text-white border-[#1d4e89] shadow-md shadow-[#1d4e89]/20' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#1d4e89]/30 hover:text-[#1d4e89]']">
                PM
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button type="button" @click.stop="setNow" class="px-4 py-2 text-[13px] font-bold text-[#1d4e89] hover:bg-[#1d4e89] hover:text-white rounded-xl border border-[#1d4e89]/30 hover:border-[#1d4e89] transition-all">Now</button>
            <div class="flex gap-2">
              <button type="button" @click.stop="clearTimeValue" class="px-4 py-2 text-[13px] font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-all">Clear</button>
              <button type="button" @click.stop="confirmTimeValue" class="px-5 py-2 text-[13px] font-bold text-white rounded-xl transition-all shadow-md" style="background:linear-gradient(135deg,#1d4e89,#0d2d55);">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>


    <!-- ── DATETIME PICKER ── -->
    <Transition name="picker-fade">
      <div
        v-if="showDateTimePicker"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1f3c]/50 backdrop-blur-sm p-4 overflow-y-auto"
        @click="closeDateTimePicker"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden font-body" @click.stop>

          <!-- Header -->
          <div class="relative px-7 py-5 flex items-center justify-between" style="background:linear-gradient(175deg,#0d2d55 0%,#1d4e89 60%,#163d6e 100%);">
            <div class="absolute top-0 left-0 right-0 h-[3px]" style="background:linear-gradient(90deg,transparent,#c9993f 30%,#e8c97a 60%,transparent);" />
            <div>
              <p class="text-[10px] font-bold text-[#93c5fd] tracking-[0.18em] uppercase mb-0.5">Select Date & Time</p>
              <p class="text-[16px] font-extrabold text-white">
                {{ dtSelectedDate ? `${formatDateDisplay(dtSelectedDate)} · ${selectedHour}:${selectedMinute} ${selectedPeriod}` : 'No date & time selected' }}
              </p>
            </div>
            <button type="button" @click.stop="closeDateTimePicker" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-rose-500 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

            <!-- Date column -->
            <div class="p-6">
              <p class="text-[10px] font-bold text-[#1d4e89] tracking-[0.18em] uppercase mb-4">Date</p>
              <div class="flex items-center justify-between mb-4">
                <button type="button" @click.stop="prevMonth" class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                  <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div class="flex gap-1.5">
                  <select v-model="currentMonth" @click.stop class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 focus:outline-none focus:border-[#1d4e89]/40 cursor-pointer">
                    <option v-for="(m, i) in months" :key="i" :value="i">{{ m.slice(0,3) }}</option>
                  </select>
                  <select v-model="currentYear" @click.stop class="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 focus:outline-none focus:border-[#1d4e89]/40 cursor-pointer">
                    <option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
                  </select>
                </div>
                <button type="button" @click.stop="nextMonth" class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                  <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
              <div class="grid grid-cols-7 mb-1">
                <div v-for="d in weekDays" :key="d" class="text-center text-[10px] font-bold text-slate-400 tracking-wider py-1">{{ d }}</div>
              </div>
              <div class="grid grid-cols-7 gap-0.5">
                <button
                  v-for="(day, i) in dtCalendarDays"
                  :key="i"
                  type="button"
                  :disabled="!day.isCurrentMonth"
                  :class="getDTDayClass(day)"
                  @click.stop="selectDTDay(day)"
                >{{ day.date }}</button>
              </div>
            </div>

            <!-- Time column -->
            <div class="p-6">
              <p class="text-[10px] font-bold text-[#1d4e89] tracking-[0.18em] uppercase mb-4">Time</p>
              <div class="flex items-center justify-center gap-3 mb-5">
                <!-- Hour -->
                <div class="flex flex-col items-center gap-1.5">
                  <button type="button" @click.stop="incHour" class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                  </button>
                  <input type="text" v-model="selectedHour" @blur="valHour" @focus="($event.target as HTMLInputElement).select()" @click.stop maxlength="2"
                    class="w-14 h-14 text-center text-[22px] font-black text-slate-800 border-2 border-slate-200 focus:border-[#1d4e89]/50 rounded-xl bg-slate-50 focus:bg-white focus:outline-none transition-all" />
                  <button type="button" @click.stop="decHour" class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                </div>
                <span class="text-[28px] font-black text-slate-200 select-none">:</span>
                <!-- Minute -->
                <div class="flex flex-col items-center gap-1.5">
                  <button type="button" @click.stop="incMin" class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                  </button>
                  <input type="text" v-model="selectedMinute" @blur="valMin" @focus="($event.target as HTMLInputElement).select()" @click.stop maxlength="2"
                    class="w-14 h-14 text-center text-[22px] font-black text-slate-800 border-2 border-slate-200 focus:border-[#1d4e89]/50 rounded-xl bg-slate-50 focus:bg-white focus:outline-none transition-all" />
                  <button type="button" @click.stop="decMin" class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-[#1d4e89] hover:text-white border border-slate-200 hover:border-[#1d4e89] flex items-center justify-center transition-all">
                    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" @click.stop="setPeriod('AM')"
                  :class="['py-2.5 rounded-xl text-[13px] font-bold border transition-all', selectedPeriod === 'AM' ? 'bg-[#1d4e89] text-white border-[#1d4e89] shadow-md shadow-[#1d4e89]/20' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#1d4e89]/30 hover:text-[#1d4e89]']">AM</button>
                <button type="button" @click.stop="setPeriod('PM')"
                  :class="['py-2.5 rounded-xl text-[13px] font-bold border transition-all', selectedPeriod === 'PM' ? 'bg-[#1d4e89] text-white border-[#1d4e89] shadow-md shadow-[#1d4e89]/20' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#1d4e89]/30 hover:text-[#1d4e89]']">PM</button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 pb-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button type="button" @click.stop="setDTNow" class="px-4 py-2 text-[13px] font-bold text-[#1d4e89] hover:bg-[#1d4e89] hover:text-white rounded-xl border border-[#1d4e89]/30 hover:border-[#1d4e89] transition-all">Now</button>
            <div class="flex gap-2">
              <button type="button" @click.stop="clearDTValue" class="px-4 py-2 text-[13px] font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-all">Clear</button>
              <button type="button" @click.stop="confirmDTValue" class="px-5 py-2 text-[13px] font-bold text-white rounded-xl transition-all shadow-md" style="background:linear-gradient(135deg,#1d4e89,#0d2d55);">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </Teleport>
</template>


<script setup lang="ts">
import { ref, computed, useId, watch } from 'vue'

interface Props {
  modelValue?: string | number
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number' | 'date' | 'time' | 'datetime-local' | 'textarea'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  autocomplete?: string
  errorMessage?: string
  showError?: boolean
  position?: 'top' | 'middle' | 'bottom' | 'standalone'
  hasError?: boolean
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  autocomplete: 'off',
  errorMessage: '',
  showError: true,
  position: 'standalone',
  hasError: false,
  rows: 4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

const isFocused     = ref(false)
const showPassword  = ref(false)
const showDatePicker      = ref(false)
const showTimePicker      = ref(false)
const showDateTimePicker  = ref(false)
const inputId  = useId()
const inputRef = ref<HTMLInputElement | null>(null)

const currentMonth   = ref(new Date().getMonth())
const currentYear    = ref(new Date().getFullYear())
const selectedDate   = ref<Date | null>(null)
const dtSelectedDate = ref<Date | null>(null)

const selectedHour   = ref('12')
const selectedMinute = ref('00')
const selectedPeriod = ref<'AM' | 'PM'>('PM')

const months   = ['January','February','March','April','May','June','July','August','September','October','November','December']
const weekDays = ['Su','Mo','Tu','We','Th','Fr','Sa']

const computedType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  if (['date','time','datetime-local'].includes(props.type!)) return 'text'
  return props.type
})

const displayValue = computed(() => {
  if (props.type === 'date' && props.modelValue) return formatDateDisplay(new Date(props.modelValue as string))
  if (props.type === 'time' && props.modelValue) return props.modelValue
  if (props.type === 'datetime-local' && props.modelValue) {
    const parsed = parseDTString(props.modelValue as string)
    return parsed ? `${formatDateDisplay(parsed.date)} · ${parsed.hour}:${parsed.minute} ${parsed.period}` : props.modelValue
  }
  return props.modelValue
})

const roundedClasses = computed(() => ({
  top: 'rounded-t-xl rounded-b-sm',
  middle: 'rounded-sm',
  bottom: 'rounded-b-xl rounded-t-sm',
  standalone: 'rounded-xl',
}[props.position!] || 'rounded-xl'))

const yearRange = computed(() => {
  const cur = new Date().getFullYear()
  return Array.from({ length: 111 }, (_, i) => cur - 100 + i)
})

interface CalendarDay { date: number; fullDate: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean }

function generateCalendar(compareDate: Date | null): CalendarDay[] {
  const firstDay    = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay     = new Date(currentYear.value, currentMonth.value + 1, 0)
  const prevLastDay = new Date(currentYear.value, currentMonth.value, 0)
  const startDow    = firstDay.getDay()
  const today       = new Date(); today.setHours(0,0,0,0)
  const days: CalendarDay[] = []

  for (let i = startDow - 1; i >= 0; i--) {
    const d = prevLastDay.getDate() - i
    const fd = new Date(currentYear.value, currentMonth.value - 1, d); fd.setHours(0,0,0,0)
    days.push({ date: d, fullDate: fd, isCurrentMonth: false, isToday: fd.getTime()===today.getTime(), isSelected: compareDate ? fd.getTime()===compareDate.getTime() : false })
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const fd = new Date(currentYear.value, currentMonth.value, i); fd.setHours(0,0,0,0)
    days.push({ date: i, fullDate: fd, isCurrentMonth: true, isToday: fd.getTime()===today.getTime(), isSelected: compareDate ? fd.getTime()===compareDate.getTime() : false })
  }
  const rem = 42 - days.length
  for (let i = 1; i <= rem; i++) {
    const fd = new Date(currentYear.value, currentMonth.value + 1, i); fd.setHours(0,0,0,0)
    days.push({ date: i, fullDate: fd, isCurrentMonth: false, isToday: fd.getTime()===today.getTime(), isSelected: compareDate ? fd.getTime()===compareDate.getTime() : false })
  }
  return days
}

const calendarDays   = computed(() => generateCalendar(selectedDate.value))
const dtCalendarDays = computed(() => generateCalendar(dtSelectedDate.value))

function getDayClass(day: CalendarDay) {
  return [
    'aspect-square flex items-center justify-center text-[13px] font-semibold rounded-xl transition-all',
    day.isCurrentMonth ? 'hover:bg-[#1d4e89]/8 hover:text-[#1d4e89] cursor-pointer' : 'text-slate-300 cursor-not-allowed',
    day.isToday && !day.isSelected ? 'border-2 border-[#1d4e89]/40 text-[#1d4e89] font-bold' : '',
    day.isSelected ? 'bg-[#1d4e89] text-white shadow-md shadow-[#1d4e89]/25 scale-105' : '',
  ]
}

function getDTDayClass(day: CalendarDay) {
  return [
    'aspect-square flex items-center justify-center text-[12px] font-medium rounded-lg transition-all',
    day.isCurrentMonth ? 'hover:bg-[#1d4e89]/8 hover:text-[#1d4e89] cursor-pointer' : 'text-slate-300 cursor-not-allowed',
    day.isToday && !day.isSelected ? 'border border-[#1d4e89]/40 text-[#1d4e89] font-bold' : '',
    day.isSelected ? 'bg-[#1d4e89] text-white shadow-sm' : '',
  ]
}

const handleInput = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)
const handleFocus = (e: FocusEvent) => { isFocused.value = true; emit('focus', e) }
const handleBlur  = (e: FocusEvent) => { isFocused.value = false; emit('blur', e) }
const handleInputClick = () => {
  if (props.type === 'date') showDatePicker.value = true
  else if (props.type === 'time') showTimePicker.value = true
  else if (props.type === 'datetime-local') showDateTimePicker.value = true
}
const togglePasswordVisibility = () => { showPassword.value = !showPassword.value }

const prevMonth = () => { currentMonth.value === 0 ? (currentMonth.value = 11, currentYear.value--) : currentMonth.value-- }
const nextMonth = () => { currentMonth.value === 11 ? (currentMonth.value = 0, currentYear.value++) : currentMonth.value++ }

const selectDay = (day: CalendarDay) => {
  if (!day.isCurrentMonth) return
  selectedDate.value = day.fullDate
  emit('update:modelValue', formatDateModel(day.fullDate))
  setTimeout(() => { showDatePicker.value = false }, 150)
}
const selectDTDay    = (day: CalendarDay) => { if (day.isCurrentMonth) dtSelectedDate.value = day.fullDate }
const setToday       = () => { emit('update:modelValue', formatDateModel(new Date())); showDatePicker.value = false }
const clearDateValue = () => { emit('update:modelValue', ''); selectedDate.value = null; showDatePicker.value = false }
const closeDatePicker = () => { showDatePicker.value = false }

const incHour = () => { let h = parseInt(selectedHour.value); h = h===12 ? 1 : h+1; selectedHour.value = String(h).padStart(2,'0') }
const decHour = () => { let h = parseInt(selectedHour.value); h = h===1 ? 12 : h-1; selectedHour.value = String(h).padStart(2,'0') }
const incMin  = () => { let m = parseInt(selectedMinute.value); selectedMinute.value = String((m+1)%60).padStart(2,'0') }
const decMin  = () => { let m = parseInt(selectedMinute.value); selectedMinute.value = String(m===0 ? 59 : m-1).padStart(2,'0') }
const valHour = () => { let h = parseInt(selectedHour.value); if (isNaN(h)||h<1||h>12) h=12; selectedHour.value=String(h).padStart(2,'0') }
const valMin  = () => { let m = parseInt(selectedMinute.value); if (isNaN(m)||m<0||m>59) m=0; selectedMinute.value=String(m).padStart(2,'0') }
const setPeriod = (p: 'AM'|'PM') => { selectedPeriod.value = p }

const setNow = () => {
  const now = new Date()
  let h = now.getHours()
  selectedPeriod.value = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  selectedHour.value = String(h).padStart(2,'0')
  selectedMinute.value = String(now.getMinutes()).padStart(2,'0')
}
const clearTimeValue   = () => { emit('update:modelValue',''); showTimePicker.value = false }
const confirmTimeValue = () => { emit('update:modelValue', `${selectedHour.value}:${selectedMinute.value} ${selectedPeriod.value}`); showTimePicker.value = false }
const closeTimePicker  = () => { showTimePicker.value = false }

const setDTNow = () => {
  const now = new Date()
  dtSelectedDate.value = now; currentMonth.value = now.getMonth(); currentYear.value = now.getFullYear()
  let h = now.getHours(); selectedPeriod.value = h>=12?'PM':'AM'; h=h%12||12
  selectedHour.value = String(h).padStart(2,'0'); selectedMinute.value = String(now.getMinutes()).padStart(2,'0')
}
const clearDTValue   = () => { emit('update:modelValue',''); dtSelectedDate.value = null; showDateTimePicker.value = false }
const confirmDTValue = () => {
  if (!dtSelectedDate.value) dtSelectedDate.value = new Date()
  emit('update:modelValue', `${formatDateDisplay(dtSelectedDate.value)}, ${selectedHour.value}:${selectedMinute.value} ${selectedPeriod.value}`)
  showDateTimePicker.value = false
}
const closeDateTimePicker = () => { showDateTimePicker.value = false }

const formatDateDisplay = (date: Date) => date.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })
const formatDateModel   = (date: Date) => {
  const y = date.getFullYear(), m = String(date.getMonth()+1).padStart(2,'0'), d = String(date.getDate()).padStart(2,'0')
  return `${y}-${m}-${d}`
}
const parseDTString = (dtStr: string) => {
  const parts = dtStr.split(',').map(p => p.trim())
  if (parts.length >= 3) {
    const date = new Date(`${parts[0]}, ${parts[1]}, ${parts[2]}`)
    const match = (parts[3]||'12:00 PM').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    if (match && !isNaN(date.getTime())) return { date, hour: match[1].padStart(2,'0'), minute: match[2], period: match[3].toUpperCase() as 'AM'|'PM' }
  }
  return null
}

watch(() => props.modelValue, (val) => {
  if (props.type==='date' && val) selectedDate.value = new Date(val as string)
  else if (props.type==='time' && val) {
    const m = (val as string).match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    if (m) { selectedHour.value=m[1].padStart(2,'0'); selectedMinute.value=m[2]; selectedPeriod.value=m[3].toUpperCase() as 'AM'|'PM' }
  } else if (props.type==='datetime-local' && val) {
    const p = parseDTString(val as string)
    if (p) { dtSelectedDate.value=p.date; selectedHour.value=p.hour; selectedMinute.value=p.minute; selectedPeriod.value=p.period }
  }
}, { immediate: true })

const lockScroll = (val: boolean) => { if (typeof document!=='undefined') document.body.style.overflow = val ? 'hidden' : '' }
watch(showDatePicker, (val) => {
  lockScroll(val)
  if (val && props.modelValue) { const d=new Date(props.modelValue as string); currentMonth.value=d.getMonth(); currentYear.value=d.getFullYear() }
})
watch(showTimePicker,     lockScroll)
watch(showDateTimePicker, lockScroll)
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
.font-body { font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif; }

.slide-fade-enter-active { transition: all 0.2s ease-out; }
.slide-fade-leave-active { transition: all 0.15s ease-in; }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-4px); opacity: 0; }

.picker-fade-enter-active { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
.picker-fade-leave-active { transition: all 0.2s cubic-bezier(0.4,0,1,1); }
.picker-fade-enter-from, .picker-fade-leave-to { opacity: 0; }

input:focus, textarea:focus, select:focus { outline: none; }
select { cursor: pointer; }
select::-ms-expand { display: none; }

::selection { background: #c9993f; color: #0d2d55; }
</style>