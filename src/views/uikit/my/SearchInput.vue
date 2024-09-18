<script setup>
import { ref } from 'vue';

const value1 = ref(null);
</script>

<template>
    <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="value1" placeholder="Search product" />
    </IconField>
</template>