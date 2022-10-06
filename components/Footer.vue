<template>
<footer class="footer">
  <a target="_blank" href="/expbet-privacy-policy.pdf" class="footer__part">
    Политика конфеденциальности
  </a>
  <a target="_blank" href="/expbet-terms-of-use.pdf" class="footer__part">
    Пользовательское соглашение
  </a>
  <a target="_blank" href="/expbet-contract-offer.pdf" class="footer__part">
    Публичная оферта
  </a>
  <div class="footer__part">
    © 2022 ExpBet
  </div>
</footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
.footer {
  display: grid;
  place-items: center;
  font-size: 14px;
  padding: 10px 20px;
  border-top: 1px solid $color-gray;
  grid-auto-flow: column;
  justify-content: center;
  grid-gap: 20px;
  @media (max-width: 767px) {
    grid-auto-flow: row;
    grid-gap: 10px;
  }
}
</style>
