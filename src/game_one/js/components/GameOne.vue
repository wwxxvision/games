<template>
	<div class="game">
    <Progress />
    <GameScreen dir="left">
      <div class="game__block">
      </div>
      <div class="game__block">
        <Input type="text" placeholder="Enter number" />
      </div>
    </GameScreen>
    <GameScreen dir="right">
    <div class="game__block">
      <Slider :data="[[1, 2, 3 ,4]]" />
    </div>
      <div class="game__block">
        <Input type="text" placeholder="Enter number" />
      </div>
    </GameScreen>
  </div>
</template>;


<script>
import GameScreen from '@/js/components/GameScreen.vue';
import Progress from '@/js/components/Progress.vue';
import Slider from '@/js/components/Slider.vue';
import Input from '@/js/components/Input.vue';
import RangeSlider from 'vue-range-slider'



export default {
  name: 'game-one',
  components: {GameScreen, Progress, Slider, Input}
}
</script>
