import React from 'react'
import { connect } from 'react-redux'

import Highcharts from 'react-highchars'

const mapStateToProps = ({ participants }) => ({ participants })

const Chart = ({ participants }) => {
  const users = Object.keys(participants).length()
  var rationally = 0
  for(var i of participants) {
    if(Math.abs(participants[i].question1 - participants[i].question2) == 0)
      rationally++
  }
  return (
    <Highcharts
      config={{
        chart: {
            type: 'column'
        },
        title: {
            text: '��������'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: '�l��'
            },
            allowDecimals: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}�l'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}�l</b><br/>'
        },

        series: [{
            name: '��������',
            colorByPoint: true,
            data: [{
                name: '�����I�ȑI���������l',
                y: 1,
            }, {
                name: '�����I�ȑI�������Ȃ������l',
                y: 1,
            }]
        }]
    }}
    />
  )
}

export default connect(mapStateToProps)(Chart)