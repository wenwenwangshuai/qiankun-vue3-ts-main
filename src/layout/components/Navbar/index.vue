<template>
  <div class="navbar">
    <hamburger :is-active="app.sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="right-menu">
      <el-dropdown trigger="hover">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <span>{{userInfo.personName}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-refresh">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Hamburger from '@/layout/components/Hamburger';

export default defineComponent({
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(['app', 'userInfo']),
    avatar() {
      return require('@/assets/logo.png');
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      this.$store.dispatch('user/logout');
    }
  }
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.hamburger-container {
  line-height: 50px;
  height: 100%;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.right-menu {
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 30px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.user-avatar {
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 5px;
}
</style>
