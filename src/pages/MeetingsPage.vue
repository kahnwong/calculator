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
        <div class="q-pb-xl">per meeting</div>
        <div class="text-h4 text-bold">${{ finalValue.costPerMinute }}</div>
        <div class="q-pb-xl">per minute</div>
        <div class="text-h4 text-bold">${{ finalValue.costPerYear }}</div>
        <div class="q-pb-xl">per year</div>
      </div>
      <div class="col-4">
        <div v-for="(value, name) in meeting" :key="name">
          <NumberInputComponent
            v-model.number="value.value"
            :increment-value="value.increment"
            :min-value="value.min"
            :label="value.label"
            :rules="[
              (val) => val >= value.min || `Minimum value is ${value.min}`,
              // (val) => val <= value.max || `Maximum value is ${value.max}`,
            ]"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NumberInputComponent from 'components/NumberInputComponent.vue';
import { meetingModel } from 'src/models/MeetingModel';

export default defineComponent({
  name: 'HelpPage',
  components: { NumberInputComponent },
  data() {
    return {
      meeting: {
        attendees: {
          label: 'Number of attendees',
          value: 5,
          increment: 1,
          min: 3,
        },
        meetingDurationHours: {
          label: 'Meeting duration (hours)',
          value: 1,
          increment: 1,
          min: 0.5,
        },
        timesPerWeek: {
          label: 'Times per week',
          value: 1,
          increment: 1,
          min: 1,
        },
        avgAttendeesSalaryPerYear: {
          label: 'Average attendee salary (per year)',
          value: 100000,
          increment: 50000,
          min: 50000,
        },
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      let meeting = new meetingModel(
        this.meeting.attendees.value,
        this.meeting.meetingDurationHours.value,
        this.meeting.timesPerWeek.value,
        this.meeting.avgAttendeesSalaryPerYear.value,
      );

      return {
        costPerMeeting: Math.round(meeting.costPerMeeting),
        costPerMinute: Math.round(meeting.costPerMinute()),
        costPerYear: Math.round(meeting.costPerYear()),
      };
    },
  },
});
</script>
