import {useService} from "../service"
export const useReport=()=>{
    const{authStore,appStore}=useService()
    return {
        appStore,
    }
}