<template>
  <div class="analysis">
    <h1 v-show="false">Expbet - инструмент для разбора</h1>
    <div class="team">
      <client-only>
        <div class="team__name">
          Лига: {{ teamSelectedLeague(1)?.name }}
        </div>
        <SearchInput
          :list="leagues?.map(l => { return {name: l.name, value: l}})"
          :value="teamSelectedLeague(1)"
          @input="handleSelectLeague(1, $event)"
          placeholder="Выбор лиги"
        />
        <a :href="teamSelectedTeam(1)?.tLink" target="_blank" class="team__name">
          Команда: {{ teamSelectedTeam(1)?.name }}
        </a>
        <SearchInput
          :list="teamTeams(1)?.map(l => { return {name: l.name, value: l}})"
          :value="teamSelectedTeam(1)"
          @input="handleSelectTeam(1, $event)"
          placeholder="Выбор команды"
        />
        <PlayerSelector
          v-if="isSubscriptionActive"
          :all-players="teamPlayers(1)"
          :selected-players="teamSelectedPlayers(1)"
          @select="setTeamSelectedPlayers({team: 1, players: $event})"
        />
      </client-only>
    </div>
    <div class="comparison">
      <div class="common-info">
        <div class="subscription-info" v-if="! isSubscriptionActive">
          Вы используете ограниченную версию. <br>
          Получить полную можно в разделе
          <nuxt-link to="/subscription">Подписка</nuxt-link>
        </div>
        <div class="comparison__name comparison__name--left" v-if="teamSelectedTeam(1) && teamSelectedLeague(1)">
          <span class="main-color">
            {{ teamSelectedLeague(1).name }} <br> {{ teamSelectedTeam(1).name }}
          </span>
          <span class="comparison__percentage" v-if="isSubscriptionActive">
            {{ coefficients.team1Coefficient }}%
          </span>
        </div>
        <div class="comparison__name comparison__name--left" v-else>
          <span class="main-color">
            Выберите команду
          </span>
        </div>
        <div class="creativity">
          <div class="chart__title" v-if="isSubscriptionActive">
            Рейтинг (Р)
            <br>
            <span class="main-color">{{ getOverallRating(teamSelectedPlayers(1)) }}</span> -
            <span class="second-color">{{ getOverallRating(teamSelectedPlayers(2)) }}</span>
          </div>
          <div class="chart__title">
            Креативность (К)
            <Tooltip>
              Умение нестандартно действовать, исполнять хитрые передачи, неожиданные удары, трудночитаемые противником.
            </Tooltip>
            <br>
            <span class="main-color">{{ getCreativity(teamSelectedPlayers(1)) }}</span> -
            <span class="second-color">{{ getCreativity(teamSelectedPlayers(2)) }}</span>
          </div>
        </div>
        <div class="comparison__name" v-if="teamSelectedTeam(2) && teamSelectedLeague(2)">
          <span class="second-color">
            {{ teamSelectedLeague(2).name }} <br> {{ teamSelectedTeam(2).name }}
          </span>
          <span class="comparison__percentage" v-if="isSubscriptionActive">
            {{ coefficients.team2Coefficient }}%
          </span>
        </div>
        <div class="comparison__name" v-else>
          <span class="second-color">
            Выберите команду
          </span>
        </div>
      </div>
      <div class="charts">
        <div class="chart-wrapper" v-if="isSubscriptionActive">
          <div class="chart chart--ad-left">
            <div class="chart__tooltip">
              <Tooltip>
                <ChartInfoAttackDefensList/>
              </Tooltip>
            </div>
            <h2 class="chart__title">
              <span class="main-color">Атака <SvgSwordIcon width="18px" height="18px"/></span> -
              <span class="second-color">Защита <SvgShieldIcon width="18px" height="18px"/></span>
            </h2>
            <RadarChart
              :labels="['spd', 'att - def', 'tac', 'pas', 'tec', 'rct', 'phy']"
              :set1="Object.values(getAvgAttackParams(teamSelectedPlayersWithoutGoalkeepers(1)))"
              :set2="Object.values(getAvgDefendParams(teamSelectedPlayersWithoutGoalkeepers(2)))"
              :set1title="teamSelectedTeam(1)?.name"
              :set2title="teamSelectedTeam(2)?.name"
              :width="250"
              :height="250"
            />
          </div>
        </div>
        <div class="chart chart--main" v-if="isSubscriptionActive">
          <div class="chart__tooltip">
            <Tooltip>
              <ChartInfoMainList/>
            </Tooltip>
          </div>
          <h2 class="chart__title">
            Общее сравнение
          </h2>
          <RadarChart
            :labels="mainParams"
            :set1="Object.values(getAvgMainParams(teamSelectedPlayersWithoutGoalkeepers(1)))"
            :set2="Object.values(getAvgMainParams(teamSelectedPlayersWithoutGoalkeepers(2)))"
            :set1title="teamSelectedTeam(1)?.name"
            :set2title="teamSelectedTeam(2)?.name"
            :width="300"
            :height="300"
          />
        </div>
        <div class="chart-wrapper" v-if="isSubscriptionActive">
          <div class="chart chart--ad-right">
            <div class="chart__tooltip">
              <Tooltip>
                <ChartInfoAttackDefensList/>
              </Tooltip>
            </div>
            <h2 class="chart__title">
              <span class="second-color">Атака <SvgSwordIcon width="18px" height="18px"/></span> -
              <span class="main-color">Защита <SvgShieldIcon width="18px" height="18px"/></span>
            </h2>
            <RadarChart
              :labels="['spd', 'att - def', 'tac', 'pas', 'tec', 'rct', 'phy']"
              :set2="Object.values(getAvgAttackParams(teamSelectedPlayersWithoutGoalkeepers(2)))"
              :set1="Object.values(getAvgDefendParams(teamSelectedPlayersWithoutGoalkeepers(1)))"
              :set2title="teamSelectedTeam(1)?.name"
              :set1title="teamSelectedTeam(2)?.name"
              :width="250"
              :height="250"
            />
          </div>
        </div>
        <div class="chart chart--att">
          <div class="chart__tooltip">
            <Tooltip>
              <ChartInfoMainList/>
            </Tooltip>
          </div>
          <h2 class="chart__title">
            Нападение <br>
            <span class="" v-if="isSubscriptionActive">
              Р:
              <span class="main-color">{{ getOverallRating(teamForwards(1)) }}</span> -
              <span class="second-color">{{ getOverallRating(teamForwards(2)) }}</span>
            </span>
            <span class="">
              К:
              <span class="main-color">{{ getCreativity(teamForwards(1)) }}</span> -
              <span class="second-color">{{ getCreativity(teamForwards(2)) }}</span>
            </span>
          </h2>
          <RadarChart
            :labels="mainParams"
            :set1="Object.values(getAvgMainParams(teamForwards(1)))"
            :set2="Object.values(getAvgMainParams(teamForwards(2)))"
            :set1title="teamSelectedTeam(1)?.name"
            :set2title="teamSelectedTeam(2)?.name"
            :width="250"
            :height="250"
          />
        </div>
        <div class="chart chart--mid">
          <div class="chart__tooltip">
            <Tooltip>
              <ChartInfoMainList/>
            </Tooltip>
          </div>
          <h2 class="chart__title">
            Полузащита <br>
            <span class="" v-if="isSubscriptionActive">
              Р:
              <span class="main-color">{{ getOverallRating(teamMidfielders(1)) }}</span> -
              <span class="second-color">{{ getOverallRating(teamMidfielders(2)) }}</span>
            </span>
            <span class="">
              К:
              <span class="main-color">{{ getCreativity(teamMidfielders(1)) }}</span> -
              <span class="second-color">{{ getCreativity(teamMidfielders(2)) }}</span>
            </span>
          </h2>
          <RadarChart
            :labels="mainParams"
            :set1="Object.values(getAvgMainParams(teamMidfielders(1)))"
            :set2="Object.values(getAvgMainParams(teamMidfielders(2)))"
            :set1title="teamSelectedTeam(1)?.name"
            :set2title="teamSelectedTeam(2)?.name"
            :width="250"
            :height="250"
          />
        </div>
        <div class="chart chart--def">
          <div class="chart__tooltip">
            <Tooltip>
              <ChartInfoMainList/>
            </Tooltip>
          </div>
          <h2 class="chart__title">
            Защита <br>
            <span class="" v-if="isSubscriptionActive">
              Р:
              <span class="main-color">{{ getOverallRating(teamDefenders(1)) }}</span> -
              <span class="second-color">{{ getOverallRating(teamDefenders(2)) }}</span>
            </span>
            <span class="">
              К:
              <span class="main-color">{{ getCreativity(teamDefenders(1)) }}</span> -
              <span class="second-color">{{ getCreativity(teamDefenders(2)) }}</span>
            </span>
          </h2>
          <RadarChart
            :labels="mainParams"
            :set1="Object.values(getAvgMainParams(teamDefenders(1)))"
            :set2="Object.values(getAvgMainParams(teamDefenders(2)))"
            :set1title="teamSelectedTeam(1)?.name"
            :set2title="teamSelectedTeam(2)?.name"
            :width="250"
            :height="250"
          />
        </div>
      </div>
    </div>
    <div class="team">
      <client-only>
        <client-only>
          <div class="team__name">
            Лига: {{ teamSelectedLeague(2)?.name }}
          </div>
          <SearchInput
            :list="leagues?.map(l => { return {name: l.name, value: l}})"
            :value="teamSelectedLeague(2)"
            @input="handleSelectLeague(2, $event)"
            placeholder="Выбор лиги"
          />
          <a :href="teamSelectedTeam(2)?.tLink" target="_blank" class="team__name">
            Команда: {{ teamSelectedTeam(2)?.name }}
          </a>
          <SearchInput
            :list="teamTeams(2)?.map(l => { return {name: l.name, value: l}})"
            :value="teamSelectedTeam(2)"
            @input="handleSelectTeam(2, $event)"
            placeholder="Выбор команды"
          />
          <PlayerSelector
            v-if="isSubscriptionActive"
            :all-players="teamPlayers(2)"
            :selected-players="teamSelectedPlayers(2)"
            @select="setTeamSelectedPlayers({team: 2, players: $event})"
          />
        </client-only>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {League} from '~/types/League'
