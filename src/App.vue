<template>
  <h1 class="py-6 text-3xl font-semibold text-white">Tic Tac Toe</h1>
  <div class="flex flex-col items-center">
    <div class="rounded-lg bg-white p-8 shadow-xl">
      <div class="mb-2 w-full">
        <div
          v-for="(p, i) in players"
          :key="i"
          class="mb-2 flex w-full items-center justify-between"
        >
          <div class="flex grow items-center gap-2">
            <div
              class="flex aspect-square h-10 items-center justify-center rounded-md bg-gray-300"
            >
              <fa-icon
                :icon="['fas', p.symbol]"
                :class="'text- text-2xl' + p.color"
              />
            </div>
            <input
              v-model="p.name"
              :placeholder="p.defaultName"
              class="rounded-lg bg-gray-300 px-4 py-2 shadow-inner outline-none ring-gray-400 transition placeholder:text-black focus:ring-2"
            />
          </div>
          <p class="text-xl">{{ p.score }}</p>
        </div>
        <p class="text-lg">{{ statusMessage }}</p>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <square
          v-for="i in 9"
          :key="i"
          :num="i"
          :value="getGridValue(i)"
          @click="handleSquareClick(i)"
        />
      </div>
      <button
        v-if="gameOver"
        class="mt-4 w-full rounded-md bg-gray-300 text-2xl text-gray-700 shadow-inner"
        @click="newGame"
      >
        Rematch
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import Square from "./components/Square.vue";

  class Player {
    defaultName!: string;
    name!: string;
    score = 0;
    symbol!: string;
    color!: string;

    constructor(name: string, symbol: string, color: string) {
      this.defaultName = name;
      this.name = name;
      this.symbol = symbol;
      this.color = color;
    }
  }

  const currentPlayerTurn = ref(0);
  const gameOver = ref(false);
  const winner = ref<Player | null>();
  const grid = ref<string[]>(Array(9).fill(""));
  const players = ref<Player[]>([
    new Player("Player 1", "x", "red-500"),
    new Player("Player 2", "o", "blue-500"),
  ]);

  const currentPlayer = () => players.value[currentPlayerTurn.value];
  const getGridValue = (i: number) => grid.value[i - 1];

  const handleSquareClick = (i: number) => {
    if (gameOver.value || grid.value[i - 1]) return;

    grid.value[i - 1] = currentPlayer().symbol;
    currentPlayerTurn.value = currentPlayerTurn.value == 0 ? 1 : 0;
    const winRes = checkWinner();
    if (winRes) {
      winner.value =
        winRes == "x"
          ? players.value[0]
          : winRes == "o"
          ? players.value[1]
          : null;
      if (winner.value) winner.value.score++;
      gameOver.value = true;
    }
  };

  const newGame = () => {
    grid.value = Array(9).fill("");
    gameOver.value = false;
    winner.value = null;
  };

  const statusMessage = computed(() => {
    if (!gameOver.value) {
      return `It's ${
        currentPlayer().name || currentPlayer().defaultName
      }'s turn`;
    }

    if (winner.value) {
      return `${winner.value.name} won!`;
    }
    return "Nobody won.  It's a draw.";
  });

  const winChecks = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  const checkWinner = () => {
    for (const c of winChecks) {
      const res = checkWin(c);
      if (res) return res;
    }
    return grid.value.every((v) => v);
  };

  const checkWin = (c: number[]) => {
    const val = grid.value[c[0]];
    if (val == "") return;
    for (let i = 1; i < c.length; i++) {
      if (grid.value[c[i]] != val) return;
    }
    return val;
  };

  const updateBackgroundcolor = () => {
    const appEl = document.getElementById("app");
    appEl?.classList.remove("bg-blue-500", "bg-red-500");
    appEl?.classList.add(
      currentPlayerTurn.value == 0 ? "bg-red-500" : "bg-blue-500"
    );
  };

  watch(currentPlayerTurn, updateBackgroundcolor);
  updateBackgroundcolor();
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
    @apply h-screen transition-colors duration-300;
  }
</style>
