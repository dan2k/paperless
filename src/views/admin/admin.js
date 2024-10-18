import { useService } from "../service";
import { api, start, close, errAlert,confAlert,okAlert } from "@/helpers";
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
      let url = `/paperless/admin/v1/place/${placetype.trim()}/${sectionid}`;
      console.log({url});
      let rs = await api.get(url);
      close()
      return rs.data;
    }catch(e){
      errAlert(e);
    }
    close()
  }
  const getOffice=async (custptype,custpcode)=>{
    if(!custptype || !custpcode) return;
    start()
    try{
      let url = `/paperless/admin/v1/office/${custptype}/${custpcode}`;
      let rs = await api.get(url);
      close()
      return rs.data;
    }catch(e){
      errAlert(e);
    }
    close()
  }
  const getOfficer=async (officerid)=>{
    start()
    try{
      let url = `/paperless/admin/v1/office/${officerid}`;
      let rs = await api.get(url);
      close()
      return rs.data;
    }catch(e){
      errAlert(e);
    }
    close()
  }
  const getUser=async (custptype,custpcode)=>{
    if(!custptype || !custpcode) return;
    start()
    try{
      let url = `/paperless/admin/v1/user/${custptype}/${custpcode}`;
      let rs = await api.get(url);
      close()
      return rs.data;
    }catch(e){
      errAlert(e);
    }
    close()
  }
  const getPosition=async ()=>{
    start()
    try{
      let url = `/paperless/admin/v1/position`;
      let rs = await api.get(url);
      close()
      return rs.data;
    }catch(e){
      errAlert(e);
    }
    close()
  }
  const addOfficer=async (user,level,position,custptype,custpcode,dstart,dend)=>{
    start()
    try{
      let url = `/paperless/admin/v1/office`;
      let data={
        pid:user.user_id,
        sex:user.sex,
        title:user.title_name,
        fname:user.user_fname,
        lname:user.user_lname,
        level,
        position:position.position_id,
        dstart,
        dend,
        custptype,
        custpcode,
        empid:authStore.userData.ses_empid,
      }
       let rs = await api.post(url,data);
      close()
      if(rs.data.status){
        await okAlert("บันทึกข้อมูลเรียบร้อยแล้ว",()=>{
          router.push({name:'manage-approve',query:{custptype,custpcode}})
        })
      } 
    }catch(e){
      console.log(e)
      if(e.response.status==404){
        errAlert(e.response.data.msg);
        return 'no';  
      }
      errAlert(e);
      return 'no';
    }
    close()
  }
  const editOfficer=async (officerid,user,level,position,custptype,custpcode,dstart,dend)=>{
    start()
    try{
      let url = `/paperless/admin/v1/office/${officerid}`;
      let data={
        pid:user.user_id,
        sex:user.sex,
        title:user.title_name,
        fname:user.user_fname,
        lname:user.user_lname,
        level,
        position:position.position_id,
        dstart,
        dend,
        custptype,
        custpcode,
        empid:authStore.userData.ses_empid,
      }
       let rs = await api.put(url,data);
      close()
      if(rs.data.status){
        await okAlert("ปรับปรุงข้อมูลเรียบร้อยแล้ว",()=>{
          router.push({name:'manage-approve',query:{custptype,custpcode}})
        })
      } 
    }catch(e){
      console.log(e)
      if(e.response.status==404){
        errAlert(e.response.data.msg);
        return;  
      }
      errAlert(e);
    }
    close()
  }
  const deleteOfficer=async (officerid,custptype,custpcode)=>{
    let {isConfirmed}=await confAlert("คุณต้องการลบรายการนี้หรือไม่")
    if(!isConfirmed) return 'no';
    start()
    try{
      let url = `/paperless/admin/v1/office/${officerid}`;
       let rs = await api.delete(url);
      close()
      if(rs.data.status){
        await okAlert("ลบข้อมูลเรียบร้อยแล้ว",()=>{
          //
        })
        return await getOffice(custptype,custpcode)
      } 
    }catch(e){
      console.log(e)
      if(e.response.status==404){
        errAlert(e.response.data.msg);
        return;  
      }
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
    getOffice,
    getUser,
    getPosition,
    addOfficer,
    errAlert,
    deleteOfficer,
    getOfficer,
    editOfficer
  };
};
