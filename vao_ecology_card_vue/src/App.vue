<template>
  <div id="app">
    <div class="district" v-bind:class="classObject">
    <div class="district__block">  
    <h1>Экологическая карта ВАО </h1>
    <select class="input__select mt-30 radius-5" @change="onChange($event)" v-model="code"> 
      <option v-for="district in info" v-bind:key="district.id"> {{district.code}}</option>
    </select>
    <p> Выберите район </p>
    <description v-bind:district="{code: code, level: level, description: description}"></description>
    </div>
  </div>
  </div>
</template>

<script>
import Description from './Description.vue'

export default {
  name: 'app',
  components: {'description': Description },
  data () {
    return {
      info: null,
      code: null,
      level: null,
      description: null
    }
  },
   beforeCreate() {
    fetch('/src/json/data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.info = data;
      })
  },
  methods: {
    onChange:function(event) {
       for (let i in this.info) {
         if (this.info[i].code === event.target.value) {
           this.code = this.info[i].code;
           this.level = this.info[i].level;
           this.description = this.info[i].description;
         }
       }
    }
  },
  computed: {
    classObject: function() {
      return {
        bad__ecology: Number(this.level) <= 3 && this.level !== null,
        middle__ecology: Number(this.level) > 3 && Number(this.level) <=6,
        good__ecology: Number(this.level) > 6 && Number(this.level) <=9,
        perfect__ecology: Number(this.level) === 10
      }
    }
  }
}
</script>

<style lang="scss">
  @mixin background($property) {
    width: 100%;
    height: 100vh;
    background: $property;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .district {
    @include background(url(assets/district.jpg));
  }

  .bad__ecology {
    @include background(url(assets/bad.jpg));
  }

   .middle__ecology {
    @include background(url(assets/middle.jpg));
  }

   .good__ecology {
    @include background(url(assets/good.jpg));
  }

  .perfect__ecology {
    @include background(url(assets/perfect.jpg));
  }

  .district__block {
    width: 40%;
    height: 40vh;
    min-width: 300px;
    min-height: 300px;
    background: white;
    padding: 80px;
  }

  .mt-30 {
    margin-top: 30px;
  }

  .radius-5 {
    border-radius: 5px;
  }
</style>
