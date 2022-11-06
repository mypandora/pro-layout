export default {
  mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    this.fixBugIniOS();
  },
  methods: {
    fixBugIniOS() {
      const $subMenu = this.$refs.topSubMenu;
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave;
        $subMenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') {
            return;
          }
          handleMouseleave(e);
        };
      }
    },
  },
};
