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
          v-model.number="cpu.value"
          :increment-value="cpu.increment"
          :min-value="cpu.min"
          label="vCPU"
          :rules="[(val) => val >= cpu.min || `Minimum value is ${cpu.min}`]"
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
      cpu: {
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
          name: 'aaaa',
          pricing: 'a',
          pricePerHour: 159,
          pricePerMonth: 159,
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
