<script setup>
import { ref } from 'vue'
// props
const props = defineProps({
    cells: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="board">
        <div class="cell" v-for="cell in cells">
            <div>
                <span class="health" v-for="hp in cell.health">
                    |
                </span>
                <span class="health--missing" v-for="hp in (10 - cell.health)">
                    |
                </span>
            </div>

            <div>
                {{ cell.value }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.board {
    border: 1px solid #234;
    width: 70vw;
    height: 70vw;
    display: flex;
    flex-wrap: wrap;
}

.cell {
    border: 1px solid #234;
    flex: 1 1 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.health {
    color: greenyellow;
}

.health--missing {
    color: maroon;
}

.health,
.health--missing {
    letter-spacing: -2.5px;
}
</style>