<script setup>
import { ref, onMounted } from 'vue';


const image1 = ref(null);
const image2 = ref(null);
const image3 = ref(null);



onMounted(() => {
    // randomize the position of each image on the screen
    image1.value.style.top = Math.random() * 100 + '%';
    image1.value.style.left = Math.random() * 100 + '%';
    image2.value.style.top = Math.random() * 100 + '%';
    image2.value.style.left = Math.random() * 100 + '%';
    image3.value.style.top = Math.random() * 100 + '%';

    // create a random target on the screen
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const target = document.createElement('div');
    target.style.width = '10px';
    target.style.height = '10px';
    target.style.background = 'red';
    target.style.position = 'fixed';
    target.style.top = y + 'px';
    target.style.left = x + 'px';
    document.body.appendChild(target);

    setInterval(() => {
        // find the distance between target and image
        const x1 = parseFloat(image1.value.style.left) - x;
        const y1 = parseFloat(image1.value.style.top) - y;
        // const distance1 = Math.sqrt(x1 * x1 + y1 * y1);
        // const image1move = 10 / distance1;
        // image1.value.style.top = parseFloat(image1.value.style.top) + y1 * image1move + 'px';
        // image1.value.style.left = parseFloat(image1.value.style.left) + x1 * image1move + 'px';
    }, 500);
});
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

    mix-blend-mode:color-dodge;
    /* transform: translate(-50%, -50%); */
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