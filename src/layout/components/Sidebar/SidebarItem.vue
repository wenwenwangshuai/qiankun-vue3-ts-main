<template>
  <div v-if="!item.hidden">
    <template v-if="!item.subMenu">
      <el-menu-item :index="resolvePath(item.path)">
        <i :class="['svg-icon','iconfont',item.icon]" />
        <template #title><span class="menu-title">{{item.menuName}}</span></template>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <i :class="['svg-icon','iconfont',item.icon]" />
        <span class="menu-title">{{item.menuName}}</span>
      </template>
      <sidebar-item
        v-for="child in item.subMenu"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import FixiOSBug from './FixiOSBug'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarItem',
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
})
</script>
