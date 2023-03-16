<template>
  <h1 class="text-center">Demo Authen by D.DOPA</h1>
  <div class="row justify-content-center">
    <div class="col-8 alert alert-success" v-if="$route.query.pid && $route.query.error==='false'">
			<h1>คุณ:&nbsp; {{ $route.query.th_fullname }}</h1>
			<h2>รหัสประจำตัว: &nbsp;{{ $route.query.pid }}</h2>
			<h2>เดือนปีเกิด: &nbsp;{{ $route.query.dob }}</h2>
			<h2>ยืนยันรายการเรียบร้อยแล้ว</h2>
			<button  @click="$router.replace('/ddopa')" class="btn btn-primary">ทดสอบอีกครั้ง</button>
	</div>
    <div class="alert alert-danger d-grid gap-2 col-6 mx-auto" v-if="$route.query.error==='true'">
      <h2>เกิดขอผิดพลาด</h2>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto" v-if="!$route.query.pid">
      <div class="text-center"  id="send">Login By&nbsp;<img @click="gotoImauth()"   src="/dopa.png" style="cursor:pointer;width:10%;height:auto"/></div>
    </div>
  </div>
</template>
<script setup>
    // import {useService } from "./service"
    // const {router} =useService();
    const gotoImauth=()=>{
        let state=btoa('approve|RG06660001')
        window.location.href="https://imauth.bora.dopa.go.th/api/v1/oauth2/auth/?response_type=code&client_id=TGFNQU56RDNMcDRrWDRlNHhEUHNLNVNLOE8waU5wZ1Y=&redirect_uri=https://www.controldata.co.th/mpsicc/ddopa&scope=pid%20th_fullname%20dob&state="+state; 
    }
</script>

