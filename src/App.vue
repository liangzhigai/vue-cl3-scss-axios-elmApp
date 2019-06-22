<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link  to="/goods" active-class="_active">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link  to="/sellers" active-class="_active">商家</router-link>
      </div>
      <div class="tab-item">
         <router-link  to="/ratings" active-class="_active">评价</router-link>
      </div>
    </div>
    <!-- 路由匹配到的组件将显示在这里 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script>
//注册header组件
import axios from 'axios'
import Service from '../src/service'
import header from './components/header/header.vue'

import { async } from 'q';
export default{
  //定义seller对象，头部需要显示商家的一些信息
  data(){
     return{
       seller:{}
     };
  },

  created() {
    this.getSeller(); 
  },
  methods:{
    async getSeller(){
      const seller =await Service.getSeller();
      this.seller=seller;
      //console.log(JSON.stringify(seller,null,4));
      
    },


    async getRatings(){
      const ratings =await Service.getRatings();
    },

  },
  components:{
    'v-header':header
  }
}

</script>
<style lang="scss" scoped>

 .tab{
   display:flex;
   width:100%;
   height:40px;
   line-height: 40px;
   border-bottom:1px solid rgba(7,17,27,0.1)
 }
 .tab-item{
      flex: 1;
      text-align:center;   
 }
 a{
   display:block;
   text-decoration: none
 }
 
</style>
