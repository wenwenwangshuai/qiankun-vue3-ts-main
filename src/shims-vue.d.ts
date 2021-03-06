import { ComponentCustomProperties } from '@/vue';
import { Store } from 'vuex';
import { IModulesState } from '@/interface/store';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<IModulesState>;
    $has: (permission: string) => boolean;
  }
}

declare module '*.json' {
  const value: any;
  export default value;
}
