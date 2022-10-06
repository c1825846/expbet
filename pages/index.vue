<template>
  <div class="landing">
    <section class="hero">
      <div class="hero__container">
        <h1 class="hero__title">
          Expbet - инструмент для прогнозирования футбольных матчей на&nbsp;основе технико-тактических показателей
          команды
        </h1>
      </div>
    </section>
    <section class="definition">
      <h2>Технико-тактические действия в футболе</h2>
      это суммарный показатель того, что игроки выполняют на поле: передачи, единоборства, подборы, перехваты, удары и
      т. д.
    </section>
    <section class="video">
      <h2 class="video__title">
        Видеообзор инструмента
      </h2>
      <client-only>
        <iframe class="video__iframe" src="https://www.youtube.com/embed/xtJzXfWupVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </client-only>
    </section>
    <section class="analysis">
      <div class="analysis__container">
        <div class="analysis__text">
          Наш инструмент предоставляет агрегированную информацию по тактико-техническим показателям игроков в виде
          графиков. <br>
          Вы можете наглядно увидеть показатели, по которым одна команда превосходит другую.
        </div>
      </div>
    </section>
    <section class="numbers">
      <div class="numbers__title">
        Наша база содержит
      </div>
      <div class="numbers__items">
        <div class="numbers__item numbers-item">
          <div class="numbers-item__key">более</div>
          <div class="numbers-item__value">50</div>
          <div class="numbers-item__unit">лиг</div>
        </div>
        <div class="numbers__item numbers-item">
          <div class="numbers-item__key">более</div>
          <div class="numbers-item__value">900</div>
          <div class="numbers-item__unit">команд</div>
        </div>
        <div class="numbers__item numbers-item">
          <div class="numbers-item__key">более</div>
          <div class="numbers-item__value">25 000</div>
          <div class="numbers-item__unit">игроков</div>
        </div>
      </div>
    </section>
    <section class="actions">
      <nuxt-link to="/analysis" class="action">
        <div class="action__title">ТТД разбор</div>
        <div class="action__body">
          Оценить удобство графиков на примере линий защиты, полузащиты и нападения
        </div>
        <div class="action__button">
          Перейти
        </div>
      </nuxt-link>
      <nuxt-link to="/subscription" class="action">
        <div class="action__title">Подписка</div>
        <div class="action__body">
          Получить полный функционал:
          <ul>
            <li>
              сравнение атаки одной команды против защиты другой
            </li>
            <li>
              конфигурирование составов команд
            </li>
            <li>
              многое другое
            </li>
          </ul>
        </div>
        <div class="action__button">
          Перейти
        </div>
      </nuxt-link>
      <a href="https://t.me/+jeDZVgTDZD9mMTdi" class="action">
        <div class="action__title">Прогнозы</div>
        <div class="action__body">
          Посмотреть примеры разборов матчей в нашем телеграм канале
        </div>
        <div class="action__button">
          Перейти
        </div>
      </a>
    </section>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  head() {
    return {
      meta: [
        {
          name: 'keywords',
          content: 'Прогнозы футбол, прогнозы на футбол на сегодня, прогнозы на футбол от профессионалов, прогноз футбол на сегодня от профессионалов, бесплатный прогнозы на футбол, точные прогнозы на футбол, футбол разбор, разборы матчей футбол, футбол разбор по составу, анализ футбола, футбол прогноз на анализе'
        }
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.hero {
  background: url("~/assets/bg2.jpg") center right / cover no-repeat;
  padding: 10vh 0;

  &__container {
    display: grid;
    justify-content: flex-end;
    margin: 0 auto;
    max-width: 900px;
  }

  &__title {
    color: $color-white;
    font-size: 24px;
    max-width: 600px;
    text-align: right;
    padding: 20px;
    background: rgba(0, 0, 0, 0.6);
  }

  @media (min-width: 768px) {
    &__title {
      font-size: 38px;
    }
  }
}

.definition {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
  border-bottom: 1px solid $color-gray;

  h2 {
    font-weight: 400;
    font-size: 24px;
  }

  @media (min-width: 768px) {
    font-size: 24px;
    h2 {
      font-size: 32px;
    }
  }
}

.video{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  &__title{
    font-size: 24px;
    margin-bottom: 20px;
  }
  &__iframe {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 16/9;
  }
  @media (min-width: 768px) {
    &__title {
      font-size: 32px;
    }
  }
}

.analysis {
  background: url("~/assets/section2bg.jpg") center / cover no-repeat;
  padding: 10vh 0;

  &__container {
    display: grid;
    justify-content: flex-end;
    margin: 0 auto;
    max-width: 900px;
  }

  &__text {
    color: $color-white;
    font-size: 24px;
    max-width: 600px;
    text-align: right;
    padding: 20px;
    background: rgba(0, 0, 0, 0.6);
  }

  @media (min-width: 768px) {
    &__text {
      font-size: 38px;
    }
  }
}

.numbers {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  &__items {
    display: grid;
    width: 100%;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }

  @media (min-width: 768px) {
    &__items {
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}

.numbers-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__key {
    font-size: 20px;
  }

  &__value {
    font-size: 40px;
  }

  &__unit {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    &__key {
      font-size: 28px;
    }

    &__value {
      font-size: 60px;
    }

    &__unit {
      font-size: 28px;
    }
  }
}

.actions {
  border-top: 1px solid $color-gray;
  padding: 30px 20px;
  font-size: 18px;
  display: grid;

  justify-content: center;
  grid-gap: 20px;
  grid-auto-flow: row;

  @media (min-width: 768px) {
    font-size: 24px;
  }

  @media (min-width: 1024px) {
    grid-auto-flow: column;
  }
}

.action {
  border: 1px solid $color-main;
  max-width: 300px;
  padding: 30px 20px;
  text-align: center;
  border-radius: 3px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 16px;
  align-items: flex-start;

  &__title {
    font-size: 20px;
    color: #1920c2;
  }

  ul, li {
    font-weight: 300;
    font-size: 16px;
  }

  li {
    margin-top: 20px;
  }

  &__button {
    text-decoration: underline;
    font-size: 16px;
  }

  &:hover {
    box-shadow: 0 0 7px 0 rgba(25, 32, 194, 0.5);
  }

  @media (min-width: 768px) {
    &__title {
      font-size: 30px;
      color: #1920c2;
    }

    ul, li {
      font-weight: 300;
      font-size: 20px;
    }

    li {
      margin-top: 20px;
    }

    &__button {
      text-decoration: underline;
    }
  }
}
</style>
