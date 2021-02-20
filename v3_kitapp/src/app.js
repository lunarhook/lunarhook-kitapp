import React, { Component } from 'react'
import './app.scss'
import './icon.scss'

import plumber  from './pages/plumbertrace'

//https://blog.csdn.net/baidu_39067385/article/details/111411634

class App extends Component {

  componentDidMount () {
    plumber("sdk-mini",1.0,'',false)
    wx.onAppRoute((route) => {
      plumber().addTodb(route.path)
     
   })
  
  
  }
  componentDidShow () {
    plumber().addTodb('ff')
  }
  componentDidHide () {
    plumber().rounting('bg',true)
  }

  componentDidCatchError () {}
  // this.props.children 是将要会渲染的页面
  onShow(options) {
    wx.onAppRoute(function(res){
    console.log('onAppRoute',{res})
    })
    }
  render () {


       return  this.props.children

  }
}

export default App
