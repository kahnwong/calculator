<template>
  <q-page class="q-pa-lg">
    <div class="text-h2 text-bold">Meeting Cost Calculator</div>

    <div class="text-h4 text-bold">How much does this meeting really cost?</div>

    <div class="row">
      <div class="col-6">
        <q-input outlined dense>
          <template v-slot:append>
            <div
              class="row justify-center items-center text-center full-height"
            >
              <div
                class="col-6 bg-red row justify-center items-center text-center full-height q-px-sm"
              >
                <q-icon name="fa-solid fa-plus" class="cursor-pointer" />
              </div>
              <div
                class="col-6 bg-blue row justify-center items-center text-center full-height q-px-sm"
              >
                <q-icon name="fa-solid fa-minus" class="cursor-pointer" />
              </div>
            </div>
          </template>
        </q-input>
      </div>
      <div class="col-6">a b c</div>
    </div>
  </q-page>
</template>
