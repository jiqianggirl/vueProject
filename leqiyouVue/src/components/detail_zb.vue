<template>
 <div class="detail_zb">
   <nav class="headline headline-title headline-fixed alic bdb wp100 bgcff">
     <img src="/static/left-arrow.png" alt="" @click="$router.go(-1)" class="back">
     <p class="fs36 c33">{{$route.query.name}}</p>
   </nav>
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
 </div>
</template>
<script>
    export default{
        name: "detail_zb",
        data(){

        },
        methods: {}
    }
</script>
