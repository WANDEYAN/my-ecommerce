<script setup>
import Button from 'primevue/button';
import { defineProps } from 'vue';
import IconsPayments from './IconsPayments.vue';


const props = defineProps({
    resumeOrder: {
        type: Object,
        required: true,
        default: () => ({
            client: '',
            address: '',
            paymentMethod: '',
            shipping: 0,
            productsCount: 0
        })
    },
    subtotal: {
        type: Number,
        required: true,
        default: 0
    }
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

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
                <div v-if="props.resumeOrder.client" class="font-semibold mb-1">Enviar para:</div>
                <div v-if="props.resumeOrder.client" class="text-700">{{ props.resumeOrder.client }}</div>
                <div v-if="props.resumeOrder.address" class="text-700">{{ props.resumeOrder.address }}</div>
            </div>
            <div>
                <div v-if="props.resumeOrder.paymentMethod" class="font-semibold mb-1">Método de Pagamento:</div>
                <div class="text-700 flex items-center gap-2">
                    <!-- Ícone para o método de pagamento, melhora o visual -->
                    <IconsPayments :paymentMethod="props.resumeOrder.paymentMethod" />
                    <span v-if="props.resumeOrder.paymentMethod">{{ props.resumeOrder.paymentMethod }}</span>
                </div>
            </div>
        </div>

        <!-- Divisor sutil -->
        <div class="surface-border border-top-1"></div>

        <!-- Seção de Resumo Financeiro -->
        <div class="py-3">
            <!-- Subtotal -->
            <div class="flex justify-content-between mb-2 whitespace-nowrap">
                <span>Subtotal</span>
                <span v-if="props.resumeOrder.productsCount > 0" class="text-700"> ({{
                    props.resumeOrder.productsCount }} produtos)</span>
                <span v-if="props.resumeOrder.productsCount > 0" class="text-900 font-medium">{{
                    formatCurrency(props.subtotal) }}</span>
            </div>
            <!-- Frete -->
            <div class="flex justify-content-between mb-3">
                <span v-if="props.resumeOrder.productsCount > 0" class="text-700">Frete</span>
                <span v-if="props.resumeOrder.productsCount > 0" class="text-900 font-medium">{{
                    formatCurrency(props.resumeOrder.shipping) }}</span>
            </div>

            <!-- Linha do Total -->
            <div class="surface-border border-top-1 pt-3">
                <div class="flex justify-content-between">
                    <span class="font-bold text-lg">Total</span>
                    <!-- O valor total é a informação mais importante -->
                    <span class="font-bold text-lg text-primary">{{ formatCurrency(props.subtotal +
                        props.resumeOrder.shipping) }}</span>
                </div>
            </div>
        </div>

        <!-- Botão de Ação Principal -->
        <Button label="Finalizar Compra" class="w-full mt-3 p-button-lg" icon="pi pi-check"></Button>
    </div>
</template>