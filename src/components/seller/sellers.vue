<template>
  <div class="sellers" ref='seller'>
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <div></div>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" ></span>
          <span class="text">已收藏</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin ">
        <h1 class="title">公告与活动</h1>
        <div class="bulletin-wrapper border-1px">
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul v-show="seller.supports" class="support">
          <li class="support-item border-1px" v-for="item in seller.supports">
            <span class="icon">{{item.type}}</span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
          <ul class="pic-list">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Service from '../../service';
import split from '../split/split';
import BScroll from 'better-scroll'; 
export default {
  data(){
    return{
      seller: {
      type: Object
      }
    }
  },
  created(){
    this.getSeller();
    this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.seller,{click:true} );
        }else{
          this.scroll.refresh();
        }
    })
  },
  methods:{
    //获取sellersings数据
     async getSeller(){
      const seller =await Service.getSeller();
      this.seller=seller; 
     },

  },
  components:{
    split
  }

}

  

</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.sellers{
  position: absolute;
  width:100%;
  top:175px;
  bottom:0;
  left:0;
  overflow:hidden;
 .overview{
   position:relative;
   padding:18px;
  .title{
    margin-bottom:8px;
    line-height:14px;
    font-size:14px;
    color: rgb(7, 17, 27)

  }
  .desc{
    padding-bottom:18px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    font-size:0px;
   .text{
     display:inline-block;
     margin-right:12px;
     font-size:10px;
     line-height:18px;
     color:rgb(77,85,93) ;
     vertical-align: top;
   }
  }
  .remark{
    display:flex;
    padding-top:18px ;
   .block{
     flex:1;
     text-align: center;
     border-right:1px solid rgba(7, 17, 27, 0.1);
    h2{
      margin-bottom:4px;
      line-height:10px;
      font-size:10px;
      color:rgb(147,153,159)
    }
    .content{
      line-height:23px;
      font-size:20px;
      font-weight: 200;
      color:rgb(7,12,27); 
    }
   }
  }
  .favorite{
    position:absolute;
    width:50px;
    right:11px;
    top:18px;
    text-align: center;
   .icon-favorite{
     display: block;
     margin-bottom:4px;
     line-height: 24px;
     font-size:24px;
     color:rgb(240,20,20);
   }
   .text{
     display:inline-block;
     line-height: 10px;
     font-size:10px;
     color:rgb(77,85,93);

   }
  }
 }
 .bulletin{
   padding:18px 18px 0 18px;
  .title{
    margin-bottom:8px;
    line-height:14px;
    font-size:14px;
    color: rgb(7, 17, 27)
  }
  .bulletin-wrapper{
    padding:0 12px 16px 12px;
    @include border-1px(rgba(7, 17, 27, 0.1));
   .text{
    line-height:24px;
    font-size:12px;
    color: rgb(240, 20, 20);
   }
  }
  .support{
    .icon{
      display:inline-block;
      margin-right:6px;
    }
   .support-item{
     padding:16px 12px;
     line-height: 16px;
     font-size:12px;
     font-weight: 200;
     color:rgb(7,17,27);
     @include border-1px(rgba(7, 17, 27, 0.1));
   }
  }
 }
 .pics{
   padding:18px;
  .title{
    margin-bottom:12px;
    line-height:14px;
    font-size:14px;
    color: rgb(7, 17, 27)
  }
  .pic-wrapper{
    width:100%;
    overflow: hidden;
    white-space: nowrap;
   .pic-list{
     font-size:0;
    .pic-item{
      display:inline-block;
      margin-right:6px;
      width:120px;
      height:90px;
      &:last-child{margin: 0} 
    }

   } 
  }
 }
 .info{
   padding:18px 18px 0 18px;;
  .title{
    padding-bottom:12px;
    line-height:14px;
    font-size:14px;
    color: rgb(7, 17, 27);
    @include border-1px(rgba(7, 17, 27, 0.1));
  }
  .info-item{
    padding:16px 12px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    line-height:16px;
    font-size:12px;
    font-weight: 200;
    color: rgb(7, 17, 27);
    &:last-child{@include border-none}
          
  }
 }
}
</style>

