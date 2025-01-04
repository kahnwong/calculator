<template>
  <q-page class="q-pl-lg">
    <q-layout view="hHh lpR fFf" container id="layout-container-cloud-cost-comparison">
      <div class="text-h4 text-bold q-pb-lg q-pt-lg">Project Quotation</div>

      <div class="q-pb-md"></div>
      <div class="row">
        <!--project manager-->
        <div class="col-4.5 q-pl-sm q-pr-lg">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Project Manager</div>
            <NumberInput
              v-for="input in projectManagerRoleInput"
              :key="input.label"
              v-bind="input"
              :label="input.label"
              v-model="input.value"
            />
          </div>
        </div>
        <!--architect-->
        <div class="col-3.5 q-pr-lg">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Architect</div>
            <NumberInput
              v-for="input in architectRoleInput"
              :key="input.label"
              v-bind="input"
              :label="input.label"
              v-model="input.value"
            />
          </div>
        </div>
        <!--developer-->
        <div class="col-3.5 q-pr-lg">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Developer</div>
            <NumberInput
              v-for="input in developerRoleInput"
              :key="input.label"
              v-bind="input"
              :label="input.label"
              v-model="input.value"
            />
          </div>
        </div>
      </div>
      <div class="row q-pl-sm q-py-lg">
        <div class="column">
          <div class="text-h4 text-bold q-pb-sm">Cost</div>
          <q-table
            flat
            bordered
            dense
            :rows="projectQuotation.rows"
            :columns="projectQuotation.columns"
            row-key="name"
            :rows-per-page-options="[0]"
            hide-bottom
          />
        </div>
      </div>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import NumberInput, { type NumberInputProps } from 'components/NumberInput.vue'
import { computed, ref } from 'vue'
import { type TableColumns, CreateColumnsObject } from 'src/utils/Table'
import { ProjectQuotationModel } from 'src/models/ProjectQuotationModel'

// input struct
export interface Role {
  salary: NumberInputProps
  mandayUnit: NumberInputProps
  durationWeeks: NumberInputProps
}
const projectManagerRoleInput = ref<Role>({
  salary: {
    label: 'Salary',
    value: 90000,
  },
  mandayUnit: {
    label: 'Manday Ratio Per Day',
    value: 0.5,
  },
  durationWeeks: {
    label: 'Duration (Weeks)',
    value: 4,
  },
})
const architectRoleInput = ref<Role>({
  salary: {
    label: 'Salary',
    value: 140000,
  },
  mandayUnit: {
    label: 'Manday Ratio Per Day',
    value: 0.5,
  },
  durationWeeks: {
    label: 'Duration (Weeks)',
    value: 4,
  },
})
const developerRoleInput = ref<Role>({
  salary: {
    label: 'Salary',
    value: 100000,
  },
  mandayUnit: {
    label: 'Persons',
    value: 1,
  },
  durationWeeks: {
    label: 'Duration (Weeks)',
    value: 4,
  },
})

// table component struct
const columnsInput: TableColumns = {
  role: 'Role',
  cost: 'Cost',
}

// table component key mapping
const costKeyMaping: TableColumns = {
  projectManager: 'Project Manager',
  architect: 'Architect',
  developer: 'Developer',
  total: 'Total',
  totalWithAdjustment: 'Total With Adjustment',
}

// computed values
const projectQuotation = computed(() => {
  // cost per role
  const projectManagerCost = new ProjectQuotationModel(
    projectManagerRoleInput.value.salary.value,
    projectManagerRoleInput.value.mandayUnit.value,
    projectManagerRoleInput.value.durationWeeks.value,
  ).cost()

  const architectCost = new ProjectQuotationModel(
    architectRoleInput.value.salary.value,
    architectRoleInput.value.mandayUnit.value,
    architectRoleInput.value.durationWeeks.value,
  ).cost()

  const developerCost = new ProjectQuotationModel(
    developerRoleInput.value.salary.value,
    developerRoleInput.value.mandayUnit.value,
    developerRoleInput.value.durationWeeks.value,
  ).cost()

  const totalCostRaw = projectManagerCost + architectCost + developerCost
  const totalCostWithAdjustment = totalCostRaw * 1.3 * 3

  // cost summary
  const projectCost = {
    projectManager: projectManagerCost,
    architect: architectCost,
    developer: developerCost,
    total: totalCostRaw,
    totalWithAdjustment: totalCostWithAdjustment,
  }

  // for table component
  const columns = CreateColumnsObject(columnsInput)
  const rows: TableColumns[] = []

  for (const [key, value] of Object.entries(projectCost)) {
    rows.push({
      role: costKeyMaping[key] as string,
      cost: Math.round(value).toLocaleString(),
    })
  }

  return { columns, rows }
})
</script>

<style>
#layout-container-cloud-cost-comparison {
  height: 100vh;
  max-width: 800px;
  margin: auto;
}
</style>
