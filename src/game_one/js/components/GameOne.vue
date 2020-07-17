<template>
	<div class="game">
    <Modal v-if="gameState === 'finished'" :title="serverValue" :titleTheme="'blue'">
      <Winner :players="game.players" />
      <template v-slot:footer>
        <Button @clicked="game.play(gameTime)" :title="$translate.t('button.playAgain')" />
      </template>
    </Modal>
    <Progress :gameState="game.getGameState" :timeInSec="15" @getTimerTime="getTimerTime"  />
    <GameScreen v-for="(player, index) in game.players" :key="index" :dir="getScreenDir(player.type)">
      <div class="game__block game__block_size-full_screen">
        <div :class="`game__decor game__decor_type-${player.type}`"></div>
      </div>
      <div class="game__block  flex flex_space-between">
        <InputCustom type="text"
          :readonly="true"
          :text-centered="true"
          :initValue="player.value"
        />
        <InputCustom type="text"
        :readonly="true"
        :text-centered="true"
        :initValue="player.name"  />
      </div>
        <div class="game__block">
          <Range
            @updateValues="updateValues"
            :disabled="player.type === 'enemy' || gameState === 'finished'"
            :initValue="player.value"
            :playerType="player.type"
          />
          </div>
    </GameScreen>
  </div>
</template>;

<script>
import GameScreen from '@/js/components/GameScreen.vue';
import Progress from '@/js/components/Progress.vue';
import Range from '@/js/components/Range.vue';
import InputCustom from '@/js/components/InputCustom.vue';
import Player from '@/js/classes/models/Player';
import Modal from '@/js/components/Modal.vue';
import Helpers from '@/js/classes/core/Helpers';
import Winner from './Winner.vue';
import Button from '@/js/components/Button.vue';
import { Game } from '@/js/classes/models/';
import { gameMixin } from '@/js/mixins/index';

export default {
  name: 'game-one',
  mixins: [gameMixin],
  components: {GameScreen, Progress, Range, InputCustom, Modal, Winner, Button},
  data() {
    return {
      players: [],
      value: 1,
      serverValue: Helpers.randomInteger(1, 1000),
      game: null,
      gameInitValue: 1,
      gameTime: 15 // in seconds
    }
  },
  methods: {
    __validateValue(value) {
      if (value > 1000) {
        value = 1000;
      }

      if (value < 0) {
        value = -value;
      }

      if (value === 0) {
        value = 1;
      }

      return value;
    },
    updateValues(playerType, value) {
      this.game.players.forEach(player => {
        if (player.type === playerType) {
          player.setValue(Number(this.__validateValue(value)));
        }
      });
    },
    getWinner(players) {
      let playersScores = players.map(player => {
        let delta = this.serverValue - player.value;

        if (delta < 0) {
          delta = -delta;
        }

        return {
          ...player,
          score: delta
        }
      });

      let onlyScores = playersScores.map(player => player.score);
      const lessValue = Math.min.apply(null, onlyScores);

      players.find(player => {
        let delta = this.serverValue - player.value;
        if (delta < 0) {
          delta = -delta;
        }

        if (delta === lessValue) {
          player.state = 'winner';
        }

        const deadHeat = players.every(player => player.state === 'winner');

        if (deadHeat) {
          players[Helpers.randomInteger(0, 1)].state = 'default';
        }
      });
    }
  },
}
</script>
