<script setup lang="ts">
import { onMounted, ref } from "vue";
import GameDetails from "@/components/GameDetails.vue";
import GamePagination from "@/components/GamePagination.vue";
import {
  addPlayer,
  changePlayerAttendance,
  getGameDates,
  getGameDetails,
} from "@/services/volleyBallService";
import type { Attendance, GameDateResponse, GameDetailsResponse } from "@/types/volleyball";

const games = ref<GameDateResponse[]>([]);
const isLoadingGames = ref(true);
const gamesError = ref("");
const selectedGame = ref<GameDetailsResponse | null>(null);
const isLoadingDetails = ref(false);
const detailsError = ref("");
const isAddingPlayer = ref(false);
const updatingAttendancePlayerId = ref<number | null>(null);

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

async function addPlayerToGame() {
  const name = window.prompt("Enter the player's name.");

  if (name === null || !name.trim()) {
    return;
  }

  isAddingPlayer.value = true;
  detailsError.value = "";

  try {
    await addPlayer({
      name: name.trim(),
      gender: "MALE",
    });

    if (selectedGame.value) {
      await loadGameDetails(selectedGame.value.id);
    }
  } catch (error) {
    detailsError.value =
      error instanceof Error ? error.message : "Unable to add the player. Please try again.";
  } finally {
    isAddingPlayer.value = false;
  }
}

async function updatePlayerAttendance(playerId: number, attendance: Attendance) {
  if (!selectedGame.value) {
    return;
  }

  const gameId = selectedGame.value.id;
  updatingAttendancePlayerId.value = playerId;
  detailsError.value = "";

  try {
    await changePlayerAttendance({
      attendance,
      playerId,
      gameId,
    });
    await loadGameDetails(gameId);
  } catch (error) {
    detailsError.value =
      error instanceof Error ? error.message : "Unable to update attendance. Please try again.";
  } finally {
    updatingAttendancePlayerId.value = null;
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
    <div v-if="detailsError" class="alert alert-error" role="alert">
      <span>{{ detailsError }}</span>
    </div>
    <GameDetails
      v-if="selectedGame"
      :game="selectedGame"
      :is-adding-player="isAddingPlayer"
      :updating-attendance-player-id="updatingAttendancePlayerId"
      @add-player="addPlayerToGame"
      @change-attendance="updatePlayerAttendance"
    />
  </section>
</template>