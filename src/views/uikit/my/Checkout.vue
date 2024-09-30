<script setup>
import Step from 'primevue/step';
import StepList from 'primevue/steplist';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import Stepper from 'primevue/stepper';
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
                    <div>

                    </div>
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