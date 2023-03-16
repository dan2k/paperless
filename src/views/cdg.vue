<template>
  <div class="main">
    <div class="row">
      <div class="col-12 col-md-4 mx-auto">
        <select
          class="form-select form-select-sm"
          v-model="type"
          aria-label="Default select example"
          @change="getData()"
        >
          <option value="0" selected>SERVICE</option>
          <option value="1">PM</option>
        </select>
      </div>
    </div>
    <div class="line my-1"></div>
    <div class="row mb-1">
      <div class="col-12 col-md-6 mx-auto">
        <div class="row">
          <div class="col-12 col-md-4" v-if="ptypes.length">
            <select
              class="form-select form-select-sm"
              v-model="ptype"
              aria-label="Default select example"
              @change="getPV()"
            >
              <option value="" selected>เลือกประเภทสำนักทะเบียน</option>
              <option v-for="p in ptypes" :value="p.k">{{ p.v }} ({{ p.co }})</option>
            </select>
          </div>
          <div class="col-12 col-md-4" v-if="pvs.length">
            <select
              class="form-select form-select-sm"
              v-model="pv"
              aria-label="Default select example"
              @change="getPcode()"
            >
              <option value="" selected>เลือกจังหวัด</option>
              <option v-for="p in pvs" :value="p.k">{{ p.v }} ({{ p.co }})</option>
            </select>
          </div>
          <div class="col-12 col-md-4" v-if="pcodes.length">
            <select
              class="form-select form-select-sm"
              v-model="pcode"
              aria-label="Default select example"
              @change="getData2()"
            >
              <option value="" selected>เลือกสำนักทะเบียน</option>
              <option v-for="p in pcodes" :value="p.k">{{ p.v }} ({{ p.co }})</option>
              <option value="xxx" selected>ทั้งหมด</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="d in data2" class="card col-12 col-md-8 mx-auto mb-1">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-12 text-primary">
              <h6 class="float-start fw-bold">
                <i class="fa-solid fa-sitemap"></i>&nbsp;{{ d.cust_pcode }}
              </h6>
              <h6 class="float-end fw-bold">{{ d.sv_no }}</h6>
            </div>
            <div class="line my-1"></div>
            <div class="col-12 col-md-12">
              <span class="card-title fw-normal"
                ><i class="fa-solid fa-house"></i>&nbsp;สถานที่:&nbsp;</span
              >
              <span style="color: #999">{{ d.cust_pdesc }}</span>
            </div>
            <div class="col-12 col-md-12">
              <span class="card-title fw-normal"
                ><i class="fa-solid fa-house"></i>&nbsp;สัญญา:&nbsp;</span
              >
              <span style="color: #999" v-if="type==0">{{ d.contract }}</span>
              <div style="color:#999" v-if="type==1">
                <ul>
                  <li v-for="c in d.contract.split('|')">{{ c }} {{  }}</li>
                </ul>
              </div>
            </div>
            <div class="col-12 col-md-6 mb-1">
              <span class="card-title fw-normal"
                ><i class="fa-regular fa-user"></i>&nbsp;ผู้แจ้ง:&nbsp;</span
              >
              <span style="color: #999">คุณ {{ d.thicust }}</span>
            </div>
            <div class="col-12 col-md-6 mb-1">
              <span class="card-title fw-normal"
                ><i class="fa-regular fa-calendar"></i>&nbsp;วันเวลา รับแจ้ง:&nbsp;</span
              >
              <span style="color: #999">{{ d.svdate }}</span>
            </div>
            <div class="col-12 col-md-6 mb-1">
              <span class="card-title fw-normal"
                ><i class="fa-regular fa-user"></i>&nbsp;ผู้รับผิดชอบ:&nbsp;</span
              >
              <span style="color: #999">คุณ {{ d.thicdg }}</span>
            </div>
            <div class="col-12 col-md-6 mb-1">
              <span class="card-title fw-normal"
                ><i class="fa-regular fa-calendar"></i>&nbsp;วันเวลาเสร็จ:&nbsp;</span
              >
              <span style="color: #999">{{ d.solvedate }}</span>
            </div>
            <div class="col-12 col-md-12 mb-1" v-if="type==0">
              <span class="card-title fw-normal"
                ><i class="fa-solid fa-tag"></i>&nbsp;ปัญหา:&nbsp;</span
              >
              <span style="text-align: justify; color: #999">
                {{ d.sv_detail }}
              </span>
            </div>
          </div>
          <div class="line my-1"></div>
          <div class="col-12 col-md-12 text-end">
            <button class="btn btn-primary btn-sm">
              <i class="fa-regular fa-file-lines"></i>&nbsp;รายละเอียด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { onMounted, ref } from "vue";
