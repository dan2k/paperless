import {useService} from "../service"
import { useReportStore } from "@/store";
import {api,start,close,errAlert} from '@/helpers'
import {ref} from "vue";
export const useReport=()=>{
    const {authStore,appStore,router,route}=useService()
    const reportStore=useReportStore()
    const regions=ref([
        {rgid:1,rg_desc:"ศูนย์บริหารการทะเบียนภาค 1"},
        {rgid:2,rg_desc:"ศูนย์บริหารการทะเบียนภาค 2"},
        {rgid:3,rg_desc:"ศูนย์บริหารการทะเบียนภาค 3"},
        {rgid:4,rg_desc:"ศูนย์บริหารการทะเบียนภาค 4"},
        {rgid:5,rg_desc:"ศูนย์บริหารการทะเบียนภาค 5"},
        {rgid:6,rg_desc:"ศูนย์บริหารการทะเบียนภาค 6"},
        {rgid:7,rg_desc:"ศูนย์บริหารการทะเบียนภาค 7"},
        {rgid:8,rg_desc:"ศูนย์บริหารการทะเบียนภาค 8"},
        {rgid:9,rg_desc:"ศูนย์บริหารการทะเบียนภาค 9"},
    ])
    const years=ref([
        {id:'2024',text:'2567'}
    ]);
    const months=ref([
        {id:'01',text:'มกราคม'},
        {id:'02',text:'กุมภาพันธ์'},
        {id:'03',text:'มีนาคม'},
        {id:'04',text:'เมษายน'},
        {id:'05',text:'พฤษภาคม'},
        {id:'06',text:'มิถุนายน'},
        {id:'07',text:'กรกฏาคม'},
        {id:'08',text:'สิงหาคม'},
        {id:'09',text:'กันยายน'},
        {id:'10',text:'ตุลาคม'},
        {id:'11',text:'พฤศจิกายน'},
        {id:'12',text:'ธันวาคม'},
    ])
    const getContract=async ()=>{
        try{
            let rs=await api.get(`/paperless/report/v1/getContract`)
            return rs.data.data
        }catch(e){
            errAlert(e)
        }
    }
    const getEquip=async (contractno,level,pageLevel,rg,pv)=>{
        try{
            let url=`/paperless/report/v1/getEquip/${contractno}/${level}/${pageLevel}/${rg}/${pv}`
            console.log({url})
            let rs = await api.get(url)
            return rs.data
        }catch(e){
            errAlert(e)
        }
    }
    const getDoc=async (contractno,rg)=>{
        try{
            let url=`/paperless/report/v1/getDoc/${contractno}/${rg}`
            let rs = await api.get(url)
            return rs.data.data
        }catch(e){
            errAlert(e)
        }
    }
    const uuid=ref(0)
    return {
        appStore,
        authStore,
        regions,
        reportStore,
        router,
        route,
        months,
        years,
        getContract,
        getEquip,
        getDoc,
    }
    
}