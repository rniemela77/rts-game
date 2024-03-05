<script setup>
import { ref, onMounted, reactive } from 'vue';

const options = ref['🪨', '📄', '✂️'];

const cells = reactive([
    { value: '🪨', health: 5, ownedBy: 'enemy' },
    { value: '', health: 3 },
    { value: '', health: 7 },
    { value: '', health: 2 },
    { value: '', health: 9 },
    { value: '', health: 1 },
    { value: '', health: 4 },
    { value: '', health: 6 },
    { value: '', health: 8 },
    { value: '🪨', health: 10, ownedBy: 'player' }
]);

// place a character on the last cell by changing it's "value" to an emoji
const initializeGame = () => {
};

const moveCharacter = () => {
    // for each cell, if it's owned by the player, move it to the next cell
    cells.forEach((cell, index) => {
        if (cell.ownedBy === 'player') {
            // move the cell up
            if (index > 0) {
                cells[index - 1].value = cell.value;
                cells[index].value = '';
                cells[index - 1].ownedBy = 'player';
                cells[index].ownedBy = '';
            }
            // check for collision
            if (cells[index - 1].ownedBy === 'enemy') {
                // if there's a collision with rock, eliminate both
                if (cell.value === '🪨') {
                    cells[index - 1].value = '';
                    cells[index - 1].ownedBy = '';
                    cell.value = '';
                    cell.ownedBy = '';
                }
                // if there's a collision with paper, eliminate the enemy
                if (cell.value === '📄') {
                    cells[index - 1].value = cell.value;
                    cells[index].value = '';
                    cells[index - 1].ownedBy = 'player';
                    cells[index].ownedBy = '';
                }
                // if there's a collision with scissors, eliminate the player
                if (cell.value === '✂️') {
                    cells[index].value = '';
                    cells[index].ownedBy = '';
                }
            }
        }
    });

    // for each cell, if it's owned by the enemy, move it to the next cell
    const cellsReversed = [...cells].reverse();
    cellsReversed.forEach((cell, index) => {
        if (cell.ownedBy === 'enemy') {
            // move the cell down
            if (index > 0) {
                cells[cells.length - index].value = cell.value;
                cells[cells.length - index - 1].value = '';
                cells[cells.length - index].ownedBy = 'enemy';
                cells[cells.length - index - 1].ownedBy = '';
            }
        }
    });

};

const createCharacter = () => {
    cells[cells.length - 1].value = '🏵';
    cells[cells.length - 1].ownedBy = 'player';
};

onMounted(() => {
    initializeGame();

    // every 1s, move character
    setInterval(() => {
        moveCharacter();
    }, 1000);
});
</script>

<template>
    <div>
        <div class="grid">
            <div class="cell" v-for="cell in cells">
                <div>
                    {{ cell.value }}
                </div>
            </div>
        </div>

        <button @click="createCharacter">Create</button>
    </div>
</template>

<style>
.grid {
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
    font-size: 4vh;
}
</style>