<template>
  <header class="header">
    <nuxt-link to="/" class="logo">
      <span>Exp</span>bet
    </nuxt-link>
    <div
      class="menu"
      :class="{'menu--opened': isMenuOpened}"
    >
      <div class="menu__list">
        <nuxt-link to="/" class="menu__item">
          Главная
        </nuxt-link>
        <nuxt-link to="/analysis" class="menu__item">
          ТТД разбор
        </nuxt-link>
        <nuxt-link to="/subscription" class="menu__item">
          Подписка
        </nuxt-link>
        <nuxt-link to="/contacts" class="menu__item">
          Контакты
        </nuxt-link>
        <nuxt-link v-if="$store.getters['user/isAdmin']" to="/admin" class="menu__item">
          Админ
        </nuxt-link>
        <nuxt-link v-if="$store.getters['user/isModerator']" to="/moderator" class="menu__item">
          Модерирование
        </nuxt-link>
      </div>
      <div class="login" v-if="!$store.getters['user/isLoggedIn']">
        <nuxt-link to="/login" class="login-button button button--secondary">Вход</nuxt-link>
        <nuxt-link to="/registration" class="registration-button button button--primary">Регистрация</nuxt-link>
      </div>
      <div class="login" v-else>
        <nuxt-link to="/user" class="button button--primary">{{ $store.getters['user/user'].name }}</nuxt-link>
        <div class="button button--secondary" @click="logout">Выйти</div>
      </div>

    </div>
    <div
      class="burger"
      :class="{'burger--opened': isMenuOpened}"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isMenuOpened: false,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    },
    checkResize() {
      const clientWidth = document.documentElement.clientWidth
      if (clientWidth >= 1024) {
        this.isMenuOpened = false
      }
    },
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.checkResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkResize)
  },
  watch: {
    isMenuOpened() {
      document.body.style.overflow = this.isMenuOpened ? 'hidden' : 'auto'
    },
    $route() {
      this.isMenuOpened = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 40px;
  border-bottom: 1px solid $color-gray;
  @media (max-width: 1023px) {
    padding: 0 20px;
  }
}

.logo {
  font-size: 28px;
  font-weight: 700;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  white-space: nowrap;

  span {
    display: inline-block;
    padding: 5px 3px;
    color: $color-white;
    background: $color-main;
    border-radius: 4px;
    margin: 0 2px;
  }

  img {
    width: 180px;
  }
}

.menu {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 30px;
  background: $color-white;

  &__list {
    display: flex;
    align-items: center;
    gap: 20px;
    @media (max-width: 1023px) {
      grid-area: 2/1/3/2;
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &__item {
    cursor: pointer;
    border-bottom: 2px solid transparent;
    line-height: 0.9;

    &:hover {
      border-bottom: 2px solid $color-main;
    }
  }

  @media (max-width: 1023px) {
    position: absolute;
    top: 0;
    left: -100%;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    grid-auto-flow: row;
    padding: 60px 20px;
    align-content: flex-start;
    justify-content: flex-end;
    overflow: auto;
    &--opened {
      left: 0;
    }
  }
}

.lang {
  @media (max-width: 1023px) {
    display: flex;
    justify-content: flex-end;
  }
}

.login {
  display: flex;
  gap: 10px;
  @media (max-width: 1023px) {
    grid-area: 1/1/2/2;
  }
}

.burger {
  width: 30px;
  height: 26px;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  z-index: 4;
  background: $color-white;

  span {
    width: 100%;
    height: 2px;
    background: $color-black;
  }

  @media (max-width: 1023px) {
    display: flex;
  }

  &--opened {
    justify-content: center;

    span:nth-child(1) {
      transform: translate(0, +100%) rotate(45deg);
    }

    span:nth-child(2) {
      width: 0;
    }

    span:nth-child(3) {
      transform: translate(0, -100%) rotate(-45deg);
    }
  }

}
</style>
