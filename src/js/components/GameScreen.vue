<template>
	<div :class="`game-screen game-screen_pos-${dir}`">
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
    }
  }
}
</script>
