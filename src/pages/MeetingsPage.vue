<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">Meeting Cost Calculator</div>

    <div class="text-h4 text-bold q-pb-md">
      How much does this meeting really cost?
    </div>
    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-4 q-pl-lg">
        <div class="text-h4 text-bold">${{ finalValue.costPerMeeting }}</div>
        <div class="q-pb-lg">per meeting</div>
        <div class="text-h4 text-bold">${{ finalValue.costPerMinute }}</div>
        <div class="q-pb-lg">per minute</div>
        <div class="text-h4 text-bold">${{ finalValue.costPerYear }}</div>
        <div class="q-pb-lg">per year</div>
      </div>
      <div class="col-4">
        <NumberInputComponent
          v-model.number="attendees.value"
          :increment-value="attendees.increment"
          label="Number of attendees"
        />
        <NumberInputComponent
          v-model.number="meetingDurationMinutes.value"
          :increment-value="meetingDurationMinutes.increment"
          label="Meeting duration (minutes)"
        />
        <NumberInputComponent
          v-model.number="timesPerWeek.value"
          :increment-value="timesPerWeek.increment"
          label="Times per week"
        />
        <NumberInputComponent
          v-model.number="averageAttendeesSalaryPerYear.value"
          :increment-value="averageAttendeesSalaryPerYear.increment"
          label="Average attendee salary (per year)"
        />
      </div>
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
      attendees: {
        value: 5,
        increment: 1,
      },
      meetingDurationMinutes: {
        value: 30,
        increment: 30,
      },
      timesPerWeek: {
        value: 1,
        increment: 1,
      },
      averageAttendeesSalaryPerYear: {
        value: 100000,
        increment: 100000,
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      return {
        costPerMeeting:
          this.attendees.value * this.meetingDurationMinutes.value,
        costPerMinute: 4,
        costPerYear: 100,
      };
    },
  },
});
</script>
