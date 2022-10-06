<template lang="pug">
  .login
    .title.main-title Вход на сайт
    .login-form
      label.label E-mail
      input.input.login__input(type="email" v-model.trim="loginData.email" @keyup.enter="login")
      label.label Пароль
      input.input.login__input(type="password" v-model.trim="loginData.password" @keyup.enter="login")
      .buttons
        button.button(@click="login") Войти
        button.button.button--ghost(v-if="!isForgetPasswordInfoShow" @click="showForgetPasswordInfo") Забыли пароль?
      div(v-if="isForgetPasswordInfoShow") Для восстановления пароля напишите на почту
        a(href="mailto:expbetsoft@gmail.com") expbetsoft@gmail.com
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
      isForgetPasswordInfoShow: false,
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', this.loginData)
    },
    showForgetPasswordInfo() {
      this.isForgetPasswordInfoShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  &__input {
    margin-bottom: 10px;
    font-size: 18px;
  }
}

.login-form {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.buttons {
  display: flex;
  gap: 10px;
}
</style>
