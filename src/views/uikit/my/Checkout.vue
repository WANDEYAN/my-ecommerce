<script setup>
import { CartService } from '@/service/CartService.js';
import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import InputText from 'primevue/inputtext';
import Step from 'primevue/step';
import StepList from 'primevue/steplist';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import Stepper from 'primevue/stepper';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';
import BuyBox from './BuyBox.vue';
import IconsPayments from './IconsPayments.vue';
import InputNumberAmount from './InputNumberAmount.vue';
import TitleProduct from './TitleProduct.vue';


const toast = useToast();
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
const formCreditCard = ref({
    numberCard: null,
    name: null,
    dateExpire: null,
    cvv: null,
    isDefaultPayment: false,
    cpf: null
});
const checkoutData = ref({
    client: '',
    address: '',
    paymentMethod: '',
    shipping: 0,
    productsCount: 0
});

const subtotal = computed(() =>
    shoppingCartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
);

const currentStepIndex = ref('1');
const finalCheckoutStep = computed(() => {
    validationNextStep();
});

onMounted(() => {
    CartService.getItemsCart().then((data) => {
        shoppingCartItems.value = data
    });
});

function validationNextStep() {
    let isValid = true
    let mensage = '';
    if (currentStepIndex.value == 1) {
        if (shoppingCartItems.value.length > 0) {
            checkoutData.value.productsCount = shoppingCartItems.value.length;
        } else {
            isValid = false;
            mensage = 'Your cart is empty';
        }
    } else if (currentStepIndex.value == 2) {
        checkoutData.value.client = 'João da Silva';
    } else if (currentStepIndex.value == 3) {
        checkoutData.value.address = '123 Flower Street, São Paulo, SP';
        checkoutData.value.shipping = 10.00;
    } else if (currentStepIndex.value == 4) {
        checkoutData.value.paymentMethod = paymentSelect.value;
    }
    if (!isValid) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: mensage,
            life: 3000
        });
    }
    return isValid;
}

const goToNextStep = (activateCallback, targetSepIndex) => {
    if (validationNextStep()) {
        activateCallback(targetSepIndex);
        currentStepIndex.value = targetSepIndex;
    }
};

const goToPreviousStep = (activateCallback, targetSepIndex) => {
    activateCallback(targetSepIndex);
    currentStepIndex.value = targetSepIndex;
};

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
                                                        <InputNumberAmount v-model="item.quantity" />
                                                    </div>
                                                    <div class="flex flex-col md:items-end gap-8">
                                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                                            <Button label="Remove" icon="pi pi-trash" size="small"
                                                                severity="danger" text />
                                                        </div>
                                                    </div>
                                                    <span class="text-xl font-semibold">{{ formatCurrency(item.price *
                                                        item.quantity)
                                                    }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </DataView>
                            <div class="flex pt-6 justify-end">
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                    @click="goToNextStep(activateCallback, '2')" />
                            </div>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="2">
                            <div>
                                Panel 2
                            </div>
                            <div class="flex pt-6 justify-between">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                    @click="goToPreviousStep(activateCallback, '1')" />
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                    @click="goToNextStep(activateCallback, '3')" />
                            </div>
                        </StepPanel>
                        <StepPanel v-slot="{ activateCallback }" value="3">
                            <div>
                                Panel 3
                            </div>
                            <div class="flex pt-6 justify-between">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                    @click="goToPreviousStep(activateCallback, '2')" />
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                    @click="goToNextStep(activateCallback, '4')" />
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
                                                    @click="finalCheckoutStep" name="dynamic" :value="tab.method" />
                                                <label class="ml-2">{{ tab.method }}</label>
                                                <IconsPayments :paymentMethod="tab.method" class="mx-2" />
                                            </div>
                                        </AccordionHeader>
                                        <AccordionContent>
                                            <p class="m-0">
                                                {{ tab.description }}
                                            </p>

                                            <div v-if="tab.method == 'CREDIT CARD'" class="mt-3">
                                                <div>
                                                    Flags cards
                                                </div>
                                                <Divider />
                                                <div class="mt-8 formCreditCard">
                                                    <div class="flex flex-col gap-8 w-full">
                                                        <div class="row">
                                                            <FloatLabel>
                                                                <InputMask id="numCard"
                                                                    v-model="formCreditCard.numberCard"
                                                                    mask="9999999999999999"
                                                                    placeholder="9999 9999 9999 9999" />
                                                                <label for="numCard">NUMBER CARD</label>
                                                            </FloatLabel>
                                                        </div>
                                                        <div class="row">
                                                            <FloatLabel>
                                                                <InputText id="nameOwnerCard" type="text"
                                                                    v-model="formCreditCard.name" placeholder="Name" />
                                                                <label for="nameOwnerCard">NAME ON CARD</label>
                                                            </FloatLabel>
                                                        </div>
                                                        <div class="row">
                                                            <div class="flex flex-row gap-x-4">
                                                                <div class="col">
                                                                    <FloatLabel>
                                                                        <DatePicker id="dateExpire"
                                                                            dateFormat="dd/mm/yy" :showIcon="true"
                                                                            :showButtonBar="true"
                                                                            v-model="formCreditCard.dateExpire">
                                                                        </DatePicker>
                                                                        <label for="dateExpire">DATE EXPIRE</label>
                                                                    </FloatLabel>
                                                                </div>
                                                                <div class="col">
                                                                    <FloatLabel>
                                                                        <InputMask id="cvv" mask="999"
                                                                            v-model="formCreditCard.cvv"
                                                                            placeholder="999" />
                                                                        <label for="cvv">CVV</label>
                                                                    </FloatLabel>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <FloatLabel>
                                                                <InputMask id="cpf" mask="999.999.999-99"
                                                                    v-model="formCreditCard.cpf"
                                                                    placeholder="999.999.999-99" />
                                                                <label for="cpf">CPF</label>
                                                            </FloatLabel>
                                                        </div>
                                                        <div class="row">
                                                            <Checkbox id="isDefault" :value="true"
                                                                v-model="formCreditCard.isDefaultPayment" />
                                                            <label for="isDefault" class="ml-2">My payment
                                                                default</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionPanel>
                                </Accordion>
                            </div>
                            <div class="flex pt-6 justify-between">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                    @click="goToPreviousStep(activateCallback, '3')" />
                            </div>
                        </StepPanel>
                    </StepPanels>
                </Stepper>
            </div>
        </div>
        <div class="col">
            <BuyBox :resumeOrder="checkoutData" :subtotal="subtotal"></BuyBox>
        </div>
    </div>
</template>
<style>
.formCreditCard input {
    width: 100%;
}
</style>