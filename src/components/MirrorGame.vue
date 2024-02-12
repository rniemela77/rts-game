<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const dragged = ref(null);
const dragger = ref(null);
const draggedStyle = ref({ top: '50%', left: '50%' });
const draggerStyle = ref({ top: '50%', left: '50%' });
const isDragging = ref(false);

const onClick = (e) => {
    // move the dragger to the click position
    draggerStyle.value = {
        top: e.clientY + 'px',
        left: e.clientX + 'px'
    };

    // move the dragged to the opposite position relative to the middle of the screen
    draggedStyle.value = {
        top: (window.innerHeight - e.clientY) + 'px',
        left: e.clientX + 'px'
    };
};
</script>

<template>
    <div class="full-screen">
        <div class="half top">
            <div class="dragged draggable" ref="dragged" :style="draggedStyle"></div>
        </div>
        <div class="half bottom" @click="onClick">
            <div class="dragger draggable" ref="dragger" :style="draggerStyle"></div>
        </div>
    </div>
</template>

<style scoped>
.half {
    height: 50vh;
    width: 100vw;
}
.top {
    background: rgb(176, 205, 233);
}
.draggable {
    width: 1rem;
    height: 1rem;
    background: rgb(164, 65, 65);
    position: fixed;
    transition: all 556ms ease-in-out;
    transform: translate(-50%, -50%);
}
.dragger {
}
.dragged {

}
</style>