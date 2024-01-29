<script setup>
import { computed, ref, reactive } from 'vue';
import GameBoard from './components/GameBoard.vue'

const cells = reactive([
  { id: 1, value: 'Enemy', health: 9, },
  { id: 2, value: 'You', health: 9 },
]);


// sliding bar
const sliderValue = ref(50);
const sliderDirection = ref(1);
const sliderSpeed = ref(2);
const fps = 30;
const sliderCss = computed(() => {
  return `bottom: ${sliderValue.value}%; 
  box-shadow: 0 ${sliderDirection.value > 0 ? '7' : '-7'}px 10px 3px rgba(255, 0, 0, 0.3); `;
});
// animation
setInterval(() => {
  if (sliderValue.value >= 100) {
    sliderDirection.value = -1;
  } else if (sliderValue.value <= 0) {
    sliderDirection.value = 1;
  }
  sliderValue.value += sliderDirection.value * sliderSpeed.value;
}, 1000 / fps);
const resetSlider = () => {
  sliderValue.value = 50;
  sliderDirection.value = Math.random() > 0.5 ? 1 : -1;
};

// critical zones
const criticalZones = reactive([
  [25, 45],
  [95, 100],
  [5, 15]
]);
const criticalZoneStyles = computed(() => {
  return criticalZones.map((zone) => {
    return `height: ${zone[1] - zone[0]}%; bottom: ${zone[0]}%; `;
  });
});
const getNewZones = () => {
  criticalZones.forEach((zone, index) => {
    const newZone = [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ].sort((a, b) => a - b);
    criticalZones[index] = newZone;
  });
};



// Firing
const isFiring = ref(false);
const damageEnemy = () => {
  cells[0].health -= 1;
  if (cells[0].health <= 0) {
    message.value = 'you win!';
  }
  isFiring.value = false;
};
const fireBullet = () => {
  message.value = 'firing';
  // create line element
  const line = document.createElement('div');

  line.style.position = 'absolute';
  line.style.top = '2rem';
  line.style.left = 'calc(50% - 2px)';
  line.style.width = '4px';
  line.style.height = '10rem';
  line.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  line.style.background = 'white';
  line.style.zIndex = '1000';
  line.style.opacity = '1';
  line.style.boxShadow = '0 0 10px 5px rgba(255, 0, 0, 0.5)';

  document.body.appendChild(line);

  setTimeout(() => {
    line.style.opacity = '0';
    line.style.background = 'red';
    line.style.boxShadow = '0 0 1px 1px rgba(255, 0, 0, 0.5)';
  }, 200);

  setTimeout(() => {
    line.remove();
    message.value = line;
  }, 500);
}

const handleClick = () => {
  if (!isFiring.value) {
    isFiring.value = true;
    return;
  }

  // if already firing
  criticalZones.forEach((zone) => {
    if (
      sliderValue.value >= zone[0] &&
      sliderValue.value <= zone[1]
    ) {
      sliderValue.value = 0;
      message.value = 'critical zone hit!';
      getNewZones();
      resetSlider();
      damageEnemy();
      fireBullet();
    }
  })
};

const message = ref('saved');

const cards = reactive([
  { id: 1, title: 'Attack' },
  { id: 2, title: 'Defend' },
  { id: 3, title: 'Heal' },
  { id: 4, title: 'Run' },
]);
</script>

<template>
  <div class="screen">
    <GameBoard :cells="cells" />


    <div class="click-bar" v-if="isFiring">
      <div class="click-bar_current" ref="click-bar-current" :style="sliderCss">
        {{ sliderValue }}
      </div>
      <div class="click-bar_critical-zone" v-for="(zone, index) in criticalZones" :style="criticalZoneStyles[index]">
      </div>
    </div>

    {{ message }}

    <div class="cards">
      <div class="card" @click="handleClick" v-for="card in cards" :key="card.id">
        {{ card.title }}
      </div>
    </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 5%;
}

.button {
  /* border: none; */
  border: 1px solid #448;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 20px;
  /* cursor: pointer; */
  width: 90%;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button:active {
  background-color: #448;
}

.click-bar {
  width: 10vw;
  height: 100%;
  border: 1px solid #478;
  position: relative;
}

.click-bar_critical-zone {
  background: rgba(255, 253, 111, 0.374);
  /*  */

  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.click-bar_current {
  width: 120%;
  position: absolute;
  bottom: 0;
  left: -10%;
  height: 0.2rem;
  transform: translateY(15%);
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cards {
  display: flex;
  width: 100%;
}

.card {
  border: 1px solid #478;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

/* upwards glowing effect on sides */
.screen:after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 30vh;
  background: linear-gradient(90deg, #006aff 0%, transparent 3%, transparent 97%, #006aff 100%);
  animation: slide 2s ease-in-out infinite;
  opacity: 0.3;
}

@keyframes slide {
  0% {
    transform: translateY(110vh);
    opacity: 0;
    height: 0;
  }

  50% {
    opacity: 0.1;
    height: 100vh;
  }

  100% {
    transform: translateY(-10vh);
    opacity: 0;
    height: 0;
  }
}
</style>
