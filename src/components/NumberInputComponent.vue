<template>
  <q-input
    class="q-pa-md"
    outlined
    dense
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    :rules="[
      (val) => val >= 3 || 'Minimum value is 3',
      (val) => val <= 10 || 'Maximum value is 10',
    ]"
  >
    <template v-slot:append>
      <div class="row justify-center items-center text-center full-height">
        <div
          class="col-6 row justify-center items-center text-center full-height q-px-sm"
          :class="bgPlusActive ? 'bg-blue' : ''"
          @mouseover="bgPlusActive = true"
          @mouseleave="bgPlusActive = false"
          @click="$emit('update:modelValue', modelValue + incrementValue)"
        >
          <q-icon name="fa-solid fa-plus" class="cursor-pointer" />
        </div>
        <div
          class="col-6 row justify-center items-center text-center full-height q-px-sm"
          :class="bgMinusActive ? 'bg-blue' : ''"
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
  },
  data() {
    return {
      bgPlusActive: false,
      bgMinusActive: false,
    };
  },
};
</script>
