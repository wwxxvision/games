<template>
	<div class="input">
    <input
      @change="change"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :class="{
        'input__element input__element_theme-biege': true,
        'input__element_state-novalide': errorMessage
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
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    handlerType: {
      type: String,
      default: 'int'
    }
  },
  methods: {
    change(ev) {
      const { value } = ev.target;
      const valueIsNotEmpty = value;

      let condition = false;
      this.errorMessage = '';
      switch(this.handlerType) {
        case 'int':
          condition = valueIsNotEmpty && Number.isInteger(Number(value));

          if (!condition)
            this.errorMessage = 'Only integer values';
          break;
        default:
          condition = valueIsNotEmpty && Number.isInteger(Number(value));
          if (!condition)
            this.errorMessage = 'Only integer values';
      }
    }
  }
}
</script>