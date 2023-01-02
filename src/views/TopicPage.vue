<template>
  <template v-if="hasTopic">
    <div class="fa-4x" style="text-align: center; margin: 100px auto;" v-if="ifload">
        <fa-icon icon="fas fa-spinner" class="fa-pulse" />
    </div>
    <div class="content-block__post" v-else>
      <div>
        <h2>{{ topic.title }}</h2>
        <p>{{ topic.createdAt }}</p>
        <div :class="topic.pic"></div>
      </div>
      <p v-for="pr, i in topic.paragraphs" :key="i">{{ pr.p }}</p>
      <div>
        <label><fa-icon icon="fa-eye" /> 0</label>
        <span>
          <a href="#"><fa-icon icon="fa-brands fa-instagram" class="fa-lg" /></a>
          <a href="#"><fa-icon icon="fa-brands fa-facebook" class="fa-lg" /></a>
          <a href="#"><fa-icon icon="fa-brands fa-twitter" class="fa-lg" /></a>
        </span>
      </div>
    </div>
  </template>
  <e404 v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import E404 from '@/components/MyError404';

export default {
  components: { E404 },
  data() {
    return {
      topic: {},
      load: false,
    }
  },
  computed: {
    ...mapGetters('topics', { getTopicById: 'one', waitForLoad: 'topicsReady' }),
    curId() {
      return +this.$route.params.id;
    },
    validId() {
      return /^[1-9]+\d*$/.test(this.curId);
    },
    hasTopic() {
      return this.validId && typeof this.topic !== 'undefined';
    },
    ifload() {
      return this.load;
    }
  },
  methods: {
    async getTopic() {
      this.load = true;
      await this.waitForLoad;
      this.topic = this.getTopicById(this.curId);
      this.load = false;
    }
  },
  async created() {
    this.getTopic();
  }
}
</script>

<style lang="scss">
</style>