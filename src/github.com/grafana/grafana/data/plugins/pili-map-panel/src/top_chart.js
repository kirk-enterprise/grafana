/**
 * Created by taozeyu on 2017/3/10.
 */

import echarts from 'app/plugins/pili/echarts';
import _ from 'lodash';

class TopChart {

  constructor(elementId) {
    this._elementId = elementId;
  }

  setupOption() {
    this._myChart = echarts.init(document.getElementById(this._elementId), 'dark');
    return {
      title: {
        text: 'Top 10',
        left: 'center',
      },
      tooltip: {
        trigger: 'item'
      },
      grid: {
        right: 40,
        top: 70,
        bottom: 40,
        width: '70%'
      },
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        boundaryGap: false,
        splitLine: {show: false},
        axisLine: {show: false},
        axisTick: {show: false},
      },
      yAxis: {
        type: 'category',
        position: 'left',
        data: [],
      },
      series: [
        {
          id: 'bar',
          zlevel: 2,
          type: 'bar',
          symbol: 'none',
          data: [],
        },
      ],

    };
  }

  updateDataList(option, dataList) {
    dataList = dataList.sort((element1, element2) => element2.value - element1.value
  )
    ;

    while (dataList.length > 10) {
      dataList.pop();
    }
    option.yAxis = option.yAxis || {data: []};
    option.series = option.series || [{
      id: 'bar', data: []
    }];

    const yAxisData = option.yAxis.data;
    const seriesData = option.series[0].data;


    dataList.reverse().forEach(({targetObj, value}) => {
      yAxisData.push(_.values(targetObj).join('/'));
    seriesData.push(Math.round(value));
  })
    ;

    this._myChart.setOption(option);
  }
}

export default TopChart;
