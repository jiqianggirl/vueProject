<template>
<div>test1</div>
</template>

<script>
    export default {
        name: "test1",
      activated(){
        console.log('test1激活')
      },
      deactivated(){
        console.log('test1缓存')
      }
    }
</script>

<style>

</style>
