<script setup lang="ts">
import { reactive, ref } from "vue";
import { createGame } from "@/services/volleyBallService";

const form = reactive({
  opponent: "",
  court: "",
  gameDate: "",
  gameTime: "",
});

const isSubmitting = ref(false);
const statusMessage = ref("");
const errorMessage = ref("");

async function submitGame() {
  isSubmitting.value = true;
  statusMessage.value = "";
  errorMessage.value = "";

  try {
    await createGame({
      opponent: form.opponent.trim(),
      court: Number(form.court),
      gameDate: new Date(`${form.gameDate}T${form.gameTime}`),
      gameTime: form.gameTime,
    });

    form.opponent = "";
    form.court = "";
    form.gameDate = "";
    form.gameTime = "";
    statusMessage.value = "Game added successfully.";
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "Unable to add the game. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h1 class="card-title text-2xl">Add a game</h1>
      <p>Enter the details for an upcoming volleyball game.</p>

      <form class="mt-2 space-y-4" @submit.prevent="submitGame">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Opponent</legend>
          <input
            v-model="form.opponent"
            class="input w-full"
            type="text"
            required
            autocomplete="off"
          />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Court</legend>
          <input v-model="form.court" class="input w-full" type="number" min="1" step="1" required />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Date</legend>
          <input v-model="form.gameDate" class="input w-full" type="date" required />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Time</legend>
          <input v-model="form.gameTime" class="input w-full" type="time" required />
        </fieldset>

        <div v-if="errorMessage" class="alert alert-error" role="alert">
          <span>{{ errorMessage }}</span>
        </div>
        <div v-if="statusMessage" class="alert alert-success" role="status">
          <span>{{ statusMessage }}</span>
        </div>

        <div class="card-actions justify-end">
          <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? "Adding game..." : "Add game" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
