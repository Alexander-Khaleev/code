<template>
  <div v-if="district.level">
      <h3> {{district.code}} </h3>
      <p>  {{district.level}}/10 </p>
      <p ref="description">  {{district.description}} </p>
       <button class="input__button radius-5" v-on:click="visible =! visible" v-if="visible">Добавить информацию о районе</button>
       <add v-bind:user="text" v-if="!visible" @messChange="newMess"></add>
  </div>
</template>

<script>
import Button from './Button.vue'

export default {
  props: {'district': Object},
  components: {'add': Button },
  data () {
    return {
      visible: true,
      text: ''
    }
  },
  updated() {
    if (this.$refs.description) {
      this.$refs.description.innerText = this.district.description;
    }
  },
  methods: {
    newMess: function(value) {
      this.district.description += value;
      this.$refs.description.innerText = this.district.description;
      this.visible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.input__button {
    height: 40px;
    background: #008B00;
    border: 1px solid #008B00;
    color: white;
    padding: 10px;
    cursor: pointer;
}
</style>
