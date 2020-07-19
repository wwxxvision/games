<template>
	<div class="game game-two">
   <!-- <Modal v-if="gameState === 'finished'" :title="serverValue" :titleTheme="'blue'">
      <Winner :players="game.players" />
      <template v-slot:footer>
        <Button @clicked="game.play(gameTime)" :title="$translate.t('button.playAgain')" />
      </template>
    </Modal> -->
    <div @click="selectIcon" :class="{
      'game__item-chat-icon': true,
      'game__item-chat-icon_state-winner rotate': iconPlyerIsSelect
      }"
    >
      <div class="check-icon"></div>
      <div class="icon"></div>
    </div>
    <Progress  :gameName="'game-two'" :gameState="game.getGameState" :timeInSec="gameTime" @getTimerTime="getTimerTime"  />
    <GameScreen :gameName="'game-two'" :withoutBorders="true" v-for="(player, index) in game.players" :key="index" :dir="getScreenDir(player.type)">
      <div class="game__block game__block_size-full_screen relative">
      </div>
      <div class="game__block game__block_font-bold  flex flex_justify_content_center text-align-center">
        <div class="game__block">
          <div>{{ player.name }}</div>
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
      iconPlyerIsSelect: false,
      chatIcon: '.game__item-chat-icon'
    }
  },
  mounted() {
    this.render();
  },
  methods: {
    reCalculateIconPos() {
      this.serverIconPos ={
        x: Helpers.randomInteger(1, 70),
        y:  Helpers.randomInteger(1, 70)
      }
    },
    render() {
       this.reCalculateIconPos();
       this.setIconPos();
       this.iconPlyerIsSelect = false;
    },
    setIconPos() {
      $(this.chatIcon).css({
        top: this.serverIconPos.y + '%',
        left: this.serverIconPos.x + '%'
      });
    },
    selectIcon() {
        this.iconPlyerIsSelect = true;
        this.addScore('player');
        setTimeout(() =>  this.render(), 500);
    },
    addScore(playerType) {
       this.game.players.find(player => {
        if (player.type === playerType) {
          player.setValue(player.value += 1);
        }
      });
    }
  }
}
</script>
