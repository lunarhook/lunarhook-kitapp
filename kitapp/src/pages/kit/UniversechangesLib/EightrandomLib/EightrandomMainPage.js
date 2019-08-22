
var Dimensions = require('Dimensions');
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { captureRef } from "react-native-view-shot";
import { Grid, Accordion, WhiteSpace, WingBlank ,List} from '@ant-design/react-native';
const Item = List.Item;
import StorageModule from '../../../config/StorageModule'
import SixrandomModule from '../SixrandomLib/SixrandomModule'
import EightrandomModule from './EightrandomModule'
import ScreenConfig from '../../../config/ScreenConfig';
import StyleConfig from '../../../config/StyleConfig';
import WechatShare from '../../../config/WechatShare'
import IconConfig from '../../../config/IconConfig'
import {VictoryPie,VictoryLegend,} from 'victory-native';

import Svg,{
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop
} from 'react-native-svg';
const { width, height } = Dimensions.get('window');

var jump = false
let curyear = 0
/*
八字要展现的东西就比较多了
1、公立生日
2、生肖
3、星座
4、农历生日
5、命卦
6、姓名，性别
7、八字盘
8、地势
9、纳音
10、节气
11、大运
12、排大运
13、流年小运
14、四柱神煞
15、五行力量分析
16、日柱分析
17、八字婚姻
18、日柱分析
19、六亲
20、事业
21、健康
22、运势太岁关系
*/



class EightrandomMainPage extends React.Component {
  constructor(props) {

    super(props);

    var sex = ""
    var EightDate = ""
    var birth = ""
    var gzbirth = ""
    var buildeight = new Array();
    var buildeightExt = new Array();
    var precent = new Array();
    var daykey = new Array();

    this.state = {
      sex: sex,
      EightDate: EightDate,
      birth: birth,
      gzbirth: gzbirth,
      buildeight: buildeight,
      buildeightExt: buildeightExt,
      precent: precent,
      daykey: daykey,
      luckyyear:"",
      luckyyearposition:"",
      luckyearrelation:"",
      curluckyearnum:0,
      curminiluckyearnum:0,
      beginlucky:0,
      activeSections: [0, 1, 2, 3, 4, 5, 6,7,8,9],
    };


    this.onChange = (activeSections: number[]) => {

      var re = this.state.activeSections

      if (activeSections.length > 1) {
        this.setState({ activeSections: activeSections })
      }
      else {
        re.push(activeSections[0])
        this.setState({ activeSections: re })
      }


    };
  };

