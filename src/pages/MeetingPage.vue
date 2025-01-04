<template>
  <q-page class="q-pl-lg">
    <q-layout view="hHh lpR fFf" container id="layout-container-meeting">
      <div class="text-h4 text-bold q-pb-lg q-pt-lg q-pr-md"><span class="text-secondary">Meeting</span> Cost Calculator</div>

      <div class="text-h5 text-bold q-pb-md q-pr-md">How much does this meeting really cost?</div>
      <div class="q-pb-md"></div>
      <div class="row">
        <div class="col-5 q-pl-lg">
          <div class="text-h4 text-bold">${{ meetingCost.perMeeting }}</div>
          <div class="q-pb-xl">per meeting</div>
          <div class="text-h4 text-bold">${{ meetingCost.perMinute }}</div>
          <div class="q-pb-xl">per minute</div>
          <div class="text-h4 text-bold">${{ meetingCost.perYear }}</div>
          <div class="q-pb-xl">per year</div>
        </div>
        <div class="col-6">
          <NumberInput
            v-for="input in meetingInput"
            :key="input.label"
            v-bind="input"
            :label="input.label"
            v-model="input.value"
          />
        </div>
      </div>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import NumberInput, { type NumberInputProps } from 'components/NumberInput.vue'
import { MeetingModel } from 'src/models/MeetingModel'
import { computed, ref } from 'vue'

// input struct
export interface Meeting {
  attendees: NumberInputProps
  meetingDurationHours: NumberInputProps
  timesPerWeek: NumberInputProps
  avgAttendeesSalaryPerYear: NumberInputProps
}
const meetingInput = ref<Meeting>({
  attendees: {
    label: 'Number of attendees',
    value: 3,
  },
  meetingDurationHours: {
    label: 'Meeting duration (hours)',
    value: 1,
  },
  timesPerWeek: {
    label: 'Times per week',
    value: 1,
  },
  avgAttendeesSalaryPerYear: {
    label: 'Average attendee salary (per year)',
    value: 100000,
  },
})

// computed values
const meetingCost = computed(() => {
  const meeting = new MeetingModel(
    meetingInput.value.attendees.value,
    meetingInput.value.meetingDurationHours.value,
    meetingInput.value.timesPerWeek.value,
    meetingInput.value.avgAttendeesSalaryPerYear.value,
  )

  return {
    perMeeting: Math.round(meeting.costPerMeeting),
    perMinute: Math.round(meeting.costPerMinute()),
    perYear: Math.round(meeting.costPerYear()),
  }
})
</script>

<style>
#layout-container-meeting {
  height: 100vh;
  max-width: 800px;
  margin: auto;
}
</style>
