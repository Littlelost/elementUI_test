<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <Lm/>
      </el-aside>
      <el-container>
        <el-header>
          <Rm/>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Lm from '../../components/LeftMenu.vue'
import Rm from '../../components/RightTop.vue'

</script>

<style lang="scss">
.el-aside{
  background-color: rgb(84, 92, 100);
}
.el-header{
  background-color: gold;
}
.el-main{
  background-color: palevioletred;
}
.el-aside, .el-container, .common-layout, #app, body, html{
  height: 100%;
}
</style>