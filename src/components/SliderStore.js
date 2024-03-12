// store.js
import { reactive } from 'vue'

export const store = reactive({
    fps: 30,
    clickCombo: 3,
    maxClickCombo: 5,
    removeSlider() {
        sliders.shift();
    },
    addSlider() {
        slider.duplicate();
    },
    addToClickCombo() {
        this.clickCombo += 1;

        if (this.clickCombo > this.maxClickCombo) {
            // this.maxClickCombo = this.clickCombo;
        }
    },
    resetClickCombo() {
        this.clickCombo = 0;
    },
})

export const slider = {
    speed: 0,
    acceleration: 0,
    position: 0,
    angle: 0,
    criticalZoneSize: 20,
    criticalZones: [
        [25, 45]
    ],
    hitEffect: false,
    handleHit() {
        store.removeSlider();
        store.addSlider();
        store.addToClickCombo();
    },
    createHitMarker() {
        return;
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
        const markerPosition = slider.position > 100 ? 95 : slider.position;
        marker.style.top = `${markerPosition}%`;

        // remove the marker after 1s
        setTimeout(() => {
            marker.remove();
        }, 500);
    },
    handleMiss() {
        console.log('missed')
        this.createHitMarker();
        store.resetClickCombo();
        this.resetCriticalZones();
        this.resetPosition();
        this.resetAcceleration();
        this.resetSpeed();
        this.resetAngle();
    },
    animateSlider() {
    },
    showHitEffect() {
        this.hitEffect = true;
        setTimeout(() => {
            this.hitEffect = false;
        }, 100);
    },
    checkHits() {
        let hits = 0;
        this.criticalZones.forEach(zone => {
            console.log('checking zone...');
            if (this.position >= zone[0] && this.position <= zone[1]) {
                hits += 1;
            }
        });
        return hits;
    },
    duplicate() {
        // clone this slider
        const newSlider = Object.assign({}, this);

        // reset some values
        newSlider.resetPosition();
        newSlider.resetAcceleration();
        newSlider.resetSpeed();
        newSlider.resetAngle();
        newSlider.resetCriticalZones();

        // add the new slider to the beginning of the sliders array
        sliders.push(newSlider);
    },
    resetPosition() {
        this.position = 0;
    },
    resetAcceleration() {
        this.acceleration = 1.05;
    },
    resetSpeed() {
        this.speed = 0.2;
    },
    resetAngle() {
        this.angle = Math.random() * 360;
    },
    resetCriticalZones() {
        this.criticalZones = [];

        // random number between 1 and 4
        const random = Math.floor(Math.random() * 4) + 1;

        for (let i = 0; i < random; i++) {
            this.createCriticalZone(Math.random() * (100 - this.criticalZoneSize));
        }
    },
    createCriticalZone() {
        const firstValue = Math.random() * (100 - this.criticalZoneSize);
        this.criticalZones.push([
            firstValue,
            firstValue + this.criticalZoneSize
        ].sort((a, b) => a - b));
    }
};

export const sliders = reactive([]);