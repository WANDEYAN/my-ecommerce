<script setup>
import { ProductService } from '@/service/ProductService';
import { RatingService } from '@/service/RatingService';
import { onMounted, ref } from 'vue';
import BuyButton from './uikit/BuyButton.vue';
import FavorityButton from './uikit/FavorityButton.vue';
import { useRoute } from 'vue-router';

const product = ref(null);
const images = ref([]);
const ratings = ref([]);
const ratingItem = ref(0)
const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);
const carouselResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const route = useRoute();
onMounted(async () => {
    const productId = route.params.id;
    product.value = await ProductService.getProductById(productId);
    images.value = product.value.image;
    ratingItem.value = product.value.rating;

    RatingService.getRatings().then((data) => {
        ratings.value = data
    });
});
</script>
<template>
    <div className="card">
        <div class="font-semibold text-xl mb-4">Product Details</div>
            <div v-if="product" class="grid" style=" grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div class="col">
                    <Galleria :value="images" :responsiveOptions="galleriaResponsiveOptions" :numVisible="5"
                        containerStyle="max-width: 640px">
                        <template #item="slotProps">
                            <img :src="slotProps?.item?.imageUrl" :alt="slotProps.item.alt" style="width: 100%" />
                        </template>
                        <template #thumbnail="slotProps">
                            <img :src="slotProps?.item?.thumbnailUrl" :alt="slotProps.item.alt"/>
                        </template>
                    </Galleria>
                </div>
                <div class="col">
                    <div class="font-semibold text-xl mb-4">{{ product.name }}</div>
                    <Rating v-model="ratingItem" readonly></Rating>
                    <div class="text-2xl my-4">
                        {{ formatCurrency(product.price) }}
                    </div>
                    <div class="flex" style="width: 100%; padding-top: 35%; flex-direction: column; align-items: center;">
                        <BuyButton />
                        <FavorityButton />
                    </div>
    
                </div>
            </div>
        <div class="mt-10">
            <div class="font-semibold text-xl mb-4">TabMenu</div>
            <Tabs value="0">
                <TabList>
                    <Tab value="0">Details</Tab>
                    <Tab value="1">Reviews</Tab>
                    <Tab value="2">Shipping and Returns </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <p v-if="product">{{ product.description }}</p>
                    </TabPanel>
                    <TabPanel value="1">
                        <DataView :value="ratings" layout="list" :paginator="true" :rows="3">
                            <template #list="slotProps">
                                <div v-for="(rating, index) in slotProps.items" :key="index">
                                    <p class="font-bold my-3">{{ rating.name }}</p>
                                    <Rating v-model="rating.rating" readonly />
                                    <p class="my-3">{{ rating.description }}</p>
                                </div>
                            </template>
                        </DataView>

                    </TabPanel>
                    <TabPanel value="2">
                        <p>about Shipping and Returns</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>