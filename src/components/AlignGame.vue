<script setup>
import { ref, onMounted, reactive } from 'vue';

const image1 = ref(null);
const image2 = ref(null);
const image3 = ref(null);
const images = reactive([image1, image2, image3]);

const createTarget = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const target = document.createElement('div');
    target.classList.add('target');
    target.style.width = '10px';
    target.style.height = '10px';
    target.style.background = 'red';
    target.style.position = 'fixed';
    target.style.top = y + 'px';
    target.style.left = x + 'px';
    document.body.appendChild(target);
};

// on click, remove all targets
window.addEventListener('click', () => {
    clearTargets();
    createTarget();
    randomizeImagePositions();
});

const randomizeImagePositions = () => {
    images.forEach(image => {
        image.value.style.top = Math.random() * 100 + '%';
        image.value.style.left = Math.random() * 100 + '%';
    });
};

const clearTargets = () => {
    const targets = document.querySelectorAll('.target');
    targets.forEach(target => target.remove());
};

onMounted(() => {
    randomizeImagePositions();
    clearTargets();
    createTarget();
});

window.addEventListener('mousemove', (e) => {
    images.forEach(image => moveImageToTarget(image.value));
});

const moveImageToTarget = (image) => {
    // find location of image
    const x1 = image.getBoundingClientRect().x;
    const y1 = image.getBoundingClientRect().y;

    // find location of target
    const target = document.querySelector('.target');
    if (!target) return;
    const targetX = target.getBoundingClientRect().x;
    const targetY = target.getBoundingClientRect().y;

    // move image towards the target
    const dx1 = targetX - x1;
    const dy1 = targetY - y1;
    const angle1 = Math.atan2(dy1, dx1);
    image.style.left = x1 + Math.cos(angle1) + 'px';
    image.style.top = y1 + Math.sin(angle1) + 'px'; 
};

</script>

<template>
    <div>
        <div class="image image-1" ref="image1"></div>
        <div class="image image-2" ref="image2"></div>
        <div class="image image-3" ref="image3"></div>
    </div>
</template>

<style scoped>
.image {
    width: 100px;
    height: 100px;
    position: fixed;
    background: black;
    top: 50%;
    left: 50%;

    mix-blend-mode: lighten;
}
.image-1 {
    background: red;
}
.image-2 {
    background: green;
}
.image-3 {
    background: blue;
}
</style>