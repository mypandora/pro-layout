<template>
  <div>
    我是页面测试组件:
    <el-button type="primary"> {{ this.$route.meta?.title }} </el-button>
  </div>
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
