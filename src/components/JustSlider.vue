<script setup>
import { ref, onMounted, computed } from 'vue';

// game settings
const fps = ref(30);
const sliderSpeed = ref(2);

const sliderPosition = ref(50);
const sliderCss = computed(() => {
    return `top: ${sliderPosition.value}%;`;
});

onMounted(() => {
    setInterval(() => {
        // move the slider from 0 to 100 and back
        if (sliderPosition.value <= 0) {
            sliderPosition.value = 100;
            sliderSpeed.value = 2;
        } else {
            sliderPosition.value -= sliderSpeed.value;
        }
    }, 1000 / fps.value);
});

const criticalZone = ref([25, 45]);
const criticalZoneMovement = ref(0);

const state = ref('Ready');

const handleHit = () => {
    state.value = 'Hit';
    hitEffect.value = true;
    sliderPosition.value = 100;
    criticalZone.value = [Math.random() * 100, Math.random() * 100].sort((a, b) => a - b);
    sliderSpeed.value += 1;

    setTimeout(() => {
        hitEffect.value = false;
        state.value = 'Ready';
    }, 100);
};

const handleClick = () => {
    console.log('Firing');
    if (sliderPosition.value >= criticalZone.value[0] && sliderPosition.value <= criticalZone.value[1]) {
        handleHit();
    } else {
        state.value = 'Miss';
    }
};

// hit effect
const hitEffect = ref(false);
const hitEffectCss = computed(() => {
    // if hitEffect is true, apply the hit effect
    return hitEffect.value ? 'box-shadow: 0 0 10px 3px rgba(255, 0, 0, 0.8);' : '';
});
</script>

<template>
    <div>
        <GameBoard :cells="cells" />
        <div class="slider" :style="hitEffectCss">
            <div class="slider-current" :style="sliderCss"></div>
            <div class="slider-critical-zone" :style="`height: ${criticalZone[1] - criticalZone[0]}%; top: ${criticalZone[0]}%;`"></div>
        </div>

        <button @click="handleClick">{{ state }}</button>
        {{ sliderPosition }}
        <br>
        {{ criticalZone }}
    </div>
</template>

<style scoped>
.slider {
    width: 2rem;
    height: 50vh;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
}
.slider-current {
    width: 100%;
    height: 0.25rem;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: bottom;
    background: rgb(255, 255, 255);
    z-index: 1;
}
.slider-critical-zone {
    width: 100%;
    position: absolute;
    background: rgb(168, 102, 15);
    opacity:0.6;
}
button {
    margin-top: 2rem;
    width: 50%;
    height: 20%;
}
</style>