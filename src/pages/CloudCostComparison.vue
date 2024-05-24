<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">Cloud Cost Comparison</div>

    <div>
      <ul>
        <li>Price is in <b>per month</b></li>
        <li>Region: Singapore</li>
        <li>GCP Gen AI model: <b>PaLM 2 for Text</b></li>
        <li>Azure Gen AI model: <b>GPT-3.5-Turbo-0125</b></li>
      </ul>
    </div>
    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-4.5 q-pl-sm q-pr-lg">
        <div class="fa-border">
          <div class="text-h4 text-bold q-pl-sm q-pt-sm">CaaS</div>
          <div v-for="(value, name) in caas" :key="name">
            <NumberInputComponent
              v-model.number="value.value"
              :increment-value="value.increment"
              :min-value="value.min"
              :label="value.label"
              :rules="[
                (val) => val >= value.min || `Minimum value is ${value.min}`,
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-3.5 q-pr-lg">
        <div class="row q-pb-md">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">
              Container Storage
            </div>

            <div v-for="(value, name) in containerStorage" :key="name">
              <NumberInputComponent
                v-model.number="value.value"
                :increment-value="value.increment"
                :min-value="value.min"
                :label="value.label"
                :rules="[
                  (val) => val >= value.min || `Minimum value is ${value.min}`,
                ]"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Blob Storage</div>
            <div v-for="(value, name) in blobStorage" :key="name">
              <NumberInputComponent
                v-model.number="value.value"
                :increment-value="value.increment"
                :min-value="value.min"
                :label="value.label"
                :rules="[
                  (val) => val >= value.min || `Minimum value is ${value.min}`,
                ]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-3.5">
        <div class="fa-border">
          <div class="text-h4 text-bold q-pl-sm q-pt-sm">Gen AI</div>
          <div v-for="(value, name) in genAI" :key="name">
            <NumberInputComponent
              v-model.number="value.value"
              :increment-value="value.increment"
              :min-value="value.min"
              :label="value.label"
              :rules="[
                (val) => val >= value.min || `Minimum value is ${value.min}`,
              ]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-pl-sm q-pt-lg">
      <div class="column">
        <div class="text-h4 text-bold q-pb-sm">Cost</div>
        <q-table
          flat
          bordered
          dense
          :rows="finalValue.rows"
          :columns="finalValue.columns"
          row-key="name"
          :rows-per-page-options="[0]"
          hide-bottom
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NumberInputComponent from 'components/NumberInputComponent.vue';
import {
  cloudRunModel,
  artifactRegistryModel,
  cloudStorageModel,
  genAILanguageModel,
} from 'src/models/GcpModel';
import {
  containerAppsModel,
  containerRegistryModel,
  blobStorageModel,
  openAIModel,
} from 'src/models/AzureModel';

export default defineComponent({
  name: 'HelpPage',
  components: { NumberInputComponent },
  data() {
    return {
      caas: {
        vCPU: {
          label: 'vCPU',
          value: 2,
          increment: 1,
          min: 1,
        },
        memory: {
          label: 'Memory',
          value: 2,
          increment: 2,
          min: 0.5,
        },
        executionTimePerRequestMS: {
          label: 'Execution Time Per Request (ms)',
          value: 500,
          increment: 100,
          min: 100,
        },
        requestsPerMonth: {
          label: 'Requests per month',
          value: 100000,
          increment: 1000,
          min: 1000,
        },
      },
      containerStorage: {
        containerStorageGB: {
          label: 'Container Storage (GB)',
          value: 5,
          increment: 2,
          min: 5,
        },
      },

      blobStorage: {
        blobStorageGB: {
          label: 'Blob Storage (GB)',
          value: 5,
          increment: 2,
          min: 5,
        },
      },
      genAI: {
        requestsPerMonth: {
          label: 'Requests per month',
          value: 20000,
          increment: 1000,
          min: 1000,
        },
        avgInputChar: {
          label: 'Average input characters',
          value: 1000,
          increment: 200,
          min: 100,
        },
        avgOutputChar: {
          label: 'Average output characters',
          value: 2000,
          increment: 200,
          min: 100,
        },
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      // calculate
      let caasGCP = new cloudRunModel(
        this.caas.vCPU.value,
        this.caas.memory.value,
        this.caas.executionTimePerRequestMS.value,
        this.caas.requestsPerMonth.value,
      ).cost();
      let caasAzure = new containerAppsModel(
        this.caas.vCPU.value,
        this.caas.memory.value,
        this.caas.executionTimePerRequestMS.value,
        this.caas.requestsPerMonth.value,
      ).cost();

      let containerRegistryGCP = new artifactRegistryModel(
        this.containerStorage.containerStorageGB.value,
      ).cost();
      let containerRegistryAzure = new containerRegistryModel(
        this.containerStorage.containerStorageGB.value,
      ).cost();

      let blobStorageGCP = new cloudStorageModel(
        this.blobStorage.blobStorageGB.value,
      ).cost();
      let blobStorageAzure = new blobStorageModel(
        this.blobStorage.blobStorageGB.value,
      ).cost();

      let genAIGCP = new genAILanguageModel(
        this.genAI.requestsPerMonth.value,
        this.genAI.avgInputChar.value,
        this.genAI.avgOutputChar.value,
      ).cost();
      let genAIAzure = new openAIModel(
        this.genAI.requestsPerMonth.value,
        this.genAI.avgInputChar.value,
        this.genAI.avgOutputChar.value,
      ).cost();

      // constant
      const fractionDigits = 2;

      // table data
      let columns = [
        {
          name: 'name',
          required: true,
          label: 'Service',
          align: 'left',
          field: (row) => {
            return row.name;
          },
          format: (val) => `${val}`,
        },
        {
          name: 'gcp',
          label: 'GCP',
          field: 'gcp',
        },
        {
          name: 'azure',
          label: 'Azure',
          field: 'azure',
        },
      ];

      let rows = [
        {
          name: 'CaaS',
          gcp: caasGCP.toFixed(fractionDigits),
          azure: caasAzure.toFixed(fractionDigits),
        },
        {
          name: 'Container Registry',
          gcp: containerRegistryGCP.toFixed(fractionDigits),
          azure: containerRegistryAzure.toFixed(fractionDigits),
        },
        {
          name: 'Blob Storage',
          gcp: blobStorageGCP.toFixed(fractionDigits),
          azure: blobStorageAzure.toFixed(fractionDigits),
        },
        {
          name: 'Gen AI',
          gcp: genAIGCP.toFixed(fractionDigits),
          azure: genAIAzure.toFixed(fractionDigits),
        },
      ];

      return {
        columns: columns,
        rows: rows,
      };
    },
  },
});
</script>
