<template>
  <q-page class="q-pa-lg">
    <div class="q-pt-lg"></div>
    <div class="text-h2 text-bold q-pb-lg q-pt-lg">Project Quotation</div>

    <div class="q-pb-md"></div>
    <div class="row">
      <div class="col-4.5 q-pl-sm q-pr-lg">
        <div class="fa-border">
          <div class="text-h4 text-bold q-pl-sm q-pt-sm">Project Manager</div>
          <NumberInputComponent
            v-model.number="projectManagerSalary.value"
            :increment-value="projectManagerSalary.increment"
            :min-value="projectManagerSalary.min"
            label="Salary"
            :rules="[
              (val) =>
                val >= projectManagerSalary.min ||
                `Minimum value is ${projectManagerSalary.min}`,
            ]"
          />
          <NumberInputComponent
            v-model.number="projectManagerMandayRatio.value"
            :increment-value="projectManagerMandayRatio.increment"
            :min-value="projectManagerMandayRatio.min"
            label="Manday Ratio"
            :rules="[
              (val) =>
                val >= projectManagerMandayRatio.min ||
                `Minimum value is ${projectManagerMandayRatio.min}`,
            ]"
          />
          <NumberInputComponent
            v-model.number="projectManagerMandayWeeks.value"
            :increment-value="projectManagerMandayWeeks.increment"
            :min-value="projectManagerMandayWeeks.min"
            label="Manday (Weeks)"
            :rules="[
              (val) =>
                val >= projectManagerMandayWeeks.min ||
                `Minimum value is ${projectManagerMandayWeeks.min}`,
            ]"
          />
        </div>
      </div>
      <div class="col-3.5 q-pr-lg">
        <div class="row q-pb-md">
          <div class="fa-border">
            <div class="text-h4 text-bold q-pl-sm q-pt-sm">Technical Lead</div>
            <NumberInputComponent
              v-model.number="technicalLeadSalary.value"
              :increment-value="technicalLeadSalary.increment"
              :min-value="technicalLeadSalary.min"
              label="Salary"
              :rules="[
                (val) =>
                  val >= technicalLeadSalary.min ||
                  `Minimum value is ${technicalLeadSalary.min}`,
              ]"
            />
            <NumberInputComponent
              v-model.number="technicalLeadMandayRatio.value"
              :increment-value="technicalLeadMandayRatio.increment"
              :min-value="technicalLeadMandayRatio.min"
              label="Manday Ratio"
              :rules="[
                (val) =>
                  val >= technicalLeadMandayRatio.min ||
                  `Minimum value is ${technicalLeadMandayRatio.min}`,
              ]"
            />
            <NumberInputComponent
              v-model.number="technicalLeadMandayWeeks.value"
              :increment-value="technicalLeadMandayWeeks.increment"
              :min-value="technicalLeadMandayWeeks.min"
              label="Manday (Weeks)"
              :rules="[
                (val) =>
                  val >= technicalLeadMandayWeeks.min ||
                  `Minimum value is ${technicalLeadMandayWeeks.min}`,
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-3.5">
        <div class="fa-border">
          <div class="text-h4 text-bold q-pl-sm q-pt-sm">Data Engineer</div>
          <NumberInputComponent
            v-model.number="dataEngineerSalary.value"
            :increment-value="dataEngineerSalary.increment"
            :min-value="dataEngineerSalary.min"
            label="Salary"
            :rules="[
              (val) =>
                val >= dataEngineerSalary.min ||
                `Minimum value is ${dataEngineerSalary.min}`,
            ]"
          />
          <NumberInputComponent
            v-model.number="dataEngineerMandayWeeks.value"
            :increment-value="dataEngineerMandayWeeks.increment"
            :min-value="dataEngineerMandayWeeks.min"
            label="Manday (Weeks)"
            :rules="[
              (val) =>
                val >= dataEngineerMandayWeeks.min ||
                `Minimum value is ${dataEngineerMandayWeeks.min}`,
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
  quotationProjectManager,
  quotationDev,
} from 'src/constants/QuotationModel';

export default defineComponent({
  name: 'HelpPage',
  components: { NumberInputComponent },
  data() {
    return {
      // PM
      projectManagerSalary: {
        value: 130000,
        increment: 10000,
        min: 100000,
      },
      projectManagerMandayRatio: {
        value: 0.3,
        increment: 0.1,
        min: 0.2,
      },
      projectManagerMandayWeeks: {
        value: 4,
        increment: 1,
        min: 2,
      },
      // Technical Lead
      technicalLeadSalary: {
        value: 130000,
        increment: 10000,
        min: 100000,
      },
      technicalLeadMandayRatio: {
        value: 0.3,
        increment: 0.1,
        min: 0.2,
      },
      technicalLeadMandayWeeks: {
        value: 4,
        increment: 1,
        min: 2,
      },
      // Data Engineer
      dataEngineerSalary: {
        value: 60000,
        increment: 10000,
        min: 100000,
      },
      dataEngineerMandayWeeks: {
        value: 4,
        increment: 1,
        min: 0,
      },
      ////////////////////////////////////////
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
      let costProjectManager = new quotationProjectManager(
        this.projectManagerSalary.value,
        this.projectManagerMandayRatio.value,
        this.projectManagerMandayWeeks.value,
      ).cost();
      let costTechnicalLead = new quotationProjectManager(
        this.technicalLeadSalary.value,
        this.technicalLeadMandayRatio.value,
        this.technicalLeadMandayWeeks.value,
      ).cost();
      let costdataEngineer = new quotationDev(
        this.dataEngineerSalary.value,
        this.dataEngineerMandayWeeks.value,
      ).cost();

      // table data
      let columns = [
        {
          name: 'name',
          required: true,
          label: 'Role',
          align: 'left',
          field: (row) => {
            return row.name;
          },
          format: (val) => `${val}`,
        },
        {
          name: 'cost',
          label: 'Cost',
          field: 'cost',
        },
      ];

      let rows = [
        {
          name: 'Project Manager',
          cost: Math.round(costProjectManager).toLocaleString(),
        },
        {
          name: 'Technical Lead',
          cost: Math.round(costTechnicalLead).toLocaleString(),
        },
        {
          name: 'Data Engineer',
          cost: Math.round(costdataEngineer).toLocaleString(),
        },
        // total
        {
          name: 'Total',
          cost: Math.round(
            costProjectManager + costTechnicalLead + costdataEngineer,
          ).toLocaleString(),
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
