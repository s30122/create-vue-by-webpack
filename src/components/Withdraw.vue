<template>
    <div>
        <el-row>
            <el-col :span="8">  
                <span>狀態 : </span>
                <el-select v-model="seletectStatus" clearable  placeholder="Select">
                    <el-option
                    v-for="item in WithdrawStatusEnum"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <span>提現單號：stash1</span>
                <el-input
                    placeholder="請輸入單號"
                    v-model="inputNO">
                </el-input>
            </el-col>
            <el-col :span="8">
                <span class="demonstration">日期 : </span>
                <el-date-picker
                v-model="ChooseDate"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" :offset="20">
                <el-button @click="Query()">搜尋</el-button>
                <el-button @click="exportExcel()">
                  <template>
                    <download-excel :data="tableData" :fields = "json_fields">
                        導出
                    </download-excel>
                  </template>
                </el-button>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <router-link to="/applyWithdraw">
              <el-button type="primary" icon="el-icon-circle-plus" >申請提現
              </el-button>
            </router-link>
            
          </el-col>
        </el-row>
        <router-view></router-view>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="SN"
        label="提現單號"
        >
      </el-table-column>
      <el-table-column
        prop="CardInfo"
        label="提現銀行卡"
        >
      </el-table-column>
      <el-table-column
        prop="Amount"
        label="金額(元)" :formatter=ShowMoney>
      </el-table-column>
      <el-table-column
        prop="Fee"
        label="手續費(元)" :formatter=ShowMoney>
      </el-table-column>
      <el-table-column
        prop="Date"
        label="日期" :formatter=FormateDate>
      </el-table-column>
      <el-table-column
        prop="Status"
        label="狀態" :formatter=FormateStatus>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作" type="index" >
        <template slot-scope="scope">
        <el-button @click.native.prevent="ChangeStatus(scope.row.SN)"  type="text" size="small" v-if="scope.row.Status==1" >Cancel</el-button>
        <!-- v-if="scope.row.status==1" -->
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="selectedPage"
      :page-sizes="pageSizes"
      :page-size="selectedSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="TableRowCount">
    </el-pagination>
  </div>
</template>
<script>
const moment = require("moment");
const axios = require("axios");
let $router = require("vue-router");
export default {
  data() {
    return {
      pageSizes: [10, 20, 30, 40],
      selectedSize: 10,
      selectedPage: 1,
      ChooseDate: [
        moment()
          .add(-1, "month")
          .hour(0)
          .minute(0)
          .second(0),
        moment()
          .hour(23)
          .minute(59)
          .second(59)
      ],
      inputNO: "",
      seletectStatus: "",
      WithdrawStatusEnum: [
        { value: 1, text: "處理中" },
        { value: 2, text: "提款成功" },
        { value: 3, text: "取消交易" },
        { value: 4, text: "提款失敗" }
      ],
      TableRowCount: 0,
      tableData: [],
      json_fields: {
        提現單號: "SN",
        提現銀行卡: "CardInfo",
        "金額(元)": {
          field: "Amount",
          callback: value => {
            return Number(value).toFixed(2);
          }
        },
        "手續費(元)": {
          field: "Fee",
          callback: value => {
            return Number(value).toFixed(2);
          }
        },
        日期: {
          field: "Date",
          callback: value => {
            return moment(value).format("YYYY-MM-DD HH:mm:ss");
          }
        },
        狀態: {
          field: "Status",
          callback: value => {
            return this.WithdrawStatusEnum.find(item => {
              return item.value === value;
            }).text;
          }
        }
      }
      // tableData: [
      //   {
      //     SN: "W001",
      //     Card: "中國建設銀行123456",
      //     amount: 1000,
      //     fee: 5,
      //     updateDate: new Date(2018, 1, 4, 3, 55, 23),
      //     status: 1
      //   },
      //   {
      //     SN: "W002",
      //     Card: "京城銀行593760293",
      //     amount: 5000,
      //     fee: 5,
      //     updateDate: new Date(2018, 12, 6, 23, 1, 0),
      //     status: 4
      //   },
      //   {
      //     SN: "W003",
      //     Card: "台新銀行9048592493026",
      //     amount: 345,
      //     fee: 5,
      //     updateDate: new Date(2018, 5, 28, 9, 0, 59),
      //     status: 3
      //   }
      // ]
    };
  },
  methods: {
    exportExcel() {},
    FormatJson(jsonData) {
      return jsonData.map(v => {
        debugger;
      });
    },
    handleCurrentChange(page) {
      this.selectedPage = page;
      this.Query();
    },
    handleSizeChange(size) {
      //console.log(`${size} items per page`);
      this.selectedSize = size;
      this.Query();
    },

    Query() {
      // console.log(this.seletectStatus);
      // console.log(this.ChooseDate);
      // console.log(this.inputNO);
      axios
        .post("http://localhost:23590/api/withdraw/QueryByPartnerID", {
          Status: this.seletectStatus,
          SN: this.inputNO,
          Start: this.ChooseDate[0].format("YYYY-MM-DD HH:mm:ss Z"),
          End: this.ChooseDate[1].format("YYYY-MM-DD HH:mm:ss Z"),
          Page: this.selectedPage,
          Size: this.selectedSize
        })
        .then(response => {
          this.TableRowCount = response.data.TotalCount;
          this.tableData = response.data.PagedData;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    FormateStatus(row, column, cellValue, index) {
      return this.WithdrawStatusEnum.find(item => {
        return item.value === cellValue;
      }).text;
    },

    ChangeStatus(key) {
      a;
      axios
        .post(`http://localhost:23590/api/withdraw/ChangeSatus/${key}/3`, {})
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
      this.Query();
    },
    ShowMoney(row, column, cellValue, index) {
      if (column.property == "Amount" || column.property == "Fee") {
        return Number(cellValue).toFixed(2);
      }
    },
    FormateDate(row, column, cellValue, index) {
      return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    this.Query();
  }
};
</script>
