<template>
  <div class="">
   <ChartView :option="typoption" style="height: 600px;"></ChartView>
  </div>
</template>

<script>
import random from "lodash/random"
import request from "../../utils/request"
import ChartView from "../../components/Chart"
import axios from 'axios'
export default {
  components: {
    ChartView,
  },
  data() {
    return {
            typoption :{
                
              }
    }
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {

      this.getChartData();
    }, 3000);
    
  },
  destroyed() { 
    clearInterval(this.interval);
  },
  methods: {
    getChartData() { 
      request({
        url: "/api/WeatherForecast/Chart",
        method: "get",
        params: {ID:12345}
      }).then(response => { 
          this.typoption = {
                      title: {
                            text: 'ECharts 实例'
                          },
                          tooltip: {},
                          legend: {
                            data: ['销量']
                          },
                          xAxis: {
                            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                          },
                          yAxis: {},
                          series: [
                            {
                              name: '销量',
                              type: 'bar',
                              data:response.data,
                            }
                          ]

          }
        })
    }
  },
}
</script>

<style scoped >
</style>FormsBasicForm.vue