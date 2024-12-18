<template>
  <div class="wrapper">
    
    <!-- <nav id="sidebar" :class="{ activex: appStore.toggle }" :style="{display:authStore.isLogin?'':'none'}">
      <div class="sidebar-header">
        <h3>MPSICC</h3>
      </div>

      <ul class="list-unstyled components">
       
        <li>
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
            data-bs-toggle="collapse"
            role="button"
            aria-controls="homeSubmenu"
            >Home</a
          >
          <ul class="collapse list-unstyled" id="homeSubmenu">
            <li>
              <a href="#">Home 1</a>
            </li>
            <li>
              <a href="#">Home 2</a>
            </li>
            <li>
              <a href="#">Home 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">About</a>
          <a
            href="#pageSubmenu"
            aria-expanded="false"
            class="dropdown-toggle"
            data-bs-toggle="collapse"
            data-toggle="collapse"
            role="button"
            aria-controls="pageSubmenu"
            >Pages</a
          >
          <ul class="collapse list-unstyled" id="pageSubmenu">
            <li>
              <a href="#">Page 1</a>
            </li>
            <li>
              <a href="#">Page 2</a>
            </li>
            <li>
              <a href="#">Page 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Portfolio</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav> -->

    <!-- Page Content Holder -->
    <div id="content">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary bg-opacity-50 mb-1" v-if="$route.name!='verify'">
        <div class="container-fluid">
          <!-- <button
            v-if="authStore.isLogin"          
            type="button"
            id="sidebarCollapse"
            class="btn btn-info"
            @click="appStore.toggle = !appStore.toggle"
            :class="{ activex: appStore.toggle }"
          >
            <span></span>
            <span></span>
            <span></span>
          </button> -->
          
          <button
            
            class="btn btn-dark d-inline-block d-lg-none ml-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-align-justify"></i>
          </button>
          
          
          <div
            class="collapse navbar-collapse  justify-content-end "
            style="width:10%"
            id="navbarSupportedContent"
          >
            <div class="col text-center text-light pt-3">
              <h3>{{ appStore.title }}</h3>
              <h6 v-if="authStore.isLogin"><i class="fa-solid fa-user"></i> คุณ {{ authStore.userData.ses_empfname }} {{ authStore.userData.ses_emplname }}</h6>
            </div>
            <ul class="navbar-nav ml-auto">
              <!-- <li class="nav-item">
                <a class="nav-link active" href="#">Page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Page</a>
              </li> -->
              <!-- <li class="nav-item" v-if="authStore.isLogin">
                <a class="nav-link" href="javascript:void(0)" @click="$router.replace({path:`/ddopa`})"
                  >D.DOPA</a>
              </li> -->
              <!-- <li class="nav-item" v-if="authStore.isLogin">
                <a class="nav-link" href="javascript:void(0)" @click="$router.replace({path:`/pdf`})"
                  >PDF</a>
              </li> -->
              <li class="nav-item" v-if="mode!=='development'">
                <a class="nav-link" href="#" @click="home()"
                  >ICC</a>
              </li>
              <li class="nav-item" v-if="authStore.isLogin">
                  <span style="cursor:pointer" @click="$router.push({path:'/'})" class="nav-link"><i class="fa-solid fa-house"></i></span>
              </li>
              <li class="nav-item" v-if="authStore.isLogin && authStore.userData.user_type==2">
                  <span style="cursor:pointer" @click="gotoAdmin()" class="nav-link">Admin</span>
              </li>
              <li class="nav-item" v-if="authStore.isLogin && authStore.userData.user_type==1">
                  <span style="cursor:pointer" @click="$router.push({path:'/report'})" class="nav-link">Report</span>
              </li>
              <li class="nav-item" v-if="authStore.isLogin">
                <a class="nav-link" href="#" @click="logout"
                  ><i class="fa-solid fa-right-from-bracket"></i
                ></a>
              </li>
            </ul>
          </div>
          
        </div>
        
      </nav>
      <main class="p-2">
        <RouterView></RouterView>
      </main>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import {useService} from "./views/service"
const{router,authStore,appStore}=useService()
// const toggle = ref(false);
const mode=import.meta.env.MODE;
onMounted(()=>{
  appStore.setTitle="หน้าหลัก"
  appStore.toggle=!authStore.isLogin;
  console.log(authStore.userData);
})
const home = ()=>{
  window.location.href='/mpsicc/cdg';
}
const gotoAdmin=()=>{
  router.push({path:'/admin'});
}
const logout = () => {
  if(import.meta.env.MODE=="development"){
    authStore.logout();
    appStore.toggle=true;
  }else{
    authStore.$reset();
    appStore.$reset();
    window.location.href="/mpsicc/cdg/logout.php"
  }
};
</script>
<style >
/*
    DEMO STYLE
*/
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

/* body {
  font-family: sans-serif,"Poppins" ;
  background: #fafafa;
} */

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
  perspective: 1500px;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #7386d5;
  color: #fff;
  transition: all 0.6s cubic-bezier(0.945, 0.02, 0.27, 0.665);
  transform-origin: bottom left;
}

#sidebar.activex {
  margin-left: -250px;
  transform: rotateY(100deg);
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
#sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
}

#sidebar ul li.activex > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */
#content {
  width: 100%;
  padding: 0px;
  min-height: 100vh;
  transition: all 0.3s;
}

#sidebarCollapse {
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  cursor: pointer;
}

#sidebarCollapse span {
  width: 80%;
  height: 2px;
  margin: 0 auto;
  display: block;
  background: #555;
  transition: all 0.8s cubic-bezier(0.81, -0.33, 0.345, 1.375);
  transition-delay: 0.2s;
}

#sidebarCollapse span:first-of-type {
  transform: rotate(45deg) translate(2px, 2px);
}
#sidebarCollapse span:nth-of-type(2) {
  opacity: 0;
}
#sidebarCollapse span:last-of-type {
  transform: rotate(-45deg) translate(1px, -1px);
}

#sidebarCollapse.activex span {
  transform: none;
  opacity: 1;
  margin: 5px auto;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */
@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
    transform: rotateY(90deg);
  }
  #sidebar.activex {
    margin-left: 0;
    transform: none;
  }
  #sidebarCollapse span:first-of-type,
  #sidebarCollapse span:nth-of-type(2),
  #sidebarCollapse span:last-of-type {
    transform: none;
    opacity: 1;
    margin: 5px auto;
  }
  #sidebarCollapse.activex span {
    margin: 0 auto;
  }
  #sidebarCollapse.activex span:first-of-type {
    transform: rotate(45deg) translate(2px, 2px);
  }
  #sidebarCollapse.activex span:nth-of-type(2) {
    opacity: 0;
  }
  #sidebarCollapse.activex span:last-of-type {
    transform: rotate(-45deg) translate(1px, -1px);
  }
}
</style>
