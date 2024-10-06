<script setup>
import { CartService } from '@/service/CartService';
import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import Step from 'primevue/step';
import StepList from 'primevue/steplist';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import Stepper from 'primevue/stepper';
import { onMounted, ref } from 'vue';
import BuyBox from './BuyBox.vue';
import IconsPayments from './IconsPayments.vue';
import InputNumberAmount from './InputNumberAmount.vue';
import TitleProduct from './TitleProduct.vue';

const shoppingCartItems = ref([]);
const paymentTabs = ref([
    {
        method: 'PIX',
        description: 'With pix payment method you have 5% off on your shopping'
    },
    {
        method: 'CREDIT CARD',
        description: 'Pay for your purchases in up to 12 times interest-free installments'
    },
    {
        method: 'TICKET BANK',
        description: 'This method is nothing special'
    }
]);
const paymentSelect = ref(null);

onMounted(() => {
    CartService.getItemsCart().then((data) => {
        shoppingCartItems.value = data
    });
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>
<template>
    <div class="grid" style=" grid-template-columns: 3fr 1fr; gap: 2rem;">
        <div class="col">
            <div class="card">
                <div class="font-semibold text-xl mb-4">Steps</div>
                <Stepper value="1">
                    <StepList>
                        <Step value="1"><i class="pi pi-shopping-cart m-1" />Cart</Step>
                        <Step value="2"><i class="pi pi-user m-1" />Identification</Step>
                        <Step value="3"><i class="pi pi-map-marker m-1" />Address</Step>
                        <Step value="4"><i class="pi pi-credit-card m-1" />Payment</Step>
                    </StepList>
                    <StepPanels>
                        <StepPanel v-slot="{ activateCallback }" value="1">
                            <DataView :value="shoppingCartItems">
                                <template #list="slotProps">
                                    <div class="flex flex-col">
                                        <div v-for="(item, index) in slotProps.items" :key="index">
                                            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                                                :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                                                <div class="md:w-40 relative">
                                                    <img class="block xl:block mx-auto rounded w-full"
                                                        :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
                                                        :alt="item.name" />
                                                    <!-- <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"
                                                class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag> -->
                                                </div>
                                                <div
                                                    class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                                    <div
                                                        class="flex flex-row md:flex-col justify-between items-start gap-2">
                                                        <div>
                                                            <span
                                                                class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                                                    item.category }}</span>
                                                            <TitleProduct :title="item.name" />
                                                        </div>
                                                    </div>
                                                    <div class="flex flex-col md:items-end gap-8">
                                                        <InputNumberAmount />
                                                    </div>
                                                    <div class="flex flex-col md:items-end gap-8">
                                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                                            <Button label="Remove" icon="pi pi-trash" size="small"
                                                                severity="danger" text />
                                                        </div>
                                                    </div>
                                                    <span class="text-xl font-semibold">{{ formatCurrency(item.price)
                                                        }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </DataView>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="2">
                            <div>
                                Panel 2
                            </div>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="3">
                            <div>
                                Panel 3
                            </div>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="4">
                            <div>
                                <Accordion value="0">
                                    <AccordionPanel v-for="(tab, index) in paymentTabs" :key="index"
                                        :value="tab.method">
                                        <AccordionHeader>
                                            <div class="flex flex-row items-center">
                                                <RadioButton v-model="paymentSelect" :inputId="tab.method"
                                                    name="dynamic" :value="tab.method" />
                                                <label class="ml-2">{{ tab.method }}</label>
                                                <IconsPayments :paymentMethod="tab.method" class="mx-2" />
                                            </div>
                                        </AccordionHeader>
                                        <AccordionContent>
                                            <p class="m-0">
                                                {{ tab.description }}
                                            </p>

                                        </AccordionContent>
                                    </AccordionPanel>
                                </Accordion>
                            </div>
                        </StepPanel>

                    </StepPanels>
                </Stepper>
            </div>
        </div>
        <div class="col">
            <BuyBox />
        </div>
    </div>
</template>