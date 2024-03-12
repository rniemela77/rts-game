<script setup>
import { ref, onMounted, computed, defineProps, onBeforeUnmount } from 'vue';
import { store, sliders } from './SliderStore';

// slider prop
const props = defineProps({
    slider: Object,
});



const slider = props.slider;

// remove the interval when the component is destroyed
onBeforeUnmount(() => {
    clearInterval(interval);
});

const interval = setInterval(() => {
    if (slider.position >= 100) {
        slider.handleMiss();
        slider.resetPosition();
        slider.resetAcceleration();
        slider.resetSpeed();
        slider.resetAngle();
    } else {
        slider.position += slider.speed;
        slider.speed *= slider.acceleration;
    }
}, 1000 / store.fps);

onMounted(() => {
    slider.resetSpeed();
    slider.resetAcceleration();
    slider.resetPosition();
    slider.resetAngle();
    // slider.animateSlider();

    // assign to variable

    // move the slider with its acceleration
});
const sliderCss = computed(() => {
    return `top: ${slider.position}%;`;
});
const sliderBarCss = computed(() => {
    // if hitEffect is true, apply the hit effect
    return {
        // 'transform-origin': `50% ${sliderPosition.value}%`,
        'box-shadow': slider.hitEffect ? '0px 0px 15px 0px rgb(255, 255, 255)' : '',
        'filter': slider.hitEffect ? 'brightness(15)' : '',
        'transform': `rotate(${slider.angle}deg)`,
        'transition': 'all 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        // 'height': Math.random() * 10 + 5 + 'rem',
    }
});
</script>

<template>
    <div>
        <div class="slider" :style="sliderBarCss">
            <div class="slider-current" :style="sliderCss"></div>
            <div v-for="zone in slider.criticalZones" :key="zone" class="slider-critical-zone"
                :style="`height: ${zone[1] - zone[0]}%; top: ${zone[0]}%;`"></div>
        </div>
    </div>
</template>

<style>
.slider {
    width: 1rem;
    height: 50vh;
    background: white;
    border: 1px solid var(--primary);
    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%); */
    position: relative;
    /* clip-path: polygon(50% 0%, 0% 100%, 100% 100%); */
}

.slider:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%); */
    left: 0;
    top: 0;
    box-shadow: inset 0px 0px 0px 1px rgb(255, 255, 255);
}

.slider-current {
    width: calc(100%);
    height: 0.25rem;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: bottom;
    background: black;
    z-index: 1;
}



.slider-critical-zone {
    width: 100%;
    position: absolute;
    background: rgb(255, 213, 0);
    mix-blend-mode: multiply;
}


.marker {
    width: 5rem;
    height: 0.5rem;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}
</style>
