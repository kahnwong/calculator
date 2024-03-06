<template>
  <q-page class="q-pa-lg">
    <div class="text-h2 text-bold q-pb-lg">Meeting Cost Calculator</div>

    <div class="text-h4 text-bold q-pb-md">
      How much does this meeting really cost?
    </div>
    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-4">
        <NumberInputComponent
          v-model.number="attendees"
          :increment-value="incrementValue"
          label="Number of attendees"
        />
        <!--        <NumberInputComponent-->
        <!--          v-model.number="meetingDurationMinutes"-->
        <!--          label="Meeting duration (minutes)"-->
        <!--        />-->
      </div>
      <div class="col-6">{{ finalValue }}</div>
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
      incrementValue: 100,
      meetingDurationMinutes: 30,
    };
  },
  method: {},
  computed: {
    finalValue() {
      return this.attendees * this.meetingDurationMinutes;
    },
  },
});
</script>
