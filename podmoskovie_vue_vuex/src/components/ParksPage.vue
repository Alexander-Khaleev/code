<template>
<div class="container">
  <div class="hello">
    <h1 class="mb-5">Парки </h1>
        <select class="input__select mt-30 radius-5 mb-5" @change="onChange($event)"> 
          <option value="default"> По умолчанию</option>
          <option value="popularity"> По популярности</option>
          <option value="alfabet"> В алфавитном порядке</option>
        </select>
        </div>
          <div class="col-30 col-lg-30" v-for="(item, index) in parkslist" :key="index">
          <div class="card mb-3">
              <img style="width:500px; height: 300px" class="card-img-top" :src='item.picture' />
              <div class="card-body">
                <p> {{item.name}}</p>
                <p> {{item.description}} </p>
                <p><strong>Likes:</strong> <span @click="increment(index)"> + </span><span v-if="item.likes !== 0">{{item.likes}}</span><span @click="dicrement(index)"> - </span> <span class="close__btn" @click="deletePark(index)"><strong> Close </strong></span> </p>
              </div>
            </div>
        </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Parks',
  methods: {
    increment: function(index) {
      this.$store.commit('incrementParks', index);
    },
    dicrement: function(index) {
      this.$store.commit('dicrementParks', index);
    },
     deletePark: function(index) {
      this.$store.commit('deleteParks', index);
    },
     onChange: function(event) {
      switch(event.target.value) {
         case 'default':
          this.$store.commit('getDefaultSortParks');
          break;
        case 'popularity':
          this.$store.commit('getPopularitySortParks');
          break;
        case 'alfabet':
          this.$store.commit('getAlfabetSortParks');
          break;  
      }
    }
  },
  mounted() {
    this.$store.dispatch('getParks');
  },
  computed: {
      ...mapState({
      parkslist: state => state.parks.parks
    })
  }
}
</script>


<style scoped lang="scss">
  .card {
    max-width: 500px;
  }

  .close__btn {
    float: right;
  }
</style>