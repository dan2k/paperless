import { defineStore } from 'pinia'
export const useAppStore = defineStore('app-store',  {
  state:()=>{
    return{
      title:'',
      toggle:false,
    }
  },
  actions:{
    setTitle(t){
      this.title=t;
    },
  }
})
