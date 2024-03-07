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
        <NumberInputComponent
          v-model.number="attendees.value"
          :increment-value="attendees.increment"
          :min-value="attendees.min"
          :max-value="attendees.max"
          label="Number of attendees"
          :rules="[
            (val) =>
              val >= attendees.min || `Minimum value is ${attendees.min}`,
            (val) =>
              val <= attendees.max || `Maximum value is ${attendees.max}`,
          ]"
        />
        <NumberInputComponent
          v-model.number="meetingDurationHours.value"
          :increment-value="meetingDurationHours.increment"
          :min-value="meetingDurationHours.min"
          label="Meeting duration (hours)"
          :rules="[
            (val) =>
              val >= meetingDurationHours.min ||
              `Minimum value is ${meetingDurationHours.min}`,
            (val) =>
              val <= meetingDurationHours.max ||
              `Maximum value is ${meetingDurationHours.max}`,
          ]"
        />
        <NumberInputComponent
          v-model.number="timesPerWeek.value"
          :increment-value="timesPerWeek.increment"
          :min-value="timesPerWeek.min"
          label="Times per week"
          :rules="[
            (val) =>
              val >= timesPerWeek.min || `Minimum value is ${timesPerWeek.min}`,
            (val) =>
              val <= timesPerWeek.max || `Maximum value is ${timesPerWeek.max}`,
          ]"
        />
        <NumberInputComponent
          v-model.number="avgAttendeesSalaryPerYear.value"
          :increment-value="avgAttendeesSalaryPerYear.increment"
          :min-value="avgAttendeesSalaryPerYear.min"
          label="Average attendee salary (per year)"
          :rules="[
            (val) =>
              val >= avgAttendeesSalaryPerYear.min ||
              `Minimum value is ${avgAttendeesSalaryPerYear.min}`,
          ]"
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
        min: 3,
        max: 15,
      },
      meetingDurationHours: {
        value: 1,
        increment: 1,
        min: 0.5,
        max: 6,
      },
      timesPerWeek: {
        value: 1,
        increment: 1,
        min: 1,
        max: 7,
      },
      avgAttendeesSalaryPerYear: {
        value: 100000,
        increment: 50000,
        min: 50000,
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      // one month has 174 work hours
      let avgSalaryPerHour = this.avgAttendeesSalaryPerYear.value / 12 / 174;

      let costPerMeeting =
        this.attendees.value *
        this.meetingDurationHours.value *
        this.timesPerWeek.value *
        avgSalaryPerHour;

      return {
        costPerMeeting: Math.round(costPerMeeting),
        costPerMinute: Math.round(
          costPerMeeting / this.meetingDurationHours.value / 60
        ),
        costPerYear: Math.round(
          costPerMeeting * this.timesPerWeek.value * 52.1429
        ),
      };
    },
  },
});
</script>