import {Team} from '~/types/Team'
import {getPlayersParamsMixin} from '~/mixins/getPlayersParams'
import {Player} from '~/types/Player'

export default {
  name: 'AnalysisPage',
  mixins: [getPlayersParamsMixin],
  // @ts-ignore
  async asyncData({$axios}) {
    const leaguesIds = await $axios.$get('/api/leagues-ids')
    return {leaguesIds}
  },
  head() {
    return {
      title: `Expbet - ТТД разбор матчей по составам команд`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Инструмент для графического разбора матчей на основе тактико-технчических показателей команд. Разбор футбольных матчей по составам команд'
        },
        {
          name: 'keywords',
          content: 'футбол разбор, разборы матчей футбол, футбол разбор по составу, анализ футбола, футбол прогноз на анализе, футбол команды по лигам'
        }
      ],
    }
  },
  data() {
    return {
      mainParams: ['spd', 'att', 'tac', 'pas', 'tec', 'rct', 'def', 'defTec', 'phy'],
      refreshPlayers: false,
    }
  },
  computed: {
    ...mapGetters({
      isSubscriptionActive: 'user/isSubscriptionActive',
      leagues: 'analysis/leagues',
      teamSelectedLeague: 'analysis/teamSelectedLeague',
      teamTeams: 'analysis/teamTeams',
      teamSelectedTeam: 'analysis/teamSelectedTeam',
      teamPlayers: 'analysis/teamPlayers',
      teamSelectedPlayers: 'analysis/teamSelectedPlayers',
      teamSelectedPlayersWithoutGoalkeepers: 'analysis/teamSelectedPlayersWithoutGoalkeepers',
      teamForwards: 'analysis/teamForwards',
      teamMidfielders: 'analysis/teamMidfielders',
      teamDefenders: 'analysis/teamDefenders',
    }),
    coefficients(): { team1Coefficient: number, team2Coefficient: number } {
      // @ts-ignore
      return this.getCoefficients(this.teamSelectedPlayers(1), this.teamSelectedPlayers(2))
    },
  },
  methods: {
    ...mapMutations({
      setTeamSelectedLeague: 'analysis/setTeamSelectedLeague',
      setTeamSelectedTeam: 'analysis/setTeamSelectedTeam',
      setTeamSelectedPlayers: 'analysis/setTeamSelectedPlayers',
    }),
    ...mapActions({
      fetchLeagues: 'analysis/fetchLeagues',
      fetchTeams: 'analysis/fetchTeams',
      fetchPlayers: 'analysis/fetchPlayers'
    }),
    handleSelectLeague(team: Team, league: League) {
      this.setTeamSelectedLeague({team, league})
      this.fetchTeams({team, leagueId: league._id})
    },
    handleSelectTeam(team: Team, teamId: Team) { //TODO: Change teamId name
      this.setTeamSelectedTeam({team, teamId})
      this.fetchPlayers({team, teamId: teamId._id})
    },
    getSetsRatio(set1: Array<number>, set2: Array<number>): [number, number] {
      if (set1.length !== set2.length) throw Error('Different sets length')
      let result = [0, 0]
      let set1points = 0
      let set2points = 0
      for (let i = 0; i < set1.length; i++) {
        result[0] += set1[i] / (set1[i] + set2[i])
        result[1] += set2[i] / (set1[i] + set2[i])
        if (set1[i] >= set2[i]) set1points++
        if (set2[i] >= set1[i]) set2points++
      }
      return [
        (Math.trunc((result[0] / set1.length) * 100) + ((set1points / set1.length) * 100)) / 2,
        (Math.trunc((result[1] / set2.length) * 100) + ((set2points / set2.length) * 100)) / 2
      ]
    },
    getCoefficients(team1Players: Player[], team2Players: Player[]): { team1Coefficient: number, team2Coefficient: number } {
      const ratios: Array<[number, number]> = [
        // @ts-ignore
        this.getSetsRatio(Object.values(this.getAvgMainParams(this.teamSelectedPlayersWithoutGoalkeepers(1))), Object.values(this.getAvgMainParams(this.teamSelectedPlayersWithoutGoalkeepers(2)))),
        // // @ts-ignore
        // this.getSetsRatio(Object.values(this.getAvgAttackParams(this.teamSelectedPlayersWithoutGoalkeepers(1))), Object.values(this.getAvgDefendParams(this.teamSelectedPlayersWithoutGoalkeepers(2)))),
        // // @ts-ignore
        // this.getSetsRatio(Object.values(this.getAvgDefendParams(this.teamSelectedPlayersWithoutGoalkeepers(1))), Object.values(this.getAvgAttackParams(this.teamSelectedPlayersWithoutGoalkeepers(2)))),
        // // @ts-ignore
        // this.getSetsRatio(Object.values(this.getAvgMainParams(this.teamForwards(1))), Object.values(this.getAvgMainParams(this.teamForwards(2)))),
        // // @ts-ignore
        // this.getSetsRatio(Object.values(this.getAvgMainParams(this.teamMidfielders(1))), Object.values(this.getAvgMainParams(this.teamMidfielders(2)))),
        // // @ts-ignore
        // this.getSetsRatio(Object.values(this.getAvgMainParams(this.teamDefenders(1))), Object.values(this.getAvgMainParams(this.teamDefenders(2)))),
        // @ts-ignore
        this.getSetsRatio([this.getCreativity(team1Players)], [this.getCreativity(team2Players)])
      ]
      // @ts-ignore
      const team1Creativity = this.getCreativity(team1Players)
      // @ts-ignore
      const team2Creativity = this.getCreativity(team2Players)
      if (team1Creativity > 15 && team2Creativity > 15) {
        // @ts-ignore
        // ratios.push(this.getSetsRatio([team1Creativity], [team2Creativity]))
      }
      return {
        team1Coefficient: +(ratios.reduce((acc, i) => {
          return acc + i[0]
        }, 0) / ratios.length).toFixed(1) || 0,
        team2Coefficient: +(ratios.reduce((acc, i) => {
          return acc + i[1]
        }, 0) / ratios.length).toFixed(1) || 0,
      }
    },
  },
  async beforeMount() {
    //@ts-ignore
    await this.fetchLeagues()
  }
}
</script>

