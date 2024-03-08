// store.js
import { reactive } from 'vue'

export const store = reactive({
    fps: 30,
    clickCombo: 0,
    maxClickCombo: 0,
    addToClickCombo() {
        this.clickCombo += 1;

        if (this.clickCombo > this.maxClickCombo) {
            this.maxClickCombo = this.clickCombo;
        }
    },
    resetClickCombo() {
        this.clickCombo = 0;
    },
})

export const sliders = reactive(
    [
        {
            speed: 0,
            acceleration: 0,
            position: 0,
            angle: 0,
            criticalZoneSize: 20,
            criticalZones: [
                [25, 45]
            ],
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
        }
    ]
)