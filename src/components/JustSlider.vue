<script setup>
import { ref, onMounted, computed } from 'vue';

// game settings
const fps = ref(30);
const sliderSpeed = ref(0);
const sliderAcceleration = ref(0);
const sliderPosition = ref(0);
const barAngle = ref(0);
const sliderCss = computed(() => {
    return `top: ${sliderPosition.value}%;`;
});
const clickCombo = ref(0);
const maxClickCombo = ref(0);

const resetPosition = () => {
    sliderPosition.value = 0;
};
const resetAcceleration = () => {
    sliderAcceleration.value = 1.05;
};
const resetSpeed = () => {
    sliderSpeed.value = 0.2;
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
            handleMiss();
            resetSlider();
        } else {
            sliderPosition.value += sliderSpeed.value;
            sliderSpeed.value *= sliderAcceleration.value;
        }
    }, 1000 / fps.value);
});

const resetSlider = () => {
    resetPosition();
    resetAcceleration();
    resetSpeed();
    resetAngle();
}

const criticalZoneSize = ref(20);
const criticalZone = ref([[25, 45]]);
const resetCriticalZones = () => {
    criticalZone.value = [];

    // random number between 1 and 4
    const random = Math.floor(Math.random() * 4) + 1;

    // state.value = random;
    for (let i = 0; i < random; i++) {
        createCriticalZone(Math.random() * (100 - criticalZoneSize.value));
    }
};
const createCriticalZone = (firstValue) => {
    criticalZone.value.push([
        firstValue,
        firstValue + criticalZoneSize.value
    ].sort((a, b) => a - b));
};

const addToClickCombo = () => {
    clickCombo.value += 1;
    if (clickCombo.value > maxClickCombo.value) {
        maxClickCombo.value = clickCombo.value;
    }
};

const state = ref('Ready');

const handleHit = () => {
    // state.value = 'Hit';
    resetCriticalZones();
    resetPosition();
    resetSpeed();
    resetAngle();
    addToClickCombo();
    sliderAcceleration.value += 0.01;
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
    const markerPosition = sliderPosition.value > 100 ? 95 : sliderPosition.value;
    marker.style.top = `${markerPosition}%`;

    // remove the marker after 1s
    setTimeout(() => {
        marker.remove();
    }, 500);
};
const handleMiss = () => {
    clickCombo.value = 0;
    createHitMarker();
    resetCriticalZones();
    resetPosition();
    resetSpeed();
    resetAngle();
};
const handleClick = () => {
    let hits = 0;
    criticalZone.value.forEach(zone => {
        if (sliderPosition.value >= zone[0] && sliderPosition.value <= zone[1]) {
            hits += 1;
        }
    });

    hits > 0 ? handleHit() : handleMiss();
};

// hit effect
const hitEffect = ref(false);
const sliderBarCss = computed(() => {
    // if hitEffect is true, apply the hit effect
    return {
        // 'transform-origin': `50% ${sliderPosition.value}%`,
        'box-shadow': hitEffect.value ? '0px 0px 15px 0px rgb(255, 255, 255)' : '',
        'filter': hitEffect.value ? 'brightness(15)' : '',
        'transform': `rotate(${barAngle.value}deg)`,
        'transition': 'all 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        // 'height': Math.random() * 10 + 5 + 'rem',
    }
});
</script>

<template>
    <div class="screenz">
        <!-- <GameBoard :cells="cells" /> -->
        <div class="slider" :style="sliderBarCss">
            <div class="slider-current" :style="sliderCss"></div>
            <div v-for="zone in criticalZone" :key="zone" class="slider-critical-zone"
                :style="`height: ${zone[1] - zone[0]}%; top: ${zone[0]}%;`"></div>
        </div>

        <div>
        {{  maxClickCombo }}
        <br>
            <span v-for="i in clickCombo" :key="i">
                <span :style="'font-size: 2rem; ' +
            'transition: all 0.5s linear; ' +
            'filter: hue-rotate(' + clickCombo * 25 + 'deg); ' +
            'z-index: -1; '
            ">🔥</span>
            </span>
        </div>
        <div @mousedown="handleClick" class="btn">{{ state }}</div>

    </div>
</template>

<style scoped>
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