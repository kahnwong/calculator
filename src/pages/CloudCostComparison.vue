<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">Cloud Cost Comparison</div>

    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-4 q-pl-xs">
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
            v-model.number="executionTimeMS.value"
            :increment-value="executionTimeMS.increment"
            :min-value="executionTimeMS.min"
            label="Execution time (ms)"
            :rules="[
              (val) =>
                val >= executionTimeMS.min ||
                `Minimum value is ${executionTimeMS.min}`,
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
      <div class="col-4">
        <div class="row q-pl-md">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">
              Container Storage
            </div>
            <NumberInputComponent
              v-model.number="containerStorageGB.value"
              :increment-value="containerStorageGB.increment"
              :min-value="containerStorageGB.min"
              label="Container storage (GB)"
              :rules="[
                (val) =>
                  val >= containerStorageGB.min ||
                  `Minimum value is ${containerStorageGB.min}`,
              ]"
            />
          </div>
        </div>
        <div class="row q-pt-md q-pl-md">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Blob Storage</div>
            <NumberInputComponent
              v-model.number="blobStorageGB.value"
              :increment-value="blobStorageGB.increment"
              :min-value="blobStorageGB.min"
              label="Blob storage (GB)"
              :rules="[
                (val) =>
                  val >= blobStorageGB.min ||
                  `Minimum value is ${blobStorageGB.min}`,
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-4 q-pl-md">
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
      // caas
      vCPU: {
        value: 1,
        increment: 1,
        min: 0.5,
      },
      memory: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
      executionTimeMS: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
      requestsPerMonth: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
      // storage
      containerStorageGB: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
      blobStorageGB: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
      // gen ai
      genAIRequestsPerMonth: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
      genAIAvgInputChar: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
      genAIAvgOutputChar: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      return 3;
    },
  },
});
</script>
