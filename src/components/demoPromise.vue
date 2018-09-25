<template>
    <div>
        <button @click="Click">promise test</button>
        <button @click="Click2">alert</button>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    Click() {
     let p= new Promise((resolve,reject)=>{
         console.log('aaa')
         resolve()

     })

     p().then(response => {
         
     }).catch((err) => {
         
     });
    },
    Click2() {
      alert("hi");
    },
    callApi() {
      console.log("call api");
    },
    apiSuccess() {
      console.log("call api success");
    },
    apiFail() {
      console.log("cal api error");
    }
  }
};
</script>

