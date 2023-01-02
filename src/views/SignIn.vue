<template>
  <div class="content-block__auth">
    <div class="container">
      <h2>Вход</h2>
      <transition enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut" appear appear-active-class="icon-appear">
        <div v-if="authData.errorText != ''" style="background-color: #fff3cd; padding: 10px; margin: 20px 0;">
          <p style="color: red; font-size: 14px;">{{ authData.errorText }}</p>
        </div>
      </transition>
      <form v-if="!formDone" @submit.prevent="tryLoginWithTimers(3500)">
        <ul class="flex-outer">
          <li v-for="field, i in info" :key="i">
            <app-field-input :type="field.type" :id="field.id" :placeholder="field.placeholder" :label="field.label"
              :value="field.value" :valid="field.valid" :disable="field.disable" @updated="onUpdate(i, $event)" />
          </li>
          <li>
            <button type="submit" :disabled="!formReady">Войти</button>
          </li>
        </ul>
      </form>
      
      <template v-else>
        <h3>Вы зашли под ником '{{ info[0].value }}' ... 
          <fa-icon icon="fas fa-spinner" class="fa-pulse"/>
        </h3>
      </template>        
    </div>
  </div>
</template>

<script>

import AppFieldInput from '@/components/FieldInput.vue'
import { mapActions } from 'vuex';
import 'animate.css';

export default {
  components: { AppFieldInput },
  data() {
    return {
      info: [
        {
          type: 'text',
          label: 'Логин',
          value: '',
          id: 'username',
          placeholder: 'Enter username',
          pattern: /^[A-Za-z][A-Za-z0-9_]{4,29}$/
        },
        {
          type: 'password',
          label: 'Пароль',
          value: '',
          id: 'password',
          placeholder: 'Enter your password',
          // eslint-disable-next-line
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
        },
        {
          type: 'password',
          label: 'Подтверждение пароля',
          value: '',
          id: 'cnfpassword',
          placeholder: 'Confirm your password',
        },
      ],
      formDone: false,

      authData: {
        login: '',
        password: '',
        errorText: ''
        // Baiysh_10
        // Baiysh#10
      }
    }
  },
  computed: {
    fieldDone() {
      // return this.info.reduce((total, field) => total + (field.valid ? 1 : 0), 0)
      return this.info.filter(field => field.valid).length;
    },
    formReady() {
      // eslint-disable-next-line
      this.info[2].disable = !this.info[1].valid;
      return this.fieldDone >= this.info.length;
    },
  },
  methods: {
    ...mapActions('user', ['login']),

    onUpdate(i, val) {
      let field = this.info[i];
      field.value = val.trim();
      if (field.id === 'username') this.authData.login = field.value;
      if (field.id === 'password') this.authData.password = field.value;
      if (field.id === 'password' || field.id === 'cnfpassword') {
        let psField = this.info[1];
        let cnfPsField = this.info[2];
        if (psField.valid && psField.value === cnfPsField.value) {
          cnfPsField.valid = true;
        } else if (!psField.valid || psField.value !== cnfPsField.value) {
          cnfPsField.valid = false;
        }
      }
      if (field.id === 'username' || field.id === 'password') {
        field.valid = field.pattern.test(field.value);
        // field.name = field.id;
      }
    },

    async tryLogin() {
      let login = await this.login({
        username: this.authData.login,
        password: this.authData.password
      });
      // console.log('TRY_LOGIN', login);
      if (login.res) {
        this.authData.login = '';
        this.authData.password = '';
        this.authData.errorText = '';
      }
      else {
        this.authData.errorText = login.errors.join(',');
      }
      this.formDone = login.res;
    },

    async tryLoginWithTimers(timeout) {
      await this.tryLogin();
      if (this.formDone) {
        await new Promise(resolve => setTimeout(resolve, timeout));
        setTimeout(() => {
          location.reload();
        }, 400);
        this.$router.push({ name: 'profile-route' });
      } else {
        await new Promise(resolve => setTimeout(resolve, 3000));
        this.authData.errorText = '';
      }
    },
  },

  async created() {
    this.info.forEach(field => {
      field.valid = false;
      field.disable = false;
    });
  }
}
</script>

<style lang="scss">
@import "@/scss/form.scss";

.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 0.4s;
}

.icon-appear {
  animation: fadeAppear 0.4s;
}

@keyframes fadeAppear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>