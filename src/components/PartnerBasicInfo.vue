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
                <label>狀態：{{StatusName}}</label>
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
    <el-tab-pane label="支付配置" name="second">
        
             <!-- <el-col :span="6" :v-for="(item, index) in PayMethodArray" :key="index">
                <el-card >
                <div slot="header" class="clearfix">
                    <img :src="'./assets/'+item.vendor+'.jpg'" class="[item.status?image:grayimage]">
                </div>
                 <el-row v-for="paychannel in item.paychannels" :key="paychannel.paymethod">
                    <el-col :span="6">{{paychannel.paymethod}}</el-col>
                    <el-col :span="6" :offset="12">
                        <i class="el-icon-circle-check">{{paychannel.status}}</i>
                    </el-col>
                </el-row>                
                </el-card>
            </el-col>  -->

    </el-tab-pane>
    <el-tab-pane label="銀行卡" name="third">
      <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="BankName"
          label="銀行名稱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="AccountName"
          label="開戶名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="BranchName"
          label="分行名稱">
        </el-table-column>
        <el-table-column
          prop="ProvinceName"
          label="省份/城市"
          :formatter=combinerowproprs >
        </el-table-column>
        <el-table-column
          prop="CityName"
          label="城市"
          v-if="false"
          >
        </el-table-column>        
        <el-table-column
          prop="CardNumber"
          label="卡號">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
const axios = require("axios");

export default {
  data() {
    return {
      //basic
      PartnerCode: "first",
      MerchantCode: "first",
      Status: true,
      Owner: "first",
      Phone: "first",
      Email: "first",
      //pay setting
      PayMethodArray: [],
      tableData: []
    };
  },
  computed: {
    StatusName: function() {
      return this.Status ? "啟用" : "停用";
    }
  },
  methods: {
    combinerowproprs(row, column, cellValue, index) {
      return row.ProvinceName + "/" + row.CityName;
    },
    handleClick(tab, event) {
      if (tab.index === "1") {
        axios
          .get("http://localhost:23590/api/partner/Inquiry/PaySettings")
          .then(response => {
            debugger;
            this.PayMethodArray = response.data;
          })
          .catch(error => {
            debugger;
            console.log(error);
          });
      }
      if (tab.index === "2") {
        axios
          .get("http://localhost:23590/api/partner/Inquiry/BankCards")
          .then(response => {
            this.tableData = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    axios
      .get("http://localhost:23590/api/partner/Inquiry/Basic")
      .then(response => {
        this.PartnerCode = response.data.Code;
        this.MerchantCode = response.data.MerchantCode;
        this.Status = response.data.Status;
        this.Owner = response.data.Owner;
        this.Phone = response.data.Phone;
        this.Email = response.data.Email;
      })
      .catch(error => {
        console.log(error);
        //this.errored = true;
      });
    //.finally(() => (this.loading = false));
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
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 200px;
  display: block;
}
.grayimage {
  background: #999;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>