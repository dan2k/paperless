import { useService } from "../service";
import { useReportStore } from "@/store";
import { api, start, close, errAlert } from "@/helpers";
import { ref } from "vue";
import * as ExcelJS from "exceljs";
export const useReport = () => {
  const { authStore, appStore, router, route,generatePDF2 } = useService();
  const reportStore = useReportStore();
  const regions = ref([
    { rgid: 1, rg_desc: "ศูนย์บริหารการทะเบียนภาค 1" },
    { rgid: 2, rg_desc: "ศูนย์บริหารการทะเบียนภาค 2" },
    { rgid: 3, rg_desc: "ศูนย์บริหารการทะเบียนภาค 3" },
    { rgid: 4, rg_desc: "ศูนย์บริหารการทะเบียนภาค 4" },
    { rgid: 5, rg_desc: "ศูนย์บริหารการทะเบียนภาค 5" },
    { rgid: 6, rg_desc: "ศูนย์บริหารการทะเบียนภาค 6" },
    { rgid: 7, rg_desc: "ศูนย์บริหารการทะเบียนภาค 7" },
    { rgid: 8, rg_desc: "ศูนย์บริหารการทะเบียนภาค 8" },
    { rgid: 9, rg_desc: "ศูนย์บริหารการทะเบียนภาค 9" },
  ]);
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
  const getContract = async () => {
    try {
      let rs = await api.get(`/paperless/report/v1/getContract`);
      return rs.data.data;
    } catch (e) {
      errAlert(e);
    }
  };
  const getEquip = async (contractno, level, pageLevel, rg, pv) => {
    try {
      let url = `/paperless/report/v1/getEquip/${contractno}/${level}/${pageLevel}/${rg}/${pv}`;
    //   console.log({ url });
      let rs = await api.get(url);
      return rs.data;
    } catch (e) {
      errAlert(e);
    }
  };
  const getDoc = async (contractno, rg) => {
    try {
      let url = `/paperless/report/v1/getDoc/${contractno}/${rg}`;
      let rs = await api.get(url);
      return rs.data.data;
    } catch (e) {
      errAlert(e);
    }
  };
  const getPm = async (contractno, custptype,custpcode,yymm) => {
    try {
      let url = `/paperless/report/v1/getPm/${contractno}/${custptype}/${custpcode}/${yymm}`;
      let rs = await api.get(url);
      return rs.data;
    } catch (e) {
      errAlert(e);
    }
  };
  const generateExcel = async (data, cats) => {
    // สร้าง workbook ใหม่
    const workbook = new ExcelJS.Workbook();
    // สร้าง worksheet ใหม่
    const worksheet = workbook.addWorksheet("Sheet1",{views:[{state: 'frozen', xSplit: 2, ySplit:1}]});
    // เพิ่มข้อมูลลงใน worksheet
    let header = cats.map((it) => it.cat_desc);
    header = ["ลำดับที่", "หน่วยงาน", ...header];
    //  console.log({'xxx',header})
    worksheet.addRow(header);
    // กำหนดความกว้างของคอลัมน์ 0 เป็น 20
    worksheet.columns[0].width = 8;
    worksheet.columns[1].width = 50;
    let border = {
      top: { style: "thin", color: { argb: "FF6b6969" } },
      left: { style: "thin", color: { argb: "FF6b6969" } },
      bottom: { style: "thin", color: { argb: "FF6b6969" } },
      right: { style: "thin", color: { argb: "FF6b6969" } },
    };
    let fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0dcaf0" },
      bgColor: { argb: "FF0000FF" },
    };
    let alignment = {
      wrapText: true,
      vertical: "middle",
      horizontal: "center",
    };
    let alignment2 = {
        wrapText: true,
        vertical: "middle",
        horizontal: "left",
      };
    // const lrow = worksheet.lastRow;
    let r = 1;
    data.forEach((it) => {
      let tmp = [];
      tmp[0] = r;
      tmp[1] = it.rg_desc;
      cats.forEach((it2, i) => {
        tmp[i + 2] = Number(it[it2.cat_id]);
      });
      worksheet.addRow(tmp);
      r++;
    });
    worksheet.eachRow(async function (row, rowNumber) {
      if (rowNumber > 1) {
        row.height = 30;
      } else {
        row.height = 60;
      }

      row.eachCell(function (cell, colNumber) {
        cell.border = border;
        cell.alignment = alignment;
        if(rowNumber==1){
            cell.fill = fill;
            cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
            
        }
        if (colNumber > 2) cell.width = 18;
        if (colNumber > 2 && rowNumber > 1) cell.numFmt = "#,##0";
        if(rowNumber>1 && colNumber==2){
            cell.alignment=alignment2;
            // cell.alignment.horizonal='left'
        }
      });
    });
    // // clear สี header ที่เทสีเกินไป 1 column
    // let c = await lrow._cells;
    // let len = c.length;
    // const currentCellReference = await c[len - 1]._address;
    // // แยกตัวอักษรคอลัมน์และเลขแถว
    // const cletter = currentCellReference.match(/[A-Z]+/)[0];
    // const rnumber = parseInt(currentCellReference.match(/\d+/)[0]);
    // // คำนวณ reference ของเซลล์ถัดไป
    // const nextCellReference =String.fromCharCode(cletter.charCodeAt(0) + 1) + "" + rnumber
    // เข้าถึงเซลล์ถัดไป
    //  worksheet.getCell(nextCellReference).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "FFFFFFFF" },
    //   bgColor: { argb: "FFFFFFFF" },
    // };

    // สร้างไฟล์ excel
    const buffer = await workbook.xlsx.writeBuffer();

    // ดาวน์โหลดไฟล์ excel
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    appStore,
    authStore,
    regions,
    reportStore,
    router,
    route,
    months,
    years,
    generateExcel,
    getContract,
    getEquip,
    getDoc,
    getPm,
    generatePDF2,
  };
};
