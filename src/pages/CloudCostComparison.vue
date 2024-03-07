<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">Cloud Cost Comparison</div>

    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-4">
        <div class="fa-border q-pa-lg">
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
            v-model.number="executionTimeMs.value"
            :increment-value="executionTimeMs.increment"
            :min-value="executionTimeMs.min"
            label="Execution time (ms)"
            :rules="[
              (val) =>
                val >= executionTimeMs.min ||
                `Minimum value is ${executionTimeMs.min}`,
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
      executionTimeMs: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
      requestsPerMonth: {
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
