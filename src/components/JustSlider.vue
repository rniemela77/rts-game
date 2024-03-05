<script setup>
import { ref, onMounted, computed } from 'vue';

// game settings
const fps = ref(24);
const sliderSpeed = ref(0);
const sliderAcceleration = ref(0);
const sliderPosition = ref(0);
const barAngle = ref(0);
const sliderCss = computed(() => {
    return `top: ${sliderPosition.value}%;`;
});

const resetPosition = () => {
    sliderPosition.value = 0;
};
const resetAcceleration = () => {
    sliderAcceleration.value = 1.1;
};
const resetSpeed = () => {
    sliderSpeed.value = 0.3;
};
const resetAngle = () => {
    barAngle.value = Math.random() * 360;
};

resetSpeed();
resetAcceleration();
resetPosition();
resetAngle();

onMounted(() => {
    setInterval(() => {
        // move the slider with its acceleration
        if (sliderPosition.value >= 100) {
            resetPosition();
            resetAcceleration();
            resetSpeed();
            resetAngle();
        } else {
            sliderPosition.value += sliderSpeed.value;
            sliderSpeed.value *= sliderAcceleration.value;
        }
    }, 1000 / fps.value);
});

const resetCriticalZone = () => {
    criticalZone.value = [Math.random() * 100, Math.random() * 100].sort((a, b) => a - b);

    // ensure critical zone is at least 10 units 
    if (criticalZone.value[1] - criticalZone.value[0] < 10) {
        criticalZone.value[1] += 10;
    }
};

const criticalZone = ref([25, 45]);

const state = ref('Ready');

const handleHit = () => {
    state.value = 'Hit';
    hitEffect.value = true;
    resetCriticalZone();
    resetPosition();
    resetSpeed();
    resetAngle();
    sliderAcceleration.value += 0.02;

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

        // create hit marker
        const marker = document.createElement('div');
        marker.classList.add('marker');
        marker.style.top = '0px';
        marker.style.width = '100%';
        marker.style.height = '0.5rem';
        marker.style.background = 'red';
        marker.style.opacity = '0.5';
        marker.style.position = 'absolute';

        document.querySelector('.slider').appendChild(marker);

        // move the marker to the slider position
        marker.style.top = sliderPosition.value + '%';


        // remove the marker after 1s
        setTimeout(() => {
            marker.remove();
        }, 500);

        // 
    }
};

// hit effect
const hitEffect = ref(false);
const hitEffectCss = computed(() => {
    // if hitEffect is true, apply the hit effect
    return {
        'box-shadow': hitEffect.value ? '0 0 10px 10px red' : 'none',
        'filter': hitEffect.value ? 'brightness(15) hue-rotate(200deg)' : '',
        'transform': `rotate(${barAngle.value}deg)`,
        // 'transition': 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        // 'height': Math.random() * 10 + 5 + 'rem',
    }
});
</script>

<template>
    <div class="screenz">
        <!-- <GameBoard :cells="cells" /> -->
        <div class="slider" :style="hitEffectCss">
            <div class="slider-current" :style="sliderCss"></div>
            <div class="slider-critical-zone"
                :style="`height: ${criticalZone[1] - criticalZone[0]}%; top: ${criticalZone[0]}%;`"></div>
        </div>


        <div @mousedown="handleClick" class="btn">{{ state }}</div>
    </div>
</template>

<style scoped>

.slider {
    width: 1.5rem;
    height: 50vh;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%);
    position: relative;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.slider-current {
    width: 100%;
    height: 0.1rem;
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
    opacity: 0.6;
}

.btn {
    width: 50%;
    height: 20%;
    position: fixed;
    bottom: 0;
    background: black;
    color: white;
    border: none;

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