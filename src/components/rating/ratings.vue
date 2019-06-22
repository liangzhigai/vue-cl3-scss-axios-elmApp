<template>
  <div class="ratings" ref='ratings'>
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star">星星</div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span> 
            <div class="star">星星</div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @ratingtypeSelect="ratingtypeSelect" @content="content"
      :ratings="ratings" :select-type="selectType" 
      :only-content="onlyContent"></ratingselect>
      <div class="rating-wrapper" >
        <ul>
          <li v-for="rating in ratings" class="rating-item border-1px" 
          v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star"></div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span :class="{'icon-thumb_up':rating.rateType===0,
                'icon-thumb_down':rating.rateType===1}"></span>
                <span class="item" v-for="item in rating.recommend">
                  {{item}}
                </span>
              </div>
              <div class="time">{{rating.rateTime}}</div>
            </div>
          </li>
        </ul> 
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'; 
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import Service from '../../service';

const ALL=2;
export default {
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return{
      ratings:[],
      selectType:ALL,
      onlyContent:true,
    }
  },
  created(){
    this.getRatings();
    this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.ratings,{click:true} );
        }else{
          this.scroll.refresh();
        }
    })
  },
  methods:{
    //获取ratings数据
     async getRatings(){
      const ratings =await Service.getRatings();
      this.ratings=ratings; 
     },
     needShow(type,text){
        if(this.onlyContent&&!text){  // 如果要显示内容，但是没有内容
            return false;
          }
        if(this.selectType===ALL){
            return true;
        }else{
            return type===this.selectType
        }

    },
     ratingtypeSelect(type){
        this.selectType=type;
     },
     content(onlyContent){
        this.onlyContent=onlyContent;
     }
     

  },
  components:{
    split,
    ratingselect
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.ratings{
  position: absolute;
  width:100%;
  top:175px;
  bottom:0;
  left:0;
  overflow:hidden;
.overview{
  display:flex;     //两个div一排显示，若用float,需要清除浮动，当浏览器宽度改变时，会变形，flex布局可解决这个缺点
  padding:18px 0;
.overview-left{
  flex:0 0 137px;
  padding:6px 0;
  width:137px;
  border-right:1px solid rgba(7, 17, 27, 0.1);
  text-align: center; 
 .score{
   margin-bottom:6px;
   font-size:24px;
   color:rgb(255,153,0);
   line-height:28px;
 } 
 .title{
   font-size:12px;
   margin-bottom:8px ;
   line-height:12px;
   color:rgb(7,17,27);

 }
 .rank{
   font-size:10px;
   line-height:10px;
   color:rgb(7,17,27);

 }
}
.overview-right{
   flex:1;
   padding:6px 0 6px 24px;
 .score-wrapper{
   margin-bottom:8px;
   font-size:0;
  .title{
    display:inline-block;
    line-height: 18px;
    font-size:12px;
    color:rgb(7,17,27);
    vertical-align: top;
  }
  .star{
    display:inline-block;
    margin:0 12px;
    color:rgb(7,17,27);
    vertical-align: top;
  }
  .score{
    display:inline-block;
    font-size:12px;
    line-height: 18px;
    color:rgb(255,153,0);
    vertical-align: top;
  }
   

 }
 .delivery-wrapper{
   font-size:0;
  .title{
    line-height: 18px;
    font-size:12px;
    color:rgb(7,17,27);
  }
  .delivery{
    margin-left:12px;
    font-size:12px;
    line-height: 18px;
    color:rgb(147,153,159)

  }

 }

}
}
.rating-wrapper{
  padding:0 18px;
 .rating-item{
   display:flex;
   padding:18px 0;
   @include border-1px(rgba(7, 17, 27, 0.1));
   .avatar{
     flex:0 0 28px;
     width:28px;
     margin-right:12px;
     img{
       border-radius: 50%;
     }
   } 
   .content{
     flex:1;
     position: relative;
    .name{
      margin-bottom:4px;
      font-size:10px;
      color:rgb(7,17,27);
      line-height: 12px;
    }
    .star{

    }
    .text{
      margin-bottom:8px;
      font-size:12px;
      color:rgb(7,17,27);
      line-height: 18px;

    }
    .recommend{
      line-height: 16px;
      font-size:0;
     .icon-thumb_up,.icon-thumb_down,.item{
       display: inline-block;
       margin:0 8px 4px 0;
       font-size:9px;
     } 
     .icon-thumb_up{
       color:rgb(0, 160, 220)
     }
     .icon-thumb_down{
       color:rgb(147,153,159)
     }
     .item{
       padding:0 6px;
       border: 1px solid rgba(7, 17, 27, 0.1);
       border-radius: 1px;
       color:rgb(147,153,159);
       background:fff;
     }
    }
    .time{
      position:absolute;
      top:0;
      right:0;
      line-height: 12px;
      font-size: 10px;
      color: rgb(147, 153, 159)
    }

   }
 } 
 
}

}
</style>

