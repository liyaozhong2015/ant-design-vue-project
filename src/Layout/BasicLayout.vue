<template>
  <div :class="['nav-theme-'+navTheme,'nav-theme-'+navLayout]">
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      v-if="navLayout==='left'"
      :theme="navTheme"
      :trigger="null"
      collapsible
      v-model="collapsed"
      width="256px"
    >
      <div class="logo"><img src="../assets/logo.png" style="display: inline-flex; width:35px; height: 36px;" />&nbsp;&nbsp;<span v-if="!collapsed">启航中台系统</span></div>
      <sider-menu :theme="navTheme"/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" >
        <div>
        <a-icon class="trigger"
        :type="collapsed?'menu-unfold':'menu-fold'"
         @click="collapsed=!collapsed"
         ></a-icon>
        <header-view/>
      </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '812px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        <footer-view/>
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <setting-drawer></setting-drawer>
  </div>
</template>
<script>
import HeaderView from "./Header"
import FooterView from "./Footer"
import SiderMenu from "./SiderMenu"
import SettingDrawer from "../components/SettingDrawer"
export default {
    components: {
        HeaderView,
        FooterView,
        SiderMenu,
        SettingDrawer,
    },
  data() {
    return {
      collapsed:false
    }
  },
  computed: {
    navTheme() { 

      return this.$route.query.navTheme || 'dark';
    },
    navLayout() { 

      return this.$route.query.navLayout || 'left';
    }

  },
  mounted() {
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
}
</script>

<style scoped >
.trigger:hover{

  background: #eeeeee;
}
.trigger{

  line-height:64px;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

.logo{
  height:64px;
  line-height: 64px;
  text-align: center;
  overflow:hidden;
}
.nav-theme-dark >>> .logo{

  color:#ffffff;
  font-size: 18px;
}
</style>