<script>
import iframeToggle from './IframeToggle/index';

export default {
  name: 'AppMain',
  components: { iframeToggle },
  props: {
    tagsView: {
      type: Object,
      default: () => ({}),
    },
  },
  render() {
    const { cachedViews = [], iframeViews } = this.tagsView;
    const key = this.$route.path;

    return (
      <main class="mypandora-layout-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive include={cachedViews}>
            <router-view key={key} />
          </keep-alive>
        </transition>
        <iframe-toggle iframeViews={iframeViews} />
      </main>
    );
  },
};
</script>
