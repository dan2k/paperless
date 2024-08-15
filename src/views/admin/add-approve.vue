<template>
    <div>
        {{route.params.custptype}}
        {{route.params.custpcode}}
    </div>
</template>
<script setup>
    import { useAdmin } from "./admin";
    const {route} = useAdmin();

</script>