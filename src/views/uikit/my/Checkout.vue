<script setup>
import { CartService } from '@/service/CartService';
import Step from 'primevue/step';
import StepList from 'primevue/steplist';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import Stepper from 'primevue/stepper';
import { onMounted, ref } from 'vue';

const shoppingCartItems = ref([]);

onMounted(() => {
    CartService.getItemsCart().then((data) => {
        shoppingCartItems.value = data
        console.log(shoppingCartItems.value)
    });
});
</script>
<template>
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
                                            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                                <div>
                                                    <span
                                                        class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                                            item.category }}</span>
                                                    <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                                </div>
                                                <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                                    <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                        style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                        <span class="text-surface-900 font-medium text-sm">{{
                                                            item.rating }}</span>
                                                        <i class="pi pi-star-fill text-yellow-500"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-col md:items-end gap-8">
                                                <span class="text-xl font-semibold">${{ item.price }}</span>
                                                <div class="flex flex-row-reverse md:flex-row gap-2">
                                                    <Button icon="pi pi-heart" outlined></Button>
                                                    <Button icon="pi pi-shopping-cart" label="Buy Now"
                                                        :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                                                        class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                                </div>
                                            </div>
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
                        Panel 4
                    </div>
                </StepPanel>

            </StepPanels>
        </Stepper>
    </div>
</template>