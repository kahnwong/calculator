<template>
  <q-input
    class="q-pa-md"
    filled
    dense
    :model-value="modelValue"
    @update:model-value="updateModelValue"
  >
    <template v-slot:append>
      <div class="row justify-center items-center text-center full-height">
        <div
          class="col-6 row justify-center items-center text-center full-height q-px-sm"
          :class="bgPlusActive ? 'bg-blue text-white' : ''"
          @mouseover="bgPlusActive = true"
          @mouseleave="bgPlusActive = false"
          @click="updateModelValue(modelValue + incrementValue)"
        >
          <q-icon name="fa-solid fa-plus" class="cursor-pointer" />
        </div>
        <div
          class="col-6 row justify-center items-center text-center full-height q-px-sm"
          :class="bgMinusActive ? 'bg-blue text-white' : ''"
          @mouseover="bgMinusActive = true"
          @mouseleave="bgMinusActive = false"
          @click="updateModelValue(modelValue - incrementValue)"
        >
          <q-icon name="fa-solid fa-minus" class="cursor-pointer" />
        </div>
      </div>
    </template>
  </q-input>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NumberInputComponent',
  props: {
    modelValue: {},
    incrementValue: {},
    minValue: {
      type: Number,
      default: null,
    },
    maxValue: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      bgPlusActive: false,
      bgMinusActive: false,
    };
  },
  methods: {
    updateModelValue(value: number) {
      if (this.minValue && value < this.minValue) {
        value = this.minValue;
        this.$q.notify({
          message: `Minimum value is ${this.minValue}`,
          color: 'negative',
        });
      }
      if (this.maxValue && value > this.maxValue) {
        value = this.maxValue;
        this.$q.notify({
          message: `Maximum value is ${this.maxValue}`,
          color: 'negative',
        });
      }
      this.$emit('update:modelValue', value);
    },
  },
});
</script>
