<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">
      GKE Autopilot: Spark Job Cost Calculator
    </div>

    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-4">
        <NumberInputComponent
          v-model.number="vCPU.value"
          :increment-value="vCPU.increment"
          :min-value="vCPU.min"
          label="vCPU"
          :rules="[(val) => val >= vCPU.min || `Minimum value is ${vCPU.min}`]"
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
          v-model.number="executors.value"
          :increment-value="executors.increment"
          :min-value="executors.min"
          label="Executors"
          :rules="[
            (val) =>
              val >= executors.min || `Minimum value is ${executors.min}`,
          ]"
        />
        <NumberInputComponent
          v-model.number="jobDurationHour.value"
          :increment-value="jobDurationHour.increment"
          :min-value="jobDurationHour.min"
          label="Job duration (hours)"
          :rules="[
            (val) =>
              val >= jobDurationHour.min ||
              `Minimum value is ${jobDurationHour.min}`,
          ]"
        />
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
import { generalPurpose, scaleOutARM } from 'src/models/GcpGkeModel';

export default defineComponent({
  name: 'HelpPage',
  components: { NumberInputComponent },
  data() {
    return {
      vCPU: {
        value: 0.25,
        increment: 1,
        min: 0.25,
      },
      memory: {
        value: 0.5,
        increment: 2,
        min: 0.5,
      },
      executors: {
        value: 1,
        increment: 1,
        min: 1,
      },
      jobDurationHour: {
        value: 1,
        increment: 2,
        min: 0.5,
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      // regular spot
      let regularSpotPricePerHour =
        this.vCPU.value * generalPurpose.cpu_spot +
        this.memory.value * generalPurpose.memory_spot;
      let regularSpotPrice =
        regularSpotPricePerHour *
        this.jobDurationHour.value *
        (1 + this.executors.value);

      // scale out arm spot
      let scaleOutARMSpotPricePerHour =
        this.vCPU.value * scaleOutARM.cpu_spot +
        this.memory.value * scaleOutARM.memory_spot;
      let scaleOutARMSpotPrice =
        scaleOutARMSpotPricePerHour *
        this.jobDurationHour.value *
        (1 + this.executors.value);

      return {
        regularSpotPrice: regularSpotPrice,
        scaleOutARMSpotPrice: scaleOutARMSpotPrice,
      };
    },
  },
});
</script>
