<script>
export default {
    props: {
        title: {
            String,
            required: true
        }
    }
}
</script>
<template>
    <div class="text-lg font-medium mt-2 product-title">{{ title }}</div>
</template>
<style>
.product-title {
    max-width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>