import {useService} from "../views/service"
export const useReport(){
    const{authStore,appStore}=useService()
    return {
        appStore,
    }
}