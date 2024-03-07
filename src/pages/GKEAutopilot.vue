<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">
      GKE Autopilot Cost Calculator
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
      </div>
      <div class="col-4 q-pl-lg">
        <q-table
          flat
          bordered
          dense
          :rows="finalValue.rows"
          :columns="finalValue.columns"
          row-key="name"
        />
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
    };
  },
  method: {},
  computed: {
    finalValue() {
      // pricing
      // """
      // Ref: https://cloud.google.com/kubernetes-engine/pricing
      // Unit: USD
      // Price: per hour
      // Region: asia-southeast1
      // """
      let generalPurpose = {
        cpu_regular: 0.0549,
        memory_regular: 0.0060729,
        cpu_spot: 0.0165,
        memory_spot: 0.0018219,
        cpu_one_year_commitment: 0.04392,
        memory_one_year_commitment: 0.0048583,
        cpu_three_year_commitment: 0.030195,
        memory_three_year_commitment: 0.0033401,
      };

      // base price
      function perHourToPerMonth(perHour: number) {
        return perHour * 24 * 30;
      }

      let generalPurposeRegularPerHour =
        this.vCPU.value * generalPurpose.cpu_regular +
        this.memory.value * generalPurpose.memory_regular;
      let generalPurposeSpotPerHour =
        this.vCPU.value * generalPurpose.cpu_spot +
        this.memory.value * generalPurpose.memory_spot;
      let generalPurposeOneYearCommitmentPerHour =
        this.vCPU.value * generalPurpose.cpu_one_year_commitment +
        this.memory.value * generalPurpose.memory_one_year_commitment;
      let generalPurposeThreeYearCommitmentPerHour =
        this.vCPU.value * generalPurpose.cpu_three_year_commitment +
        this.memory.value * generalPurpose.memory_three_year_commitment;

      // constant
      const fractionDigits = 3;

      // table data
      let columns = [
        {
          name: 'name',
          required: true,
          label: 'Compute Type',
          align: 'left',
          field: (row) => {
            return row.name;
          },
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'pricing',
          label: 'Pricing',
          field: 'pricing',
        },
        {
          name: 'pricePerHour',
          label: 'Price / Hour',
          field: 'pricePerHour',
          sortable: true,
        },
        {
          name: 'pricePerMonth',
          label: 'Price / Month',
          field: 'pricePerMonth',
          sortable: true,
        },
      ];

      let rows = [
        {
          name: 'General Purpose',
          pricing: 'Regular',
          pricePerHour: generalPurposeRegularPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            generalPurposeRegularPerHour
          ).toFixed(fractionDigits),
        },
        {
          name: 'General Purpose',
          pricing: 'Spot',
          pricePerHour: generalPurposeSpotPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(generalPurposeSpotPerHour).toFixed(
            fractionDigits
          ),
        },
        {
          name: 'General Purpose',
          pricing: '1 Year Commitment',
          pricePerHour:
            generalPurposeOneYearCommitmentPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            generalPurposeOneYearCommitmentPerHour
          ).toFixed(fractionDigits),
        },
        {
          name: 'General Purpose',
          pricing: '3 Year Commitment',
          pricePerHour:
            generalPurposeThreeYearCommitmentPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            generalPurposeThreeYearCommitmentPerHour
          ).toFixed(fractionDigits),
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
