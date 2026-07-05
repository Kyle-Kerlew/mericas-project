<template>
    <div class="flex justify-center">
        <img src="../assets/svg/awning.svg" alt="Awning" class="awning-banner-header w-full h-full object-contain">
    </div>
    <div class="flex flex-col items-center my-5">

        <div class="text-center text-2xl font-semibold banner-above-text">{{ topText }}</div>
        <img src="../assets/svg/baddie_bean_brush_stroke_curved.svg" alt="Brand Banner"
            class="awning-banner w-full h-full object-contain">
        <div class="text-center text-2xl font-semibold banner-below-text">{{ bottomText }}</div>

    </div>
</template>
<script setup>
defineProps({
    topText: {
        type: String,
        default: ''
    },
    bottomText: {
        type: String,
        default: ''
    }
});
</script>

<style scoped>
.awning-banner-header {
    max-width: 450px;
}

.banner-above-text {
    margin-right: 15%;
}

.banner-below-text {
    margin-left: 15%;
}

.banner-above-text,
.banner-below-text {
    /* Ensure text is above the banner image */
    color: var(--color-text-accent);
}

.awning-banner {
    /* Allow text to overlap image by using negative margins */
    margin: -50px 0;
}
</style>