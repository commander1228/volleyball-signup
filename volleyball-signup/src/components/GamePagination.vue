<script setup lang="ts">
import type { GameDateResponse } from "@/types/volleyball";

defineProps<{
  games: GameDateResponse[];
}>();

function formatGameDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
</script>

<template>
  <nav class="overflow-x-auto" aria-label="Game dates">
    <div class="join">
      <button v-for="game in games" :key="game.gameId" class="btn join-item whitespace-nowrap" type="button">
        {{ formatGameDate(game.date) }}
      </button>
    </div>
  </nav>
</template>
