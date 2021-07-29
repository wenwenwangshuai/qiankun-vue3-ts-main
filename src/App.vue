<template>
  <layout />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import layout from '@/layout/index.vue';

export default defineComponent({
  name: "app",
  components: {
    layout
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
});
</script>

