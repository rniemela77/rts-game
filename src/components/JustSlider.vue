<script setup>
import { ref, onMounted, computed, defineEmits } from 'vue';
import { store, sliders } from './SliderStore';
import  SliderBar  from './SliderBar.vue';

// after 3 seconds, add a slider

</script>

<template>
    <div class="screenz">
        <SliderBar v-for="slider in sliders"/>

        <div>
            {{ store.maxClickCombo }}
            <br>
            <span v-for="i in store.clickCombo" :key="i">
                <span :style="'font-size: 2rem; ' +
            'transition: all 0.5s linear; ' +
            'filter: hue-rotate(' + store.clickCombo * 25 + 'deg); ' +
            'z-index: -1; '
            ">🔥</span>
            </span>
        </div>



    </div>
</template>

<style>
.btn {
    width: 50%;
    height: 20%;
    position: fixed;
    bottom: 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(230, 230, 230, 0.4);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>