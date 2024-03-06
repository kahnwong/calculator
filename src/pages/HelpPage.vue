<template>
  <q-page class="q-pa-lg">
    <div class="text-h2 text-bold">Meeting Cost Calculator</div>

    <div class="text-h4 text-bold">How much does this meeting really cost?</div>

    <div class="row">
      <div class="col-6">
        <q-input outlined dense v-model.number="attendees">
          <template v-slot:append>
            <div
              class="row justify-center items-center text-center full-height"
            >
              <div
                class="col-6 row justify-center items-center text-center full-height q-px-sm"
                :class="bgPlusActive ? 'bg-blue' : ''"
                @mouseover="bgPlusActive = true"
                @mouseleave="bgPlusActive = false"
                @click="attendees += 5"
              >
                <q-icon name="fa-solid fa-plus" class="cursor-pointer" />
              </div>
              <div
                class="col-6 row justify-center items-center text-center full-height q-px-sm"
                :class="bgMinusActive ? 'bg-blue' : ''"
                @mouseover="bgMinusActive = true"
                @mouseleave="bgMinusActive = false"
                @click="attendees -= 5"
              >
                <q-icon name="fa-solid fa-minus" class="cursor-pointer" />
              </div>
            </div>
          </template>
        </q-input>
      </div>
      <div class="col-6">a b c</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HelpPage',
  data() {
    return {
      // button
      bgPlusActive: false,
      bgMinusActive: false,

      // main
      attendees: 5,
    };
  },
  method: {},
});
</script>
