<template>
  <div class="main">
    <filter-bar
      v-model:month="month"
      v-model:year="year"
      v-model:type="type"
      @search="search()"
    />
    <div class="row justify-content-md-center" v-if="data.length">
      <div class="col-sm-12 col-md-7">
        <ol class="list-group">
          <li
            v-for="d in data"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
          >
            <div class="ms-2 me-auto w-100">
              <div>
                {{ d.desc }}
                <span v-if="d.co > 0" class="float-end">
                  <button
                    type="button"
                    class="btn btn-link btn-sm"
                    @click="
                      $router.push({
                        path: '/rcs',
                        query: {
                          rg: d.rg,
                          groupid: group_id,
                          type,
                          month,
                          year,
                          ccs: 'หน้าแรก',
                        },
                      })
                    "
                  >
                    <!-- <i class="fa-solid fa-angles-right"></i> -->
                    รายละเอียด
                  </button></span
                >
              </div>
            </div>
            <span class="badge bg-primary rounded-pill">{{ d.co }}</span>
          </li>
          <li class="py-2 d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto w-100">
              <div class="fw-bold">
                รวมทั้งหมด <span class="float-end">{{ sums }} รายการ</span>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script setup>
import FilterBar from "../components/filterbar.vue";
import { onMounted, ref, computed } from "vue";
import { useService } from "./service";
const { route, appStore, authStore, month, year, type, getSumRcs } = useService();

const rg = authStore.userData.section_id;
const group_id = authStore.userData.group_id;
const data = ref([]);
const search = async () => {
  data.value = await getSumRcs(group_id, type.value, year.value, month.value);
};
const sums = computed(() => {
  return data.value.reduce((p, it) => p + Number(it.co), 0);
});
onMounted(async () => {
  appStore.title = "รายงานการ Service/PM";
  if (route.query.type && route.query.year) {
    await search();
  }
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
