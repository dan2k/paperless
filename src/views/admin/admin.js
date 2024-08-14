import { useService } from "../service";
import { api, start, close, errAlert,confAlert } from "@/helpers";
import { ref } from "vue";

export const useAdmin = () => {
  const { authStore, appStore, router, route } = useService();
  const years = ref([{ id: "2024", text: "2567" }]);
  const months = ref([
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
  ]);
  const getPlace=async (placetype,sectionid)=>{
    start()
    try{
      let url = `/paperless/admin/v1/manage-approve/${placetype.trim()}/${sectionid}`;
      console.log({url});
      let rs = await api.get(url);
      close()
      return rs.data;
    }catch(e){
      errAlert(e);
    }
    close()
  }

  return {
    appStore,
    authStore,
    router,
    route,
    getPlace,
  };
};
