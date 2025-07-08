<script setup>
import Button from 'primevue/button';
import { computed } from 'vue';


const props = defineProps({
    resumeOrder: {
        type: Object,
        required: true,
        default: () => ({
            client: '',
            address: '',
            paymentMethod: '',
            subtotal: 0,
            shipping: 0,
            productsCout: 0
        })
    }
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const total = computed(() => {
    return resumeOrder.subtotal + resumeOrder.shipping;
})
</script>
<template>
    <div class="card">
        <!-- Título do Card -->
        <div class="font-bold text-xl mb-4">Resumo do Pedido</div>

        <!-- Divisor sutil -->
        <div class="surface-border border-top-1"></div>

        <!-- Seção de Informações Gerais -->
        <div class="py-3">
            <div class="mb-3">
                <div class="font-semibold mb-1">Enviar para:</div>
                <div class="text-700">{{ resumeOrder.client }}</div>
                <div class="text-700">{{ resumeOrder.address }}</div>
            </div>
            <div>
                <div class="font-semibold mb-1">Método de Pagamento:</div>
                <div class="text-700 flex align-items-center">
                    <!-- Ícone para o método de pagamento, melhora o visual -->
                    <i class="pi pi-qrcode mr-2"></i>
                    <span>{{ resumeOrder.paymentMethod }}</span>
                </div>
            </div>
        </div>

        <!-- Divisor sutil -->
        <div class="surface-border border-top-1"></div>

        <!-- Seção de Resumo Financeiro -->
        <div class="py-3">
            <!-- Subtotal -->
            <div class="flex justify-content-between mb-2">
                <span class="text-700">Subtotal ({{ resumeOrder.productsCout }} produtos)</span>
                <span class="text-900 font-medium">{{ formatCurrency(resumeOrder.subtotal) }}</span>
            </div>
            <!-- Frete -->
            <div class="flex justify-content-between mb-3">
                <span class="text-700">Frete</span>
                <span class="text-900 font-medium">{{ formatCurrency(resumeOrder.shipping) }}</span>
            </div>

            <!-- Linha do Total -->
            <div class="surface-border border-top-1 pt-3">
                <div class="flex justify-content-between">
                    <span class="font-bold text-lg">Total</span>
                    <!-- O valor total é a informação mais importante -->
                    <span class="font-bold text-lg text-primary">{{ formatCurrency(total) }}</span>
                </div>
            </div>
        </div>

        <!-- Botão de Ação Principal -->
        <Button label="Finalizar Compra" class="w-full mt-3 p-button-lg" icon="pi pi-check"></Button>
    </div>
</template>