 <template functional>
   <a-sub-menu :key="props.menuInfo.path" >
     <span slot="title">
       <a-icon v-if="props.menuInfo.meta.icon" :type="props.menuInfo.meta.icon" /><span >{{ props.menuInfo.meta.title }}</span>
     </span>
     <template v-for="item in props.menuInfo.children">
       <a-menu-item v-if="!item.children" :key="item.path" @click="parent.Goto(item.path)">
         <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
         <span v-if="item.meta">{{ item.meta.title }}</span>
       </a-menu-item>
       <sub-menu v-else :key="item.path" :menu-info="item" />
     </template>
   </a-sub-menu>
 </template>
 <script>
 export default {
   props: ['menuInfo'],
 };
</script>