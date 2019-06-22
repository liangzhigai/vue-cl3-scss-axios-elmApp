<template>
  <div class="goods">
    <div class="menu-wrapper" ref='menuWrapper'>  
      <ul>
        <li v-for="(item,index) in goods"  class="menu-item" 
        :class="{'current':currentIndex===index}"
         @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" 
              :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsWrapper'>
      <ul>
        <li v-for="item in goods"  class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px" >
              <div class="icon">
                <img :src="food.icon" width:57px height:57px>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" >{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>&nbsp  
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol v-on:cart-add="cartAdd" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref='shopcart' :select-foods="selectFoods"  :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref='food'></food>
  </div>
</template>

<script>
import shopcart from '../shopcart/shopcart';
import BScroll from 'better-scroll'; 
import Service from '../../service'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
export default{
  props:{
    seller:{
      type:Object
    }
  },
  /*goods用data做一个绑定，因为后续要操作goods，
  goods的状态要反映到dom上，所以要给他添加getter setter*/
  data(){
    return{
      goods:[],
      listHeight:[],  //每个菜单区间的高度
      scrollY:0,
      selectedFood:{}
    }
  },
  computed:{
    currentIndex(){
      for(let i=0;i<this.listHeight.length;i++){
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2||(this.scrollY>=height1 && this.scrollY<height2)){      
          return i;
        } 
      }
     return 0;
    },

    selectFoods(){
      let foods=[];
      this.goods.forEach((good)=>{      //遍历goods，拿到每一个good
        good.foods.forEach((food)=>{     //遍历good里的foods, 
          if(food.count){       //如果food有count值
            foods.push(food);
          }
        })
      })
      return foods;
    }
  },

  
  created(){
    this.classMap=['decrease','discount','special','invoice','guarantee']
   
    this.getGoods();
   
    //确保Dom变化后能调用到_initScroll()方法
    this.$nextTick(()=>{
        this._initScroll(); 
        this._calculateHeight();  
    })
   
  },
   
   methods:{
     //获取goods数据
     async getGoods(){
      const goods =await Service.getGoods();
      this.goods=goods;
     // console.log(goods);
    },
     
     //初始化scroll
     _initScroll(){
       this.menuScroll = new BScroll(this.$refs.menuWrapper,{click:true} );
       this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
         click:true,probeType:3});

      //当foods滚动的时候计算出滚动的距离
       this.foodsScroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(Math.round(pos.y));
       })
       
   },

   //计算每个li的高度
     _calculateHeight(){
       let foodList=this.$refs.foodsWrapper.getElementsByClassName(
         'food-list-hook');    //取出每一个菜单
       let height=0;
       this.listHeight.push(height);
       for(let i=0;i<foodList.length;i++){
         let item=foodList[i];
         height+=item.clientHeight;   //高度累加
         this.listHeight.push(height);
        
       }
     },
      //点击菜单栏
     selectMenu(index,event){
       if(!event._constructed){
         return;
       }
       let foodsList=this.$refs.foodsWrapper.getElementsByClassName(
         'food-list-hook');
         let el=foodsList[index];    //滚到相应的元素
         this.foodsScroll.scrollToElement(el,300);
         //console.log(index);
     },
     cartAdd(el){
       this.$nextTick(() => {
　     this.$refs['shopcart'].drop(el);  // 调用shopcart组件的drop()函数 
       });

    },

    selectFood(food,event){
      if(!event._constructed){
         return;
      }
      this.selectedFood=food;
      this.$refs.food.show();

    }
   },
  components:{
     'shopcart':shopcart,
      cartcontrol,
      food
  }

}
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.goods{
  display:flex;
  position:absolute;
  width:100%;
  top:175px;
  bottom:46px;
  overflow:hidden;
 .menu-wrapper{
  flex:0 0 80px;
  width:80px;
  background:#f3f5f7;
  .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
    &.current{
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700 ;
      .text{
            @include border-none();
      }      
    }
    .icon{
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          @include bg-image("decrease_3")
    }
    .text{
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 12px ;
    } 
  }
 }
 .foods-wrapper{
  flex:1;
  .title{
   padding-left:14px;
   height:26px;
   line-height: 26px;
   border-left:2px solid #d9dde1;
   font-size:12px;
   color:rgb(147,153,159);
   background:#f3f5f7
  }
  .food-item{
   display:flex;
   margin:18px;
   padding-bottom:18px;
   @include border-1px(rgba(7,17,27,0.1));
   &:last-child{
      @include border-none();
   }
   .icon{
          flex: 0 0 57px;
          margin-right: 10px;
   }
   .content{
     flex:1px;
    .name{
      margin:2px 0 8px 0;
      height:14px;
      line-height:14px;
      font-size:14px;
      color:rgb(7,17,27)
    }
    .desc{
      margin:8px;
      line-height:12px;
      font-size:7px;
      color:rgb(7,17,27)

    }
    .extra{
      line-height:10px;
      font-size:7px;
      color:rgb(7,17,27);
     &.count{
       margin-right:12px;

     }
    }
    .price{
      font-weight: 700;
      line-height: 24px;
     .now{
       margin-right:8px;
       font-size:14px;
       color:rgb(240,20,20)

     }
     .old{
       text-decoration: line-through;  //在中间加横线
       font-size:10px;
       color:rgb(147,153,159)

     }
    }
    .cartcontrol-wrapper{
      position:absolute;
      right:0;
      bottom:12px;
    }
   }
  }

 }
}
</style>
