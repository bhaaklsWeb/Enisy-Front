<template>
  <div id="loader" class="center"></div>
  <div class="fa-4x" style="text-align: center; background-color: #fff; height: 100%; padding: 10px 0;" v-if="ifload">
    <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
      <fa-icon icon="fas fa-spinner" class="fa-pulse"/>
    </div>
  </div>
  <template v-else>
    <div v-for="article, i in topics" :key="i" class="content-block__post"
      :class="(i === Object.keys(topics).pop()) ? 'content-block__post_border-none' : ''">
      <div>
        <h2>{{ article.title }}</h2>
        <p>{{ article.createdAt }}</p>
        <div :class="article.pic"></div>
      </div>
      <p v-for="pr, i in article.paragraphs" :key="i">{{ pr.p }}</p>
      <div>
        <router-link :to="{ name: 'topics-item', params: { id: i } }" class="conttent-block__read-more">
          READ MORE >>
        </router-link>
        <span>
          <a href=""><fa-icon icon="fa-brands fa-instagram" class="fa-lg" /></a>
          <a href=""><fa-icon icon="fa-brands fa-facebook" class="fa-lg" /></a>
          <a href=""><fa-icon icon="fa-brands fa-twitter" class="fa-lg" /></a>
        </span>
      </div>
      <div class="content-block__pagination" :style="(i < Object.keys(topics).pop()) ? { display: 'none' }: {display: 'inherit'} ">
        <p>
          <a href="">1</a><a href="">2</a><a href="">3</a>
        </p>
    </div>
    </div>
  </template>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      load: false
    }
  },
  computed: {
    ...mapGetters('topics', { topics: 'all', waitForLoad: 'topicsReady' }),
    ifload() {
      return this.load;
    }
  },
  async created() {
    this.getTopics();
    console.log('TOPPICS', this.topics);
  },
  methods: {
    async getTopics() {
      this.load = true;
      await this.waitForLoad;
      this.load = false;
    }
  },
}
</script>

<style lang="scss">
@import "@/scss/content.scss";
</style>