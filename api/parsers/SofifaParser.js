const needle = require('needle')
const cheerio = require('cheerio')

class SofifaParser {
  _parseDate(meta) {
    const dateObject = meta.match(/.* \((?<day>\d*) (?<month>.*) (?<year>\d{4}) г\.\) .*/).groups
    const months = {
      'янв.': 1,
      'февр.': 2,
      'мар.': 3,
      'апр.': 4,
      'мая': 5,
      'июн.': 6,
      'июл.': 7,
      'авг.': 8,
      'сент.': 9,
      'окт.': 10,
      'нояб.': 11,
      'дек.': 12,
    }
    return `${dateObject.year}-${months[dateObject.month]}-${dateObject.day}`
  }

  async parsePlayer(sLink) {
    console.log(sLink)
    const player = {}
    const res = await needle('get', sLink + '?hl=ru-RU&attr=fut')
    const $ = cheerio.load(res.body)
    const pacBlock = $('h5:contains("СКР")').parents('.block-quarter')
    const shoBlock = $('h5:contains("УД")').parents('.block-quarter')
    const pasBlock = $('h5:contains("ПРД")').parents('.block-quarter')
    const driBlock = $('h5:contains("ДРБ")').parents('.block-quarter')
    const defBlock = $('h5:contains("ЗАЩ")').parents('.block-quarter')
    const phyBlock = $('h5:contains("ФИЗ")').parents('.block-quarter')
    const goalkeepingBlock = $('h5:contains("Вратарские")').parents('.block-quarter')
    const traitsBlock = $('h5:contains("Таланты")').parents('.block-quarter')
    const specialitiesBlock = $('h5:contains("Специализация")').parents('.block-quarter')
    player.sLink = sLink
    player.meta = $('#body > div:nth-child(5) > div > div.col.col-12 > div.bp3-card.player > div > div').text()?.trim()
    player.age = this._parseDate(player.meta)
    player.overallRating = $('div.bp3-card.player > section > div:nth-child(1) > div > span.bp3-tag.p').text()
    player.pac = {
      sprintSpeed: $('li:nth-child(1) span:nth-child(1)', pacBlock).text(),
      acceleration: $('li:nth-child(2) span:nth-child(1)', pacBlock).text(),
    }
    player.sho = {
      finishing: $('li:nth-child(1) span:nth-child(1)', shoBlock).text(),
      positioning: $('li:nth-child(2) span:nth-child(1)', shoBlock).text(),
      shotPower: $('li:nth-child(3) span:nth-child(1)', shoBlock).text(),
      longShots: $('li:nth-child(4) span:nth-child(1)', shoBlock).text(),
      penalties: $('li:nth-child(5) span:nth-child(1)', shoBlock).text(),
      volleys: $('li:nth-child(6) span:nth-child(1)', shoBlock).text(),
    }
    player.pas = {
      vision: $('li:nth-child(1) span:nth-child(1)', pasBlock).text(),
      crossing: $('li:nth-child(2) span:nth-child(1)', pasBlock).text(),
      fKAccuracy: $('li:nth-child(3) span:nth-child(1)', pasBlock).text(),
      longPassing: $('li:nth-child(4) span:nth-child(1)', pasBlock).text(),
      shortPassing: $('li:nth-child(5) span:nth-child(1)', pasBlock).text(),
      curve: $('li:nth-child(6) span:nth-child(1)', pasBlock).text(),
    }
    player.dri = {
      agility: $('li:nth-child(1) span:nth-child(1)', driBlock).text(),
      balance: $('li:nth-child(2) span:nth-child(1)', driBlock).text(),
      reactions: $('li:nth-child(3) span:nth-child(1)', driBlock).text(),
      composure: $('li:nth-child(4) span:nth-child(1)', driBlock).text(),
      ballControl: $('li:nth-child(5) span:nth-child(1)', driBlock).text(),
      dribbling: $('li:nth-child(6) span:nth-child(1)', driBlock).text(),
    }
    player.def = {
      interceptions: $('li:nth-child(1) span:nth-child(1)', defBlock).text(),
      headingAccuracy: $('li:nth-child(2) span:nth-child(1)', defBlock).text(),
      defensiveAwareness: $('li:nth-child(3) span:nth-child(1)', defBlock).text(),
      standingTackle: $('li:nth-child(4) span:nth-child(1)', defBlock).text(),
      slidingTackle: $('li:nth-child(5) span:nth-child(1)', defBlock).text(),
    }
    player.phy = {
      jumping: $('li:nth-child(1) span:nth-child(1)', phyBlock).text(),
      stamina: $('li:nth-child(2) span:nth-child(1)', phyBlock).text(),
      strength: $('li:nth-child(3) span:nth-child(1)', phyBlock).text(),
      aggression: $('li:nth-child(4) span:nth-child(1)', phyBlock).text(),
    }
    player.goalkeeping = {
      gKDiving: $('li:nth-child(1) span:nth-child(1)', goalkeepingBlock).text(),
      gKHandling: $('li:nth-child(2) span:nth-child(1)', goalkeepingBlock).text(),
      gKKicking: $('li:nth-child(3) span:nth-child(1)', goalkeepingBlock).text(),
      gKPositioning: $('li:nth-child(4) span:nth-child(1)', goalkeepingBlock).text(),
      gKReflexes: $('li:nth-child(5) span:nth-child(1)', goalkeepingBlock).text(),
    }
    player.traits = []
    traitsBlock.find('li').each(function () {
      player.traits.push($(this).text())
    })
    player.specialities = []
    specialitiesBlock.find('li').each(function () {
      player.specialities.push($(this).text().split('#')[1])
    })
    return player
  }
}

module.exports = new SofifaParser()
