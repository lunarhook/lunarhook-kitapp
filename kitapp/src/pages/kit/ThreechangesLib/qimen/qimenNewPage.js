
var Dimensions = require('Dimensions');
import React, {Component} from 'react';
import {StyleSheet,Keyboard,View,Button, TextInput,ScrollView, Text} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';  
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { TextareaItem,DatePicker, List ,Switch,WhiteSpace,PickerView,Provider } from '@ant-design/react-native';

import StorageModule from '../../../config/StorageModule'
import ValueTypeModule from '../../../config/ValueTypeModule'
import SixrandomModule from '../../UniversechangesLib/SixrandomLib/SixrandomModule'
import RouteConfig from '../../../config/RouteConfig';
import ScreenConfig from '../../../config/ScreenConfig';
import StyleConfig from '../../../config/StyleConfig';

const dataitem = [
  [
    {label: "自动",value: 0,},
    {label: "昼",value: 1},
    {label: "夜",value: 2,},

  ],
];

class qimenNewPage extends React.Component {

  constructor(porp) {
    var curday = new Date();
        super(porp);
        this.state= {
            datepicker:"",
            switchtype:true,
            datatype:"公历",
            Tip: "",
            value:curday
    }
   
  }


  static navigationOptions = ({navigation})=>{
    const { navigate } = navigation;
    //headerRight:(<Button title="返回" />),
    return{
      
    title: RouteConfig["qimenNewPage"].name,
    }
    
  };

    onChange = (value: any) => {
        console.log(value);
        this.setState({ value });
        var selecttime = new Date(value)
        this.setState({datepicker:selecttime})
      }

  render()
  {
    const { navigate } = this.props.navigation;

    
  
    //alert(ValueTypeModule["emotion"])
    return (
      <Provider>
        <View style={styles.container}>
            <ScrollView> 
              <Text></Text>
              <TextareaItem style={styles.input} placeholder="简单记录您的问题，用于奇门记录结果" rows={2} count={140} onChangeText={(text) => this.setState({Tip:text})}/>   
              <Text></Text>
              <List style={styles.inputpicker}>
              <DatePicker
                backgroundColor='#ff00ff'
                value={this.state.value}
                mode="datetime"
                minDate={new Date(1950, 1, 1)}
                //maxDate={new Date(2026, 11, 3)}
                onChange={this.onChange}
                format="YYYY-MM-DD-HH"
              >
            <List.Item arrow="horizontal">奇门时间:</List.Item>
            </DatePicker>

            <List.Item
              extra={
                <Switch
                  checked={this.state.switchtype}
                  onChange={(value) =>this.setState({switchtype:value,datatype:value==false?"农历":"公历"})}
                />
              }
            >{this.state.datatype}
            </List.Item>
           </List>
                
            
            <View style={styles.inputbutton}>
            <Button
                onPress={()=>this.qimendunjia()}
                title="奇门排盘"
        
            />
            <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
            </View>
            </ScrollView> 
            <TabNavigator tabBarStyle={[{height:ScreenConfig.getTabBarHeight()}]}>
                            <TabNavigator.Item
                                  title={RouteConfig["qimenHistoryPage"].name}
                                  renderIcon={() => RouteConfig["qimenHistoryPage"].icon}
                                  onPress={() => navigate(RouteConfig["qimenHistoryPage"].route) }  
                                  titleStyle={StyleConfig.menufont}>  
                              </TabNavigator.Item>  
                          </TabNavigator>  
       
</View>
</Provider>
            )
    }
    qimendunjia()
    {
      var dataArray = [];
      dataArray["date"] = this.state.datepicker;
      dataArray["switchtype"] = this.state.switchtype
      dataArray["tip"] = this.state.tip

      if(undefined==dataArray["date"] || ""==dataArray["date"])
      {
        dataArray["date"] = new Date()
      }
      var myDate=new Date(dataArray["date"])
      if(this.state.switchtype==false)
      {
            var isleap = false
            if(this.state.switchleap==true)
            {
                isleap = true;
            }
            var Json_ret = SixrandomModule.lunar2solar(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate(),isleap)
            console.log("solar2lunar",Json_ret,myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate())
            myDate=Json_ret
      }
      
      var SixCourseDate = SixrandomModule.lunar_f(myDate)

      var index = (new Date()).valueOf().toString();
      var savedate = new Array()
      savedate[0] = index;
      savedate[1] = SixCourseDate.gzYear+SixCourseDate.gzMonth +SixCourseDate.gzDate +SixCourseDate.gzTime;
      savedate[2] = ""+this.state.Tip
      savedate[3] = myDate
      var parameter = "?qimenDate="+savedate[1] + "&tip=" + savedate[2] + "&Date=" + savedate[3]
      StorageModule.save({key:"qimen",id:index,data:savedate})
      StorageModule.save({key:"lastqimen",data:savedate})
      this.props.navigation.navigate('qimenMainPage',parameter)
    }
  begin(pagename)
    {
      const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({ routeName: pagename}),
          ]
        })
        this.props.navigation.dispatch(resetAction)
    }
}

var styles = StyleSheet.create ({
  input:{
    borderRadius: 4,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    textAlign:'center', 
    textDecorationLine:'underline',
    fontSize:11,
  },
  
  menufont:{
    fontSize:15,
    color: '#333333', 
    height:25
  },
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  inputname: {
    //justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    alignItems:'center',
    justifyContent: 'space-between', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //justifyContent:'space-between',
    flexDirection: 'row',
    marginLeft: 30, 
    marginRight: 30, 
    marginTop: 50,
  },
  inputbutton: {
    //justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    alignItems:'center',
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //justifyContent:'space-between',
    flexDirection: 'row',
    marginLeft: 30, 
    marginRight: 30, 
    marginTop: 50,
  },
  inputpicker: {

    marginLeft: 15, 
    marginRight: 15, 
    marginTop: 50,
  },
  buttonstyle:{
    justifyContent: 'space-between', //虽然样式中设置了 justifyContent: 'center'，但无效  
    alignItems:'baseline',
  },
  bottonstylewithfont:{
    //justifyContent: 'space-between', //虽然样式中设置了 justifyContent: 'center'，但无效  
    alignItems:'baseline',
    fontSize:18
  }
});
module.exports=qimenNewPage;  