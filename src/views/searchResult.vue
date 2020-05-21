<template>
    <div class="container1">
        
        <div class="new-cards">
            <div v-for="(list, index) in search_result" :key="index" class="card" > 
                <img style="width: 100%;" :src="url+'/'+list.videoPath" alt="">
                <div class="text">
                    {{list.artista}} - {{list.nombre}}<br>
                    <b-button  variant="btn btn-light" class="mb-2">
                        <b-icon @click="video_click(list.id)"  icon="play" aria-hidden="true"></b-icon> 
                    </b-button>  
                    
                </div>
            </div>
        </div>
       <!--  <b-card class="mt-3" >
                    <pre class="m-0">{{ search_result }}</pre>
                </b-card> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';
var data_url = require('../assets/p1.js');
export default {
    data:() => ({
        url:data_url.default.url
    }),
    methods:{
        video_click(id_video){
            this.$router.push('/ver_video/'+id_video)
        }
    },
    computed:{
        ...mapState(['search_result'])
    }
}
</script>

<style scoped>

.container1{
   
    width: 100%;
    height: 100%;
    padding: 10px;
}
.new-cards{
    padding-left: 15px;
    padding-right: 15px ;
    
    display: grid;        
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-top: 10px;     
}
.card {
  box-shadow: 1px 1px 3px #464646;
  font-family: 'Lato', sans-serif;
  height: 240px;
  position: relative;
  background-size: cover;
  width: 290px;
  display: inline-block;
  margin: 5px;
  overflow: hidden;
}

.card .text {
  max-width: 100%;
  font-size: 0px;  
  color: #fff;
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 100;
  transition: all 0.3s ease-out;
  font-size: 20px;
  font-weight: lighter;
  opacity: 0;
  padding-right: 10px;
}

.card::before {
  content: '';
  position: absolute;
  left: 100%;
  transform: translateX(-100%);
  border-left-color: transparent; 
  border: 140px solid #fff;
  border-bottom-color: transparent;
  border-left-color: transparent;
  opacity: 0.2;
  pointer-events: none;
  transition: all 0.3s linear;
}

.card::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(-100%);
  border: 120px solid;
  border-top-color: transparent;
  border-right-color: transparent;
  pointer-events: none;
  opacity: 0.2;
  transition: all 0.3s linear;
}


.card:hover::after {
  border-top-color: #000;
  border-right-color: #000;
  opacity: 0.3;
  border-width: 220px;
}

.card:hover::before {
  border-width: 0;
  opacity: 0;
}

.card:hover .text {
  opacity: 1;
}
@media (max-width: 1700px){
    .new-cards{
       grid-template-columns: repeat(5, 1fr);
    }
}
@media (max-width: 1600px){
    .new-cards{
       grid-template-columns: repeat(5, 1fr);
    }
}
@media (max-width: 1550px){
    .new-cards{
       grid-template-columns: repeat(5, 1fr);
    }
    .card {
        
        height: 220px;
        margin: auto;
        width: 260px;
       
    }
    
}
@media (max-width: 1380px){
    .new-cards{
       grid-template-columns: repeat(4, 1fr);
    }
    .card {
        
        height: 250px;
        margin: auto;
        width: 320px;
       
    }
    
}
@media (max-width: 1380px){
    .new-cards{
       grid-template-columns: repeat(4, 1fr);
    }
    .card {
        
        height: 250px;
        margin: auto;
        width: 320px;
       
    }
    
}
@media (max-width: 1350px){
    .new-cards{
       grid-template-columns: repeat(3, 1fr);
    }
    .card {
        
        height: 250px;
        margin: auto;
        width: 320px;
       
    }
    
}
@media (max-width: 1000px){
    .new-cards{
       grid-template-columns: repeat(3, 1fr);
    }
    .card {
        
        height: 220px;
        margin: auto;
        width: 260px;
       
    }
    
}
@media (max-width: 850px){
    .new-cards{
       grid-template-columns: repeat(3, 1fr);
    }
    .card {
        
        height: 180px;
        margin: auto;
        width: 220px;
       
    }
    
}
@media (max-width: 730px){
    .new-cards{
       grid-template-columns: repeat(2, 1fr);
    }
    .card {
        
        height: 200px;
        margin: auto;
        width: 240px;
       
    }
    
}
@media (max-width: 540px){
    .new-cards{
       grid-template-columns: repeat(2, 1fr);
    }
    .card {
        
        height: 180px;
        margin: auto;
        width: 220px;
       
    }
    
}
@media (max-width: 500px){
    .new-cards{
       grid-template-columns: repeat(2, 1fr);
    }
    .card {
        
        height: 160px;
        margin: auto;
        width: 200px;
       
    }
    
}
@media (max-width: 460px){
    .new-cards{
       grid-template-columns: repeat(2, 1fr);
    }
    .card {
        
        height: 140px;
        margin: auto;
        width: 180px;
       
    }
    
}
@media (max-width: 411px){
    .new-cards{
       grid-template-columns: repeat(2, 1fr);
    }
    .card {
        
        height: 130px;
        margin: auto;
        width: 170px;
       
    }
    
}
@media (max-width: 400px){
    .new-cards{
       grid-template-columns: repeat(1, 1fr);
    }
    .card {
        
        height: 200px;
        margin: auto;
        width: 240px;
       
    }
    
}
</style>