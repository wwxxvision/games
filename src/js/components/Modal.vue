<template>
	<modal :clickToClose="false" name="modal" :width="300" height="auto">
    <header :class="{'modal__header': true,
      'modal__header_theme-blue': titleTheme === 'blue',
      'modal__header_theme-right': titleTheme === 'right'
      }">
      {{title}}
    </header>
    <div class="modal__body">
      <slot></slot>
    </div>
    <footer class="modal__footer">
      <slot name="footer"></slot>
    </footer>
  </modal>
</template>;


<script>
export default {
  props: {
    title: {
      default: "Title"
    },
    titleTheme: {
      type: String
    }
  },
  mounted() {
    this.$modal.show('modal')
  }
}
</script>