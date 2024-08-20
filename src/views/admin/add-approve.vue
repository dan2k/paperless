<template>
    <div>
        <div class="card">
            <div class="card-header text-primary">
                <i class="fa-solid fa-user-plus"></i>&nbsp; เพิ่มรายการผู้อนุมัติ
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="mb-3 col-12 col-md-3">
                        <label for="level" class="form-label">หน้าที่:</label>
                        <select id="level" class="form-select form-select-sm" v-model="level" >
                            <option value="">-- เลือกหน้าที่ --</option>
                            <option value="1">ประธาน</option>
                            <option value="2">กรรมการคนที่ 1</option>
                            <option value="3">กรรมการคนที่ 2</option>
                            
                        </select>
                    </div>
                    <div class="mb-3 col-12 col-md-6">
                        <label for="user" class="form-label">เจ้าหน้าที่:</label>
                        <select id="user" class="form-select form-select-sm" v-model="user" >
                            <option value="">-- เลือกเจ้าหน้าที่ --</option>
                            <option v-for="(u, i) in users.data" :value="u" :key="i">
                                {{ u.title_name }} {{ u.user_fname }} {{ u.user_lname }} [{{ u.user_id }}]
                            </option>
                        </select>
                    </div>
                    <div class="mb-3 col-12 col-md-3">
                        <label for="position" class="form-label">ตำแหน่ง:</label>
                        <select id="position" class="form-select form-select-sm" v-model="position" >
                            <option value="">-- เลือกตำแหน่ง --</option>
                            <option v-for="(p, i) in positions.data" :value="p" :key="i">
                                {{p.position_desc}}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3 col-12 col-md-4">
                        <label for="position" class="form-label">ช่วงเวลาการทำงาน:</label>
                        <vue-date-picker
                            :enable-time-picker="false"
                            locale="th-TH"
                            v-model="date"
                            format="dd-MM-yyyy"
                            range 
                            :clearable="true"
                            teleport-center
                        >
                            <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
                            <input 
                                type="text" 
                                class="form-control form-control-sm" 
                                :value="value" 
                                readonly="true"
                                />
                            </template>
                            <template #input-icon>
                                <span class="dpicon" ><i class="far fa-calendar-alt"></i></span>
                            </template>
                            <template #clear-icon="{ clear }">
                                <span class="trash" @click="clear" ><i class="fas fa-eraser"></i></span>
                            </template>
                        </vue-date-picker>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary btn-sm mx-2" @click="save()">บันทึก</button>
                        <button class="btn btn-warning btn-sm" @click="back()">ย้อนกลับ</button>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>
<style scoped>
    .trash{
		margin-right: 25px;
	}
	.dpicon{
		height: 20px;
        width: auto;
        margin-left: 5px;
	}
	input {
		text-indent: 15px !important;
	}
</style>
<script setup>
    import {ref,onMounted} from "vue"
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { useAdmin } from "./admin";
    const {route,router,getUser,getPosition,addOfficer,errAlert} = useAdmin();
    const date = ref();
    const users=ref([]);
    const user=ref("");
    const level=ref("");
    const positions=ref([])
    const position=ref("")
    const format=(date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	}
    onMounted(async ()=>{
        date.value=[new Date(),new Date()];
        users.value=await getUser(route.params.custptype,route.params.custpcode)
        positions.value= await getPosition()
    })
    const save=async ()=>{
        if(!level.value){
            await errAlert("กรุณาระบุหน้าที่")
            return ;
        }
        if(!user.value){
            await errAlert("กรุณาระบุเจ้าหน้าที่")
            return ;
        }
        if(!position.value){
            await errAlert("กรุณาระบุตำแหน่ง")
            return ;
        }
        if(!date.value || !date.value[0] || !date.value[1]){
            await errAlert("กรุณาระบุช่วงเวลาการทำงานให้ครบถ้วน")
            return ;
        }
        addOfficer(user.value,level.value,position.value,route.params.custptype,route.params.custpcode,format(date.value[0]),format(date.value[1]))

    }
    const back=()=>{
        router.push({name:'manage-approve',query:{custptype:route.params.custptype,custpcode:route.params.custpcode}})
    }
</script>