<template>
  <div>我是页面测试组件: {{ this.$route.meta?.title }}</div>
</template>

<script>
export default {
  name: 'TestDemo',
  data() {
    return {
      message: 'hello world',
    };
  },
};
</script>
