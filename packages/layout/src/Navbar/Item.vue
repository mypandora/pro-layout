<script>
export default {
  name: 'NavbarItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} class="mr8" />);
    }

    if (title) {
      if (title.length > 5) {
        vnodes.push(
          <span slot="title" title={title} class="text-ellipsis">
            {title}
          </span>,
        );
      } else {
        vnodes.push(
          <span slot="title" class="text-ellipsis">
            {title}
          </span>,
        );
      }
    }
    return vnodes;
  },
};
</script>
