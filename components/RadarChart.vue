<script>
import {Radar} from 'vue-chartjs'

export default {
  name: 'RadarChart',
  extends: Radar,
  props: {
    labels: Array,
    set1: Array,
    set2: Array,
    set1title: {
      type: String,
      default: 'команда'
    },
    set2title: {
      type: String,
      default: 'команда'
    },
    showLegend: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    chartData() {
      return this.data
    },
  },
  methods: {
    renderRadarChart() {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: this.set1title,
            borderColor: '#0000ff',
            borderWidth: 2,
            pointRadius: 2,
            data: this.set1,
          },
          {
            label: this.set2title,
            borderColor: '#ff8000',
            borderWidth: 2,
            pointRadius: 2,
            data: this.set2,
          },
        ]
      }, {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: this.showLegend,
          onClick(event, legendItem) {
          }
        },
        showLines: false,
        scale: {
          ticks: {
            // display: false,
            suggestedMin: 0,
            // suggestedMax: 10,
            stepSize: 2,
          },
          gridLines: {
            color: ['#de7070', '#f38f60', '#eace7a', '#a6cea0', '#df92f8'],
          },
        },
      })
    }
  },
  mounted() {
    this.renderRadarChart()
  },
  watch: {
    labels() {
      this.renderRadarChart()
    },
    set1() {
      this.renderRadarChart()
    },
    set2() {
      this.renderRadarChart()
    },
    set1title() {
      this.renderRadarChart()
    },
    set2title() {
      this.renderRadarChart()
    },
  },
}
</script>
