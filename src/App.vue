<script setup>
// import MirrorGame from './components/MirrorGame.vue';
// import AlignGame from './components/AlignGame.vue';
// import GameBoard from './components/GameBoard.vue';
// import SliderClick from './components/SliderClick.vue';
import JustSlider from './components/JustSlider.vue';
</script>

<template>
    <div class="screen">
        <!-- <MirrorGame class="game"/> -->
        <!-- <AlignGame class="game" /> -->
        <!-- <GameBoard class="game" /> -->
        <!-- <SliderClick class="game" /> -->
        <JustSlider class="game" />
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
    user-select: none;
}

.screen {
    width: 100%;
    height: 100%;
    background-color: #123;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    /* make it fullscreen */
}

.game {
    width: 100%;
    height: 100dvh;
    display: flex;
    /* justify-content: space-between; */
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
