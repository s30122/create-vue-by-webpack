<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside >
          <!--First,router(the props of el-menu) must set to true-->
          <el-menu default-active="1" class="el-menu-vertical-demo" router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商戶首頁</span>
              </template>
              <!--Second, route(props of el-menu-item) must have '/'. ex:/A or /B 
              Otherwise,if you click 1-1 => 1-3 => 1-2 ,will route fail,url will be http://localhost:8080/#/BasicInfo/BasicInfo
              -->
              <el-menu-item index="/Home">首頁</el-menu-item>
              <el-menu-item index="/BasicInfo">基本信息</el-menu-item>
              <el-menu-item index="/BasicInfo/three">角色設定</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>交易管理</span>
              </template>
              <el-menu-item index="2-1">訂單列表</el-menu-item>
            </el-submenu>            

          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
/*
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
*/
</style>
