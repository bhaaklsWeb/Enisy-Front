<template>
    <div class="footer">
      <div class="footer-container">
        <div class="footer-container__post">
          <p>
            <a href="">Latest Posts</a>
          </p>
          <p><a href="">Popular Posts</a>
          </p>
        </div>
        <div class="footer-container__post">
          <p><a href="">Search</a></p>
          <p><a href="">Contact information</a></p>
        </div>
  
        <div class="footer-container__post" style="font-family: 'GlowBloom'; font-weight: bold; text-transform:uppercase; font-size: 30px; text-align: center; align-self: center;">
          <p>enisy.ru</p>
        </div>
  
        <div class="footer-container__post">
  
          <p><a href="">Privacy Policy</a></p>
          <p><a href="">Terms of Use</a></p>
        </div>
        <div class="footer-container__post">
          <span>
            <a href=""><fa-icon icon="fa-brands fa-instagram" class="fa-lg"/></a>
            <a href=""><fa-icon icon="fa-brands fa-facebook" class="fa-lg"/></a>
            <a href=""><fa-icon icon="fa-brands fa-twitter" class="fa-lg"/></a>
          </span>
        </div>
      </div>
      <div class="footer-copyright">
        <p>© Copyright 2019. All rights reserved.</p>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    computed: {

    }
}
</script>

<style lang="scss">
@import "@/scss/footer.scss";
</style>