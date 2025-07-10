<script setup>
import { CategoryService } from "@/service/CategoryService";
import { useToast } from "primevue/usetoast";
import { onMounted, ref } from 'vue';

const toast = useToast();
const dropdownCategory = ref(null);

const onAdvancedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

onMounted(() => {
    CategoryService.getCategories().then((data) => {
        dropdownCategory.value = data;
        console.log(data);
    })
})

//botão deve passar props
defineProps({
    mode: {
        typePage: String,
        default: "New Product"
    }
});

//const isEditMode = computed(() => mode === 'edit');

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const price = ref(null);
const amount = ref(null);
const dropdownItem = ref(null);

//get in DB data category registered

</script>
<template>
    <Fluid>
        <div class="flex mt-8">
            <div class="card flex flex-col gap-4 w-full">
                <!--<div class="font-semibold text-xl">{{ isEditMode ? "New Product" : "Edit Product" }}</div> -->

                <div class="flex flex-wrap gap-2 w-full">
                    <label for="firstname2">Name</label>
                    <InputText id="firstname2" type="text" />
                </div>

                <div class="card">
                    <Toast />
                    <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true"
                        accept="image/*" :maxFileSize="1000000">
                        <template #empty>
                            <span>Drag and drop files to here to upload.</span>
                        </template>
                    </FileUpload>
                </div>

                <div class="flex flex-wrap">
                    <label for="description">Description</label>
                    <Textarea id="description" rows="4" />
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="category">Category</label>
                        <Select id="category" v-model="dropdownItem" :options="dropdownCategory" optionLabel="category"
                            placeholder="Select One" class="w-full"></Select>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="price">Price</label>
                        <InputNumber v-model="price" id="price" mode="currency" currency="BRL" locale="pt-BR" fluid />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="amount">Amount</label>
                        <InputNumber v-model="amount" id="amount" />
                    </div>
                </div>
                <div>
                    <Button type="submit" class="my-3">Save</Button>
                </div>
            </div>
        </div>
    </Fluid>
</template>