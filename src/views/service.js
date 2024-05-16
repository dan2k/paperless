import { useAppStore, useAuthStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { api, errAlert, okAlert, start, close } from "@/helpers";
import { ref } from "vue";
import {
  saraban_normal,
  saraban_bold,
  saraban_bolditalic,
  saraban_italic,
} from "./sarabunnew.js";
import { jsPDF } from "jsPDF";

export const useService = () => {
  const authStore = useAuthStore();
  const appStore = useAppStore();
  const route = useRoute();
  const router = useRouter();
  let date = new Date();
  let d = date.toJSON();
  d = d.split("T");
  d = d[0];
  d = d.split("-");
  const month = ref(route.query.month ?? d[1]);
  const year = ref(route.query.year ?? d[0]);
  const type = ref(route.query.type ?? 0);
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
  

  const getDCSInfo = async (custptype, custpcode) => {
    try {
      let rs = await api.get(
        `/paperless/v1/getDCSInfo/${custptype}/${custpcode}`
      );
      return rs.data.data;
    } catch (err) {
      errAlert(err);
    }
  };
  const loadFromServer = async (custptype, custpcode) => {
    // console.log(custptype, custpcode);
    start();
    loading.value = true;
    try {
      let rs = await api.get(
        `/paperless/v1/getJob/${custptype}/${custpcode}/${type.value}/${year.value}/${month.value}/${serverOptions.value.page}/${serverOptions.value.rowsPerPage}/${serverOptions.value.sortBy}/${serverOptions.value.sortType}`
      );
      items.value = rs.data.data;
      serverItemsLength.value = rs.data.totals;
      if (serverItemsLength.value == 0) {
        await okAlert("ไม่พบข้อมูล");
        close();
        return;
      }
      
    } catch (err) {
      errAlert(err);
    }
    loading.value = false;
    close();
  };
  const getSumDcs = async (cc, groupid, type, year, month) => {
    start();
    try {
      let rs = await api.get(
        `/paperless/v1/getSumDcs/${cc}/${groupid}/${type}/${year}/${month}`
      );
      close();
      return rs.data.data;
    } catch (err) {
      errAlert(err);
    }
    close();
  };
  const getSumPcs = async (rg, groupid, type, year, month) => {
    start();
    try {
      let rs = await api.get(
        `/paperless/v1/getSumPcs/${rg}/${groupid}/${type}/${year}/${month}`
      );
      close();
      return rs.data.data;
    } catch (err) {
      errAlert(err);
    }
    close();
  };
  const getSumRcs = async (groupid, type, year, month) => {
    start();
    try {
      let rs = await api.get(
        `/paperless/v1/getSumRcs/${groupid}/${type}/${year}/${month}`
      );
      close();
      return rs.data.data;
    } catch (err) {
      errAlert(err);
    }
    close();
  };
  const getSum=async (groupid,year,month,level,rg,pv,custptype,custpcode)=>{
    start()
    try{
      let rs =await api.get(`/paperless/v1/getSum/${groupid}/${year}/${month}/${level}/${rg}/${pv}/${custptype}/${custpcode}`)
      close()
      return {svs:rs.data?.data['service_count'],pms:rs.data?.data['pm_count'],rpms:rs.data?.data['real_pm_count']}
    }catch(err){
      errAlert(err)
    }
    close()
  }
  //ใช้ในไฟล์ cdg.vue
  const getCdgJob = async (type, newplacecode) => {
    start();
    try {
      let rs = await api.get(`/paperless/v1/getCdgJob/${type}/${newplacecode}`);
      close();
      // return {data:rs.data.data,cc,cc:rs.data.cc,aa:rs.data.aa}
      return rs.data.data;
    } catch (err) {
      errAlert(err);
    }
    close();
  };

  // ใช้ในไฟล์ sv_detail,svpc_detail,pdf
  const detail = ref([]);
  const tags = ref([]);
  const docs = ref([]);
  const doc2s = ref([]);
  const getJobDetail = async (jobid) => {
    start();
    try {
      let rs = await api.get(`/paperless/v1/getJobDetail/${jobid}`);
      close();
      return {
        data: rs.data.data,
        doc: rs.data.doc,
        doc2: rs.data.doc2,
        tag: rs.data.tag,
      };
    } catch (err) {
      errAlert(err);
    }
    close();
  };
  const open = async (jobid) => {
    window.open(`${import.meta.env.VITE_PRIVATE_BASE_URL}pdf/${jobid}`);
  };
  const gotoImauth = (jobid, s, uri) => {
    let empid = authStore.userData.ses_empid;
    let state = btoa(`approve|${jobid}|${s}|${uri}|${empid}`);
    window.location.href =
      "https://imauth.bora.dopa.go.th/api/v1/oauth2/auth/?response_type=code&client_id=TGFNQU56RDNMcDRrWDRlNHhEUHNLNVNLOE8waU5wZ1Y=&redirect_uri=https://www.controldata.co.th/mpsicc/ddopa&scope=pid%20th_fullname%20dob&state=" +
      state;
  };
  const approve = async () => {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          5: "พอใจมาก",
          4: "พอใจ",
          3: "ปานกลาง",
          2: "ไม่พอใจ",
          1: "ไม่พอใจมาก",
        });
      }, 10);
    });
    const { value: satisfaction } = await Swal.fire({
      title: "กรุณาเลือกระดับความพึงพอใจ",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "ท่านยังไม่ได้เลือกระดับความพึงพอใจ";
        }
      },
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
      backdrop:true,
      allowOutsideClick: false,
    });
    if (satisfaction) {
      // alert(satisfaction);
      let uri = window.location.href;
      gotoImauth(route.params.jobid, satisfaction, uri);
    }
  };
  const approve2 = async () => {
    let jobid=route.params.jobid
    // console.log(jobid);
    router.push({
      path: `/qrcode/${jobid}`,
      query: {
        type: route.query.type,
        ptype: route.query.ptype,
        pv: route.query.pv,
        pcode: route.query.pcode,
      },
    });
  };
  const gotoCdg = () => {
    router.push({
      path: `/cdg`,
      query: {
        type: route.query.type,
        ptype: route.query.ptype,
        pv: route.query.pv,
        pcode: route.query.pcode,
      },
    });
  };
  const initDetail = async () => {
    appStore.title = "รายละเอียด";
    if (route.query.error) {
      if (route.query.error == "false") {
        //อนุมัติผ่าน
        // await okAlert(`คุณ ${route.query.th_fullname} <br/>อนุมัติรายการเรียบร้อยแล้ว`);
        let rs= await api.get(`/paperless/v1/getApproveName/${route.params.jobid}`);
        await Swal({
          html: `คุณ ${rs.data.data[0]?.th_fullname} <br/> อนุมัติรายการเรียบร้อยแล้ว`,
          icon: 'success',
          confirmButtonText: 'ตกลง'
        })
      } else {
        await errAlert(
          `ไม่สามารถอนุมัติรายการได้กรุณาลองใหม่อีกครั้ง ${route.query.msg}`
        );
      }
      router.push({
        path: `/cdg`,
        query: {
          type: route.query.type,
          ptype: route.query.ptype,
          pv: route.query.pv,
          pcode: route.query.pcode,
        },
      });
      return;
    }
    let { data, doc, doc2, tag } = await getJobDetail(route.params.jobid);
    detail.value = data[0];
    tags.value = tag;
    docs.value = doc;
    doc2s.value = doc2;
  };
  const initDetail2 = async () => {
    appStore.title = "รายละเอียด";
    let { data, doc, doc2, tag } = await getJobDetail(route.params.jobid);
    detail.value = data[0];
    tags.value = tag;
    docs.value = doc;
    doc2s.value = doc2;
  };
  const init=async ()=>{// use for pdf.vue
    let { data, doc, doc2, tag } = await getJobDetail(route.params.jobid);
    detail.value = data[0];
    tags.value = tag;
    docs.value = doc;
    doc2s.value = doc2;
    // let rs= await api.get(`/paperless/v1/getVerify/${route.params.jobid}`);
    // if(!rs.data.status){
    //   errAlert("ไม่สามารถ Verify ข้อมูลได้")
    //   return
    // }
  }
  const initPdf = async () => {//use for pdf.vue
    await init()
    generatePDF();
  };
  const isShow = ref(false);

  const generatePDF = async () => {
    isShow.value = true;
    const doc = await new jsPDF({
      orientation: "p",
      format: "a4",
      unit: "px",
      lineHeight: 2,
      putOnlyUsedFonts: true,
    }); // create jsPDF object
    doc.addFileToVFS("sarabun-normal.ttf", saraban_normal);
    doc.addFont("sarabun-normal.ttf", "sarabun", "normal");
    doc.addFileToVFS("sarabun-bold.ttf", saraban_bold);
    doc.addFont("sarabun-bold.ttf", "sarabun", "bold");
    doc.addFileToVFS("sarabun-bolditalic.ttf", saraban_bolditalic);
    doc.addFont("sarabun-bolditalic.ttf", "sarabun", "bolditalic");
    doc.addFileToVFS("sarabun-italic.ttf", saraban_italic);
    doc.addFont("sarabun-italic.ttf", "sarabun", "italic");
    const pdfElement = document.getElementById("pdf"); // HTML element to be converted to PDF
    await doc.html(pdfElement, {
      callback: (pdf) => {
        // pdf.addFileToVFS('sarabun-normal.ttf', saraban_normal)
        // pdf.addFont('sarabun-normal.ttf', 'sarabun', 'normal');
        // pdf.setFont('sarabun', 'normal');
        // console.log(pdf.getFileFromVFS('sarabun-normal.ttf'));
        // console.log(pdf.getFontList());
        // pdf.save('test.pdf')
        // pdf.addImage(img.value?.imageUrl, 'PNG', 320, 453,30,30);
        pdf.output("dataurlnewwindow");
        // const myPdfData = pdf.output('datauristring/dataurlstring')
        window.close();
        isShow.value = false;
      },
      filename: "test.pdf",
      margin: 0, // optional: page margin
      // optional: other HTMLOptions
    });
  };
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
    detail,
    docs,
    doc2s,
    tags,
    isShow,
    getDCSInfo,
    loadFromServer,
    getSumDcs,
    getSumPcs,
    getSumRcs,
    getSum,
    getCdgJob,
    getJobDetail,
    open,
    approve,
    approve2,
    gotoCdg,
    initDetail,
    initDetail2,
    initPdf,
  };
};
