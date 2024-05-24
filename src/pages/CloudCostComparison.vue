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
          <NumberInputComponent
            v-model.number="vCPU.value"
            :increment-value="vCPU.increment"
            :min-value="vCPU.min"
            label="vCPU"
            :rules="[
              (val) => val >= vCPU.min || `Minimum value is ${vCPU.min}`,
            ]"
          />
          <NumberInputComponent
            v-model.number="memory.value"
            :increment-value="memory.increment"
            :min-value="memory.min"
            label="Memory"
            :rules="[
              (val) => val >= memory.min || `Minimum value is ${memory.min}`,
            ]"
          />
          <NumberInputComponent
            v-model.number="executionTimePerRequestMS.value"
            :increment-value="executionTimePerRequestMS.increment"
            :min-value="executionTimePerRequestMS.min"
            label="Execution time (ms)"
            :rules="[
              (val) =>
                val >= executionTimePerRequestMS.min ||
                `Minimum value is ${executionTimePerRequestMS.min}`,
            ]"
          />
          <NumberInputComponent
            v-model.number="requestsPerMonth.value"
            :increment-value="requestsPerMonth.increment"
            :min-value="requestsPerMonth.min"
            label="Requests per month)"
            :rules="[
              (val) =>
                val >= requestsPerMonth.min ||
                `Minimum value is ${requestsPerMonth.min}`,
            ]"
          />
        </div>
      </div>
      <div class="col-3.5 q-pr-lg">
        <div class="row q-pb-md">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">
              Container Storage
            </div>
            <NumberInputComponent
              v-model.number="containerStorageGB.value"
              :increment-value="containerStorageGB.increment"
              :min-value="containerStorageGB.min"
              label="Storage (GB)"
              :rules="[
                (val) =>
                  val >= containerStorageGB.min ||
                  `Minimum value is ${containerStorageGB.min}`,
              ]"
            />
          </div>
        </div>
        <div class="row">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Blob Storage</div>
            <NumberInputComponent
              v-model.number="blobStorageGB.value"
              :increment-value="blobStorageGB.increment"
              :min-value="blobStorageGB.min"
              label="Storage (GB)"
              :rules="[
                (val) =>
                  val >= blobStorageGB.min ||
                  `Minimum value is ${blobStorageGB.min}`,
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-3.5">
        <div class="fa-border">
          <div class="text-h4 text-bold q-pl-sm q-pt-sm">Gen AI</div>
          <NumberInputComponent
            v-model.number="genAIRequestsPerMonth.value"
            :increment-value="genAIRequestsPerMonth.increment"
            :min-value="genAIRequestsPerMonth.min"
            label="Requests per month"
            :rules="[
              (val) =>
                val >= genAIRequestsPerMonth.min ||
                `Minimum value is ${genAIRequestsPerMonth.min}`,
            ]"
          />
          <NumberInputComponent
            v-model.number="genAIAvgInputChar.value"
            :increment-value="genAIAvgInputChar.increment"
            :min-value="genAIAvgInputChar.min"
            label="Average input character"
            :rules="[
              (val) =>
                val >= genAIAvgInputChar.min ||
                `Minimum value is ${genAIAvgInputChar.min}`,
            ]"
          />
          <NumberInputComponent
            v-model.number="genAIAvgOutputChar.value"
            :increment-value="genAIAvgOutputChar.increment"
            :min-value="genAIAvgOutputChar.min"
            label="Average output character"
            :rules="[
              (val) =>
                val >= genAIAvgOutputChar.min ||
                `Minimum value is ${genAIAvgOutputChar.min}`,
            ]"
          />
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
          rows-per-page-options="0"
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
      // caas
      vCPU: {
        value: 2,
        increment: 1,
        min: 1,
      },
      memory: {
        value: 2,
        increment: 2,
        min: 0.5,
      },
      executionTimePerRequestMS: {
        value: 500,
        increment: 100,
        min: 100,
      },
      requestsPerMonth: {
        value: 100000,
        increment: 1000,
        min: 1000,
      },
      // storage
      containerStorageGB: {
        value: 5,
        increment: 2,
        min: 5,
      },
      blobStorageGB: {
        value: 5,
        increment: 2,
        min: 5,
      },
      // gen ai
      genAIRequestsPerMonth: {
        value: 20000,
        increment: 1000,
        min: 1000,
      },
      genAIAvgInputChar: {
        value: 1000,
        increment: 200,
        min: 100,
      },
      genAIAvgOutputChar: {
        value: 2000,
        increment: 200,
        min: 100,
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      // calculate
      let caasGCP = new cloudRunModel(
        this.vCPU.value,
        this.memory.value,
        this.executionTimePerRequestMS.value,
        this.requestsPerMonth.value,
      ).cost();
      let caasAzure = new containerAppsModel(
        this.vCPU.value,
        this.memory.value,
        this.executionTimePerRequestMS.value,
        this.requestsPerMonth.value,
      ).cost();

      let containerRegistryGCP = new artifactRegistryModel(
        this.containerStorageGB.value,
      ).cost();
      let containerRegistryAzure = new containerRegistryModel(
        this.containerStorageGB.value,
      ).cost();

      let blobStorageGCP = new cloudStorageModel(
        this.blobStorageGB.value,
      ).cost();
      let blobStorageAzure = new blobStorageModel(
        this.blobStorageGB.value,
      ).cost();

      let genAIGCP = new genAILanguageModel(
        this.genAIRequestsPerMonth.value,
        this.genAIAvgInputChar.value,
        this.genAIAvgOutputChar.value,
      ).cost();
      let genAIAzure = new openAIModel(
        this.genAIRequestsPerMonth.value,
        this.genAIAvgInputChar.value,
        this.genAIAvgOutputChar.value,
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
