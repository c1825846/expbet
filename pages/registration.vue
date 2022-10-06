<template lang="pug">
  .registration
    .title.main-title Регистрация
    .registration-form
      label.label Имя пользователя
      input.input.registration__input(v-model.trim="registrationData.name" @keyup.enter="registration")
      label.label E-mail
      input.input.registration__input(type="email" v-model.trim="registrationData.email" @keyup.enter="registration")
      label.label Пароль (больше 8 символов)
      input.input.registration__input(type="password" v-model.trim="registrationData.password" @keyup.enter="registration")
      .buttons
        button.button(@click="registration") Зарегистрироваться
</template>

<script>
export default {
  name: "registration",
  data() {
    return {
      registrationData: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async registration() {
      console.log(this.$route.query)
      await this.$store.dispatch('user/registration', {
        registrationData: this.registrationData,
        ref: this.$route.query.ref
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  &__input {
    margin-bottom: 10px;
    font-size: 18px;
  }
}

.registration-form {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
