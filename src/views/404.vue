<template>
  <div class="wscn-http404-container">你懂得</div>
</template>

<script>
export default {
  name: 'SystemNotFound',
  computed: {
    message() {
      return '找不到网页！';
    },
  },
};
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
</style>
