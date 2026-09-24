<script setup lang="ts">
import { onMounted, ref } from "vue";
import GameDetails from "@/components/GameDetails.vue";
import GamePagination from "@/components/GamePagination.vue";
import { getGameDates, getGameDetails } from "@/services/volleyBallService";
import type { GameDateResponse, GameDetailsResponse } from "@/types/volleyball";

const games = ref<GameDateResponse[]>([]);
const isLoadingGames = ref(true);
const gamesError = ref("");
const selectedGame = ref<GameDetailsResponse | null>(null);
const isLoadingDetails = ref(false);
const detailsError = ref("");

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

async function loadGameDetails(gameId: number) {
  isLoadingDetails.value = true;
  detailsError.value = "";

  try {
    selectedGame.value = await getGameDetails(gameId);
  } catch (error) {
    selectedGame.value = null;
    detailsError.value =
      error instanceof Error ? error.message : "Unable to load game details. Please try again.";
  } finally {
    isLoadingDetails.value = false;
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
    <GamePagination
      v-else-if="games.length"
      :games="games"
      :selected-game-id="selectedGame?.id"
      @select="loadGameDetails"
    />
    <div v-else class="alert">
      <span>No games have been added yet.</span>
    </div>

    <div v-if="isLoadingDetails" class="flex justify-center">
      <span class="loading loading-spinner loading-md" aria-label="Loading game details"></span>
    </div>
    <div v-else-if="detailsError" class="alert alert-error" role="alert">
      <span>{{ detailsError }}</span>
    </div>
    <GameDetails v-else-if="selectedGame" :game="selectedGame" />
  </section>
</template>