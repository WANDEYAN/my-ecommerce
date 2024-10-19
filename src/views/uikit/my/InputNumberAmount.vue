<script setup>
import { ref } from "vue";

const inputNumberValue = ref(1);
</script>
<template>
    <div class="py-4 flex" style="align-items: center;">
        <span class="p-1">Qtd.</span>
        <InputNumber v-model="inputNumberValue" :min="1" :max="10000" style="max-width: 6.5rem;" showButtons
            mode="decimal">
        </InputNumber>
    </div>
</template>
<style>
.p-inputnumber-input {
    width: 6.5rem;
}
</style>