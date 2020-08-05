<template>
  <div class="notify">
    <div class="notify__title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      requreid: true
    }
  }
}
</script>