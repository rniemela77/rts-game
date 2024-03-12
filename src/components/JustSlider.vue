<script setup>
import { ref, onMounted, computed, defineEmits } from 'vue';
import { store, sliders, slider } from './SliderStore';
import SliderBar from './SliderBar.vue';

onMounted(() => {
    store.addSlider();

    // every 3 seconds add a slider
    setInterval(() => {
        if (sliders.length < 3) {
            store.addSlider();
        }
    }, 3000);
});

const handleClick = () => {
    const hits = sliders[0].checkHits();
    console.log('found hits', hits)

    if (hits > 0) {
        // store.removeSlider();
        sliders[0].handleHit();
    } else {
        // sliders[0].handleMiss();
    }
};

</script>

<template>
    <div class="screenz">
        {{ store.maxClickCombo}}
        <SliderBar v-for="(slider, index) in sliders" :key="slider" style="position: absolute;" :slider="slider" :style="{
        'opacity': 1 - index / 3,
        'z-index': 100 - index
    }" />

        <div>
            s{{ store.maxClickCombo }}
            <br>
            <span v-for="i in store.clickCombo" :key="i">
                <span :style="'font-size: 2rem; ' +
        'transition: all 0.5s linear; ' +
        'filter: hue-rotate(' + store.clickCombo * 25 + 'deg); ' +
        'z-index: -1; '
        ">🔥</span>
            </span>
        </div>


        <button class="btn" @click="handleClick">x</button>
    </div>
</template>

<style>
:root {
    --primary: #cc00ff;
}

.btn {
    width: 10rem;
    height: 10rem;
    position: fixed;
    bottom: 0.5rem;
    /* background: rgba(0, 0, 0, 0.5); */
    background: white;
    border: 1px solid var(--primary);
    color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>