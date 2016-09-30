import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

const mapStateToProps = ({ question_text }) => ({ question_text })

class Chart extends Component {
  constructor(props) {
    super(props)
    const { expanded } = this.props
    this.state = { expanded: expanded }
  }

  handleExpandChange(expanded) {
    this.setState({ expanded: expanded })
  }

  render() {
    const { oneone, onetwo, twoone, twotwo, question_text } = this.props
    return (
    <Card
      expanded={this.state.expanded}
      onExpandChange={this.handleExpandChange.bind(this)}
    >
      <CardHeader
        title={"実験結果"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <span>
          {(oneone + onetwo != 0)?
            <Highcharts
              config={{
                  chart: {
                    type: 'pie'
                  },
                  credits : {
                    enabled: false,
                  },
                  title: {
                    text: '1問目の結果'
                  },
                  plotOptions: {
                      pie: {
                          dataLabels: {
                              distance: -30,
                              format: '{point.y:.0f}人'
                          },
                          showInLegend: true
                     }
                  },
                  tooltip: {
                    headerFormat: '<span>{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}人</b><br/>'
                  },
                  series: [{
                    name: '回答',
                    colorByPoint: true,
                    data: [{
                      name: question_text["question1"].title[0] + 'を選んだ人',
                      y: oneone,
                    }, {
                       name: question_text["question1"].title[1] + 'を選んだ人',
                       y: onetwo,
                    }]
                  }]
             }} /> : <p>1問目に回答した人がいませんでした。</p>}
          {(twoone + twotwo != 0)?
            <Highcharts
              config={{
                  chart: {
                    type: 'pie'
                  },
                  credits : {
                    enabled: false,
                  },
                  title: {
                    text: '2問目の結果'
                  },
                  plotOptions: {
                      pie: {
                          dataLabels: {
                              distance: -30,
                              format: '{point.y:.0f}人'
                          },
                          showInLegend: true
                     }
                  },
                  tooltip: {
                     headerFormat: '<span>{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}人</b> <br/>'
                  },
                  series: [{
                     name: '回答',
                   colorByPoint: true,
                   data: [{
                       name: question_text["question2"].title[1] + 'を選んだ人',
                       y: twotwo,
                      }, {
                       name: question_text["question2"].title[0] + 'を選んだ人',
                       y: twoone,
                   }]
                  }]
             }} /> : <p>2問目に回答した人がいませんでした。</p>}
        </span>
      </CardText>
    </Card>
  )
  }
}

export default connect(mapStateToProps)(throttle(Chart, 200))