  componentDidMount() {

    this.timer = setTimeout(
      () => {
        this.refreshlist()

      },
      200
    );

  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearInterval(this.timer);
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      
      //headerLeft:(<Button title="万年历" onPress={  () => navigate('MainPage')  }/>),
      //headerRight:(<Button title="历史" onPress={  () => navigate('HistoryPage')  }/>),
      title: '八字分析',
    }
  };




  refreshlist() {
    const { navigate } = this.props.navigation;

    var parameter = this.props.navigation.state.params


    if (undefined != parameter) {
      var info = null;

      var ret;
      var args = {};
      var match = null;
      var search = decodeURIComponent(parameter.substring(1));
      var reg = /(?:([^&]+)=([^&]+))/g;
      while ((match = reg.exec(search)) !== null) {
        args[match[1]] = match[2];
      }
      info = args
      //console.log(info.EightDate);
      //console.log(info.sex);
      //console.log(info.birth);
      var t = info.birth.split(" ");
      var gz = new Date(t[0]);
      gz.setHours(t[1]);
      console.log(gz);
      var EightDate = SixrandomModule.lunar_f(gz)
      var gzDate = EightDate.gzYear + " " + EightDate.gzMonth + " " + EightDate.gzDate + " "+EightDate.gzTime;
      curyear = EightDate.Year;

      var retterm = EightrandomModule.getYearTerm(gz.getFullYear())
      var beginlucky = EightrandomModule.getbigluckyearbegin(retterm,gz,info.EightDate,info.sex);
      console.log("beginlucky",Math.floor(beginlucky),Number(gz.getFullYear()))
      this.setState({
        sex: info.sex, EightDate: info.EightDate, birth: info.birth, gzbirth: gzDate,beginlucky:Math.floor(beginlucky),
      });
      this.buildeight();
    }
    else {
      StorageModule.load({
        key: "lastname",
      }).then(ret => {
        this.setState({
          sex: ret.sex, EightDate: ret.EightDate
        });
      }).catch(err => {
        if (false == jump) {
          this.begin('EightrandomNewPage')
          jump = true
        }
      })
    }
  }

  buildeight() {
    var buildeight = new Array()
    buildeight[0] = EightrandomModule.parentday(this.state.EightDate[0], this.state.EightDate[4])
    buildeight[2] = EightrandomModule.parentday(this.state.EightDate[2], this.state.EightDate[4])
    buildeight[4] = "元"//this.parentday(this.state.EightDate[4],this.state.EightDate[4])
    buildeight[6] = EightrandomModule.parentday(this.state.EightDate[6], this.state.EightDate[4])
    buildeight[1] = EightrandomModule.parentearth(this.state.EightDate[1], this.state.EightDate[4])
    buildeight[3] = EightrandomModule.parentearth(this.state.EightDate[3], this.state.EightDate[4])
    buildeight[5] = EightrandomModule.parentearth(this.state.EightDate[5], this.state.EightDate[4])
    buildeight[7] = EightrandomModule.parentearth(this.state.EightDate[7], this.state.EightDate[4])
    var buildeightExt = new Array()
    buildeightExt[0] = EightrandomModule.gethide(this.state.EightDate[1]);
    buildeightExt[2] = EightrandomModule.gethide(this.state.EightDate[3]);
    buildeightExt[4] = EightrandomModule.gethide(this.state.EightDate[5]);
    buildeightExt[6] = EightrandomModule.gethide(this.state.EightDate[7]);
    buildeightExt[1] = EightrandomModule.gethideshishen(buildeightExt[0], this.state.EightDate[4]);
    buildeightExt[3] = EightrandomModule.gethideshishen(buildeightExt[2], this.state.EightDate[4]);
    buildeightExt[5] = EightrandomModule.gethideshishen(buildeightExt[4], this.state.EightDate[4]);
    buildeightExt[7] = EightrandomModule.gethideshishen(buildeightExt[6], this.state.EightDate[4]);
    var precent = new Array();
    var daykey = new Array();
    var o = EightrandomModule.getfive(this.state.EightDate)
    precent = o.q
    daykey = o.p

   

    var luckyyear = new Array();
    luckyyear = EightrandomModule.getbigluckyear(this.state.EightDate, this.state.sex);
    var luckyearrelation = new Array();
    var luckyyearposition = new Array();
    for (var i in luckyyear) {

      var rel = luckyyear[i].slice(0, 1);
      //console.log("luckyyear",rel, luckyyear[i]);
      rel = EightrandomModule.parentday(rel, this.state.EightDate[4])
      //console.log(rel);
      luckyearrelation.push(rel);
      luckyyearposition.push(EightrandomModule.gettwelfthposition(this.state.EightDate[4] + luckyyear[i].slice(1, 2)))
    }

   
    this.setState({
      buildeight: buildeight, buildeightExt: buildeightExt,
      daykey: daykey, precent: precent,
      luckyyear:luckyyear,
      luckyyearposition:luckyyearposition,
      luckyearrelation:luckyearrelation,
    });
    this.changeyear("",(new Date()).getFullYear())
  }

  getColor(king) {
    if ("甲" == king || "乙" == king || "寅" == king || "卯" == king) {
      return (<Text style={[styles.Eightstylewithfont, { color: 'green' }]}>{king}</Text>)
    }
    if ("丙" == king || "丁" == king || "午" == king || "巳" == king) {
      return (<Text style={[styles.Eightstylewithfont, { color: 'red' }]}>{king}</Text>)
    }
    if ("戊" == king || "己" == king || "丑" == king || "未" == king || "辰" == king || "戌" == king) {
      return (<Text style={[styles.Eightstylewithfont, { color: 'brown' }]}>{king}</Text>)
    }
    if ("庚" == king || "辛" == king || "申" == king || "酉" == king) {
      return (<Text style={[styles.Eightstylewithfont, { color: 'gold' }]}>{king}</Text>)
    }
    if ("癸" == king || "壬" == king || "子" == king || "亥" == king) {
      return (<Text style={[styles.Eightstylewithfont, { color: 'blue' }]}>{king}</Text>)
    }
    if (undefined != king && king.toString().length > 1) {
      return king
    }

    return (<Text style={[styles.Eightstylewithfont]}>{king}</Text>)
  }

  //keyExtractor = (item,index) => item.key
  keyExtractor = (item, index) => index.toString()

  renderItem(item) {
    return (

      <Text key={item.item} style={styles.flatTextfone}>{item.item}</Text>

    );
  }

  renderminyearItem(item) {
    
    var year = item.split(" ");
    var yearcolor = IconConfig.colororange
    if(year[1]==this.state.curminiluckyearnum)
    {
        yearcolor = IconConfig.colorblue
    }
    console.log("color",yearcolor,year[1],this.state.curminiluckyearnum)
    return (
      <View style={[styles.grid,{height:25}]}>
        <Text style={{ fontSize: 14 ,color:yearcolor}}>{year[0]}</Text>
        <Text style={{ fontSize: 14 ,color:yearcolor}}>{year[1]}</Text>
      </View>

    );
  }
  changeyear(bigyear,miniyear)
  {
    var by = 0
    var my = new Date()
    my = my.getFullYear()
    if(""!==bigyear)
    {
      //console.log("changeyearbig",bigyear,miniyear)
      by = Number(bigyear)
      my = Math.floor(Number(by*10+this.state.beginlucky))
      this.setState({curluckyearnum:by,curminiluckyearnum:my})

    }
    else if(""!==miniyear)
    {
      //console.log("changeyearmini",bigyear,miniyear)
      my = Number(miniyear)
      if(my>=this.state.beginlucky)
      {
        by = Math.floor((my-this.state.beginlucky)/10)
      }
      
      this.setState({curluckyearnum:by,curminiluckyearnum:my})
    }
    //console.log("changeyear",bigyear,miniyear,by,my,this.state.beginlucky)
  }


  checksub(hide) {
    if (undefined != hide) {
      return (
        <View style={styles.gridfix}>
          <Text >{hide}</Text>
        </View>
      )
    }
  }
  testselectyear(item,curluckyear)
  {
    var yearcolor = IconConfig.colorred
    if(this.state.curluckyearnum==curluckyear)
    {
        yearcolor = IconConfig.colorgreen
    }
    //console.log("testselectyear",item,curluckyear,yearcolor)
    return(
      <Text style={{fontSize : 14,color : yearcolor}}>{item}</Text>
    )
  }

  createpie()
  {
    if (this.state.precent != "") {
      var ret = this.state.pie
      console.log("createpie",ret)
      return (
        <View style={[{ textAlign: 'center', alignItems: 'center' }]}>
          <Svg width={300} height={300} >
            <VictoryPie
              colorScale={["green", "red","brown",  "yellow", "blue"]}
              data={[
                { x: 1, y: this.state.precent[5]+0, label: '木' },
                { x: 2, y: this.state.precent[6]+0, label: '火' },
                { x: 3, y: this.state.precent[7]+0, label: '土' },
                { x: 4, y: this.state.precent[8]+0, label: '金' },
                { x: 5, y: this.state.precent[9]+0, label: '水' },
              ]}
              standalone={false}
              width={300} height={300}
            /></Svg></View>
      )
    }
  }

  render() {


    if(undefined==this.state.luckyyear || ""==this.state.luckyyear)
    {
      return null
    }
    //这里是大运确定
    var curluckyear = this.state.luckyyear[this.state.curluckyearnum]
    //console.log("curluckyearnum",Number(this.state.curluckyearnum))
    //这里小运，如果选了小运，用小运去换算大运
    var thisyear
    if(0==this.state.curminiluckyearnum)
    {
      thisyear = new Date();
    }
    else
    {
      console.log("curminiluckyearnum",Number(this.state.curminiluckyearnum))
      thisyear = new Date()//这里应该选小运的年份
      thisyear.setFullYear(this.state.curminiluckyearnum)
      //curluckyear 这里应该更新大运
    }

    //根据小运计算干支
    var eightyear = SixrandomModule.lunar_f(thisyear)
    var gzYear = eightyear.gzYear
    //计算大运，流年，原句的所有冲克信息
    console.log("curluckyear",this.state.luckyyear,this.state.curluckyearnum)
    var r = EightrandomModule.getrelationship(this.state.EightDate,gzYear[1],curluckyear)

    const { navigate } = this.props.navigation;

    jump = false;
    
    
    var luckyyearposition = this.state.luckyyearposition;
    var minluckyyear = new Array()
    var luckyearrelation = this.state.luckyearrelation;
    //拍出所有小运
    var birthdayyear = new Date()
    birthdayyear.setYear(curyear)
    birthdayyear.setMonth(4)
    birthdayyear = SixrandomModule.lunar_f(birthdayyear)
    birthdayyear = birthdayyear.gzYear  + birthdayyear.gzMonth  + birthdayyear.gzDate +birthdayyear.gzTime;
    console.log("birthdayyear",birthdayyear)
    minluckyyear = EightrandomModule.getminlucky(birthdayyear, this.state.sex, curyear);


    //console.log(minluckyyear)

    var test = new Array()
    test.push({ info: "时辰", hide: '' })
    test.push({ info: "运", hide: '' })
    test.push({ info: "流", hide: '' })
    test.push({ info: "年", hide: '' })
    test.push({ info: "月", hide: '' })
    test.push({ info: "日", hide: '' })
    test.push({ info: "时", hide: '' })

    test.push({ info: "十神", hide: '' })
    //console.log(gzYear[0],this.state.EightDate[4])
    test.push({ info:EightrandomModule.parentday(curluckyear[0],this.state.EightDate[4]), hide: '' })
    test.push({ info:EightrandomModule.parentday(gzYear[0],this.state.EightDate[4]), hide: '' })
    for (var i = 0; i < 4; i++) {
      test.push({ info: this.state.buildeight[i * 2], hide: '' })
    }

    test.push({ info: "天干", hide: '' })
    test.push({ info: curluckyear[0], hide: '' })
    test.push({ info: gzYear[0], hide: '' })
    for (var i = 0; i < 4; i++) {
      test.push({ info: this.state.EightDate[i * 2], hide: '' })
    }

    test.push({ info: "地支", hide: '藏干' })
    test.push({ info: curluckyear[1],hide: EightrandomModule.gethide(curluckyear[1])})
    test.push({ info: gzYear[1], hide: EightrandomModule.gethide(gzYear[1]) })
    for (var i = 0; i < 4; i++) {
      test.push({ info: this.state.EightDate[i * 2 + 1], hide: this.state.buildeightExt[i * 2] })
    }

    test.push({ info: "十神", hide: '副星' })
    test.push({ info:EightrandomModule.parentearth(curluckyear[1],this.state.EightDate[4]), hide:EightrandomModule.gethideshishen(EightrandomModule.gethide(curluckyear[1]),this.state.EightDate[4])})
    test.push({ info:EightrandomModule.parentearth(gzYear[1],this.state.EightDate[4]), hide:EightrandomModule.gethideshishen(EightrandomModule.gethide(gzYear[1]),this.state.EightDate[4])})
    
    for (var i = 0; i < 4; i++) {
      test.push({ info: this.state.buildeight[i * 2 + 1], hide: this.state.buildeightExt[i * 2 + 1] })
    }

    test.push({ info: "长生", hide: '' })
    test.push({ info:  EightrandomModule.gettwelfthposition(this.state.EightDate[4] + curluckyear[1]), hide: '' })
    test.push({ info:  EightrandomModule.gettwelfthposition(this.state.EightDate[4] + gzYear[1]), hide: '' })
    for (var i = 0; i < 4; i++) {
      var x = EightrandomModule.gettwelfthposition(this.state.EightDate[4] + this.state.EightDate[i * 2 + 1])
      test.push({ info: x, hide: "" })
    }

    test.push({ info: "纳音", hide: '' })
    test.push({ info:  EightrandomModule.gettwelfth( curluckyear[0] + curluckyear[1]), hide: '' })
    test.push({ info:  EightrandomModule.gettwelfth( gzYear[0] + gzYear[1]), hide: '' })
    for (var i = 0; i < 4; i++) {
      var x = EightrandomModule.gettwelfth(this.state.EightDate[i * 2] + this.state.EightDate[i * 2 + 1])
      test.push({ info: x, hide: "" })
    }

    var years = new Array()
    years = luckyearrelation.concat(this.state.luckyyear, luckyyearposition)
    //console.log("years", years, luckyearrelation, this.state.luckyyear, luckyyearposition)

    var five = new Array();
    five.push(<Text style={{ color: 'green' }}>木</Text>)
    five.push(<Text style={{ color: 'red' }}>火</Text>)
    five.push(<Text style={{ color: 'brown' }}>土</Text>)
    five.push(<Text style={{ color: 'gold' }}>金</Text>)
    five.push(<Text style={{ color: 'blue' }}>水</Text>)
    five.push(<Text style={{ color: 'green' }}>甲:{this.state.daykey['甲']}</Text>)
    five.push(<Text style={{ color: 'red' }}>丙:{this.state.daykey['丙']}</Text>)
    five.push(<Text style={{ color: 'brown' }}>戊:{this.state.daykey['戊']}</Text>)
    five.push(<Text style={{ color: 'gold' }}>庚:{this.state.daykey['庚']}</Text>)
    five.push(<Text style={{ color: 'blue' }}>壬:{this.state.daykey['壬']}</Text>)
    five.push(<Text style={{ color: 'green' }}>乙:{this.state.daykey['乙']}</Text>)
    five.push(<Text style={{ color: 'red' }}>丁:{this.state.daykey['丁']}</Text>)
    five.push(<Text style={{ color: 'brown' }}>己:{this.state.daykey['己']}</Text>)
    five.push(<Text style={{ color: 'gold' }}>辛:{this.state.daykey['辛']}</Text>)
    five.push(<Text style={{ color: 'blue' }}>癸:{this.state.daykey['癸']}</Text>)
    five.push(<Text style={{ color: 'green' }}>{this.state.precent[5]}%</Text>)
    five.push(<Text style={{ color: 'red' }}>{this.state.precent[6]}%</Text>)
    five.push(<Text style={{ color: 'brown' }}>{this.state.precent[7]}%</Text>)
    five.push(<Text style={{ color: 'gold' }}>{this.state.precent[8]}%</Text>)
    five.push(<Text style={{ color: 'blue' }}>{this.state.precent[9]}%</Text>)
    var fivepower = EightrandomModule.geikeypower(this.state.EightDate[3]);
    five.push(<Text style={{ color: 'green' }}>{fivepower[0]}</Text>)
    five.push(<Text style={{ color: 'red' }}>{fivepower[1]}</Text>)
    five.push(<Text style={{ color: 'brown' }}>{fivepower[2]}</Text>)
    five.push(<Text style={{ color: 'gold' }}>{fivepower[3]}</Text>)
    five.push(<Text style={{ color: 'blue' }}>{fivepower[4]}</Text>)
    //console.log("five",five)


    var day = EightrandomModule.getselfinfo(this.state.EightDate[4] + this.state.EightDate[5])

    var shensha = new Array()
    shensha[0] = '年柱：'
    shensha[1] = '月柱：'
    shensha[2] = '日柱：'
    shensha[3] = '时柱：'
    for(i=0;i<4;i++)
    {
      this.state.EightDate[i]
      shensha[i] =shensha[i] +  EightrandomModule.shensha_dayg2earthz(this.state.EightDate[4],this.state.EightDate[i*2+1]);
      shensha[i] =shensha[i] +  EightrandomModule.shensha_moon(this.state.EightDate[3],this.state.EightDate[i*2]);
      if(i!=1)
      {
        shensha[i] =shensha[i] +  EightrandomModule.shensha_moon(this.state.EightDate[3],this.state.EightDate[i*2+1]);//月支不见月支
      }
      if(i!=2)
      {
        shensha[i] =shensha[i] +  EightrandomModule.shensha_dayz2earthz(this.state.EightDate[5],this.state.EightDate[i*2+1]);//日支不见自己
      }
      if(i!=0)
      {
        shensha[i] =shensha[i] +  EightrandomModule.shensha_tianluo(this.state.EightDate[0]+this.state.EightDate[1],this.state.EightDate[i*2+1]);//年支不见年支
        shensha[i] =shensha[i] +  EightrandomModule.shensha_diwang(this.state.EightDate[0]+this.state.EightDate[1],this.state.EightDate[i*2+1]);//年支不见年支
        shensha[i] =shensha[i] +  EightrandomModule.shensha_yearz2earthz(this.state.EightDate[1],this.state.EightDate[i*2+1]);//年支不见年支
      }
      
    }

    var marryinfo = EightrandomModule.getmarryinfo(this.state.EightDate,this.state.sex,r,this.state.buildeight)

    var base = new Array()
    base.push("公历: "+this.state.birth)
    base.push("四柱: "+this.state.gzbirth)
    base.push("命造: "+this.state.sex)
    base.push("起运: "+this.state.beginlucky)


    return (
      <View style={styles.container} >
        <ScrollView ref="location" style={{ backgroundColor: '#ffffff' }}>


          <View style={styles.container} >
            <WingBlank size="lg">

              <Accordion onChange={this.onChange} activeSections={this.state.activeSections}>
                <Accordion.Panel header="基本信息">
                  <Grid
                    data={base}
                    columnNum={1}
                    hasLine={true}
                    itemStyle={{ height: 25 ,alignItems:"flex-start"}}
                    renderItem={dataItem => (
                      <View style={styles.container}>
                      <View style={styles.grid}>
                        <Text style={[fontSize = 22]}>  {dataItem}</Text>
                      </View>
                    </View>
                  )}/></Accordion.Panel >
                <Accordion.Panel header={"八字排盘"}>
                  <Grid
                    data={test}
                    columnNum={7}
                    hasLine={true}
                    itemStyle={{ height: 40 }}
                    renderItem={dataItem => (
                      <View style={styles.container}>
                        <View style={styles.grid}>
                          <Text style={[fontSize = 22]}>{this.getColor(dataItem.info)}</Text>
                        </View>
                        {this.checksub(dataItem.hide)}
                      </View>


                    )}
                  //isCarousel
                  //onClick={()}
                  /></Accordion.Panel >
                  <Accordion.Panel header="八字神煞">
                  <Grid
                    data={shensha}
                    columnNum={1}
                    hasLine={true}
                    itemStyle={{ height: 25 ,alignItems:"flex-start"}}
                    renderItem={dataItem  => (
                      <View style={styles.container}>
                      <View style={styles.grid}>
                        <Text style={[fontSize = 22]}>  {dataItem}</Text>
                      </View>
                    </View>
                    )}
                  //isCarousel
                  //onClick={()}
                  /></Accordion.Panel >
                <Accordion.Panel header={"大运排盘"}>
                  <Grid
                    data={years}
                    columnNum={8}
                    hasLine={true}
                    itemStyle={{ height: 25 }}
                    //当选择大运的时候，相当于选择了流年小运
                    onPress={(_el: any, index: any) => this.changeyear(Number(index%8),"")}
                    renderItem={(dataItem, itemIndex) => (
                      <View style={styles.container}>
                        <View style={styles.grid}>

                          {this.testselectyear(dataItem,itemIndex%8)}


                        </View>
                      </View>


                    )}
                  //isCarousel
                  //onClick={()}
                  /></Accordion.Panel >

                <Accordion.Panel header="流年信息">

                  <Grid
                    data={minluckyyear}
                    columnNum={6}
                    hasLine={true}
                    itemStyle={{ height: 35 }}
                    isCarousel = {true}
                    carouselMaxRow = {4}
                    //当选择大运的时候，相当于选择了流年小运
                    onPress={(_el: any, index: any) => this.changeyear("",Number(_el.split(" ")[1]))}
                    renderItem={dataItem => this.renderminyearItem(dataItem)}
                  //isCarousel
                  //onClick={()}
                  />

                  </Accordion.Panel >
                  

                <Accordion.Panel header="五行衰旺">
                  <Grid
                    data={five}
                    columnNum={5}
                    hasLine={true}
                    itemStyle={{ height: 25}}
                    renderItem={dataItem => (
                      <View style={styles.container}>
                        <View style={[styles.grid,{fontSize : 18}]}>
                          {dataItem}


                        </View>
                      </View>


                    )}
                  />
                  
                  </Accordion.Panel >
                  <Accordion.Panel>
                  {this.createpie()}
                  </Accordion.Panel >
                <Accordion.Panel header="八字冲克">
                <List>
                    <Item wrap multipleLine
                    ><Text > {r.dr}</Text><WhiteSpace size="xl" /></Item>
                    
                    <Item wrap multipleLine
                    ><Text > {r.er}</Text><WhiteSpace size="xl" /></Item>
                    <Item wrap multipleLine
                    ><Text > {r.lr}</Text><WhiteSpace size="xl" /></Item>
                    <Item wrap multipleLine
                    ><Text > {r.br}</Text><WhiteSpace size="xl" /></Item>
                  </List>
                  </Accordion.Panel >
                <Accordion.Panel header="日柱信息">
                  <List>
                    <Item wrap multipleLine
                    >
                    <Text > {day.self}</Text><WhiteSpace size="xl" />
                    <Text > {day.tip}</Text><WhiteSpace size="xl" />
                    </Item>
                    
                  </List>
                  </Accordion.Panel >
                                  <Accordion.Panel header="婚姻提示(受大运流年影响)">
                  <List>
                    <Item wrap multipleLine
                    ><Text > {marryinfo}</Text><WhiteSpace size="xl" /></Item>
                  </List>
                  </Accordion.Panel >
                  
              </Accordion>
            </WingBlank>
            <WhiteSpace size="xl" />
            {
             (WechatShare.shareimg(this.state.shareimg))
            }
            
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            
          </View>
        </ScrollView>

        <TabNavigator tabBarStyle={[{ height: ScreenConfig.getTabBarHeight() }]}>
          <TabNavigator.Item
            title={RouteConfig["ScreenImage"].name}
            renderIcon={() => RouteConfig["ScreenImage"].icon}
            onPress={() => {this.setState({shareimg:true}),WechatShare.snapshot(this.refs['location'], "八字格局",this)}}
            titleStyle={StyleConfig.menufont}>
          </TabNavigator.Item>
        </TabNavigator>
      </View>

    )
  }
  begin(pagename) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: pagename }),
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

};







