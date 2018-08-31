import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import D from "@/components/PartnerHome";
import partnerInfo from "@/components/PartnerBasicInfo";
import dd from "@/components/demo";
import withdwar from "@/components/Withdraw";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
      children: [
        {
          path: "Home",
          name: "Dashboard",
          component: D
        },
        {
          path: "BasicInfo",
          name: "Info",
          component: partnerInfo,
          children: [
            {
              path: "three",
              name: "demo",
              component: dd
            }
          ]
        },
        {
          path: "WithdrawList",
          name: "WithdrawComponent",
          component: withdwar
        }
      ]
    }
  ]
});
