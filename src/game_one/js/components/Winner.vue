<template>
	<div class="winner">
    <div class="flex flex_space-between flex_align-baseline">
        <div v-for="(player, index) in players" :key="index" class="winner__player">
          <div class="winner__score flex">
            <template v-if="!hideValues" >
              <div :class="{
              'winner__value': true,
              'winner__value_type-winner': player.state === 'winner'
            }">{{ player.value }}</div>
            </template>
              <div v-if="player.state === 'winner' && !isDeadHeat" class="winner_cup"></div>
          </div>
      <div class="winner__name">
        {{  player.name }}
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
    },
    isDeadHeat: {
      type: Boolean
    },
    hideValues: {
      type: Boolean
    }
  }
}
</script>
