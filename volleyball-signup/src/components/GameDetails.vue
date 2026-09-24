<script setup lang="ts">
import type { Attendance, GameDetailsResponse } from "@/types/volleyball";

defineProps<{
  game: GameDetailsResponse;
  isAddingPlayer: boolean;
  updatingAttendancePlayerId: number | null;
}>();

const emit = defineEmits<{
  addPlayer: [];
  changeAttendance: [playerId: number, attendance: Attendance];
}>();

const attendanceLabels: Record<Attendance, string> = {
  UNDECIDED: "Undecided",
  NOT_GOING: "Not going",
  MAYBE: "Maybe",
  GOING: "Going",
};

function changeAttendance(event: Event, playerId: number) {
  const target = event.target;

  if (target instanceof HTMLSelectElement) {
    emit("changeAttendance", playerId, target.value as Attendance);
  }
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
            <p class="text-sm text-base-content/70">
              Attendance: {{ attendanceLabels[player.attendanceStatus] }}
            </p>
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
        <button class="btn btn-primary" type="button" :disabled="isAddingPlayer" @click="emit('addPlayer')">
          {{ isAddingPlayer ? "Adding player..." : "Add player" }}
        </button>
      </div>
    </div>
  </article>
</template>
