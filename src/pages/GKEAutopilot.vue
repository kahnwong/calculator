<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">
      GKE Autopilot Cost Calculator
    </div>

    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-3">
        <div v-for="(value, name) in gke" :key="name">
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
      <div class="col-7 q-pl-lg">
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
  generalPurposeModel,
  scaleOutARMModel,
  scaleOutX86Model,
} from 'src/models/GcpGkeModel';

export default defineComponent({
  name: 'HelpPage',
  components: { NumberInputComponent },
  data() {
    return {
      gke: {
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
      },
    };
  },
  method: {},
  computed: {
    finalValue() {
      // base price
      let generalPurpose = new generalPurposeModel(
        this.gke.vCPU.value,
        this.gke.memory.value,
      );
      let generalPurposeRegularPerHour = generalPurpose.costRegular();
      let generalPurposeSpotPerHour = generalPurpose.costSpot();
      let generalPurposeOneYearCommitmentPerHour =
        generalPurpose.costOneYearCommitment();
      let generalPurposeThreeYearCommitmentPerHour =
        generalPurpose.costThreeYearCommitment();

      let scaleOutARM = new scaleOutARMModel(
        this.gke.vCPU.value,
        this.gke.memory.value,
      );
      let scaleOutARMRegularPerHour = scaleOutARM.costRegular();
      let scaleOutARMSpotPerHour = scaleOutARM.costSpot();
      let scaleOutARMOneYearCommitmentPerHour =
        scaleOutARM.costOneYearCommitment();
      let scaleOutARMThreeYearCommitmentPerHour =
        scaleOutARM.costThreeYearCommitment();

      let scaleOutX86 = new scaleOutX86Model(
        this.gke.vCPU.value,
        this.gke.memory.value,
      );
      let scaleOutX86RegularPerHour = scaleOutX86.costRegular();
      let scaleOutX86SpotPerHour = scaleOutX86.costSpot();
      let scaleOutX86OneYearCommitmentPerHour =
        scaleOutX86.costOneYearCommitment();
      let scaleOutX86ThreeYearCommitmentPerHour =
        scaleOutX86.costThreeYearCommitment();

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
