<template></template>
<script setup>
  import { onMounted } from 'vue';
  import {useService} from "./service"
  const {router,authStore}=useService()
  const level=authStore.userData.sur_level;
  const user_type=Number(authStore.userData.user_type);
  onMounted(() => {
      let path='';
      
      if(Number(user_type)===1){
        switch(Number(level)){
          case 1: path='/dcs';break;
          case 2: path='/pcs';break;
          case 3: path='/rcs';break;
          case 4: path='/ccs';break;
        }
      }else{
        path='/cdg';
      }
      console.log({path})
      router.replace({path});
  })
</script>