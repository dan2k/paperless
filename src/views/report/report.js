import {useService} from "../service"
import {api,start,close,errAlert} from '@/helpers'
import {ref} from "vue";
export const useReport=()=>{
    const{authStore,appStore}=useService()
    const regions=ref([
        {rgid:1,rg_desc:"ศูนย์บริหารการทะเบียนภาค 1"},
        {rgid:2,rg_desc:"ศูนย์บริหารการทะเบียนภาค 2"},
        {rgid:3,rg_desc:"ศูนย์บริหารการทะเบียนภาค 3"},
        {rgid:4,rg_desc:"ศูนย์บริหารการทะเบียนภาค 4"},
        {rgid:5,rg_desc:"ศูนย์บริหารการทะเบียนภาค 5"},
        {rgid:5,rg_desc:"ศูนย์บริหารการทะเบียนภาค 6"},
        {rgid:7,rg_desc:"ศูนย์บริหารการทะเบียนภาค 7"},
        {rgid:8,rg_desc:"ศูนย์บริหารการทะเบียนภาค 8"},
        {rgid:9,rg_desc:"ศูนย์บริหารการทะเบียนภาค 9"},
    ])
    const getContract=async ()=>{
        try{
            let rs=await api.get(`/paperless/report/v1/getContract`)
            return rs.data.data
        }catch(e){
            errAlert(e)
        }
    }
    const getEquip=async (contractno)=>{
        try{
            let rs = await api.get(`/paperless/report/v1/getEquip/${contractno}`)
            return rs.data
        }catch(e){
            errAlert(e)
        }
    }
    return {
        appStore,
        regions,
        getContract,
        getEquip,
    }
    
}