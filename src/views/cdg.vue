<template>
  <div class="main d-flex justify-content-around">
    <div class="card col-12 col-md-8">
      <div class="card-header">
        <div class="col-1 col-md-4 mx-auto">
          <select class="form-select" v-model="type" aria-label="Default select example">
            <option selected value="0">SERVICE</option>
            <option value="1">PM</option>
          </select>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    
    
  </div>
</template>
<script setup>
  import { onMounted,ref } from "vue"; 
  import {useService} from "./service";
  const {appStore} =useService();
  const type=ref(0)
  onMounted(()=>{
    appStore.title="รายการรออนุมัติ";
  });
</script>
<style scoped>
.main {
  font-size: 14px;
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
ol li {
  font-size: 14px;
}
</style>
