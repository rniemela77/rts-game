<script setup>
import { ref, onMounted, computed } from 'vue';
import { store, sliders } from './SliderStore';

const slider = sliders[0];

const sliderCss = computed(() => {
    return `top: ${slider.position}%;`;
});


onMounted(() => {
    slider.resetSpeed();
    slider.resetAcceleration();
    slider.resetPosition();
    slider.resetAngle();

    setInterval(() => {
        // move the slider with its acceleration
        if (slider.position >= 100) {
            handleMiss();
            slider.resetPosition();
            slider.resetAcceleration();
            slider.resetSpeed();
            slider.resetAngle();
        } else {
            slider.position += slider.speed;
            slider.speed *= slider.acceleration;
        }
    }, 1000 / store.fps);
});

const handleHit = () => {
    slider.resetCriticalZones();
    slider.resetPosition();
    slider.resetSpeed();
    slider.resetAngle();
    store.addToClickCombo();
    slider.acceleration += 0.01;
    showHitEffect();
};
const showHitEffect = () => {
    hitEffect.value = true;
    setTimeout(() => {
        hitEffect.value = false;
    }, 50);
};

const createHitMarker = () => {
    // create hit marker
    const marker = document.createElement('div');
    marker.classList.add('marker');
    marker.style.width = '100%';
    marker.style.height = '0.5rem';
    marker.style.background = 'red';
    marker.style.opacity = '0.2';
    marker.style.position = 'absolute';
    marker.style.transition = 'all 0.5s linear';

    document.querySelector('.slider').appendChild(marker);

    // move the marker to the slider position
    const markerPosition = slider.position > 100 ? 95 : slider.position;
    marker.style.top = `${markerPosition}%`;

    // remove the marker after 1s
    setTimeout(() => {
        marker.remove();
    }, 500);
};
const handleMiss = () => {
    createHitMarker();
    store.resetClickCombo();
    slider.resetCriticalZones();
    slider.resetPosition();
    slider.resetAcceleration();
    slider.resetSpeed();
    slider.resetAngle();
};
const countHits = () => {
    let hits = 0;

    slider.criticalZones.forEach(zone => {
        if (slider.position >= zone[0] && slider.position <= zone[1]) {
            hits += 1;
        }
    });

    return hits;
};
const handleClick = () => {
    const hits = countHits();

    if (!hits) handleMiss();

    for (let i = 0; i < hits; i++) {
        handleHit();
    }
};

// hit effect
const hitEffect = ref(false);
const sliderBarCss = computed(() => {
    // if hitEffect is true, apply the hit effect
    return {
        // 'transform-origin': `50% ${sliderPosition.value}%`,
        'box-shadow': hitEffect.value ? '0px 0px 15px 0px rgb(255, 255, 255)' : '',
        'filter': hitEffect.value ? 'brightness(15)' : '',
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

        <div @mousedown="handleClick" class="btn">Tap</div>
    </div>
</template>

<style>
.slider {
    width: 1rem;
    height: 50vh;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%);
    position: relative;
    /* clip-path: polygon(50% 0%, 0% 100%, 100% 100%); */
}

.slider-current {
    width: 100%;
    height: 0.25rem;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: bottom;
    background: rgb(255, 255, 255);
    box-shadow: 0px 0px 2px rgb(104, 0, 0);
    z-index: 1;
}

.slider-critical-zone {
    width: 100%;
    position: absolute;
    background: rgb(218, 163, 0);
    opacity: 0.6;
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