var styles = StyleSheet.create({
  grid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: "center",
    height: 50,
    //alignItems: 'center',
  },
  gridfix:
  {
    //flex:1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlignVertical: "bottom",
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  menufont: {
    fontSize: 15,
    color: '#333333',
    height: ScreenConfig.getFontheight()
  },
  rowhigth: {
    lineHeight: 25,
  },
  list: {
    height: 30,
    marginLeft: 1,
    paddingLeft: 1,
    borderRadius: 4,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textbutton: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  button: {
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 4,
  },
  tabBarStyle: {
    flex: 1,
    height: 40,
    flex: 1
  },
  EightstyleLinewithfont: {
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效  
    fontSize: 18
  },
  Eightstylewithfont: {
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    fontSize: 18
  },
  Eightstylewithfontmultline: {
    width: 40,
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    fontSize: 18
  },
  EightstyleSectionline: {
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 30,
  },
  EightstyleCoreline: {
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },
  Eightstylebetweenline: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    //flexwrap:'nowrap',
    paddingLeft: 5
  },
  flatText: {
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    flexDirection: 'row',
    alignItems: 'stretch',
    marginLeft: 5,
    marginRight: 5,
  },
  flatTextfone: {
    //flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: "center",
    //justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //paddingLeft:5
  },
});
module.exports = EightrandomMainPage;  