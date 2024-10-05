<script setup>
import Button from 'primevue/button';

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>
<template>
    <div class="card">
        <div class="py-1 px-1">
            <div> 3 Produtos</div>
            <div>
                <span>Subtotal:</span>
                {{ formatCurrency(216) }}
            </div>
            <Button label="Finalzar Compra" class="mt-5" icon="pi pi-check"
                style="max-width: 350px; width: 100%;"></Button>
        </div>
    </div>
</template>