<script setup>
// import MirrorGame from './components/MirrorGame.vue';
import AlignGame from './components/AlignGame.vue';
</script>

<template>
    <div class="screen">
        <!-- <MirrorGame class="game"/> -->
        <AlignGame class="game" />
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
    height: 100vh;
}

.game {
    width: 100%;
    height: 100%;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    flex-direction: column;
}
</style>
