<template>
  <div id="app">
      <div class="container">
      <div class="row">
        <div class="col-30 col-lg-30">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link to="/">Главная</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/towns">Города</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/rivers">Реки и озера</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/parks">Парки и усадьбы</router-link>
                </li>
              </ul>
            </div>
        </nav> 
        </div>
  </div>
 </div> 
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  .nav-item {
    padding-right: 10px;
  }
</style>