import { useService } from "./service";
const { authStore, appStore, getCdgJob } = useService();
const type = ref(0);
const data = ref([]);
const data2 = ref([]);
const ptypes = ref([]);
const ptype = ref("");
const pcodes = ref([]);
const pcode = ref("");
const pvs = ref([]);
const pv = ref("");
onMounted(async () => {
  appStore.title = "รายการรออนุมัติ";
  await getData();
  // console.log(data.value);
});
const getData = async () => {
  ptypes.value.length = 0;
  pvs.value.length = 0;
  pcodes.value.length = 0;
  data2.value.length = 0;
  data.value = await getCdgJob(type.value, authStore.userData.ses_newplacecode);
  if (!data.value) return;

  let tmp = groupBy(data.value, "cust_ptype");
  ptypes.value = Object.keys(tmp);
  ptypes.value = ptypes.value.map((it, i) => {
    return { 
      k: it, 
      v: data.value.filter((it2) => it2.cust_ptype == it)[0].cust_desc,
      co:data.value.reduce((p,it2)=>{
        if(it2.cust_ptype==it){
          return Number(p)+1
        }
        return p
      },0) 
    };
  });
  ptype.value = "";
  if (ptypes.value.length < 2) {
    ptype.value = ptypes.value[0].k;
    getPV();
  }
};
const getPV = () => {
  pvs.value.length = 0;
  pcodes.value.length = 0;
  data2.value.length = 0;
  pv.value = "";
  if( ptype.value=="") return;
  let tmp = groupBy(data.value, "province_id");
  pvs.value = Object.keys(tmp);
  pvs.value = pvs.value.map((it, i) => {
    return {
      k: it,
      v: data.value.filter((it2) => it2.province_id == it)[0].province_name,
      co: data.value.reduce((p,it2)=>{
        if(it2.province_id==it && it2.cust_ptype==ptype.value) return Number(p)+1
        return p
      },0)
    };
  });
  if (pvs.value.length < 2 ) {
    pv.value = pvs.value[0].k;
    getPcode();
  }
};
const getPcode = () => {
  pcodes.value.length = 0;
  data2.value.length = 0;
  pcode.value = "";
  if(pv.value=="") return;
  let tmpdata = data.value.filter((it) => it.cust_ptype == ptype.value);
  let tmp = groupBy(
    tmpdata.filter((it) => it.cust_ptype == ptype.value),
    "cust_pcode"
  );
  pcodes.value = Object.keys(tmp);
  pcodes.value = pcodes.value.map((it, i) => {
    return { 
      k: it, 
      v: tmpdata.filter((it2) => it2.cust_pcode === it)[0]?.cust_pdesc,
      co: tmpdata.reduce((p,it2)=>{
        if(it2.cust_pcode==it) return Number(p)+1
        return p
      },0)

    };
  });
  if (pcodes.value.length < 2 ) {
    pcode.value = pcodes.value[0].k;
    getData2();
  }
};
const getData2 = () => {
  data2.value.length=0;
  if(pcode.value=="") return 
  if (pcode.value == "xxx") {
    data2.value = data.value.filter((it) => it.cust_ptype == ptype.value);
  } else {
    data2.value = data.value.filter(
      (it) => it.cust_ptype == ptype.value && it.cust_pcode == pcode.value
    );
  }
};
const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    // console.log(result);
    return result;
  }, {});
};
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
</style>
