<template>
    <div>
        <h1>Home</h1>
          <!-- <el-col :span="8" v-for="item in PayMethodArray" :key="item.Vendor"> 
                <el-card >
                <div slot="header" class="clearfix">
                    <img :src="'/static/'+item.Vendor+'-logo.jpg'" :class="[item.Enable?'image':'grayimage']" >
                </div>
                 <el-row v-for="paychannel in item.PayChannels" :key="paychannel.PayChannel">
                    <el-col :span="6">{{paychannel.PayChannel}}</el-col>
                    <el-col :span="6" :offset="12">
                        <i :class="[paychannel.Status?'el-icon-circle-check':'el-icon-circle-close']">{{paychannel.Status}}</i>
                    </el-col>
                </el-row>                
                </el-card>
            </el-col>  -->
       
    </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      PayMethodArray: []
      // PayMethodArray: [
      //   {
      //     Vendor: "AliPay",
      //     Enable: true,
      //     // src: require("../assets/" + +".jpg"),
      //     PayChannels: [
      //       {
      //         PayChannel: "QR",
      //         Status: true
      //       },
      //       {
      //         PayChannel: "H5",
      //         Status: true
      //       }
      //     ]
      //   },
      //   {
      //     Vendor: "WeiXin",
      //     Enable: false,
      //     PayChannels: [
      //       {
      //         PayChannel: "QR",
      //         Status: true
      //       },
      //       {
      //         PayChannel: "H5",
      //         Status: true
      //       }
      //     ]
      //   },
      //   {
      //     Vendor: "QQ",
      //     Enable: true,
      //     PayChannels: [
      //       {
      //         PayChannel: "QR",
      //         Status: true
      //       },
      //       {
      //         PayChannel: "H5",
      //         Status: false
      //       }
      //     ]
      //   }
      // ]
    };
  },
  beforeCreate() {
    axios
      .get("http://localhost:23590/api/partner/Inquiry/PaySettings")
      .then(response => {
        this.PayMethodArray = response.data;
      })
      .catch(error => {
        debugger;
        console.log(error);
      });
  },
  created() {},
  mounted() {
    // axios
    //   .get("http://localhost:23590/api/partner/Inquiry/PaySettings")
    //   .then(response => {
    //     debugger;
    //     this.PayMethodArray = response.data;
    //   })
    //   .catch(error => {
    //     debugger;
    //     console.log(error);
    //   });
  }
};
</script>
<style scope>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.image {
  width: 200px;
  display: block;
}
.grayimage {
  width: 200px;
  display: block;
  opacity: 0.5;
}
.el-icon-circle-check {
  color: green;
}
.el-icon-circle-close {
  color: red;
}
</style>



