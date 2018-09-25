<template>
    <div>
      <h1>vue 1</h1>
        <input type="text" v-model="msg">
       User Name is {{msg}}
        <button @click="click"> set user name </button>
    </div>
</template>


<script>
export default {
  data() {
    return {
      msg: this.$store.state.userName
    };
  },
  methods: {
    click() {
      this.$store.commit("Set_User_Name", this.msg);
    }
  }
};
</script>


