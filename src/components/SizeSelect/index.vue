<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :command="item.value"
        :disabled="size === item.value"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'SizeSelect',
  props: {
    size: {
      type: String,
      default: 'size',
    },
  },
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' },
      ],
    };
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size;
      // 去更新
    },
  },
};
</script>
