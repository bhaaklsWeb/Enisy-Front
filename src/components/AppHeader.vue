<template>
  <div class="header">
    <span>enisy</span>

    <div class="header__bar">
      <router-link :to="{ name: 'topics' }"><fa-icon icon="fa-home" /></router-link>
      <router-link :to="{ name: 'profile-route' }"><fa-icon icon="fa-circle-user" /></router-link>
      <a @click="openSearch()">
        <fa-icon icon="fa-search" />
        <form class="header__bar_search-form">
          <input type="text" name="search" placeholder="Search.." :class="{ 'open_search': isOpenSearch }" id="search"
            ref="searchInp">
          <button type="submit"><fa-icon icon="fa-search" /></button>
        </form>
      </a>
    </div>

    <div class="header__form">
      <div class="header__sign" v-if="!isLogin">
        <router-link :to="{ name: 'login-route' }" class="header__button header__button_in">
          Sign In
        </router-link>
        <router-link :to="{ name: 'register-route' }" class="header__button">
          Sign Up
        </router-link>
      </div>
      <div v-else @click.prevent="toggleDropdown" class="dropdown" style="padding-right: 10px;">
        <span class="fa_user"><fa-icon size="1x" icon="fa-user" />
          <span class="ch_hoverable"><fa-icon size="xs" icon="fa-caret-down" /></span>
        </span>
        <transition enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut" appear appear-active-class="icon-appear">
          <ul v-show="isOpenDrop" class="dropdown-content">
            <li>
              <router-link :to="{ name: 'profile-route' }">
                <span><fa-icon size="sm" icon="fa-home-user" /></span>
                <span>Tom_00</span>
                <span><fa-icon size="xs" icon="fa-caret-right" /></span>
              </router-link>
            </li>
            <li>
              <a @click="tryLogout(1000)" href="#">
                <span><fa-icon size="sm" icon="fa-sign-out" /></span>
                <span>Logout</span>
                <span><fa-icon size="xs" icon="fa-caret-right" /></span>
              </a>
            </li>
          </ul>
        </transition>

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      isOpenDrop: false,
      isOpenSearch: false,
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin']),

  },

  methods: {
    ...mapActions('user', ['logout']),

    async tryLogout(timout) {
      let { res } = await this.logout();
      if (res) {
        await new Promise(resolve => setTimeout(resolve, timout));
        this.$router.push({ name: 'topics' }).then(() => {
        });
        location.reload();
      }
    },

    toggleDropdown() {
      this.isOpenDrop = !this.isOpenDrop;
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpenDrop = false;
        this.isOpenSearch = false;
      }
      var search = document.getElementById('search');
      if (e.target == search) {
        this.isOpenSearch = true;
      }
    },

    openSearch() {
      this.isOpenSearch = !this.isOpenSearch;
      this.$nextTick(() => {
        this.$refs.searchInp.focus();
      });
    }
  },

  mounted() {
    document.addEventListener('click', this.close)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.close)
  }
}

</script>

<style lang="scss">
@import "@/scss/header.scss";
</style>