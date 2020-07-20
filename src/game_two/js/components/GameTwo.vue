<template>
	<div class="game game-two">
   <Modal v-if="gameState === 'finished'" :title="winnerName" :titleTheme="'blue'">
      <Winner :players="game.players" />
      <template v-slot:footer>
        <Button @clicked="game.play(gameTime)" :title="$translate.t('button.playAgain')" />
      </template>
    </Modal>
    <div v-if="gameState === 'play'" @click="selectIcon" :class="{
      'game__item-chat-icon': true,
      'game__item-chat-icon_state-winner': iconSelect && iconSelect.type === 'player',
      'game__item-chat-icon_state-lose': iconSelect && iconSelect.type === 'enemy'
      }"
    >
      <div class="check-icon"></div>
      <div :class="{'icon': true, 'rotate': iconSelect}"></div>
    </div>
    <Progress  :gameName="'game-two'" :gameState="game.getGameState" :timeInSec="40" @getTimerTime="getTimerTime"  />
    <GameScreen :gameName="'game-two'" :withoutBorders="true" v-for="(player, index) in game.players" :key="index" :dir="getScreenDir(player.type)">
      <div class="game__block game__block_size-full_screen relative">
      </div>
      <div class="game__block game__block_font-bold  flex flex_justify_content_center text-align-center">
        <div class="game__block relative">
          <div>{{ player.name }}</div>
          <div
            v-if="iconSelect && iconSelect.type === player.type"
            :class="{
              'absolute add-score-decor': true,
              'add-score-decor_animate-hide': iconSelect
            }">+ 1</div>
          <InputCustom type="text"
            :readonly="true"
            :text-centered="true"
            :initValue="player.value"
            placeholder="0"
            :theme="'input__element_theme-biege-red'"
          />
        </div>
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
import Winner from './Winner.vue';
import Button from '@/js/components/Button.vue';
import { Game } from '@/js/classes/models/';
import { gameMixin } from '@/js/mixins/index';
import { Helpers } from '@/js/classes/core';
import $ from 'jquery';

export default {
  name: 'game-two',
  mixins: [gameMixin],
  components: {GameScreen, Progress, Range, InputCustom, Modal, Winner, Button},
  data() {
    return {
      game: null,
      gameInitValue: 0,
      gameTime: 40, // in seconds,
      serverIconPos: {
        x: Helpers.randomInteger(1, 70),
        y:  Helpers.randomInteger(1, 70)
      },
      iconSelect: false,
      chatIcon: '.game__item-chat-icon'
    }
  },
  created() {
    this.render();
    this.fakeAddScoreEnemy();
  },
  computed: {
    winnerName() {
      const winner = this.game.players.find(player => player.state === 'winner');
      if (winner) {
        return winner.name;
      }
    }
  },
  methods: {
    async fakeAddScoreEnemy() {

      setTimeout((timer) => {
          if (!this.iconSelect) {
            this.addScore('enemy');
            this.iconSelect = {
                type: 'enemy'
            }
          }
      }, 2000);
    },
    reCalculateIconPos() {
      this.serverIconPos ={
        x: Helpers.randomInteger(1, 70),
        y:  Helpers.randomInteger(1, 70)
      }
    },
    render() {
       this.reCalculateIconPos();
       this.setIconPos();
       this.iconSelect = false;
    },
    setIconPos() {
      $(this.chatIcon).css({
        top: this.serverIconPos.y + '%',
        left: this.serverIconPos.x + '%'
      });
    },
    selectIcon() {
      if (!this.iconSelect)
        this.addScore('player');
        this.iconSelect = {
          type: 'player'
        }
    },
    addScore(playerType) {
       this.game.players.find(player => {
        if (player.type === playerType) {
          player.setValue(player.value += 1);
        }
      });

      setTimeout(() =>  this.render(), 300);
    },
    getWinner() {
      const playerValues = this.game.players.map(player => player.value);
      const maxValue = Math.max.apply(null, playerValues);
      this.game.players.find(player => {
        if (player.value === maxValue) {
          player.state = 'winner';
        }
      });
      const deadHeat = this.game.players.every(player => player.state === 'winner');

      if (deadHeat) {
        this.game.players[Helpers.randomInteger(0, 1)].state = 'default';
      }
    }
  }
}
</script>
