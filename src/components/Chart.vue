<template>
  <div ref="chartDom" >

  </div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option:{ 
      type: Object,
      default: () => { },
    }
  },
  watch: {
    option(val) { 

      this.myChart.setOption(val);
    },
    /* option: {
      handler(val){ 
         this.myChart.setOption(val);
      },
      deep:true,
    } */
  },
  created() { 
    this.resize = debounce(this.resize, 300);
  },
  mounted() { 
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
         // 基于准备好的dom，初始化echarts实

    },
  data() {
    return {
    }
  },
  methods: {
    resize() { 
      this.myChart.resize();
    }
    ,
      renderChart() { 
        this.myChart = echarts.init(this.$refs.chartDom);
        this.myChart.setOption(this.option);
      }
  },
  beforeDestroy() { 
    removeListener(this.$refs.chartDom, this.resize);
    this.myChart.dispose();
    this.myChart = null;
  }

}
</script>

<style scoped >
</style>