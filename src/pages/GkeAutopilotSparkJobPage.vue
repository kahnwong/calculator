<template>
  <q-page class="q-pl-lg">
    <q-layout view="hHh lpR fFf" container id="layout-container-gke-autopilot-spark-job">
      <div class="text-h4 text-bold q-pb-lg q-pt-lg">GKE Autopilot: Spark Job Cost Calculator</div>
      <div class="q-pb-md"></div>
      <div class="row">
        <div class="col-6 q-pl-lg q-pt-xl">
          <div class="text-h4 text-bold">${{ gkeSparkJobCost.regularSpotPrice }}</div>
          <div class="q-pb-xl">Regular Spot Price</div>
          <div class="text-h4 text-bold">${{ gkeSparkJobCost.scaleOutARMSpotPrice }}</div>
          <div class="q-pb-xl">Scale-Out ARM Spot Price</div>
        </div>
        <div class="col-5">
          <NumberInput
            v-for="input in gkeSparkJobInput"
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
import { computed, ref } from 'vue'
import { GeneralPurposeModel, ScaleOutARMModel } from 'src/models/GcpGkeAutopilotModel'

// input struct
export interface GkeSparkJob {
  vCPU: NumberInputProps
  memory: NumberInputProps
  executors: NumberInputProps
  jobDurationHour: NumberInputProps
}
const gkeSparkJobInput = ref<GkeSparkJob>({
  vCPU: {
    label: 'vCPU',
    value: 2,
  },
  memory: {
    label: 'Memory',
    value: 2,
  },
  executors: {
    label: 'Executors',
    value: 1,
  },
  jobDurationHour: {
    label: 'Job duration (hours)',
    value: 3,
  },
})

// computed values
function computePriceToSparkJobPrice(costSpot: number, jobDurationHour: number, executors: number) {
  return costSpot * jobDurationHour * (1 + executors)
}

const gkeSparkJobCost = computed(() => {
  const regularSpotPrice = new GeneralPurposeModel(
    gkeSparkJobInput.value.vCPU.value,
    gkeSparkJobInput.value.memory.value,
  ).costSpot()

  const scaleOutARMSpotPrice = new ScaleOutARMModel(
    gkeSparkJobInput.value.vCPU.value,
    gkeSparkJobInput.value.memory.value,
  ).costSpot()

  return {
    regularSpotPrice: computePriceToSparkJobPrice(
      regularSpotPrice,
      gkeSparkJobInput.value.jobDurationHour.value,
      gkeSparkJobInput.value.executors.value,
    ).toFixed(4),
    scaleOutARMSpotPrice: computePriceToSparkJobPrice(
      scaleOutARMSpotPrice,
      gkeSparkJobInput.value.jobDurationHour.value,
      gkeSparkJobInput.value.executors.value,
    ).toFixed(4),
  }
})
</script>

<style>
#layout-container-gke-autopilot-spark-job {
  height: 100vh;
  max-width: 800px;
  margin: auto;
}
</style>
