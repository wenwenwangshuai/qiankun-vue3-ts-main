<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <img class="sidebar-logo" :src="collapse ? smallSidebarLogo : sidebarLogo" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      sidebarLogo: require('@/assets/sidebar-logo.png'),
      smallSidebarLogo: require('@/assets/sidebar-logo-small.png')
    };
  }
});
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 75px;
  background: #2b2f3a;
}

.sidebar-logo {
  height: 40px;
}
</style>
