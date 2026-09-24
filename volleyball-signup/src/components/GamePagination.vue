<script setup lang="ts">
import type { GameDateResponse } from "@/types/volleyball";

defineProps<{
  games: GameDateResponse[];
  selectedGameId?: number;
}>();

const emit = defineEmits<{
  select: [gameId: number];
}>();

function formatGameDate(date: string) {
  const datePart = date.split("T")[0];

  if (datePart === undefined) {
    return date;
  }

  const [year, month, day] = datePart.split("-").map(Number);

  if (year === undefined || month === undefined || day === undefined) {
    return date;
  }

  const localDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(undefined, {
    month: "2-digit",
    day: "2-digit",
  }).format(localDate);
}
</script>

<template>
  <nav class="grid grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] gap-2" aria-label="Game dates">
      <button
        v-for="game in games"
        :key="game.gameId"
        class="btn w-full whitespace-nowrap"
        :class="{ 'btn-primary': game.gameId === selectedGameId }"
        type="button"
        @click="emit('select', game.gameId)"
      >
        {{ formatGameDate(game.date) }}
      </button>
  </nav>
</template>
