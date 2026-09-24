<script setup lang="ts">
import { ref } from "vue";
import type { Attendance, GameDetailsResponse } from "@/types/volleyball";

defineProps<{
  game: GameDetailsResponse;
  isAddingPlayer: boolean;
  updatingAttendancePlayerId: number | null;
}>();

const emit = defineEmits<{
  addPlayer: [name: string];
  changeAttendance: [playerId: number, attendance: Attendance];
}>();

const isPlayerModalOpen = ref(false);
const playerName = ref("");

const attendanceLabels: Record<Attendance, string> = {
  UNDECIDED: "Undecided",
  NOT_GOING: "Not going",
  MAYBE: "Maybe",
  GOING: "Going",
};

const attendanceBadgeClasses: Record<Attendance, string> = {
  UNDECIDED: "badge-ghost",
  NOT_GOING: "badge-error",
  MAYBE: "badge-warning",
  GOING: "badge-success",
};

function changeAttendance(event: Event, playerId: number) {
  const target = event.target;

  if (target instanceof HTMLSelectElement) {
    emit("changeAttendance", playerId, target.value as Attendance);
  }
}

function submitPlayer() {
  const name = playerName.value.trim();

  if (!name) {
    return;
  }

  emit("addPlayer", name);
  playerName.value = "";
  isPlayerModalOpen.value = false;
}
</script>

<template>
  <article class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl">Game details</h2>
      <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <dt class="text-sm text-base-content/70">Opponent</dt>
          <dd class="font-semibold">{{ game.opponent }}</dd>
        </div>
        <div>
          <dt class="text-sm text-base-content/70">Time</dt>
          <dd class="font-semibold">{{ game.gameTime }}</dd>
        </div>
        <div>
          <dt class="text-sm text-base-content/70">Court</dt>
          <dd class="font-semibold">{{ game.court }}</dd>
        </div>
      </dl>

      <div class="divider">Players</div>

      <div v-if="game.players.length" class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div v-for="player in game.players" :key="player.playerId" class="card border border-base-300">
          <div class="card-body gap-1 p-4">
            <h3 class="font-semibold">{{ player.playerName }}</h3>
            <div class="flex items-center gap-2 text-sm">
              <span>Attendance:</span>
              <span class="badge badge-sm" :class="attendanceBadgeClasses[player.attendanceStatus]">
                {{ attendanceLabels[player.attendanceStatus] }}
              </span>
            </div>
            <label class="fieldset">
              <span class="fieldset-legend">Change attendance</span>
              <select
                class="select select-sm w-full"
                :value="player.attendanceStatus"
                :disabled="updatingAttendancePlayerId === player.playerId"
                @change="changeAttendance($event, player.playerId)"
              >
                <option v-for="(label, status) in attendanceLabels" :key="status" :value="status">
                  {{ label }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <p v-else class="text-base-content/70">No players have been added yet.</p>

      <div class="card-actions justify-end">
        <button
          class="btn btn-primary"
          type="button"
          :disabled="isAddingPlayer"
          @click="isPlayerModalOpen = true"
        >
          {{ isAddingPlayer ? "Adding player..." : "Add player" }}
        </button>
      </div>
    </div>

    <dialog class="modal" :class="{ 'modal-open': isPlayerModalOpen }">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add player</h3>
        <p class="py-2 text-base-content/70">Enter the player's name to add them to the roster.</p>

        <form class="space-y-4" @submit.prevent="submitPlayer">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Player name</legend>
            <input
              v-model="playerName"
              class="input w-full"
              type="text"
              required
              autocomplete="off"
              autofocus
            />
          </fieldset>

          <div class="modal-action">
            <button class="btn" type="button" @click="isPlayerModalOpen = false">Cancel</button>
            <button class="btn btn-primary" type="submit">Add player</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button type="button" @click="isPlayerModalOpen = false">Close</button>
      </form>
    </dialog>
  </article>
</template>
