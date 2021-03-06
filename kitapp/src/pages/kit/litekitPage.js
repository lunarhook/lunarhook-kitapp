import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image,Button, ScrollView} from '@tarojs/components'
import { AtAccordion, AtGrid, AtTabBar, AtIcon } from 'taro-ui'
import './litekitPage.scss'
import '../../theme.scss'
import testimage from '../../assets/images/answer.png'
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
      //image: testimage,
      value: '六爻测试'
    },
    {
      iconInfo: {
        prefixClass: 'fa',
        size: 30,
        color: 'orange',
        value: 'trophy'
      },
      //image: testimage,
      value: '八字测评'
    },
    {
      iconInfo: {
        prefixClass: 'fa',
        size: 30,
        color: 'green',
        value: 'signal'
      },
      //image: testimage,
      value: '数字八星'
    },
  ];
 
export default class litekitPage extends Component {
  config = {
    navigationBarTitleText: '乾坤爻'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { 
    this.setState({current:1})
  }

  componentDidHide() { }

  constructor () {
    super(...arguments)
    var open = new Array()
    open[1]=true
    open[2]=true
    this.state = {
      open: open,
    }
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
  GridHander(item: object, index: number)
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
    var open = this.state.open
    open[index] = value;
    this.setState({open:open})

  }
  render() {
    return (
      <View className={'contain'}>
        <ScrollView>
          <AtAccordion
            open={this.state.open[1]}
            onClick={this.handleAccordionClick.bind(this,1)}
            title='心理测试'
          >
        <AtGrid mode='square' data={data1}
        onClick={this.GridHander.bind(this)}
        />
            </AtAccordion>
          <AtAccordion
            open={this.state.open[2]}
            onClick={this.handleAccordionClick.bind(this,2)}
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
    { title: '开屏语',  iconType: 'lightning-bolt' },
    { title: '鹿鸣测评', iconType: 'list' },
    { title: '我的', iconType: 'tag' }
  ]}
  onClick={this.handleClick.bind(this)}
  current={this.state.current}
/>
      </View>
    )
  }
};
