<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children && item.meta" :key="item.path" @click="Goto(item.path)">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span v-if="item.meta.title">{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>

import  SubMenu  from './SubMenu'
export default {
  props: {
    theme: {
      type: String,
      default:"dark",
    }
  },
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    /* console.log(JSON.stringify(this.$router.options.routes)); */
    const menuData = this.getMenuData(this.$router.options.routes).menuData[0].menuData ;
    //console.log(JSON.stringify(menuData));
    return {
      collapsed: false,
      list: [
        
      ],
      menuData,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      
    },
    Goto(url) { 
      this.$router.push({ path: url, query:this.$route.query});

    },
    getMenuData(routes) { 

      const menuData = [];
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          const newItem = item;
          //console.log(JSON.stringify(item));
          if (item.hideChildrenInMenu) { 
            delete newItem.children;
          }
          //
          //console.log(JSON.stringify(newItem));
          if (item.children && !item.hideChildrenInMenu) {
            //console.log(JSON.stringify(item.children));
            newItem.children = this.getMenuData(item.children).menuData;
            
          }
          
          menuData.push(newItem);
        } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
          menuData.push(this.getMenuData(item.children));
         }
      });
      return { menuData };
      
    }
  }, 
};
</script>