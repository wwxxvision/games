<template>
	<div class="input">
    <input
      @change="change"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :readonly="readonly"
      :class="{
        [theme]: true,
        'input__element': true,
        'input__element_state-novalide': errorMessage,
        'input__element_text-pos-center': textCentered
       }" />
  </div>
</template>;

<script>
export default {
  data() {
    return {
      value: null,
      errorMessage: ''
    }
  },
  props: {
    maxlength: {
      type: Number
    },
    textCentered: {
      type: Boolean
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'text'
    },
    handlerType: {
      type: String,
      default: 'int'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    initValue: {
      required: true
    },
    playerType: {
      type: String
    },
    theme: {
      type: String,
      default: 'input__element_theme-biege'
    }
  },
  mounted() {
    if (this.initValue)
    this.value = this.initValue;
  },
  methods: {
    change(ev) {
      const { value } = ev.target;
      this.$emit('updateValues', this.playerType, value);
    }
  },
  watch: {
    initValue(value) {
      if (this.readonly) {
        this.value = value;
      }
    }
  }
}
</script>