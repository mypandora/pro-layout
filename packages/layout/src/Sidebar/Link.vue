<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '../utils';

export default {
  name: 'SidebarLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return 'a';
      }
      return 'router-link';
    },
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener',
        };
      }
      return {
        to,
      };
    },
  },
};
</script>
