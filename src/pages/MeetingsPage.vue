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
        <div v-for="item in meeting" :key="item.id">
          <NumberInputComponent
            v-model.number="item.value"
            :increment-value="item.increment"
            :min-value="item.min"
            :max-value="item.max"
            :label="item.label"
            :rules="[
              (val) => val >= item.min || `Minimum value is ${item.min}`,
              (val) => val <= item.max || `Maximum value is ${item.max}`,
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

export default defineComponent({
  name: 'HelpPage',
  components: { NumberInputComponent },
  data() {
    return {
      meeting: {
        attendees: {
          id: 'attendees',
          label: 'Number of attendees',
          value: 5,
          increment: 1,
          min: 3,
          max: 15,
        },
        meetingDurationHours: {
          id: 'meetingDurationHours',
          label: 'Meeting duration (hours)',
          value: 1,
          increment: 1,
          min: 0.5,
          max: 6,
        },
        timesPerWeek: {
          id: 'timesPerWeek',
          label: 'Times per week',
          value: 1,
          increment: 1,
          min: 1,
          max: 7,
        },
        avgAttendeesSalaryPerYear: {
          id: 'avgAttendeesSalaryPerYear',
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
      // one month has 174 work hours
      let avgSalaryPerHour =
        this.meeting.avgAttendeesSalaryPerYear.value / 12 / 174;

      let costPerMeeting =
        this.meeting.attendees.value *
        this.meeting.meetingDurationHours.value *
        this.meeting.timesPerWeek.value *
        avgSalaryPerHour;

      return {
        costPerMeeting: Math.round(costPerMeeting),
        costPerMinute: Math.round(
          costPerMeeting / this.meeting.meetingDurationHours.value / 60,
        ),
        costPerYear: Math.round(
          costPerMeeting * this.meeting.timesPerWeek.value * 52.1429,
        ),
      };
    },
  },
});
</script>
