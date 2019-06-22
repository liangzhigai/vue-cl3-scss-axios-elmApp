<template>
    <div class="cartcontrol">
        <transition name="fade">
         <div class="cart-decrease" v-show="food.count>0" 
              @click.stop.prevent="decreaseCart">
              <transition name="inner">
               <span class="inner icon-remove_circle_outline"></span>
              </transition>
         </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props:{
        food:{
            type:Object
        }
    },
    methods:{
        addCart(event){
            if(!event._constructed){     //解决click执行多次的效果  
                return;
            }
            if(!this.food.count){     //如果food的数量不存在
                Vue.set(this.food,'count',1);     //添加一个不存在的属性，将它的值设为1
            }else{
                this.food.count++;
            }
            this.$emit('cart-add', event.target);   //获取添加按钮，把这个DOM元素以cart-add名字传给父组件goods
        },
        decreaseCart(event){
            if(!event._constructed){
                return;
            }
            if(this.food.count){
                this.food.count--;
            }
        }
    },

    created(){
        //console.log(this.food)
    }
}
</script>
<style lang="scss" scoped>
.cartcontrol{
  font-size: 0;
 .cart-decrease{
     display:inline-block;
     padding:6px;
     transition:all 0.4s linear;
   &.fade-enter-active,&.fade-leave-active{
      opacity: 1;
      transform: translate3d(0,0,0);
    .inner{
      transform :rotate(0deg)
    }
   }
   .inner{
     display:inline-block;
     line-height:24px;
     font-size:24px;
     color:rgb(0,160,220);
     transition:all 0.4s linear
   }
   &.fade-enter,&.fade-leave-active{
      opacity:0;
      transform: translate3D(24px,0,0);
   .inner{
      transform: rotate(180deg)
   }   
  }
 }
 .cart-count{
     display:inline-block;
     vertical-align: top;
     width:10px;
     padding:12px;
     padding-top:6px;
     line-height: 24px;
     text-align: center;
     font-size:10px;
     color:rgb(147,153,159);
 }
 .cart-add{
     display:inline-block;
     padding:6px;
     line-height:24px;
     font-size:24px;
     color:rgb(0,160,220)  
 }

}
</style>


