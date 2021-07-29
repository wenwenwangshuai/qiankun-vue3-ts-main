<template>
  <section class="app-main">
    <div id="subappContainer"></div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
})
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 83px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 83px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
