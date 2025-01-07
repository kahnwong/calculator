<template>
  <q-page class="q-pl-lg">
    <q-layout view="hHh lpR fFf" container id="layout-container-gke-autopilot">
      <div class="text-h4 text-bold q-pb-lg q-pt-lg">
        <span class="text-secondary">GKE Autopilot</span> Cost Calculator
      </div>
      <div class="q-pb-md"></div>
      <div class="row">
        <div class="col-4.5 q-pl-sm q-pr-lg q-pb-lg">
          <div class="fa-border">
            <NumberInput
              v-for="input in gkeAutopilotInput"
              :key="input.label"
              v-bind="input"
              :label="input.label"
              v-model="input.value"
            />
          </div>
        </div>
        <div class="col-3.5 q-pr-lg">
          <div class="fa-border">
            <q-table
              flat
              bordered
              dense
              :rows="gkeAutopilotCost.rows"
              :columns="gkeAutopilotCost.columns"
              row-key="name"
              :rows-per-page-options="[0]"
              hide-bottom
            />
          </div>
        </div>
      </div>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import NumberInput, { type NumberInputProps } from 'components/NumberInput.vue'
import { computed, ref } from 'vue'
import {
  GeneralPurposeModel,
  ScaleOutARMModel,
  ScaleOutX86Model,
} from 'src/models/GcpGkeAutopilotModel'
import { type TableColumns, CreateColumnsObject } from 'src/utils/Table'

// input struct
export interface GkeAutopilot {
  vCPU: NumberInputProps
  memory: NumberInputProps
}
const gkeAutopilotInput = ref<GkeAutopilot>({
  vCPU: {
    label: 'vCPU',
    value: 0.25,
  },
  memory: {
    label: 'Memory',
    value: 1,
  },
})

// table component struct
export interface pricingValues {
  [key: number]: string
}

const columnsInput: TableColumns = {
  computeType: 'Compute Type',
  pricing: 'Pricing',
  pricePerHour: 'Price / Hour',
  pricePerMonth: 'Price / Month',
}

// table component key mapping
const pricingKeyMaping: TableColumns = {
  generalPurpose: 'General Purpose',
  scaleOutARMModel: 'Scale-Out ARM',
  scaleOutX86Model: 'Scale-Out x86',
}

const pricingValueMapping: pricingValues = {
  0: 'Regular',
  1: 'Spot',
  // 2: '1 Year Commitment',
  // 3: '3 Year Commitment',
}

// computed values
const gkeAutopilotCost = computed(() => {
  const generalPurpose = new GeneralPurposeModel(
    gkeAutopilotInput.value.vCPU.value,
    gkeAutopilotInput.value.memory.value,
  )

  const scaleOutARMModel = new ScaleOutARMModel(
    gkeAutopilotInput.value.vCPU.value,
    gkeAutopilotInput.value.memory.value,
  )

  const scaleOutX86Model = new ScaleOutX86Model(
    gkeAutopilotInput.value.vCPU.value,
    gkeAutopilotInput.value.memory.value,
  )

  const pricing = {
    generalPurpose: generalPurpose.pricing(),
    scaleOutARMModel: scaleOutARMModel.pricing(),
    scaleOutX86Model: scaleOutX86Model.pricing(),
  }

  // for table component
  const columns = CreateColumnsObject(columnsInput)
  const rows: TableColumns[] = []

  for (const [key, value] of Object.entries(pricing)) {
    for (const [i, v] of value.entries()) {
      rows.push({
        computeType: pricingKeyMaping[key] as string,
        pricing: pricingValueMapping[i] as string,
        pricePerHour: v.toFixed(3),
        pricePerMonth: (v * 24 * 30).toFixed(3),
      })
    }
  }

  return { columns, rows }
})
</script>

<style>
#layout-container-gke-autopilot {
  height: 100vh;
  max-width: 1000px;
  margin: auto;
}
</style>
