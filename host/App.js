import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'

import PageButtons from './PageButtons'
import EditQuestion from './EditQuestion'
import DownloadButton from './DownloadButton'
import Users from './Users'

import Chart from 'components/Chart'

const mapStateToProps = ({loading, page, participants, question_text}) => ({
  loading, page, participants, question_text
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { loading, page, participants, question_text } = this.props
    var ans = [[0, 0], [0, 0]]
    if(participants != undefined){
      for(var i in participants) {
        if(participants[i].question2 != 0){
          ans[0][participants[i].question1 - 1]++
          ans[1][participants[i].question2 - 1]++
        }
      }
    }
    if (loading) {
      return <p>ロード中です。</p>
    } else {
      return (
        <div>
          <PageButtons />
          <Divider
            style={{
              marginTop: "5%",
              marginBottom: "5%"
            }}
          />
          <Users /><br />
         <Chart oneone={ans[0][0]} onetwo={ans[0][1]} twoone={ans[1][0]} twotwo={ans[1][1]} expanded={false} /><br />
          <EditQuestion />
          <DownloadButton
            fileName={"framing.csv"}
            list={[
              ["フレーミング"],
              ["実験日", new Date()],
              ["登録者数", Object.keys(participants).length],
              ["ID", "1問目の回答", "2問目の回答"],
            ].concat(
              Object.keys(participants).map(id => [id, (participants[id].question1 != 0)? question_text["question1"].title[participants[id].question1 - 1] : "未回答", (participants[id].question2 != 0)? question_text["question2"].title[participants[id].question2 - 1] : "未回答"])
            )}
            style={{marginLeft: '2%'}}
            disabled={page != "result"}
          />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)