<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(["update:modelValue"]);

const inputNumberValue = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
});

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