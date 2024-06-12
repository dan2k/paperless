<template>
    <h5>main</h5>
    {{ contractno }} {{ year }} {{ month }}
    
</template>
<script setup>
import { ref , defineProps} from "vue";
const props = defineProps({
      contractno: {
        type: String,
        required: true 
      },
      month: {
        type: String,
        required: true 
      },
      year: {
        type: String,
        required: true 
      },
});
</script>