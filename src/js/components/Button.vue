<template>
  <div @click="click" :class="`button button_theme-${theme}`">
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'red'
    },
    title: {
      type: String
    }
  },
  methods: {
    click() {
      this.$emit('clicked');
    }
  }
}
</script>