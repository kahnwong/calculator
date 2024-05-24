<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">
      GKE Autopilot: Spark Job Cost Calculator
    </div>

    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-4">
        <div v-for="(value, name) in gkeAutopilotSparkJob" :key="name">
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
      <div class="col-1"></div>
      <div class="col-4 q-pl-lg">
        <div class="text-h4 text-bold">${{ finalValue.regularSpotPrice }}</div>
        <div class="q-pb-xl">Regular Spot Price</div>
        <div class="text-h4 text-bold">
          ${{ finalValue.scaleOutARMSpotPrice }}
        </div>
        <div class="q-pb-xl">Scale-Out ARM Spot Price</div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NumberInputComponent from 'components/NumberInputComponent.vue';
import {
  sparkGeneralPurposeModel,
  sparkScaleOutARMModel,
} from 'src/models/GcpGkeSparkJobModel';

export default defineComponent({
  name: 'HelpPage',
  components: { NumberInputComponent },
  data() {
    return {
      gkeAutopilotSparkJob: {
        vCPU: {
          label: 'vCPU',
          value: 0.25,
          increment: 1,
          min: 0.25,
        },
        memory: {
          label: 'Memory',
          value: 0.5,
          increment: 2,
          min: 0.5,
        },
        executors: {
          label: 'Executors',
          value: 1,
          increment: 1,
          min: 1,
        },
        jobDurationHour: {
          label: 'Job duration (hours)',
          value: 1,
          increment: 2,
          min: 0.5,
        },
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      let regular = new sparkGeneralPurposeModel(
        this.gkeAutopilotSparkJob.vCPU.value,
        this.gkeAutopilotSparkJob.memory.value,
        this.gkeAutopilotSparkJob.executors.value,
        this.gkeAutopilotSparkJob.jobDurationHour.value,
      );
      let regularSpotPrice = regular.costSpotJob();

      let arm = new sparkScaleOutARMModel(
        this.gkeAutopilotSparkJob.vCPU.value,
        this.gkeAutopilotSparkJob.memory.value,
        this.gkeAutopilotSparkJob.executors.value,
        this.gkeAutopilotSparkJob.jobDurationHour.value,
      );
      let armSpotPrice = arm.costSpotJob();

      return {
        regularSpotPrice: regularSpotPrice,
        scaleOutARMSpotPrice: armSpotPrice,
      };
    },
  },
});
</script>
