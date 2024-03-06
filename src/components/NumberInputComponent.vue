<template>
  <q-input
    class="q-pa-md"
    outlined
    dense
    :model-value="modelValue <= minValue ? minValue : modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <template v-slot:append>
      <div class="row justify-center items-center text-center full-height">
        <div
          class="col-6 row justify-center items-center text-center full-height q-px-sm"
          :class="bgPlusActive ? 'bg-blue text-white' : ''"
          @mouseover="bgPlusActive = true"
          @mouseleave="bgPlusActive = false"
          @click="$emit('update:modelValue', modelValue + incrementValue)"
        >
          <q-icon name="fa-solid fa-plus" class="cursor-pointer" />
        </div>
        <div
          class="col-6 row justify-center items-center text-center full-height q-px-sm"
          :class="bgMinusActive ? 'bg-blue text-white' : ''"
          @mouseover="bgMinusActive = true"
          @mouseleave="bgMinusActive = false"
          @click="$emit('update:modelValue', modelValue - incrementValue)"
        >
          <q-icon name="fa-solid fa-minus" class="cursor-pointer" />
        </div>
      </div>
    </template>
  </q-input>
</template>
<script lang="ts">
export default {
  name: 'NumberInputComponent',
  props: {
    modelValue: {},
    incrementValue: {},
    minValue: {},
  },
  data() {
    return {
      bgPlusActive: false,
      bgMinusActive: false,
    };
  },
};
</script>
