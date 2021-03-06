
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import { AtAccordion, AtGrid, AtTabBar, AtIcon } from 'taro-ui'
import './litekitPage.scss'
import '../../theme.scss'
import plumber  from '../plumbertrace'
import WXBizDataCrypt from '../WXBizDataCrypt'
var data1 =
  [
    {
      iconInfo: {
        prefixClass: 'fa',
        size: 30,
        color: 'orange',
        value: 'podcast'
      },
      value: '职业性格测试'
    },
    {
      iconInfo: {
        prefixClass: 'fa',
        size: 30,
        color: 'red',
        value: 'universal-access'
      },
      value: '九型人格测试'
    },

    {
      iconInfo: {
        prefixClass: 'fa',
        size: 30,
        color: 'blue',
        value: 'tachometer'
      },
      value: '霍兰德职业测试'
    },
  ];

var data2 =
  [
    {
      iconInfo: {
        prefixClass: 'fa',
        size: 30,
        color: 'darkblue',
        value: 'moon-o'
      },
      value: '六爻测试'
    },
    {
      iconInfo: {
        prefixClass: 'fa',
        size: 30,
        color: 'orange',
        value: 'trophy'
      },
      value: '八字测评'
    },
    {
      iconInfo: {
        prefixClass: 'fa',
        size: 30,
        color: 'green',
        value: 'signal'
      },
      value: '数字八星'
    },
  ];
let litekitPagethis=null
export default class litekitPage extends Component {
  componentDidMount() { 
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              litekitPagethis.setState({login:true})
              plumbertrace.uid_uid = getweixinunionid(res.userInfo)
            }
          })
        }
      }
    })
        this.setState({current:1})

  }
  componentDidUpdate()
  {
    
  }
  constructor (props) {
    super(props)
    var open = new Array()
    open[1]=true
    open[2]=true
    this.state = {
      open: open,
      login:false,
    }
    litekitPagethis = this
  }

    handleClick (value) {
      this.setState({current:value})
      if(2==value)
      {
        Taro.navigateTo({url:'../../pages/user/userCenter'})
      }
      if(0==value)
      {
        Taro.navigateTo({url:'../../pages/kit/tools/SloganShare'})
      }
     
    }
    
    GridHander(item, index)
    {
      if("职业性格测试"==item.value)
      {
        Taro.navigateTo({url:'../../pages/kit/LunarMotionsLib/PsychLib/MBTIModule'})
      }
      else if ("九型人格测试" == item.value) {
        Taro.navigateTo({ url: '../../pages/kit/LunarMotionsLib/PsychLib/EnneagramModule' })
      }
      else if ("霍兰德职业测试" == item.value) {
        Taro.navigateTo({ url: '../../pages/kit/LunarMotionsLib/PsychLib/HollandModule' })
      }
      else if ("六爻测试" == item.value) {
        Taro.navigateTo({url: '../../pages/kit/UniversechangesLib/SixrandomLib/SixrandomNewPage'})
        //plumber('test',true)
      }
      
      else if ("八字测评" == item.value) {
        Taro.navigateTo({ url: '../../pages/kit/UniversechangesLib/EightrandomLib/EightrandomNewPage' })
      }
      else if ("数字八星" == item.value)
      {
        Taro.navigateTo({ url: '../../pages/kit/UniversechangesLib/NumberLib/NumberMainPage' })
      }
    }
    handleAccordionClick(index, value)
    {
      //console.log(value,index)
      //var open = this.state.open
      open[index] = value;
      this.setState({open:open})
    }
 
    
    getweixinunionid(userInfo)
    {
      const appId='wx4c02534bf271e2f6'
      var pc = new WXBizDataCrypt(appId, sessionKey)

      var data = pc.decryptData(userInfo.encryptedData , userInfo.iv)
    }


    userInfoHandler()
    {
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo(
             { 
               withCredentials:true,
              success: function(res) {
                //plumber
                litekitPagethis.setState({login:true})
              }
            })
          }
        }
      })
    }
    showlogin(login)
    {
      return (<View className={'contain'}>    
      <button  open-type="getUserInfo" onGetUserInfo={this.userInfoHandler}>获取用户信息(授权登录)</button>
      </View>)
    }
  render() {

  const { login } = this.state;
    if(false==login)
    {return this.showlogin(login)}
    else{
      return (
        <View className={'contain'}>
           
          <ScrollView>
            <AtAccordion
  
              onClick={this.handleAccordionClick.bind(this, 1)}
              title='心理测试'
            >
              <AtGrid mode='square' data={data1}
                onClick={this.GridHander.bind(this)}
              />
            </AtAccordion>
            <AtAccordion
              onClick={this.handleAccordionClick.bind(this, 2)}
              title='周易测试'
            >
              <AtGrid mode='square' data={data2}
                onClick={this.GridHander.bind(this)}
              />
            </AtAccordion>
          </ScrollView>
          <AtTabBar
            fixed
            tabList={[
              { title: '开屏语', iconType: 'lightning-bolt' },
              { title: '鹿鸣测评', iconType: 'list' },
              { title: '我的', iconType: 'tag' }
            ]}
            onClick={this.handleClick.bind(this)}
            current={1}
          />
        </View>
      )
    }
    
  }
}

