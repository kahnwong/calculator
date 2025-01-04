<template>
  <q-page class="q-pl-lg">
    <q-layout view="hHh lpR fFf" container id="layout-container-cloud-cost-comparison">
      <div class="text-h4 text-bold q-pb-lg q-pt-lg"><span class="text-secondary">Cloud Cost Comparison</span></div>

      <div>
        <ul>
          <li>Price is in <b>per month</b></li>
          <li>Region: Singapore</li>
        </ul>
      </div>

      <div class="q-pb-md"></div>
      <div class="row">
        <!--caas-->
        <div class="col-4.5 q-pl-sm q-pr-lg">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">CaaS</div>
            <NumberInput
              v-for="input in caasInput"
              :key="input.label"
              v-bind="input"
              :label="input.label"
              v-model="input.value"
            />
          </div>
        </div>
        <!--container storage-->
        <div class="col-3.5 q-pr-lg">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Container Storage</div>
            <NumberInput
              v-for="input in containerStorageInput"
              :key="input.label"
              v-bind="input"
              :label="input.label"
              v-model="input.value"
            />
          </div>
        </div>
        <!--blob storage-->
        <div class="col-3.5 q-pr-lg">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Blob Storage</div>
            <NumberInput
              v-for="input in blobStorageInput"
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
          <div class="text-h4 text-bold q-pb-sm"><span class="text-secondary">Cost</span></div>
          <q-table
            flat
            bordered
            dense
            :rows="cloudCostPricing.rows"
            :columns="cloudCostPricing.columns"
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
import { ArtifactRegistryModel, CloudRunModel, CloudStorageModel } from 'src/models/GcpModel'
import { BlobStorageModel, ContainerAppsModel, ContainerRegistryModel } from 'src/models/AzureModel'
import { type TableColumns, CreateColumnsObject } from 'src/utils/Table'

// input struct
export interface CaaS {
  vCPU: NumberInputProps
  memory: NumberInputProps
  executionTimePerRequestMS: NumberInputProps
  requestsPerMonth: NumberInputProps
}
const caasInput = ref<CaaS>({
  vCPU: {
    label: 'vCPU',
    value: 0.25,
  },
  memory: {
    label: 'Memory',
    value: 1,
  },
  executionTimePerRequestMS: {
    label: 'Execution Time Per Request (ms)',
    value: 500,
  },
  requestsPerMonth: {
    label: 'Requests per month',
    value: 100000,
  },
})

export interface Storage {
  storageGB: NumberInputProps
}
const containerStorageInput = ref<Storage>({
  storageGB: {
    label: 'Container Storage (GB)',
    value: 5,
  },
})
const blobStorageInput = ref<Storage>({
  storageGB: {
    label: 'Blob Storage (GB)',
    value: 5,
  },
})

// table component struct
const columnsInput: TableColumns = {
  service: 'Service',
  gcp: 'GCP',
  azure: 'Azure',
}

// table component key mapping
const pricingKeyMaping: TableColumns = {
  caas: 'CaaS',
  containerRegistry: 'Container Registry',
  blobStorage: 'Blob Storage',
}

// computed values
const cloudCostPricing = computed(() => {
  // caas
  const caasGCP = new CloudRunModel(
    caasInput.value.vCPU.value,
    caasInput.value.memory.value,
    caasInput.value.executionTimePerRequestMS.value,
    caasInput.value.requestsPerMonth.value,
  ).cost()

  const caasAzure = new ContainerAppsModel(
    caasInput.value.vCPU.value,
    caasInput.value.memory.value,
    caasInput.value.executionTimePerRequestMS.value,
    caasInput.value.requestsPerMonth.value,
  ).cost()

  // container registry
  const containerRegistryGCP = new ArtifactRegistryModel(
    containerStorageInput.value.storageGB.value,
  ).cost()

  const containerRegistryAzure = new ContainerRegistryModel(
    containerStorageInput.value.storageGB.value,
  ).cost()

  // blob storage
  const blobStorageGCP = new CloudStorageModel(blobStorageInput.value.storageGB.value).cost()

  const blobStorageAzure = new BlobStorageModel(blobStorageInput.value.storageGB.value).cost()

  // pricing summary
  const pricing = {
    caas: [caasGCP, caasAzure],
    containerRegistry: [containerRegistryGCP, containerRegistryAzure],
    blobStorage: [blobStorageGCP, blobStorageAzure],
  }

  // for table component
  const columns = CreateColumnsObject(columnsInput)
  const rows: TableColumns[] = []

  for (const [key, value] of Object.entries(pricing)) {
    rows.push({
      service: pricingKeyMaping[key] as string,
      gcp: value.at(0)?.toFixed(3) as string,
      azure: value.at(1)?.toFixed(3) as string,
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
