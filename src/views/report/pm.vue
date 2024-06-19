<template>
  <div class="container-fluid mx-0 px-0 bg-white">
    <div
      class="float-start fw-bold"
      style="cursor: pointer"
      @click="back()"
      v-if="!isHide"
    >
      <span><i class="fa-solid fa-left-long"></i></span>
    </div>
    <table cellspacing="0" cellpadding="0" border="0" id="tb" width="98%">
      <thead>
        <tr>
          <td colspan="11" style="border: none">
            <div>
              <center>
                <font face="AngsanaUPC" size="3">ใบรายงานการบำรุงรักษาคอมพิวเตอร์ </font>
              </center>
            </div>
            <div>
              <font face="AngsanaUPC" size="2"
                ><span class="float-start"><img src="/CDTlogo.gif" /></span
                ><span class="float-end"
                  ><br /><br /><br />วันที่ .........../........./...............</span
                ></font
              >
            </div>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; width: 4%" class="head" rowspan="3">
            <font face="AngsanaUPC" size="2">ลำดับ</font>
          </td>
          <td style="text-align: center; width: 25%" class="head" rowspan="3">
            <font face="AngsanaUPC" size="3">หมายเลขเครื่อง</font>
          </td>
          <td style="text-align: center; width: 31%" class="head" colspan="5">
            <font face="AngsanaUPC">ตรวจสอบอุปกรณ์</font>
          </td>
          <td style="text-align: center; width: 20%" class="head" colspan="3">
            <font face="AngsanaUPC">การบำรุงรักษาคอมพิวเตอร์และอุปกรณ์ต่อพ่วง</font>
          </td>
          <td style="text-align: center; width: 20%" class="head" rowspan="3">
            <font face="AngsanaUPC" size="2">หมายเหตุ</font>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; width: 2%" class="head" rowspan="2">
            <font face="AngsanaUPC" size="2">ครบ</font>
          </td>
          <td style="text-align: center" class="head" colspan="2">
            <font face="AngsanaUPC" size="2">ไม่พบ ณ จุดติดตั้ง</font>
          </td>
          <td style="text-align: center" class="head" colspan="2">
            <font face="AngsanaUPC" size="2">สถานะอุปกรณ์</font>
          </td>
          <td style="text-align: center" class="head" rowspan="2">
            <font face="AngsanaUPC" size="2"
              >ทดสอบ<br />การทำงาน<br />และตรวจสอบ<br />เครื่อง</font
            >
          </td>
          <td style="text-align: center" class="head" rowspan="2">
            <font face="AngsanaUPC" size="2">ตรวจสอบ Virus,<br />Config</font>
          </td>
          <td style="text-align: center" class="head" rowspan="2">
            <font face="AngsanaUPC" size="2"
              >ทำความสะอาด <br />Sensor,<br />ลูกยาง,หัวพิมพ์,<br />Filter(Air)</font
            >
          </td>
        </tr>
        <tr>
          <td style="text-align: center; width: 2%" class="head">
            <font face="AngsanaUPC" size="2">Set</font>
          </td>
          <td style="text-align: center" class="head">
            <font face="AngsanaUPC" size="2">Part</font>
          </td>
          <td style="text-align: center; width: 2%" class="head">
            <font face="AngsanaUPC" size="2">ปกติ</font>
          </td>
          <td style="text-align: center" class="head">
            <font face="AngsanaUPC" size="2">เสีย(ระบุ Part)</font>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            colspan="11"
            style="
              background-color: #f8f8f8;
              font-weight: bold;
              text-align: left;
              height: 25px;
              line-height: 20px;
              padding-left: 3px;
            "
          >
            <font face="AngsanaUPC" size="3">
              เลขสัญญา:
              {{ contract_no_cust }}
              สัญญา:
              {{ contract }}
            </font>
          </td>
        </tr>
      </tbody>
      <tbody v-for="(d, index) in data">
        <tr>
          <td
            colspan="11"
            style="
              background-color: #f8f8f8;
              font-weight: bold;
              text-align: left;
              height: 18px;
              padding-left: 3px;
            "
          >
            <font face="AngsanaUPC" size="3">
              {{ d.cat_id == 0 ? "PC" : d.type_desc }}
            </font>
          </td>
        </tr>
        <tr v-for="(d2, index2) in d.data">
          <td style="text-align: center">
            <font face="AngsanaUPC" size="3">{{ index2 + 1 }}</font>
          </td>
          <td style="background-color: #ffffff">
            <font face="AngsanaUPC" size="3">{{ d2.sno }}&nbsp;({{ d2.set_desc }})</font>
          </td>
          <!-- Serial Number  -->
          <td>
            <center>
              <font face="AngsanaUPC" size="2"
                ><input type="checkbox" style="margin-bottom: 2px; margin-top: 2px"
              /></font>
            </center>
          </td>
          <!--  ครบ  -->
          <td>
            <center>
              <font face="AngsanaUPC" size="2"
                ><input
                  type="checkbox"
                  style="margin-bottom: 2px; margin-top: 2px"
                  :checked="d2.isSet > 0 && d2.isLost > 0"
              /></font>
            </center>
          </td>
          <!--  หายทั้ง set  -->
          <td>
            <center>
              <font face="AngsanaUPC" size="2">{{
                d2.isSet == 0 && d2.isLost > 0 ? "มีอุปกรณ์หาย" : ""
              }}</font>
            </center>
          </td>
          <!--  part ที่หาย -->
          <td>
            <center>
              <font face="AngsanaUPC" size="2"
                ><input type="checkbox" style="margin-bottom: 2px; margin-top: 2px"
              /></font>
            </center>
          </td>
          <!--  ปกติ  -->
          <td>
            <center>
              <font face="AngsanaUPC" size="2">{{
                isDefective > 0 ? "มีอุปกรณ์เสีย" : ""
              }}</font>
            </center>
          </td>
          <!--  เสีย(ระบุ part)  -->

          <td>
            <center>
              <font face="AngsanaUPC" size="2"
                ><input
                  type="checkbox"
                  checked
                  style="margin-bottom: 2px; margin-top: 2px"
              /></font>
            </center>
          </td>
          <!--  ทดสอบการทำงานและตรวจสอบเครื่อง  -->
          <td>
            <center>
              <font face="AngsanaUPC" size="2">
                <input
                  type="checkbox"
                  style="margin-bottom: 2px; margin-top: 2px"
                  :checked="[0, 33, 13, 87].includes(Number(d2.cat_id))"
                />
              </font>
            </center>
          </td>
          <td>
            <center>
              <font face="AngsanaUPC" size="2">
                <input
                  type="checkbox"
                  style="margin-bottom: 2px; margin-top: 2px"
                  :checked="[1, 5, 9, 17, 18, 36].includes(Number(d2.cat_id))"
                />
              </font>
            </center>
          </td>
          <td>
            <center>
              <font face="AngsanaUPC" size="2"> &nbsp; </font>
            </center>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <table width="98%" cellpadding="0" cellspacing="0" border="0" class="mx-auto">
      <tbody>
        <tr>
          <td
            width="120px"
            class="head"
            style="border-style: none; background-color: white"
            rowspan="4"
          >
            <font face="AngsanaUPC" size="3"
              >สรุปผลการทำ PM<br />
              ข้อเสนอแนะแก่ลูกค้า(ถ้ามี)<br />
              หมายเหตุ(กรณีเกิดปัญหา)<br
            /></font>
          </td>
        </tr>
        <tr>
          <td
            class="head"
            style="
              height: 8px;
              padding: 0px;
              margin: 0p;
              border-style: dotted;
              border-top-style: none;
              border-left-style: none;
              border-right-style: none;
              background-color: white;
            "
          ></td>
        </tr>
        <tr>
          <td
            class="head"
            style="
              height: 8px;
              padding: 0px;
              margin: 0p;
              border-style: dotted;
              border-top-style: none;
              border-left-style: none;
              border-right-style: none;
              background-color: white;
            "
          ></td>
        </tr>
        <tr>
          <td
            class="head"
            style="
              height: 8px;
              padding: 0px;
              margin: 0px;
              border-style: dotted;
              border-top-style: none;
              border-left-style: none;
              border-right-style: none;
              background-color: white;
            "
          ></td>
        </tr>

        <tr>
          <td
            class="head"
            style="
              height: 15px;
              padding: 0px;
              margin: 0px;
              border-style: dotted;
              border-top-style: none;
              border-left-style: none;
              border-right-style: none;
              background-color: white;
            "
          ></td>
        </tr>

        <tr>
          <td
            class="head"
            colspan="2"
            style="
              height: 7px;
              padding: 0px;
              margin: 0px;
              border-style: dotted;
              border-top-style: none;
              border-left-style: none;
              border-right-style: none;
              background-color: white;
            "
          >
            <br />Service Representative
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Idcode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Customer
          </td>
        </tr>
        <tr>
          <td
            class="head"
            colspan="2"
            style="border-style: none; background-color: white; text-align: right"
          >
            FS-MA1-15
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="isHide" class="alert alert-primary w-25 mx-auto text-center">
      กำลังประมวลผล......
    </div>
  </div>
