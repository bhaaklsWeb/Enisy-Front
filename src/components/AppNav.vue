<template>
    <div class="nav-block" :class="{ 'offsetTopSticky': offsetToTopSidebar }">
      <div class="fa-3x" style="text-align: center; padding: 10px; background-color: #fff; height: 100%; " v-if="ifload">
        <fa-icon icon="fas fa-spinner" class="fa-pulse" style="vertical-align: middle;"/>
      </div>
      <div v-else v-for="article, i in topics" :key="i">
        <div v-show="(i === Object.keys(topics)[0])" class="nav-block_header">
            <p>Recent Posts</p>      
        </div>
        <div class="nav-block__post"
          :class="{'nav-block__post_border-none': (i === Object.keys(topics).pop())}">
          <img src="@/assets/img/navimg2.png" :alt="`${article.pic}`">
          <p>{{ article.title }}</p>
          <span>{{ article.createdAt }}</span>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
      return {
        offsetToTopSidebar: false,
      }
  },
  computed: {
    ...mapGetters('topics', { topics: 'all'}),
    ifload() {
      return this.topics === null;
    }
  },
  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 50) {
        return
      }
      this.offsetToTopSidebar = currentScrollPosition > this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss">

</style>