<style lang="scss" scoped>
.analysis {
  padding: 20px 20px;
  display: grid;
  grid-template-columns: 260px 1fr 260px;
  grid-gap: 10px;
  @media (max-width: 1399px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}

.team {
  &__name {
    display: block;
    font-size: 14px;
    padding: 4px 0;
  }
}

.comparison {
  &__name {
    display: grid;

    &--left {
      text-align: right;
    }
  }

  &__percentage {
    font-weight: 700;
    font-size: 18px;
    padding-top: 20px;
  }

  @media (max-width: 1399px) {
    grid-area: 2/1/3/3;
  }
  @media (max-width: 767px) {
    grid-area: 3/1/4/2;
  }
}

.charts {
  display: grid;
  align-items: end;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  align-content: flex-start;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
}

.common-info {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  margin-bottom: 30px;
  @media (max-width: 1023px) {
    grid-template-columns: 2fr 1fr 2fr;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
}

.subscription-info {
  grid-area: 1/1/2/4;
  text-align: center;
  border: 1px solid $color-second;
  color: $color-second;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;

  a {
    color: $color-main;
  }
}

.radar-chart {
  max-width: 400px;
}

.chart-coefficients {
  text-align: center;
  margin-bottom: 10px;
}

.chart {
  border: 1px solid $color-gray;
  border-radius: 10px;
  padding: 10px 4px;
  position: relative;

  &__title {
    text-align: center;
    margin-bottom: 10px;
  }

  &__tooltip {
    position: absolute;
    top: 4px;
    right: 4px;
  }

  @media (max-width: 1023px) {
    &--ad-left {
      grid-area: 2/1/3/4;
    }
    &--main {
      grid-area: 1/1/2/7;
    }
    &--ad-right {
      grid-area: 2/4/3/7;
    }
    &--att {
      grid-area: 3/1/4/3;
    }
    &--mid {
      grid-area: 3/3/4/5;
    }
    &--def {
      grid-area: 3/5/4/7;
    }
  }
  @media (max-width: 767px) {
    &--ad-left {
      grid-area: 2/1/3/2;
    }
    &--main {
      grid-area: 1/1/2/2;
    }
    &--ad-right {
      grid-area: 3/1/4/2;
    }
    &--att {
      grid-area: 4/1/5/2;
    }
    &--mid {
      grid-area: 5/1/6/2;
    }
    &--def {
      grid-area: 6/1/7/2;
    }
  }
}

.creativity {
  @media (max-width: 767px) {
    grid-area: 3/1/4/2;
  }
}

.bar-chart {
  border-bottom: 1px solid $color-gray;
}

.main-color {
  color: $color-main;

  path {
    fill: $color-main;
  }
}

.second-color {
  color: $color-second;

  path {
    fill: $color-second;
  }
}

</style>
