<template>
	<div class="game">
    <Progress />
    <GameScreen dir="left">
      <div class="game__block game__block_size-full_screen game__block_height-mob-113 ">
        <div class="game__decor game__decor_type-player"></div>
      </div>
      <div class="game__block_view-desktop-mobile">
        <div class="game__block  flex flex_space-between">
          <InputCustom type="text" :readonly="true" :text-centered="true" :initValue="10"  />
          <InputCustom type="text" :placeholder="$translate.t('input.placeholders.enterNumber')" />
        </div>
        <div class="game__block">
          <Range />
        </div>
      </div>

      <div class="game__block_view-tablet">
        <div class="game__block  flex flex_space-between">
          <InputCustom type="text" :readonly="true" :text-centered="true" :initValue="10"  />
        </div>
        <div class="game__block">
          <Range />
        </div>
        <div class="game__block">
          <InputCustom type="text" :placeholder="$translate.t('input.placeholders.enterNumber')" />
        </div>
      </div>
    </GameScreen>
    <GameScreen dir="right">
       <div class="game__block game__block_size-full_screen game__block_height-mob-113 ">
        <div class="game__decor game__decor_type-enemy"></div>
      </div>
      <div class="game__block_view-desktop-mobile">
        <div class="game__block  flex flex_space-between">
          <InputCustom type="text" :readonly="true" :text-centered="true" :initValue="10"  />
          <InputCustom type="text" :placeholder="$translate.t('input.placeholders.enterNumber')" />
        </div>
        <div class="game__block">
          <Range />
        </div>
      </div>

      <div class="game__block_view-tablet">
        <div class="game__block  flex flex_space-between">
          <InputCustom type="text" :readonly="true" :text-centered="true" :initValue="10"  />
        </div>
        <div class="game__block">
          <Range />
        </div>
        <div class="game__block">
          <InputCustom type="text" :placeholder="$translate.t('input.placeholders.enterNumber')" />
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

export default {
  name: 'game-one',
  components: {GameScreen, Progress, Range, InputCustom},
}
</script>
