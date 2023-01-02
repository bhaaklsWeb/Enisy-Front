<template>
  <div class="navbar" :class="{ 'navbar--hidden': !showNavbar }" >
    <app-header />
  </div>

  <div class="wrap">
    <div class="nav">
      <div class="content-block">
        <router-view />
      </div>

      <app-right-nav v-if="!isLoginRoute"/>

    </div>
  </div>

  <div class="wrap wrap_footer">
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppRightNav from '@/components/AppNav.vue'

export default {
  components: { AppHeader, AppFooter, AppRightNav },
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0
    }
  },

  computed: {
    isLoginRoute() {
      return this.$route.name === 'login-route' || this.$route.name === 'register-route';
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
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
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
//fonts
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&family=Open+Sans:wght@400;500;600&display=swap');
@import "@/scss/app.scss";

</style>
