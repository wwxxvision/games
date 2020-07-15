<template>
	<div class="game">
    <Modal v-if="gameState === 'finished'" :title="serverValue" :titleTheme="'blue'">
      <Winner :players="players" />
      <template v-slot:footer>
        <Button @clicked="playAgain" :title="$translate.t('button.playAgain')" />
      </template>
    </Modal>
    <Progress :needReset="needReset" @getTimerTime="getTimerTime"  />
    <GameScreen v-for="(player, index) in players" :key="index" :dir="getScreenDir(player.getType())">
      <div class="game__block game__block_size-full_screen">
        <div :class="`game__decor game__decor_type-${player.getType()}`"></div>
      </div>
      <div class="game__block  flex flex_space-between">
        <InputCustom type="text" :readonly="true" :text-centered="true" :initValue="player.value"  />
        <InputCustom type="text" :readonly="true" :text-centered="true" :initValue="getPlayerNameByType(player.type)"  />
      </div>
        <div class="game__block">
          <Range
              @updateValues="updateValues"
              :disabled="player.getType() === 'enemy'"
              :initValue="player.value"
              :playerType="player.getType()"
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

export default {
  name: 'game-one',
  components: {GameScreen, Progress, Range, InputCustom, Modal, Winner, Button},
  data() {
    return {
      players: [],
      value: 1,
      serverValue: Helpers.randomInteger(1, 1000),
      gameState: 'play',
      needReset: false,
    }
  },
  created() {
    this.players = [new Player('player'), new Player('enemy')];
    this.players.forEach(player => player.setValue(this.value))
  },
  mounted() {
    this.players.forEach(player => {
      if (player.type === 'enemy') {
        player.value = Helpers.randomInteger(1, 1000);
      }
    })
  },
  methods: {
    getPlayerNameByType(playerType) {
      switch(playerType) {
        case 'player':
          return this.$translate.t('names.mainPlayer');
        case 'enemy':
          return this.$translate.t('names.enemy');
      }
    },
    getScreenDir(playerType) {
      switch(playerType) {
        case 'player':
          return 'left';
        case 'enemy':
          return 'right';

        default:
          return 'left';
      }
    },
    reset() {
      this.players.forEach(player => player.reset());
      this.needReset = !this.needReset;
      this.players.forEach(player => {
        if (player.type === 'enemy') {
          player.value = Helpers.randomInteger(1, 1000);
        }
      })
    },
    playAgain() {
      this.gameState = 'play';
      this.reset();
    },
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
      this.players.forEach(player => {
        if (player.type === playerType) {
          player.setValue(Number(this.__validateValue(value)));
        }
      })
    },
    getTimerTime(value) {
      if (value === 0) {
        this.gameState = 'finished';
      }
    },
    getWinner() {
      let playersScores = this.players.map(player => {
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

      this.players.find(player => {
        let delta = this.serverValue - player.value;
        if (delta < 0) {
          delta = -delta;
        }

        if (delta === lessValue) {
          player.state = 'winner';
        }
      });
    }
  },
  watch: {
    gameState(state) {
      switch(state) {
        case 'finished':
          this.getWinner();
      }
    }
  }
}
</script>
