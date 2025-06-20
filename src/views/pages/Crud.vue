<script setup>
import { CategoryService } from '@/service/CategoryService';
import { ProductService } from '@/service/ProductService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
    CategoryService.getCategories().then((data) => (categories.value = data));
});

const categories = ref([]);
const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);
const uploadedFile = ref(null);
const previewImageUrl = ref(null);
const fileUploadRef = ref(null);

function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}

function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
    previewImageUrl.value = null; // Limpa a URL de pré-visualização da imagem
    uploadedFile.value = null; // Limpa o arquivo carregado
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

function saveProduct() {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            // Lógica para a imagem ao ATUALIZAR
            if (uploadedFile.value) {
                // Aqui você faria o upload real para um servidor
                // Por enquanto, vamos simular que o nome do arquivo é salvo
                product.value.image = uploadedFile.value.name; // Ou um ID/URL retornado pelo backend
            } else if (!product.value.image && previewImageUrl.value) {
                // Se não há um novo upload, mas há um preview (ex: ao editar sem mudar a imagem)
                // e o product.image está vazio, talvez você queira manter o preview?
                // Ou pode ser que o previewImageUrl contenha uma URL temporária, mas não é a imagem final.
                // A lógica aqui depende de como você quer que a imagem seja tratada ao salvar sem um novo upload.
                // Para este exemplo, vamos assumir que se não houve novo upload, a imagem existente permanece.
            }

            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();

            // Lógica para a imagem ao CRIAR
            if (uploadedFile.value) {
                // Aqui você faria o upload real para um servidor
                // Por enquanto, vamos simular que o nome do arquivo é salvo
                product.value.image = uploadedFile.value.name; // Ou um ID/URL retornado pelo backend
            } else {
                product.value.image = 'product-placeholder.svg'; // Imagem padrão se nenhuma for selecionada
            }

            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
        clearImage();
    }
}

function editProduct(prod) {
    product.value = { ...prod };
    productDialog.value = true;
    // Ao editar, se o produto já tiver uma imagem, exiba-a no preview
    if (product.value.image) {
        // Se a imagem for uma URL externa, use-a diretamente
        if (product.value.image.startsWith('http')) {
            previewImageUrl.value = product.value.image;
        } else {
            // Se for apenas o nome do arquivo, construa a URL (assumindo a mesma base)
            previewImageUrl.value = `https://primefaces.org/cdn/primevue/images/product/${product.value.image}`;
        }
    } else {
        clearImage();
    }
}

function confirmDeleteProduct(prod) {
    product.value = prod;
    deleteProductDialog.value = true;
}

function deleteProduct() {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

function createId() {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteProductsDialog.value = true;
}

function deleteSelectedProducts() {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}

function getStatusLabel(status) {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}

function onFileSelect(event) {
    // Este método é acionado quando um arquivo é selecionado
    const file = event.files[0]; // Pega o primeiro arquivo selecionado

    if (file) {
        uploadedFile.value = file; // Armazena o arquivo
        const reader = new FileReader(); // Cria um FileReader para ler o arquivo

        reader.onload = (e) => {
            previewImageUrl.value = e.target.result; // Define a URL para o preview
        };

        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    } else {
        uploadedFile.value = null;
        previewImageUrl.value = null;
    }
}

function clearImage() {
    // Função para limpar a imagem selecionada e o preview
    uploadedFile.value = null;
    previewImageUrl.value = null;

    if (fileUploadRef.value) {
        fileUploadRef.value.clear();
    }

    // Opcional: Se o seu produto já tiver uma imagem, você pode resetá-la aqui
    // product.value.image = 'product-placeholder.svg'; // Ou null, dependendo da sua lógica
}


</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected"
                        :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Manage Products</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="code" header="Code" sortable style="min-width: 12rem"></Column>
                <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                            :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="price" header="Price" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="category" header="Category" sortable style="min-width: 10rem"></Column>
                <Column field="rating" header="Reviews" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" />
                    </template>
                </Column>
                <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="flex flex-col gap-6">
                <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
                    :alt="product.image" class="block m-auto pb-4" />
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="product.name" required="true" autofocus
                        :invalid="submitted && !product.name" fluid />
                    <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
                </div>

                <img v-if="previewImageUrl" :src="previewImageUrl" :alt="product.name || 'Preview'"
                    class="block m-auto pb-4" style="max-width: 200px;" />

                <div class="field">
                    <label for="imageUpload" class="block font-bold mb-3">Product Image</label>
                    <FileUpload ref="fileUploadRef" mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000"
                        @select="onFileSelect" :auto="false" chooseLabel="Choose"
                        uploadLabel="Upload (Not actually uploading yet)" cancelLabel="Cancel" />
                    <Button v-if="previewImageUrl || product.image" label="Clear Image" icon="pi pi-times" class="mt-2"
                        text @click="clearImage" />
                    <small class="text-gray-500 mt-2 block">Select an image file (Max 1MB)</small>
                </div>

                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" fluid />
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                    <Select id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses"
                        optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div>

                <div>
                    <label for="category" class="block font-bold mb-3">Category</label>
                    <Select id="category" v-model="product.category" :options="categories" optionLabel="category"
                        placeholder="Select a category" fluid></Select>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US"
                            fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>
