<script setup lang="ts">
import { onMounted, ref } from "vue";
import GamePagination from "@/components/GamePagination.vue";
import { getGameDates } from "@/services/volleyBallService";
import type { GameDateResponse } from "@/types/volleyball";

const games = ref<GameDateResponse[]>([]);
const isLoadingGames = ref(true);
const gamesError = ref("");

async function loadGames() {
  isLoadingGames.value = true;
  gamesError.value = "";

  try {
    games.value = await getGameDates();
  } catch (error) {
    gamesError.value =
      error instanceof Error ? error.message : "Unable to load game dates. Please refresh the page.";
  } finally {
    isLoadingGames.value = false;
  }
}

onMounted(loadGames);
</script>

<template>
  <section class="mx-auto my-16 w-full max-w-2xl space-y-6 px-6">
    <div v-if="isLoadingGames" class="flex justify-center">
      <span class="loading loading-spinner loading-md" aria-label="Loading game dates"></span>
    </div>
    <div v-else-if="gamesError" class="alert alert-error" role="alert">
      <span>{{ gamesError }}</span>
    </div>
    <GamePagination v-else-if="games.length" :games="games" />
    <div v-else class="alert">
      <span>No games have been added yet.</span>
    </div>
  </section>
</template>