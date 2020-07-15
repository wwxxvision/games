<template>
	<div class="winner">
    <div class="flex flex_space-between flex_align-baseline">
    <div v-for="(player, index) in players" :key="index" class="winner__player">
      <div class="winner__score flex">
        <div :class="{'winner__value': true, 'winner__value_type-winner': player.state === 'winner'}">{{ player.value }}</div>
        <div v-if="player.state === 'winner'" class="winner_cup">
      </div>
      </div>
      <div class="winner__name">
        Player {{ index + 1 }}
      </div>
    </div>
    </div>
  </div>
</template>;

<script>
export default {
  props: {
    players: {
      type: Array
    }
  }
}
</script>
