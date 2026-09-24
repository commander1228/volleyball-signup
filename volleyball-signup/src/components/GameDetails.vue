<script setup lang="ts">
import type { GameDetailsResponse } from "@/types/volleyball";

defineProps<{
  game: GameDetailsResponse;
}>();
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
    </div>
  </article>
</template>
