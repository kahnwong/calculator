<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">
      GKE Autopilot Cost Calculator
    </div>

    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-3">
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
      <div class="col-1"></div>
      <div class="col-7 q-pl-lg">
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
  generalPurpose,
  scaleOutARM,
  scaleOutX86,
} from 'src/constants/GcpGkeModel';

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
      // base price
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

      let scaleOutARMRegularPerHour =
        this.vCPU.value * scaleOutARM.cpu_regular +
        this.memory.value * scaleOutARM.memory_regular;
      let scaleOutARMSpotPerHour =
        this.vCPU.value * scaleOutARM.cpu_spot +
        this.memory.value * scaleOutARM.memory_spot;
      let scaleOutARMOneYearCommitmentPerHour =
        this.vCPU.value * scaleOutARM.cpu_one_year_commitment +
        this.memory.value * scaleOutARM.memory_one_year_commitment;
      let scaleOutARMThreeYearCommitmentPerHour =
        this.vCPU.value * scaleOutARM.cpu_three_year_commitment +
        this.memory.value * scaleOutARM.memory_three_year_commitment;

      let scaleOutX86RegularPerHour =
        this.vCPU.value * scaleOutX86.cpu_regular +
        this.memory.value * scaleOutX86.memory_regular;
      let scaleOutX86SpotPerHour =
        this.vCPU.value * scaleOutX86.cpu_spot +
        this.memory.value * scaleOutX86.memory_spot;
      let scaleOutX86OneYearCommitmentPerHour =
        this.vCPU.value * scaleOutX86.cpu_one_year_commitment +
        this.memory.value * scaleOutX86.memory_one_year_commitment;
      let scaleOutX86ThreeYearCommitmentPerHour =
        this.vCPU.value * scaleOutX86.cpu_three_year_commitment +
        this.memory.value * scaleOutX86.memory_three_year_commitment;

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
        },
        {
          name: 'pricePerMonth',
          label: 'Price / Month',
          field: 'pricePerMonth',
        },
      ];

      function perHourToPerMonth(perHour: number) {
        return perHour * 24 * 30;
      }
      let rows = [
        // general purpose
        {
          name: 'General Purpose',
          pricing: 'Regular',
          pricePerHour: generalPurposeRegularPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            generalPurposeRegularPerHour,
          ).toFixed(fractionDigits),
        },
        {
          name: 'General Purpose',
          pricing: 'Spot',
          pricePerHour: generalPurposeSpotPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(generalPurposeSpotPerHour).toFixed(
            fractionDigits,
          ),
        },
        {
          name: 'General Purpose',
          pricing: '1 Year Commitment',
          pricePerHour:
            generalPurposeOneYearCommitmentPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            generalPurposeOneYearCommitmentPerHour,
          ).toFixed(fractionDigits),
        },
        {
          name: 'General Purpose',
          pricing: '3 Year Commitment',
          pricePerHour:
            generalPurposeThreeYearCommitmentPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            generalPurposeThreeYearCommitmentPerHour,
          ).toFixed(fractionDigits),
        },
        // scale-out ARM
        {
          name: 'Scale-Out ARM',
          pricing: 'Regular',
          pricePerHour: scaleOutARMRegularPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(scaleOutARMRegularPerHour).toFixed(
            fractionDigits,
          ),
        },
        {
          name: 'Scale-Out ARM',
          pricing: 'Spot',
          pricePerHour: scaleOutARMSpotPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(scaleOutARMSpotPerHour).toFixed(
            fractionDigits,
          ),
        },
        {
          name: 'Scale-Out ARM',
          pricing: '1 Year Commitment',
          pricePerHour:
            scaleOutARMOneYearCommitmentPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            scaleOutARMOneYearCommitmentPerHour,
          ).toFixed(fractionDigits),
        },
        {
          name: 'Scale-Out ARM',
          pricing: '3 Year Commitment',
          pricePerHour:
            scaleOutARMThreeYearCommitmentPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            scaleOutARMThreeYearCommitmentPerHour,
          ).toFixed(fractionDigits),
        },
        // scale-out x86
        {
          name: 'Scale-Out x86',
          pricing: 'Regular',
          pricePerHour: scaleOutX86RegularPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(scaleOutX86RegularPerHour).toFixed(
            fractionDigits,
          ),
        },
        {
          name: 'Scale-Out x86',
          pricing: 'Spot',
          pricePerHour: scaleOutX86SpotPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(scaleOutX86SpotPerHour).toFixed(
            fractionDigits,
          ),
        },
        {
          name: 'Scale-Out x86',
          pricing: '1 Year Commitment',
          pricePerHour:
            scaleOutX86OneYearCommitmentPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            scaleOutX86OneYearCommitmentPerHour,
          ).toFixed(fractionDigits),
        },
        {
          name: 'Scale-Out x86',
          pricing: '3 Year Commitment',
          pricePerHour:
            scaleOutX86ThreeYearCommitmentPerHour.toFixed(fractionDigits),
          pricePerMonth: perHourToPerMonth(
            scaleOutX86ThreeYearCommitmentPerHour,
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
