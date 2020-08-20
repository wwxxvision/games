<template>
	<div :class="{
    [gameName]: true,
    [`game-screen game-screen_pos-${dir}`]: true,
    'game-screen_pos-without-border': withoutBorders}">
		<div class="game-screen__wrapper">
			<slot></slot>
		</div>
	</div>
</template>;

<script>

export default {
  props: {
    dir: {
      type: String
    },
    withoutBorders: {
      type: Boolean
    },
    gameName: {
      type: String
    }
  }
}

</script>
