<script setup>
import { useToast } from 'primevue/usetoast'; // Hook para notificações PrimeVue
import { onMounted, ref } from 'vue';

// Importação dos componentes PrimeVue necessários
import { ProductService } from '@/service/ProductService';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

const toast = useToast(); // Instância do Toast para exibir mensagens

const sidebarVisible = ref(false); // Estado para controlar a visibilidade do menu lateral (Sidebar)
const searchQuery = ref(''); // Estado para o texto da barra de pesquisa

// Simulação de dados para Produtos em Destaque
const featuredProducts = ref({});

/**
 * Formata um valor numérico para o formato de moeda USD.
 * @param {number} value - O valor a ser formatado.
 * @returns {string} O valor formatado como moeda.
 */
function formatCurrency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// --- Funções de Navegação (Simuladas) ---
// Em um projeto real com vue-router, você usaria `router.push('/path')` aqui.

/**
 * Simula a navegação para a página de Login.
 */
const goToLogin = () => {
    toast.add({ severity: 'info', summary: 'Navegação', detail: 'Indo para a página de Login...', life: 2000 });
    // Exemplo com vue-router: router.push('/login');
};

/**
 * Simula a navegação para a página do Carrinho de Compras.
 */
const goToCart = () => {
    toast.add({ severity: 'info', summary: 'Navegação', detail: 'Abrindo o Carrinho de Compras...', life: 2000 });
    // Exemplo com vue-router: router.push('/cart');
};

/**
 * Simula a navegação para a página de Favoritos.
 */
const goToFavorites = () => {
    toast.add({ severity: 'info', summary: 'Navegação', detail: 'Indo para a página de Favoritos...', life: 2000 });
    // Exemplo com vue-router: router.push('/favorites');
};

/**
 * Lida com a seleção de uma categoria no menu lateral.
 * @param {object} category - O objeto da categoria selecionada.
 */
const selectCategory = (category) => {
    toast.add({ severity: 'success', summary: 'Categoria', detail: `Categoria selecionada: ${category.name}`, life: 2000 });
    sidebarVisible.value = false; // Fecha o menu lateral após selecionar
    // Exemplo com vue-router: router.push(`/category/${category.id}`);
};

/**
 * Simula a alternância do tema (claro/escuro).
 */
const toggleTheme = () => {
    toast.add({ severity: 'info', summary: 'Tema', detail: 'Alternando tema (funcionalidade simulada)', life: 2000 });
    // Implemente a lógica real de alternância de tema aqui (e.g., usando store, adicionando classes ao body)
};

// Hook de montagem do componente
onMounted(() => {
    // Aqui você pode adicionar lógica para carregar dados reais de categorias e produtos
    // de uma API, em vez de usar os dados simulados.
});
</script>

<style scoped>
/* Estilos específicos para este componente, se necessário.
   O Tailwind CSS já lida com a maior parte da estilização. */

/* Ajustes para o Sidebar para que ele se pareça bem no contexto do Sakai */
.custom-sidebar .p-sidebar-header {
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--surface-border);
}

.custom-sidebar .p-sidebar-content {
    padding-top: 1rem;
}

/* Garante que o container principal ocupe o espaço restante */
.home-page {
    display: flex;
    flex-direction: column;
}

.flex-grow {
    flex-grow: 1;
}

/* Cores e variáveis são geralmente definidas pelo tema PrimeVue/Sakai */
:root {
    --primary-500: #6366F1;
    /* Exemplo de cor primária do Sakai */
    --surface-50: #F8FAFC;
    /* Exemplo de cor de fundo claro */
    --surface-100: #F1F5F9;
    /* Exemplo de cor de hover leve */
    --surface-200: #E2E8F0;
    /* Exemplo de cor de borda */
    --surface-300: #CBD5E1;
    /* Exemplo de cor para input borders */
    --surface-border: #D1D5DB;
    /* Exemplo de cor de borda mais genérica */
}
</style>
<template>
    <div class="home-page flex flex-col min-h-screen">
        <!-- Toast para mensagens de notificação -->
        <Toast />

        <!-- Conteúdo Principal da Home Page -->
        <div class="flex-grow p-4 md:p-6 bg-surface-50">
            <!-- Seção de Banners/Destaques -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div
                    class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
                    <h2 class="text-3xl font-bold mb-2">Summer Collection!</h2>
                    <p class="text-lg mb-4">Up to 50% off on selected items.</p>
                    <Button label="Shop Now" severity="contrast" icon="pi pi-arrow-right" iconPos="right" />
                </div>
                <div
                    class="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
                    <h2 class="text-3xl font-bold mb-2">New Arrivals</h2>
                    <p class="text-lg mb-4">Discover our latest products.</p>
                    <Button label="Explore" severity="contrast" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </div>

            <!-- Seção de Produtos em Destaque -->
            <h3 class="text-2xl font-bold mb-6 text-gray-800">Featured Products</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="product in featuredProducts" :key="product.id"
                    class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                    <img :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
                        :alt="product.name" class="w-full h-48 object-cover" />
                    <div class="p-4 flex-grow flex flex-col justify-between">
                        <div>
                            <h4 class="font-semibold text-lg mb-1 text-gray-800 truncate">{{ product.name }}</h4>
                            <p class="text-gray-600 text-sm mb-2">{{ product.category }}</p>
                        </div>
                        <div class="flex items-center justify-between mt-auto">
                            <span class="text-xl font-bold text-primary-500">{{ formatCurrency(product.price) }}</span>
                            <Button icon="pi pi-plus" label="Add to Cart" severity="primary"
                                class="p-button-sm rounded-md" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Seção "Sobre Nós" (Exemplo de rodapé simples) -->
            <div class="mt-12 p-8 bg-white rounded-lg shadow-md text-center text-gray-700">
                <h3 class="text-2xl font-bold mb-4">About My E-commerce</h3>
                <p class="max-w-3xl mx-auto mb-4 leading-relaxed">
                    Welcome to My E-commerce, your one-stop shop for the latest and greatest products. We are committed
                    to providing
                    high-quality items and an unparalleled shopping experience. Our mission is to bring you the best
                    selection,
                    competitive prices, and excellent customer service.
                </p>
                <div class="flex justify-center gap-4 text-3xl">
                    <i
                        class="pi pi-facebook text-blue-600 cursor-pointer hover:text-blue-700 transition-colors duration-200" />
                    <i
                        class="pi pi-twitter text-blue-400 cursor-pointer hover:text-blue-500 transition-colors duration-200" />
                    <i
                        class="pi pi-instagram text-pink-500 cursor-pointer hover:text-pink-600 transition-colors duration-200" />
                    <i
                        class="pi pi-linkedin text-blue-700 cursor-pointer hover:text-blue-800 transition-colors duration-200" />
                </div>
            </div>
        </div>
    </div>
</template>