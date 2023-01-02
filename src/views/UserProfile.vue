<template>
  <div class="content-block__profile">
    <div class="container">
      <div class="profile-info">
        <h3>Author info</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <p> facilis voluptatibus quis totam! Aut, tempore tenetur!</p>
      </div>
      <div class="description-info">
        <h2>Author Descriptions</h2>
        <form method="get" @submit.prevent="tryLogout(200)">
        <ul class="flex-outer">
          <li>
            <button type="submit">Logout</button>
          </li>
        </ul>
      </form>        
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus assumenda, officiis fugit odit libero dolor
          cupiditate animi
          itaque tempora in nostrum quo pariatur aperiam nam, illum quidem. Beatae, laborum placeat.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
    }
  },

  methods: {
    ...mapActions('user', ['logout']),

    async tryLogout(timout) {
      let {res} = await this.logout();
      if (res) {
        await new Promise(resolve => setTimeout(resolve, timout));
        this.$router.push({ name: 'topics' }).then(() => {
          location.reload();
        });
      } 
    },
  }
}
</script>

<style lang="scss" scoped>
.content-block__profile {
  .container {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
}
</style>