<template>
  <div class="header">
    <div class="content-wrapper">
        <div class="avatar">
            <img width="64" height="64" :src="seller.avatar"/>
        </div>
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
                {{seller.description}}/{{seller.deliverTime}}分钟送达
            </div>
            <div v-if="seller.supports" class="supports">
                <span class="icon"></span>
                <span class="text">{{seller.supports[0].description}}</span>
            </div>  
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--要给头部设背景图片z-index设为-1   -->
    <div class="background">
       <img :src="seller.avatar" width="100%" height="100%"> 
    </div>
    <div v-show="detailshow" class="detail">
         <!-- 展示的内容需要关闭，定义两个层，一个是内容展示，一个是关闭   -->
         <div class="datail-wrapper" clearfix>
             <div class="detail-main">
                 <h1 class="name">{{seller.name}}</h1>
             </div>
         </div>
         <div class="detail-close">
             <i class="icon-close"></i>
         </div>
    </div>
  </div>
</template>
<script>
export default{
    
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
           detailshow:false
        }
    },
    methods:{
         showDetail(){
             this.detailshow=true
         }
    }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.header{
    position:relative;
    overflow: hidden;    //没有设这个div的宽度和高度，所以需要overflow: hidden;属性来撑开这个div
    color:#fff;
    background:rgba(7,17,27,0.5);
 .content-wrapper{
    position:relative;
    padding:24px 12px 18px 24px;
    font-size:0 ;     //消除div元素和img元素之间的空白
  .avatar{
    display:inline-block;
    vertical-align: top;    //垂直对齐该图像
    img{
     border-radius: 2px
    }
  }
  .content{
    display:inline-block;
    margin-left:16px;
   .title{
     margin:2px 0 8px 0;
    .brand{
      display:inline-block;
      vertical-align: top;
      width:30px;
      height:18px;
      @include bg-image("brand");
      background-size:30px 18px;
      background-repeat: no-repeat;
    }
    .name{
      margin-left: 6px;
      font-size:16px;
      line-height:18px; 
      font-weight:bold;
    }
   }
   .description{
      margin-bottom: 10px;
      line-height: 12px;
      font-size: 12px;
   }
   .supports{
    .icon{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      height: 12px;
      margin-right: 4px;
      background-size: 12px 12px;
      background-repeat: no-repeat;
      @include bg-image("decrease_1");
    }
    .text{
       line-height: 12px;
       font-size: 10px 
    }
   }

  }
  .support-count{
    position:absolute;
    right:12px;
    bottom:18px;
    padding:0 8px;
    height:24px;
    line-height: 24px;
    border-radius: 14px;
    background:rgba(0,0,0,0.2);
    text-align: center;
   .count{
    vertical-align: top;
    font-size:10px;
   }
   .icon-keyboard_arrow_right{
     font-size:10px;
     margin-left:2px;
     line-height: 24px;

   }
  }
 }
 .bulletin-wrapper{
    position: relative;
    height:28px;
    line-height:28px;
    padding:0 22px 0 12px;
    //隐藏掉多余的部分
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    background:rgba(7,17,27,0.2);
  .bulletin-title{
    display:inline-block; //是一个span，需要显示宽高
    vertical-align: top;
    margin-top: 8px;
    width:22px;
    height:12px;
    @include bg-image("bulletin");
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
  .bulletin-text{
    vertical-align: top;
    font-size: 10px;
    margin:0 4px;

  }
 }
 .background{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: -1;
    filter: blur(10px) ;  //加模糊

 }
 .detail{
    position: fixed;
    z-index:100;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow:auto;
    background:rgba(7,17,27,0.8);
  .datail-wrapper{
    min-height: 100%;
    width:100%;
   .detail-main{
     margin-top: 64px;
     padding-bottom:64px;
    .name{
      line-height: 16px;
      text-align: center;
      font-size: 16px;
      font-weight: 700    
    }
   }
   

  }
  .detail-close{
    position:relative;
    width:32px;
    height:32px;
    margin:-64px auto 0 auto;
    clear:both;
    font-size:32px;
    icon-close{}
  }

 } 

}
</style>