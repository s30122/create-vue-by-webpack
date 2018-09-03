<template>
    <el-form ref="form" :model="form" label-position="top" label-width="120px" :rules="rules">
        <el-form-item label="帳戶金額">
            <el-input v-model="form.balance" disabled></el-input>
        </el-form-item>
        <el-form-item label="手續費">
            <el-input v-model="form.fee" disabled></el-input>
        </el-form-item>
        <el-form-item label="可結算餘額" prop="effective_balance">
            <el-input v-model="effective_balance" disabled></el-input>
        </el-form-item>
        <el-form-item label="帳戶選擇" prop="bank_account">
            <el-select v-model="form.bank_account" placeholder="請選擇常用帳戶">
                <el-option
                v-for="account in Accounts"
                :key="account.BankCardID"
                :label="account.Bank+' '+account.Card"
                :value="account.BankCardID">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="提現金額" prop="amount">
            <el-input v-model="form.amount" clearable></el-input>
        </el-form-item>
        <el-form-item label="支付密碼" prop="password">
            <el-input v-model="form.password" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()"  :disabled="this.form.bank_account==''||this.form.amount==0||this.form.password==''">確定</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    var checkEffctiveAmount = (rule, value, callback) => {
      if (!value) {
        callback("pls input amount");
      }
      if (value > this.effective_balance) {
        callback("less than 可結算餘額");
      }
      callback();
    };
    return {
      form: {
        balance: 0,
        fee: 5,
        bank_account: "",
        amount: 0,
        password: ""
      },
      Accounts: [],
      DBpassword: "",

      rules: {
        bank_account: [
          {
            required: true,
            message: "Please select activity account",
            trigger: "change"
          }
        ],

        amount: [
          {
            validator: checkEffctiveAmount,
            trigger: "blur"
          },
          {
            min: 0,
            message: "Must >= 0 and >=可結算餘額",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    effective_balance: function() {
      let ef_balance = this.form.balance - this.form.fee;
      if (ef_balance < 0) return 0;
      else return ef_balance;
    }
  },
  methods: {
    onSubmit: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          axios
            .post(`http://localhost:23590/api/withdraw/Create`, {
              BankCardID: this.form.bank_account,
              Amount: this.form.amount,
              Password: this.form.password
            })
            .then(response => {
              if (response.data.return_code == 0) {
                alert(response.data.return_msg);
                window.location.href = "/#/WithdrawList";
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.submitEnable = false;
          alert("invalid");
        }
      });
    }
  },
  mounted() {
    axios
      .get("http://localhost:23590/api/withdraw/ApplyWithdraw")
      .then(response => {
        this.form.balance = response.data.Balance;
        this.DBpassword = response.data.Password;
        this.Accounts = response.data.Accounts;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
