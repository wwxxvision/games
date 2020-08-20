<template>
	<div class="screen__block screen__block-connection">
		<div class="icon"></div>
		<div dir="rtl" class="message">{{ message }}</div>
	</div>
</template>;

<script>
export default {
	props: {
		message: {
			type: String,
		},
	},
};
</script>
