<template>
 <div class="detail" :class="{'detail-hid':isshowdec}">
   <div class="detail_info bdb fs24 c88 flex wp100" v-if="detail">
     <div class="wp40 mr20">
      <div class="size-cover info_left ptr">
        <img v-view="detail.image" class="pta t0 l0 wp100 hp100" alt="">
      </div>
     </div>
       <div class="info-right wp50">
          <p class="ellipsis fs34 c33">{{detail.title}}</p>
          <p class="ellipsis pt10"><span class="fs30 c33">导演:</span> {{detail.directors}}</p>
          <div class="ellipsis"><span class="fs30 c33">主演:</span>{{detail.actors}}</div>
         <div class="tag pt10 pb10"><span v-for="(v,index) in detail.tags" class="mr10 cff pl10 pr10 fs24" >{{v}}</span></div>
         <p class="ellipsis"><span class="fs30 c33">年份:</span> {{detail.year}}</p>
       </div>
   </div>
   <div class="detail_btns bdb5 bgcff flex">
     <p class="ovh left">
       <span class="mr20 title ellipsis">{{detail.title}}</span>
       <span class="corange">{{detail.score}}</span>
     </p>
     <ul class="tool fs24 c33 alic flex">
       <li>
         <img src="../assets/img/detail_touping.png" alt=""><p>投屏</p>
       </li>
       <li>
         <img src="../assets/img/detail_col.png" alt=""><p>收藏</p>
       </li>
       <li>
         <img src="../assets/img/detail_share.png" alt=""><p>分享</p>
       </li>
       <li @click="showdec">
         <img src="../assets/img/detail_des.png" alt=""><p>简介</p>
       </li>
     </ul>
   </div>
   <div class="bdb5 actors">
     <p class="f34 c33 title">影人作品</p>
       <ul class="actorlist wp100 scrollx nwap" id="actorlist">
         <li v-for="(v,index) in actorlist" class="alic" :class="{'active':starIndex==index}" @click="changeactor(v,index)">
           <img v-view:actorlist="v.image?v.image:'img/mxdefault.png'" alt="" >
           <p class="ellipsis wp100">{{v.name}}</p>
           <div class="a_line ptr">
              <div class="angle">
              </div>
           </div>
         </li>
       </ul>
       <ul class="actorwork wp100 scrollx nwap pl20" id="actorwork">
         <router-link :to="{path:'detail',query:{coltype:v.starsWorks[0].videoType,id:v.starsWorks[0].id}}" v-for="v in actorwork" tag="li">
            <p class="size-cover ptr">
              <img v-view:actorwork="v.starsWorks[0].image" alt="" class="pta wp100 hp100 l0 t0">
            </p>
           <p class="ellipsis pl10 pr10">{{v.starsWorks[0].title}}</p>
         </router-link>
       </ul>
   </div>
   <div class="list">
     <div class="topline fs32">猜你喜欢</div>
     <div class="listbox ovh">
       <router-link class="item" v-for="(v,index) in tjlist"  :to="{path:'detail',query:{videoType:v.videoType,id:v.id}}">
         <p class="size-cover ptr ovh">
           <img v-view="v.image" alt="" class="J_img wp100 hp100 pta l0 t0">
         </p>
         <p class="J_til fs28 ellipsis alic">{{v.title}}</p>
       </router-link>
     </div>
   </div>
   <div class="dec_zhan c33 fs24" v-show="isshowdec">
       <p class="fs34 bgcff title">剧集 <img @click="hidedec" class="fr" src="../assets/img/detail_close.png" alt=""></p>
       <p class="pb20 fs28">{{detail.title}} <span class="c66 fs24">{{detail.score}}</span></p>
       <p>导演：{{detail.directors}}</p>
       <p class="ptr" style="padding-left: .8rem;"><span class="pta">主演：</span>{{detail.actors}}</p>
       <p class="d_dec">{{detail.description}}</p>
   </div>
 </div>
</template>

