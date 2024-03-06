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
          v-model.number="meetingDurationMinutes.value"
          :increment-value="meetingDurationMinutes.increment"
          label="Meeting duration (minutes)"
          :rules="[
            (val) =>
              val >= meetingDurationMinutes.min ||
              `Minimum value is ${meetingDurationMinutes.min}`,
            (val) =>
              val <= meetingDurationMinutes.max ||
              `Maximum value is ${meetingDurationMinutes.max}`,
          ]"
        />
        <NumberInputComponent
          v-model.number="timesPerWeek.value"
          :increment-value="timesPerWeek.increment"
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
      meetingDurationMinutes: {
        value: 30,
        increment: 30,
        min: 30,
        max: 3600,
      },
      timesPerWeek: {
        value: 1,
        increment: 1,
        min: 1,
        max: 7,
      },
      avgAttendeesSalaryPerYear: {
        value: 100000,
        increment: 100000,
        min: 50000,
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      // one month has 174 work hours
      let meetingDurationHours = this.meetingDurationMinutes.value / 60;
      let avgSalaryPerHour = this.avgAttendeesSalaryPerYear.value / 12 / 174;

      let costPerHour =
        this.attendees.value *
        meetingDurationHours *
        this.timesPerWeek.value *
        avgSalaryPerHour;

      return {
        costPerMeeting: Math.round(costPerHour),
        costPerMinute: Math.round(
          costPerHour / this.meetingDurationMinutes.value
        ),
        costPerYear: Math.round(costPerHour * 52),
      };
    },
  },
});
</script>
