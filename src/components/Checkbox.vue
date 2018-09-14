<template>
    <el-checkbox-group v-model="checkedPeople" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="p in people" :label="p.ID" :key="p.ID">{{p.Name}}</el-checkbox>
    </el-checkbox-group>    
</template>

<script>
export default {
  data() {
    return {
      people: [
        { ID: 0, Name: "全部" },
        { ID: 1, Name: "AAA" },
        { ID: 2, Name: "BBB" },
        { ID: 3, Name: "CCC" },
        { ID: 4, Name: "DDD" },
        { ID: 5, Name: "EEE" }
      ],
      checkedPeople: [],
      checkAll: false,
      tempChecked: []
    };
  },
  methods: {
    handleCheckedCitiesChange(val) {
      this.tempChecked = val;

      console.log(val);
      console.log(this.checkedPeople);
    }
  },
  watch: {
    tempChecked: function(newVal, oldVal) {
      if (newVal.includes(0) && !oldVal.includes(0)) {
        this.checkedPeople = this.people.map(x => {
          return x.ID;
        });
      }
      if (!newVal.includes(0) && oldVal.includes(0)) {
        this.checkedPeople = [];
      }
      console.log(this.checkedPeople);
    }
  }
};
</script>

