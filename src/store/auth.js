import { defineStore } from 'pinia'
import { api } from "@/helpers"
import router  from "@/route"
import { close, start } from '@/helpers/nprogress'
export const useAuthStore = defineStore('auth-store',  {
  state:()=>{
    return{
      currentValue:20,
      isLogin:false,
      userData:{},
    }
  },
  actions:{
    async checkLogin(){
      try{
        let res=await api.get('/auth/v1/login')
        this.isLogin=res.data.status
        this.userData=res.data.user 
      }catch(err){
        console.log(err)
      }
    },
    async logout(){
      start()
      try{
        let res=await api.post('/auth/v1/logout')
        this.$reset()
        //this.isLogin=false;
        router.replace({path:'/login'})
        
      }catch(err){
        //this.isLogin=false;
        //router.replace({path:'/login'})
        console.log(err)
      }
      close()
    },
    async setLogin(){
      try{
        let res=await api.post('/auth/v1/setLogin')
        await this.checkLogin()
        router.replace({path:'/'})
      }catch(err){
        console.log(err)
      }
    }
  }
})
