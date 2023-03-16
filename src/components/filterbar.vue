<template>
  <div class="container-fuild">
    <div class="row justify-content-md-center">
      <div class="col-sm-12 col-md-2">
        <label for="month" class="form-label">เดือน:</label>
        <select
          id="month"
          class="form-select form-select-sm"
          :value="month"
          v-bind="{
            ...$attrs,
            onChange: ($event) => {
              $emit('update:month', $event.target.value);
            },
          }"
        >
          <option v-for="m in months" :value="m.id" :selected="m.id === month">
            {{ m.text }}
          </option>
        </select>
      </div>
      <div class="col-sm-12 col-md-2">
        <label for="year" class="form-label">ปี:</label>
        <select
          id="year"
          class="form-select form-select-sm"
          :value="year"
          v-bind="{
            ...$attrs,
            onChange: ($event) => {
              $emit('update:year', $event.target.value);
            },
          }"
        >
          <option v-for="y in years" :value="y.id" :selected="y.id === year">
            {{ y.text }}
          </option>
        </select>
      </div>
      <div class="col-sm-12 col-md-2">
        <label for="type" class="form-label">ประเภท:</label>
        <select
          id="year"
          class="form-select form-select-sm"
          :value="type"
          v-bind="{
            ...$attrs,
            onChange: ($event) => {
              $emit('update:type', $event.target.value);
            },
          }"
        >
        <option v-for="t in types" :value="t.id" :selected="t.id === type">
            {{ t.text }}
          </option>
        </select>
      </div> 
      <div class="col-sm-12 col-md-1">
        <label for="type" class="form-label">&nbsp;&nbsp;</label>
        <input
          type="button"
          value="ค้นหา"
          class="form-control btn btn-outline-primary btn-sm"
          @click="search()"
        />
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script setup>
// import {  defineEmits } from "vue";
defineProps({
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});

const years = [
  { id: 2023, text: 2566 },
  { id: 2024, text: 2567 },
  { id: 2025, text: 2568 },
  { id: 2026, text: 2569 },
  { id: 2027, text: 2570 },
  { id: 2028, text: 2571 },
  { id: 2029, text: 2572 },
  { id: 2030, text: 2573 },
  { id: 2031, text: 2574 },
];
const months = [
  { id: "01", text: "มกราคม" },
  { id: "02", text: "กุมภาพันธ์" },
  { id: "03", text: "มีนาคม" },
  { id: "04", text: "เมษายน" },
  { id: "05", text: "พฤษภาคม" },
  { id: "06", text: "มิถุนายน" },
  { id: "07", text: "กรกฏาคม" },
  { id: "08", text: "สิงหาคม" },
  { id: "09", text: "กันยายน" },
  { id: "10", text: "ตุลาคม" },
  { id: "11", text: "พฤศจิกายน" },
  { id: "12", text: "ธันวาคม" },
];
const types = [
  { id: "0", text: "Service" },
  { id: "1", text: "PM" },
];

const emit = defineEmits(["search","update:year","update:month","update:type","update"]);
const search=()=>{
    emit('search')
}
</script>
<style scoped>
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
</style>
