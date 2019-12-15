<template>
  <div class="hello">
    <div class="container">
    <div class="row">
        <div class="col-30 col-lg-30">
          <div class="card mb-3">
              <img style="width:500px" class="card-img-top" src="../assets/posadsp.jpg" />
              <div class="card-body">
                <router-link to="/towns">Города</router-link>
              </div>
            </div>
        </div>
    </div>
    <div class="row">  
        <div class="col-30 col-lg-30">
          <div class="card mb-3">
              <img style="width:500px" class="card-img-top" src="../assets/kratovo-podmoskove-ozero.jpg" />
              <div class="card-body">
                <router-link to="/rivers">Реки и озера</router-link> 
              </div>
            </div>
        </div>
    </div> 
    <div class="row">   
        <div class="col-30 col-lg-30">
          <div class="card mb-3">
              <img style="width:500px" class="card-img-top" src="../assets/s1200.jpg" />
              <div class="card-body">
                <router-link to="/parks">Парки и усадьбы</router-link>
              </div>
            </div>
        </div>
    </div>
</div>  
</div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>


<style scoped lang="scss">

</style>
