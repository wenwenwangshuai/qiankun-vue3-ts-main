<template>
  <div class="has-logo">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        background-color='#304156'
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in menu"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default defineComponent({
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'menu'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
})
</script>
