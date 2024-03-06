<template>
  <q-page class="q-pa-lg">
    <div class="text-h2 text-bold">Meeting Cost Calculator</div>

    <div class="text-h4 text-bold">How much does this meeting really cost?</div>

    <div class="row">
      <div class="col-6">
        <NumberInputComponent v-model.number="attendees" />
      </div>
      <div class="col-6">a b c</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NumberInputComponent from 'components/NumberInputComponent.vue';

export default defineComponent({
  name: 'HelpPage',
  components: { NumberInputComponent },
  data() {
    return {
      attendees: 5,
    };
  },
  method: {},
});
</script>
