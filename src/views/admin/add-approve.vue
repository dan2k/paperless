<template>
    <div>
        <vue-date-picker
            :enable-time-picker="false"
			locale="th-TH"
            v-model="date"
            format="dd-MM-yyyy"
            range 
            :clearable="true"
            
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
        {{route.params.custptype}}
        {{route.params.custpcode}}
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
    const {route} = useAdmin();
    const date = ref();
    const format=(date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		var seconds = date.getSeconds();
		var minutes = date.getMinutes();
		var hour = date.getHours();
		return `${day}/${month}/${year}`;
	}
    onMounted(()=>{
        date.value=[new Date(),new Date()];
    })
</script>