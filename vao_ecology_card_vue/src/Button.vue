<template>
  <div v-if="visible">
      <textarea class="input__textarea radius-5" v-model="message"></textarea>
      <button class="input__submit mt-30 radius-5" v-on:click="getMessage">Отправить</button>
  </div>
</template>

<script>
export default {
  props: {'user': String},
  data () {
    return {
      visible: true,
      message: this.user
    }
  },
  methods: {
    getMessage: function() {
      this.visible = false;
      this.$emit('messChange', this.message);
    }
  }
}
</script>

<style lang="scss" scoped>
.input__submit {
  height: 30px;
  width: 100px;
  background: #CDCD00;
  border: 1px olid #CDCD00;

}

.input__textarea {
  display: block;
}
</style>