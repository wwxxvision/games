<template>
	<div class="input">
    <input
      @change="change"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      :class="{
        'input__element input__element_theme-biege': true,
        'input__element_state-novalide': errorMessage,
        'input__element_text-pos-center': textCentered
       }" />
      <span v-if="errorMessage" class="input__error-message">{{ errorMessage }}</span>
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
      type: Number
    }
  },
  created() {
    if (this.initValue)
    this.value = this.initValue;
  },
  methods: {
    change(ev) {
      const { value } = ev.target;
      const valueIsNotEmpty = value;
      console.log(value)
      let condition = false;
      this.errorMessage = '';
      switch(this.handlerType) {
        case 'int':
          condition = valueIsNotEmpty && Number.isInteger(Number(value));

          if (!condition)
            this.errorMessage = this.$translate.t('errors.badType')
          break;
        default:
          condition = valueIsNotEmpty && Number.isInteger(Number(value));
          if (!condition)
            this.errorMessage = this.$translate.t('errors.badType')
      }
    }
  },
}
</script>