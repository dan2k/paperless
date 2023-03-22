import { useAppStore,useAuthStore } from "@/store"
import { useRoute,useRouter } from "vue-router";
import { api, errAlert,okAlert,start,close } from "@/helpers";
import { ref } from "vue";
export const useService=()=>{
    const authStore=useAuthStore();
    const appStore=useAppStore();
    const route=useRoute();
    const router=useRouter();
    let date = new Date();
    let d = date.toJSON();
    d = d.split("T");
    d = d[0];
    d = d.split("-");
    const month = ref(route.query.month??d[1]);
    const year = ref(route.query.year??d[0]);
    const type = ref(route.query.type??0);
    const headers = [
        { text: "หมายเลขปัญหา", value: "sv_no", width: 120 },
        { text: "วันที่", value: "sv_date" },
        { text: "เวลา", value: "sv_time" },
        { text: "ผู้รับผิดชอบ", value: "thiname" },
    ];
    const serverOptions = ref({
        page: 1,
        rowsPerPage: 100,
        sortBy: "sv_no",
        sortType: "asc",
    });
    const items = ref([]);
    const loading = ref(false);
    const serverItemsLength = ref(0);

    const getDCSInfo = async (custptype,custpcode) => {
        try {
          let rs = await api.get(`/paperless/v1/getDCSInfo/${custptype}/${custpcode}`);
          return  rs.data.data;
        } catch (err) {
          errAlert(err);
        }
    };
    const loadFromServer = async (custptype,custpcode) => {
        console.log(custptype,custpcode)
        start()
        loading.value = true;
        try {
          let rs = await api.get(
            `/paperless/v1/getJob/${custptype}/${custpcode}/${type.value}/${year.value}/${month.value}/${serverOptions.value.page}/${serverOptions.value.rowsPerPage}/${serverOptions.value.sortBy}/${serverOptions.value.sortType}`
          );
          items.value = rs.data.data;
          serverItemsLength.value = rs.data.totals;
          if (serverItemsLength.value == 0) {
            okAlert("ไม่พบข้อมูล");
          }
        } catch (err) {
          errAlert(err);
        }
        loading.value = false;
        close()
    };
    const getSumDcs = async (cc, groupid, type, year, month) => {
        start()
        try {
          let rs = await api.get(
            `/paperless/v1/getSumDcs/${cc}/${groupid}/${type}/${year}/${month}`
          );
          close()
          return rs.data.data;

        } catch (err) {
          errAlert(err);
        }
        close()
    };
    const getSumPcs = async (rg, groupid, type, year, month) => {
        start()
        try {
          let rs = await api.get(
            `/paperless/v1/getSumPcs/${rg}/${groupid}/${type}/${year}/${month}`
          );
          close()
          return rs.data.data;
        } catch (err) {
          errAlert(err);
        }
        close()
    };
    const getSumRcs = async ( groupid, type, year, month) => {
        start()
        try {
          let rs = await api.get(
            `/paperless/v1/getSumRcs/${groupid}/${type}/${year}/${month}`
          );
          close()
          return rs.data.data;
        } catch (err) {
          errAlert(err);
        }
        close()
    };
    const getCdgJob= async (type,newplacecode)=>{
      start()
      try{
        let rs= await api.get(`/paperless/v1/getCdgJob/${type}/${newplacecode}`);
        close()
        // return {data:rs.data.data,cc,cc:rs.data.cc,aa:rs.data.aa}
        return rs.data.data
      }catch(err){
        errAlert(err)
      }
      close();
    }
    const getJobDetail= async (jobid)=>{
      start()
      try{
        let rs=await api.get(`/paperless/v1/getJobDetail/${jobid}`)
        close()
        return {data:rs.data.data,doc:rs.data.doc,doc2:rs.data.doc2,tag:rs.data.tag} 
      }catch(err){
        errAlert(err)
      }
      close()
    }
    return {
        authStore,
        appStore,
        route,
        router,
        month,
        year,
        type,
        headers,
        items,
        loading,
        serverItemsLength,
        serverOptions,
        getDCSInfo,
        loadFromServer,
        getSumDcs,
        getSumPcs,
        getSumRcs,
        getCdgJob,
        getJobDetail,
    }

}