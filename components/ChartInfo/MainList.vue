<template>
  <div class="list">
    <div class="item">
      <b>spd</b> - скорость атак, передач, перехода от обороны к нападению, движения игроков.
    </div>
    <div class="item">
      <b>att</b> - атака - умение переиграть защитников и вратаря противников.
    </div>
    <div class="item">
      <b>tac</b> - тактика - способность реализации и отработки схем, приёмов, командных взаимодействий.
    </div>
    <div class="item">
      <b>pas</b> - игра в пас - уровень исполнения навесов, прострелов, передач.
    </div>
    <div class="item">
      <b>tec</b> - техника - уровень владения игровыми приёмами: бегом, ведением мяча, ударами, финтами.
    </div>
    <div class="item">
      <b>rct</b> - реакция - умеине и скорость игроков адаптироваться к изменению обстановки.
    </div>
    <div class="item">
      <b>def</b> - защита - умение защитить ворота, отвести от них противника, перехватить контроль над мячом.
    </div>
    <div class="item">
      <b>defTec</b> - техники в защите - умение исполнения перехватов мяча, подкатов в мяч, играть без фолов.
    </div>
    <div class="item">
      <b>phy</b> - физическая выносливость игроков.
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainList'
}
</script>

<style scoped>
.list {
  line-height: 1.3;
}
.item {
  margin-bottom: 4px;
}
</style>
