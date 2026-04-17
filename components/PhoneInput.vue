<template>
  <div class="space-y-1.5 group">
    <!-- Label -->
    <label v-if="label" class="text-xs font-bold text-slate-400 pl-1 pointer-events-none group-focus-within:text-[#003366] transition-colors">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative flex transition-all duration-300">
      <!-- Country Code Selector -->
      <div class="relative min-w-[100px]">
        <button 
          type="button"
          @click="isOpen = !isOpen"
          class="h-[60px] w-full flex items-center justify-between px-4 bg-gray-50 border border-slate-200 rounded-l-2xl hover:bg-white transition-all text-sm font-bold text-slate-700"
        >
          <span class="flex items-center gap-2">
            <span class="text-lg">{{ selectedCountry.flag }}</span>
            <span>{{ selectedCountry.dialCode }}</span>
          </span>
          <LucideChevronDown :size="14" class="text-slate-400" />
        </button>

        <!-- Dropdown menu -->
        <div v-if="isOpen" class="absolute z-50 mt-2 w-[280px] bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-[#003366]/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div class="p-2 border-b border-slate-50">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search country..." 
              class="w-full px-4 py-2 text-xs font-bold bg-slate-50 border-none rounded-xl focus:ring-0 outline-none"
              ref="searchInput"
            />
          </div>
          <div class="max-h-[300px] overflow-y-auto custom-scrollbar">
            <button
              v-for="country in filteredCountries"
              :key="country.code"
              type="button"
              @click="selectCountry(country)"
              class="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none"
            >
              <div class="flex items-center gap-3">
                <span class="text-xl">{{ country.flag }}</span>
                <span class="text-[11px] font-bold text-slate-700">{{ country.name }}</span>
              </div>
              <span class="text-[10px] font-black text-[#003366]">{{ country.dialCode }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Phone Number Input -->
      <div class="flex-grow">
        <input
          :value="localNumber"
          @input="handleInput"
          type="tel"
          :placeholder="placeholder"
          :required="required"
          :class="[
            'w-full h-[60px] px-5 bg-white border border-l-0 border-slate-200 rounded-r-2xl text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-[#003366]/5 focus:border-[#003366] outline-none transition-all',
            error ? 'border-red-300 bg-red-50/10' : ''
          ]"
        />
      </div>

      <!-- Icon indicator -->
      <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <LucidePhone :size="18" :class="error ? 'text-red-400' : 'text-slate-300 group-focus-within:text-[#003366] transition-colors'" />
      </div>
    </div>

    <!-- Error Message -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <p v-if="error" class="text-xs font-bold text-red-500 pl-4">
        {{ error }}
      </p>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { LucideChevronDown, LucidePhone } from 'lucide-vue-next'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: { type: String, default: '801 234 5678' },
  required: Boolean,
  error: String
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const localNumber = ref('')

const countries = [
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬', pattern: /^[0-9]{10,11}$/ },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', pattern: /^[0-9]{10}$/ },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', pattern: /^[0-9]{10}$/ },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', pattern: /^[0-9]{10}$/ },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭', pattern: /^[0-9]{9}$/ },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦', pattern: /^[0-9]{9}$/ },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', pattern: /^[0-9]{10,11}$/ },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', pattern: /^[0-9]{10}$/ }
]

const selectedCountry = ref(countries[0])

const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries
  return countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
    c.dialCode.includes(searchQuery.value)
  )
})

const selectCountry = (country) => {
  selectedCountry.value = country
  isOpen.value = false
  updateValue()
}

const handleInput = (e) => {
  // Remove all non-numeric characters
  const val = e.target.value.replace(/[^0-9]/g, '')
  localNumber.value = val
  updateValue()
}

const updateValue = () => {
  const fullValue = `${selectedCountry.value.dialCode}${localNumber.value}`
  emit('update:modelValue', fullValue)
}

// Initial value parsing if modelValue is provided
onMounted(() => {
  if (props.modelValue) {
    const matchingCountry = countries.find(c => props.modelValue.startsWith(c.dialCode))
    if (matchingCountry) {
      selectedCountry.value = matchingCountry
      localNumber.value = props.modelValue.replace(matchingCountry.dialCode, '')
    }
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
