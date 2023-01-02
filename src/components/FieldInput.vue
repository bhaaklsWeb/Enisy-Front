<template>
  <label :for="id">
    {{ label }}
    <div class="ic-block" :class="fieldIsValidIcons === 'exclamation-circle' ? 'not-hover' : ''">
      <transition v-if="activated" enter-active-class="animate__animated animate__flipInY"
        leave-active-class="animate__animated animate__flipOutY" mode="out-in" appear appear-active-class="icon-appear">
        <fa-icon :key="valid" :class="fieldIsValidClasses" :icon="fieldIsValidIcons" style="margin-left: 5px" />
      </transition>
      <ul class="hoverable-block" v-if="!(valid && activated)">
        <li><span class="circle-excamation"></span> <span>icon</span></li>
        <li><span class="circle-excamation"></span> <span>icon</span> </li>
        <li><span class="circle-excamation"></span> <span>icon</span> </li>
      </ul>
    </div>
  </label>
  <input :type="type" :id="id" :placeholder="placeholder" :value="value" @input="onInput"
    :class="{ 'input_focused': !valid && activated }" :disabled="disable">
</template>

<script>
import 'animate.css';

export default {
  props: {
    label: { type: String, required: true },
    type: { type: String, required: true },
    id: { tupe: String, required: true },
    // name: { tupe: String, required: true },
    placeholder: { type: String, required: true },
    value: { type: String, required: false },
    valid: { type: Boolean, required: false },
    disable: { type: Boolean, required: false },
  },

  emits: ['updated'],

  data() {
    return {
      activated: this.value != ''
    };
  },

  computed: {
    fieldIsValidClasses() {
      return this.valid && this.activated ? 'text-success' : 'text-danger hoverable_icon';
    },
    fieldIsValidIcons() {
      return this.valid && this.activated ? 'check-circle' : 'exclamation-circle'
    },
  },

  methods: {
    onInput(e) {
      this.activated = true;
      this.$emit('updated', e.target.value);
    }
  },
}

</script>

<style lang="scss" scoped>

//vars
$global-bg-color: #f8f9fa;

.lala {
  border: 1px solid sienna;
  padding: 10px;
}

//animation icon
.animate__animated.animate__flipInY,
.animate__animated.animate__flipOutY {
  --animate-duration: 0.4s;
}

.icon-appear {
  animation: fadeAppear 0.9s;
}

@keyframes fadeAppear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.text-success {
  color: green;
}

.text-danger {
  color: red;
}

//icon-hover
.ic-block {
  display: inline-block;
  position: relative;
  &[class="not-hover"]:hover {
    cursor: pointer;
  }
  &:hover>.hoverable-block {
    visibility: visible;
    color: #000;
  }

  .hoverable-block {
    position: absolute;
    top: 15px;
    left: 25px;
    z-index: 1;
    list-style: none;
    visibility: hidden;
    background-color: #fff3cd;
    padding: 10px 17px 10px 5px;
    border-radius: 5px;
    box-shadow: 0px 0px 4px #12000d58;
    font-size: 12px;

    &>li {
      padding-left: 1.3em;
      &:not(:last-child) {
        margin-bottom: 5px;
      }

      .circle-excamation {
        &::before {
        display: inline-block;
        content: url(@/assets/img/icons/circle-exclamation-solid.svg);
        font-size: 10px;
        margin-left: -1.3em;
        width: 1.3em;
      }
        & + span {
          margin-left: 5px
        }
      }
    }
  }
}

//input
.input_focused {

  &:focus,
  :active,
  :hover {
    outline: none;
    outline-offset: 0;
  }

  border: 1px solid red !important;
  box-shadow: 0px 0px 2px #ff56d258 !important;
  &:focus, &:active {
    border: 1px solid red !important;
    box-shadow: 0px 0px 2px #ff56d258 !important;
  }
}
</style>