<script setup>
import { ref } from 'vue';
// import MirrorGame from './components/MirrorGame.vue';
// import AlignGame from './components/AlignGame.vue';
// import GameBoard from './components/GameBoard.vue';
import SliderClick from './components/SliderClick.vue';
import JustSlider from './components/JustSlider.vue';
import CharacterRing from './components/CharacterRing.vue';

const currentGame = ref('JustSlider');
const games = ['CharacterRing', 'MirrorGame', 'AlignGame', 'SliderClick', 'JustSlider', ];
</script>

<template>
    <div class="screen">
        <div class="game-options">
            <button v-for="game in games" @click="currentGame = game">{{ game }}</button>
        </div>

        <!-- <MirrorGame class="game"/> -->
        <!-- <AlignGame v-if="currentGame === 'AlignGame'" class="game" /> -->
        <SliderClick v-if="currentGame === 'SliderClick'" class="game" />
        <JustSlider v-if="currentGame === 'JustSlider'" class="game" />
        <CharacterRing v-if="currentGame === 'CharacterRing'" class="game" />
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
    /* background-color: #123; */
    background-color: rgb(249, 253, 255);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    /* make it fullscreen */
}
.game-options {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    display: flex;
    justify-content: space-around;

    z-index: 1;
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
