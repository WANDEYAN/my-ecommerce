<script setup>
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

// --- Services and State ---
const toast = useToast();
const orders = ref([]);
const loading = ref(true);
const isDialogVisible = ref(false);
const selectedOrder = ref(null);
const orderStatuses = ref([
    { label: 'Pending', value: 'Pending' },
    { label: 'Processing', value: 'Processing' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Cancelled', value: 'Cancelled' }
]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// --- Lifecycle ---
onMounted(() => {
    // Simulate an API call to fetch orders
    setTimeout(() => {
        orders.value = getMockOrders();
        loading.value = false;
    }, 1000);
});

const viewOrderDetails = (order) => {
    selectedOrder.value = { ...order }; // Create a copy to avoid unwanted reactivity in the dialog
    isDialogVisible.value = true;
};

const onStatusChange = (event, orderData) => {
    // Here you would make the API call to update the status in the backend
    console.log(`Changing order #${orderData.id} status to: ${event.value}`);

    // Simulate API success
    toast.add({
        severity: 'success',
        summary: 'Status Changed',
        detail: `Order #${orderData.id} status changed to "${event.value}".`,
        life: 3000
    });

    // Update the status in the dialog if it's open for the same order
    if (selectedOrder.value && selectedOrder.value.id === orderData.id) {
        selectedOrder.value.status = event.value;
    }
};

const clearFilter = () => {
    filters.value['global'].value = null;
};

const formatDate = (value) => {
    return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const getStatusSeverity = (status) => {
    switch (status) {
        case 'Delivered': return 'success';
        case 'Pending': return 'warning';
        case 'Cancelled': return 'danger';
        case 'Processing': return 'info';
        case 'Shipped': return 'primary';
        default: return null;
    }
};

// --- Mock Data (Replace with real API call) ---
const getMockOrders = () => {
    return [
        {
            id: '1001',
            customer: { name: 'João da Silva', email: 'joao.silva@example.com' },
            date: '2023-10-26T10:00:00Z',
            amount: 250.75,
            status: 'Delivered',
            shippingAddress: '123 Flower Street, São Paulo, SP',
            products: [
                { id: 'P01', name: 'Bluetooth Headphones', quantity: 1, price: 199.90, description: 'Wireless headphones with noise cancellation and long battery life.' },
                { id: 'P02', name: 'Phone Case', quantity: 1, price: 50.85, description: 'Durable silicone case for X model smartphones.' }
            ]
        },
        {
            id: '1002',
            customer: { name: 'Maria Oliveira', email: 'maria.o@example.com' },
            date: '2023-10-25T14:30:00Z',
            amount: 89.90,
            status: 'Pending',
            shippingAddress: '456 Main Avenue, Rio de Janeiro, RJ',
            products: [
                { id: 'P03', name: 'Wireless Mouse', quantity: 1, price: 89.90, description: 'Ergonomic optical mouse with USB connection and 6 buttons.' }
            ]
        },
        {
            id: '1003',
            customer: { name: 'Carlos Pereira', email: 'carlos.p@example.com' },
            date: '2023-10-24T09:15:00Z',
            amount: 1250.00,
            status: 'Processing',
            shippingAddress: '789 Sé Square, Salvador, BA',
            products: [
                { id: 'P04', name: '24" Gaming Monitor', quantity: 1, price: 1250.00, description: 'Full HD monitor with 144Hz refresh rate and 1ms response time.' }
            ]
        },
        {
            id: '1004',
            customer: { name: 'Ana Costa', email: 'ana.costa@example.com' },
            date: '2023-10-23T18:00:00Z',
            amount: 45.50,
            status: 'Cancelled',
            shippingAddress: '101 Palm Street, Recife, PE',
            products: [
                { id: 'P05', name: 'Personalized Mug', quantity: 2, price: 22.75, description: 'Ceramic mug with high-quality print. 300ml capacity.' }
            ]
        }
    ];
};
</script>
<template>
    <div class="grid">
        <div class="col-12">
            <Toast />
            <div class="card">
                <h5>Orders</h5>
                <p>See and manage all orders made in your store</p>

                <DataTable :value="orders" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters" filterDisplay="menu" :loading="loading"
                    responsiveLayout="scroll" :globalFilterFields="['id', 'customer.name']">
                    <template #header>
                        <div class="flex justify-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2"
                                @click="clearFilter()" />
                            <span for="searchBar" class="p-input-icon-left flex mb-2 items-center">
                                <i class="pi pi-search mr-2" />
                                <InputText name="searchBar" v-model="filters['global'].value"
                                    placeholder="Search by Order" />
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        No orders found.
                    </template>
                    <template #loading>
                        Loading order data. Please wait.
                    </template>

                    <Column field="id" header="Order No." style="min-width: 12rem">
                        <template #body="{ data }">
                            #{{ data.id }}
                        </template>
                    </Column>
                    <Column field="customer.name" header="Customer" style="min-width: 14rem">
                        <template #body="{ data }">
                            {{ data.customer.name }}
                        </template>
                    </Column>
                    <Column field="date" header="Order Date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.date) }}
                        </template>
                    </Column>
                    <Column field="amount" header="Total Amount" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.amount) }}
                        </template>
                    </Column>
                    <Column field="status" header="Status" style="min-width: 12rem">
                        <template #body="{ data }">
                            <Select v-model="data.status" :options="orderStatuses" optionLabel="label"
                                optionValue="value" placeholder="Select a Status" @change="onStatusChange($event, data)"
                                class="w-full">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value">
                                        <Tag :value="slotProps.value" :severity="getStatusSeverity(slotProps.value)" />
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <Tag :value="slotProps.option.value"
                                        :severity="getStatusSeverity(slotProps.option.value)" />
                                </template>
                            </Select>
                        </template>
                    </Column>
                    <Column headerStyle="width: 5rem; text-align: center"
                        bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button type="button" icon="pi pi-eye"
                                class="p-button-rounded p-button-secondary p-button-outlined"
                                @click="viewOrderDetails(data)" v-tooltip.top="'View Details'" />
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model:visible="isDialogVisible"
                :header="'Order Details #' + (selectedOrder ? selectedOrder.id : '')" :modal="true"
                style="width: 60vw; max-width: 900px;" @hide="selectedOrder = null">
                <div v-if="selectedOrder" class="p-fluid">
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0"><strong>Customer:</strong></label>
                        <div class="col-12 md:col-10">{{ selectedOrder.customer.name }}</div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0"><strong>Email:</strong></label>
                        <div class="col-12 md:col-10">{{ selectedOrder.customer.email }}</div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0"><strong>Date:</strong></label>
                        <div class="col-12 md:col-10">{{ formatDate(selectedOrder.date) }}</div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0"><strong>Status:</strong></label>
                        <div class="col-12 md:col-10">
                            <Tag :value="selectedOrder.status" :severity="getStatusSeverity(selectedOrder.status)" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0"><strong>Address:</strong></label>
                        <div class="col-12 md:col-10">{{ selectedOrder.shippingAddress }}</div>
                    </div>

                    <Divider />

                    <h5>Order Items</h5>
                    <DataTable :value="selectedOrder.products" responsiveLayout="scroll">
                        <Column field="name" header="Product"></Column>
                        <Column field="quantity" header="Qty." style="width: 80px; text-align: center;"></Column>
                        <Column field="price" header="Unit Price">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.price) }}
                            </template>
                        </Column>
                        <Column header="Subtotal">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.price * slotProps.data.quantity) }}
                            </template>
                        </Column>
                        <Column header="Info" style="width: 80px; text-align: center;">
                            <template #body="slotProps">
                                <!-- Icon with Tooltip to show product description -->
                                <i class="pi pi-info-circle text-xl text-blue-500"
                                    v-tooltip.top="slotProps.data.description"></i>
                            </template>
                        </Column>
                    </DataTable>

                    <div class="flex justify-content-end mt-4">
                        <h5><strong>Order Total: {{ formatCurrency(selectedOrder.amount) }}</strong></h5>
                    </div>
                </div>
                <template #footer>
                    <Button label="Close" icon="pi pi-times" @click="isDialogVisible = false" class="p-button-text" />
                </template>
            </Dialog>

        </div>
    </div>
</template>


<style scoped>
.p-datatable .p-dropdown {
    min-width: 150px;
}
</style>