</template>
<style scoped>
table {
  font-family: AngsanaUPC, ms sans serif, sans serif;
  font-size: 10pt;
}
.head {
  vertical-align: middle;
  background-color: #e9e9e9;
  height: 25px;
  line-height: 10pt;
  padding: 0px 0px 0px 0px;
  border-color: gray;
  border-style: solid;
  border-width: 1px;
}

tbody td {
  height: 4px;
  line-height: 4px;
  padding: 0px 0px 0px 0px;
  border-color: gray;
  border-style: solid;
  border-width: 1px;
}
@media print {
  body * {
    visibility: hidden;
  }
  #list-data * {
    visibility: visible;
  }
  #list-data {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  #list-data .noprint {
    visibility: hidden;
  }
  @page {
    margin-top: 7mm;
    margin-bottom: 10mm;
    margin-left: 0mm;
    margin-right: 5mm;
    counter-increment: page;
    counter-reset: page 1;
    @top-right {
      content: "Page " counter(page) " of " counter(pages);
    }
  }
}
</style>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import { useReport } from "./report.js";
const props = defineProps({
  contractno: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});
const { reportStore, router, route, authStore, getPm } = useReport();
const isHide = ref(true);
const rg = route.params.rg;
const pv = route.params.pv;
const pv_desc = route.params.pv_desc;
const custptype = route.params.custptype;
const custpcode = route.params.custpcode;
const yymm = props.year + "" + props.month;
const contractno = props.contractno;
const pms = ref([]);
const data = ref([]);
const contract = ref("");
const contract_no_cust = ref("");
const back = () => {
  router.push({ path: `/report/dcs/${rg}/${pv}/${pv_desc}` });
};
onMounted(async () => {
  reportStore.isLoading = true;
  // let level=authStore.userData.sur_level;
  // let pageLevel=3
  // equips.value=await getEquip(props.contractno,level,pageLevel,rg,pv)
  pms.value = await getPm(contractno, custptype, custpcode, yymm);
  let tmp_type = await Object.keys(pms.value.data).map((it) => Number(it));
  tmp_type.sort((a, b) => (a > b ? -1 : 1));
  contract.value = pms.value.data[tmp_type[0]][0].contract_name;
  //   console.log(contract.value)
  contract_no_cust.value = `${
    pms.value.data[tmp_type[0]][0].contract_no_cust
  }(${contractno})`;
  for (let i = 0; i < tmp_type.length; i++) {
    let tmp2 = pms.value.data[tmp_type[i]][0].type_desc;
    data.value[i] = {
      type_id: tmp_type[i],
      type_desc: tmp2,
      data: pms.value.data[tmp_type[i]],
    };
  }
  console.log(data.value);
  isHide.value = false;
  reportStore.isLoading = false;
  // console.log({equips})
});
</script>
