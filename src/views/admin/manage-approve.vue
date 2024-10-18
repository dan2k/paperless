<template>
  <div class="container-fiuld mx-0">
    <div class="mb-3 row">
      <label for="places" class="col-sm-2 col-form-label text-end">หน่วยงาน:</label>
      <div class="col-sm-7">
        <select id="places" class="form-select form-select-sm" v-model="place" @change="changePlace()">
          <option value="">-- เลือกหน่วยงาน --</option>
          <option v-for="(p, i) in places.data" :value="p" :key="i">
            {{ p.cust_pdesc }}
          </option>
        </select>
      </div>
    </div>
    <div class="tableresponsive" v-if="offices">
      <div class="float-end text-primary" style="cursor:pointer" @click="add()"><i class="fa-solid fa-user-plus"></i>&nbsp;</div>
      <table class="tabledata bg-white">
        <thead class="bg-info text-white">
          <tr>
            <th>ลำดับ</th>
            <th>เลขประจำตัวประชาชน</th>
            <th>ชื่อ</th>
            <th>วันที่เริ่มงาน</th>
            <th>วันที่สิ้นสุด</th>
            <th>ตำแหน่ง</th>
            <th>ประเภท</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody v-if="!offices.data?.length">
            <tr><td colspan=8 align="center" class="text-danger"><b>-- ไม่พบข้อมูล --</b></td></tr>
        </tbody>
        <tbody v-if="offices.data?.length">
          <tr v-for="(o,i) in offices.data" :key="i">
            <td data-title="ลำดับ">{{ i+1 }}</td>
            <td data-title="เลขประจำตัวประชาชน">{{ o.pid }}</td>
            <td data-title="ชื่อ">{{o.title}} {{ o.fname }} {{ o.lname }}</td>
            <td data-title="วันที่เริ่มงาน">{{ o.start }}</td>
            <td data-title="วันที่สิ้นสุด">{{ o.end }}</td>
            <td data-title="ตำแหน่ง">{{ o.position_desc }}</td>
            <td data-title="ประเภท">{{ o.level_desc }}</td>
            <td data-title="#">
                <span style="cursor:pointer" class="mx-1" @click="edit(o.officer_id,o.cust_ptype,o.cust_pcode)"><i class="fa-solid fa-pen text-info"></i></span>
                <span style="cursor:pointer" class="mx-1" @click="del(o.officer_id,o.cust_ptype,o.cust_pcode)"><i class="fa-solid fa-trash text-danger"></i></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.tableresponsive {
  margin: 15px auto;
}

.tabledata {
  width: 100%;
  padding: 0;
  margin: 0;
  /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
  font-size: 13px;
  /* color: #9c9b99; */
}
.tabledata thead tr th {
  /* background: #0eac38;
  color: #fff; */
  text-align: center;
  padding: 7px 5px;
}
.tabledata tbody tr td {
  padding: 7px 5px;
  text-align: center;
  /* cursor: pointer; */
  border-bottom: 1px solid #d6d6d6;
}

@media only screen and (max-width: 430px) {
 
  .tabledata thead {
		display: none;
	}
	.tabledata tr > * {
		display: block;
	}
	.tabledata tbody tr > *:first-child {
		/* margin-top: 4%; */
		background-color: rgb(13, 202, 240);
		color: white;
		text-align: left;
	}
    .tabledata tbody tr td {
        padding: 7px 5px;
        text-align: left !important;
    }
	.tabledata tbody tr > *:before {
		content: attr(data-title) "\003A\00a0\00a0";
		float: left;
		text-transform: uppercase;
		font-weight: bold;
	}
}
</style>
<script setup>
import { useAdmin } from "./admin";
import { onMounted, ref} from "vue";
const { authStore,deleteOfficer, getPlace,getOffice,router,route } = useAdmin();
const placetype = authStore.userData.ses_placetype;
const sectionid = authStore.userData.section_id;
const places = ref([]);
const place = ref("");
const offices=ref([]) 
const changePlace= async ()=>{
    offices.value=await getOffice(place.value?.cust_ptype,place.value?.cust_pcode)
    // console.log(offices.value);
}
onMounted(async () => {

  places.value = await getPlace(placetype, sectionid);
  console.log(places.value);
  if(route.query?.custptype && route.query?.custpcode){
       let tmp=places.value.data.filter((ob,i)=>ob.cust_ptype==route.query.custptype && ob.cust_pcode==route.query.custpcode)     
       if(tmp.length>0){
          place.value=tmp[0]
          changePlace()
       }  

  }
});
const add=()=>{
    router.push({name:'add-approve',params:{custptype:place.value?.cust_ptype,custpcode:place.value?.cust_pcode}})
}
const del=async (officerid,custptype,custpcode)=>{
  let tmp=await deleteOfficer(officerid,custptype,custpcode)
  console.log(tmp)
  if(tmp=='no' || !tmp) return;
  offices.value=tmp;
}
const edit=async (officerid,custptype,custpcode)=>{
  router.push({name:'edit-approve',params:{officerid,custptype,custpcode}})
};
</script>
