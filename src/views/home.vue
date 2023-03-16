<template></template>
<script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store';
  const store=useAuthStore();
  const router=useRouter();
  const level=store.userData.sur_level;
  const user_type=store.userData.user_type;
  onMounted(() => {
      let path='';
      
      if(user_type===1){
        // console.log(level)
        switch(level){
          case 1: path='/dcs';break;
          case 2: path='/pcs';break;
          case 3: path='/rcs';break;
          case 4: path='/ccs';break;
        }
      }else{
        path='/cdg';
      }
      router.replace({path});
  })
</script>