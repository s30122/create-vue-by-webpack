<template>
  <el-tabs value="first" @tab-click="handleClick">
    <el-tab-pane label="商戶信息" name="first">
        <el-row>
            <el-col :span="8" >
                <label>商戶名稱：{{PartnerCode}}</label>
            </el-col>
            <el-col :span="8">
                <label>商戶代號：{{MerchantCode}}</label>
            </el-col>
            <el-col :span="8">
                <label>狀態：{{Status}}</label>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <label>負責人：{{Owner}}</label>
            </el-col>
            <el-col :span="8">
                <label>連繫電話：{{Phone}}</label>
            </el-col>
            <el-col :span="8">
                <label>郵箱地址：{{Email}}</label>
            </el-col>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="支付配置" name="second">支付配置</el-tab-pane>
    <el-tab-pane label="銀行卡" name="third">銀行卡</el-tab-pane>
  </el-tabs>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      PartnerCode: "first",
      MerchantCode: "first",
      Status: "first",
      Owner: "first",
      Phone: "first",
      Email: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted: function() {
    axios
      .get("http://localhost:23590/api/partner/Inquiry/OLE777")
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
};
</script>