<script>
    export default {
        name: "",
      data(){
        return{
          detail:'',
          tjlist:[],
          actorlist:[],
          starIndex:0,
          actorpage:1,
          actorwork:[],
          isshowdec:false
        }
      },
      created(){
        this.getDetail()
      },
      watch:{
        '$route'(to,from){
          console.log(this.$route.query)
          Object.assign(this.$data, this.$options.data())
          this.getDetail()
        }
      },
      methods:{
        showdec:function () {
          this.isshowdec=true;
        },
        hidedec:function () {
          this.isshowdec=false
        },
        getDetail:function () {
          this.$http.get('/apiurl/videos/album.json?appKey=1&token=1&videoType='+this.$route.query.videoType+'&id='+this.$route.query.id).then(({data})=> {
              if(data.code==200){
                  data.data.directors=data.data.directors?data.data.directors.replace(/;/g, ' / '):'';
                  data.data.actors=data.data.actors?data.data.actors.replace(/;/g, ' / '):'';
                  data.data.tags=data.data.tags?data.data.tags.split(';'):[];
            var tags=[]
                    for(var i=0;i<data.data.tags.length;i++){
                      if(tags.length==3){break;}
                      if(data.data.tags[i]){
                        tags.push(data.data.tags[i])
                      }
                    }
            data.data.tags=tags;
                  this.detail=data.data;
            console.log('detail',this.detail)
                  this.recomList()
            this.$http.get('/apiurl/star/starShow.json?appKey=1&token=1&id='+this.$route.query.id).then(({data})=> {
              if(data.code==200&&data.data&&data.data.actor.length){
                    this.actorlist=data.data.actor;
                   this.changeactor(this.actorlist[0],0)
                  }
                })
              }
          })

//              $scope.loadtextshow = false;$scope.wholeshow = true;
//              if($rootScope.token){mystate();}else{$rootScope.init(mystate);}
//              if(!$scope.sc.back){$scope.getdm(1);}
//              var des='';
//              if($scope.detail.shortDesc){des=$scope.detail.shortDesc}else if($scope.detail.description){des=$scope.detail.description}
//              // wxshare.weixinshare_($scope.detail.title, $scope.detail.image1, des?des.substr(0, 26) + '···':'');
        },
        recomList:function () {
          this.$http.get('/apiurl/vod/recommend/albumListByITI.json?appKey=1&token=1&page=1&pageSize=6&Type='+this.$route.query.videoType+'&albumId='+this.$route.query.id).then(({data})=> {
            if(data.data.list.length){
              this.tjlist=data.data.list;
            }
          })
        },
        changeactor:function (v,index) {
          this.starIndex=index;
          this.actorpage=1;
          this.actorwork=[];
          this.starWork(v.starId)
       },
        starWork:function (starId) {
          this.$http.get('/apiurl/star/albumListByStar.json?appKey=1&token=1&orderby=sort&starId='+starId+'&page='+this.actorpage+'&pageSize=15&videoType='+this.$route.query.videoType+'&albumId='+this.$route.query.id).then(({data})=> {
            if(data.code==200&&data.data&&data.data.list.length){
            this.actorwork=data.data.list;
            //          if($scope.actorwork.length){
//            $scope.isshow_actorwork=true;
//          }else{
//            $scope.isshow_actorwork=false;
//          }
          }
        })
      }
      }
    }
</script>

<style scoped lang="scss">
  .detail-hid{height: 100vh;overflow: hidden;}
  .detail{
    .detail_info{padding:.4rem .2rem .3rem;
    .info_left{
      box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.4);
    }
    .info-right{
      .tag span{
        display: inline-block;background: #bcbcbc;line-height: .44rem;
      }
    }
   }
  .detail_btns{
    padding:.08rem .2rem;height:0.96rem;justify-content: space-between;
    .left{line-height: .8rem;
      .title{max-width: 1.72rem}
    }
  .tool{
    li{width:.6rem;margin-left:.4rem;line-height:0;
      &:first-child{
          margin: 0;
       }
       img{
         width: .44rem;height:.396rem;
       }
       p{line-height:.404rem }
    }
  }
  }
  .actors{
    .title{
      padding: .2rem .3rem;
    }
    .actorlist{
      height: 2.4rem;
      li {
        display: inline-block;
        margin: .16rem;
        width: 1rem;

  img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid transparent;
  }

  .a_line {
    border-bottom: 1px solid transparent;height:.3rem;
  }
  &.active {
    .a_line {
      border-bottom: 1px solid #3887ff;
      .angle{
        position: absolute;width:0;border:5px solid transparent;border-bottom:5px solid #3887ff; left: 50%;bottom: 0;margin-left: -5px;
        &:before {
           position: absolute;
           content: '';
           margin-left: -5px;
           left: 0;
           width: 0;
           height: 0;
           border: 5px solid transparent;
           border-bottom: 5px solid #fff;
           top: -4px;
         }
      }
    }
    img{border:2px solid #3887ff;}
  }
       }
    }
  .actorwork{
    li{
      width:2.6rem;padding-right:.2rem;display: inline-block;
    }
  }
  }
  .dec_zhan{
    position: fixed;padding:.2rem .3rem;top:calc(.7rem + 0.528 * (100vw - .4rem));bottom: 0;left:0;right:0;background: #fff;z-index:100;transition: all .9s ease-in;overflow-y:auto;
    .title{position:fixed;top:calc(.7rem + 0.528 * (100vw - .4rem));left:0;right:0;padding:.2rem .3rem;
      img{height: .6rem;padding: .15rem .3rem;}
    }
    .d_dec{padding: 0 .3rem;}
  }
  }
</style>
