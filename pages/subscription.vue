<template>
  <div class="plans">
    <div class="title main-title">
      Подписка
    </div>
    <div class="hero">
      Доступ к полному функционалу сайта доступен по подписке. <br>
      Стоимость подписки на <b>месяц</b> составляет <b>3000</b> рублей,<br>
      Стоимость подписки на <b>два дня</b> составляет <b>300</b> рублей.<br>
      Оформить можно в личном кабинете после регистрации и авторизации на сайте.
    </div>
    <div class="table">
      <div class="row row--title">
        <div class="cell"></div>
        <div class="cell cell--option">Подписка</div>
        <div class="cell cell--option">Бесплатно</div>
      </div>
      <div class="row" v-for="option in options">
        <div class="cell">{{ option.name }}</div>
        <div class="cell cell--option">{{ option.subscription ? '+' : '' }}</div>
        <div class="cell cell--option">{{ option.free ? '+' : '' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "plans",
  data() {
    return {
      options: [
        {name: 'Графики сравнения команд по трём линиям', free: true, subscription: true},
        {name: 'Сравнение креативности команд', free: true, subscription: true},
        {name: 'Сравнение суммарных показателей команды', free: false, subscription: true},
        {name: 'Сравнение атаки одной команды против защиты другой', free: false, subscription: true},
        {name: 'Конфигурирование состава команды', free: false, subscription: true},
        {name: 'Актуальный состав команды', free: false, subscription: true},
        {name: 'Сравнение индивидуальных характеристик игроков', free: false, subscription: true},
        {name: 'Проценты на победу команды', free: false, subscription: true},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.plans {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px;
}

.hero {
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
  padding: 10px 0 30px;

  p {
    margin-bottom: 10px;
  }
  b {
    font-weight: 400;
    font-size: 20px;
    color: $color-main;
  }
}
.row{
  display: grid;
  grid-template-columns: 1fr 80px 80px;
  grid-gap: 10px;
  border-bottom: 1px solid $color-gray;
  padding: 10px 0;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 100px 100px;
  }
}

.cell {
  &--option {
    place-self: center;
  }
}

</style>
