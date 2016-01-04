/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// React 集成组件
import React from 'react-native';
const {
        Component,
        AppRegistry,
        StyleSheet,
        Animated,
        Navigator,
        BackAndroid,
        ToastAndroid,
        DrawerLayoutAndroid,
        Text
    } = React;

// 全局变量
var _navigator, _drawer;

/**
 * 注册back事件监听  返回false代表未处理 则会被默认行为处理(也就是结束)
 * */
let lastBackTime;
BackAndroid.addEventListener('hardwareBackPress', function() {
    console.log('>>>>>>>>>>>>>>>>>>',_navigator.getCurrentRoutes().length);
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    if (_navigator && _navigator.getCurrentRoutes().length === 1) {
        if (new Date() - lastBackTime < 2000) {
            // 退出
            return false;
        }
        ToastAndroid.show('再次点击退出~', ToastAndroid.SHORT);
        lastBackTime = new Date();
        console.log('Time>>>>>>>>>>>>>>>>>>>', new Date());
        return true;
    }
    return false;
});

// Const
const NavMenuItems = [
    {tag:'home', text:'阅读', icon: require('image!ic_mood_black_24dp')},
    {tag:'favorite', text:'收藏', icon: require('image!ic_favorite_black_24dp')},
    {tag:'setting', text:'设置', icon: require('image!ic_settings_black_24dp')}
];

var _ = require('underscore');

// Menu
import NavMenu from './NavMenu.android';
// Scene
import ReadingScene from './ReadingPage';
import FavoriteScene from './FavoritePage';
var Test = require('./Test');
// SubScene
import NewsDetail from './NewsDetail.android';
import ImageLightBox from './ImageLightBox';

class l1 extends Component{

    constructor(props) {
        super(props);
        this.state= {
            bounceValue: new Animated.Value(0),
            loaded: false,
            selectNavIndex: 0
        };
    }

    componentDidMount() {
        //
        //this.state.bounceValue.setValue(1.5);     // Start large
        //Animated.spring(                          // Base: spring, decay, timing
        //    this.state.bounceValue,                 // Animate `bounceValue`
        //    {
        //        toValue: 0.8,                         // Animate to smaller size
        //        friction: 1                     // Bouncier spring
        //    }
        //).start();
        //setTimeout(()=>this.setState({loaded: true}), 2000);
        if (this.refs.drawer)
            _drawer = this.refs.drawer;
    }


    render() {
        //if (!this.state.loaded) {
        //    return this.renderLoadingView();
        //}
        // Loading Complete
        return (
            <DrawerLayoutAndroid
                ref='drawer'
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <NavMenu navListItems={NavMenuItems} selectNavIndex={this.state.selectNavIndex} onPress={this.onNavMenuListItemPressed}/>}>
                <Navigator
                    style={{flex: 1}}
                    initialRoute={{name: 'home'}}
                    configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
                    renderScene={this.routeMapper}/>
            </DrawerLayoutAndroid>
        )
    }

    /**
     * Render Functions
     * */
    renderLoadingView() {
        return (
            <Animated.Image                         // Base: Image, Text, View
                source={{uri: 'http://www.jiehengsen.com/uploads/allimg/140923/9-14092310323b06.jpg'}}
                style={{
          flex: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue}  // Map `bounceValue` to `scale`
          ]
        }}/>
        )
    }

    /**
     * 配合菜单的点击回调 此处的调用环境为NavMenu
     * */
    onNavMenuListItemPressed(index) {
        // 关闭Drawer
        _drawer.closeDrawer();
        let aboutToJump = NavMenuItems[index].tag;
        let indexOf = -1;
        if(_navigator.getCurrentRoutes().some((item, index)=>{
                if(item.name === aboutToJump){
                    indexOf = index;
                    return true;
                }
            })) {
            // JUMP
            _navigator.jumpTo(_navigator.getCurrentRoutes()[indexOf]);
        } else {
            // PUSH
            _navigator.push({
                title: NavMenuItems[index].text,
                name: aboutToJump
            });
        }
    }

    /**
     * 提供给子Pager关闭的接口
     * */
    openDrawer() {
        if (_drawer)
            _drawer.openDrawer();
    }

    /**
     *
     * <NewsPager nav={navigationOperations}/>
     *
     * <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']} style={styles.shadow}/>
     *
     * Router and Navigator
     *
     * TODO:修改renderNavMenu的方法 更精简 更外围控制！ 不需要Scene内部再复写
     *
     * */
    routeMapper = (route, navigationOperations, onComponentRef) => {
        _navigator = navigationOperations;
        console.log('>>>>>>>>> RouteMapper');
        if (route.name === 'home') {
            return (<ReadingScene nav={navigationOperations} openDrawer={this.openDrawer}/>)
        } else if(route.name === 'favorite'){
            return (<FavoriteScene nav={navigationOperations} openDrawer={this.openDrawer}/>)
        } else if (route.name === 'news') {
            return (<NewsDetail post={route.post}/>)
        } else if (route.name === 'image') {
            return (<ImageLightBox uri={route.uri} navigator={navigationOperations}/>)
        } else if (route.name == 'test') {
            return (<Test/>)
        }
    };
}

AppRegistry.registerComponent('l1', () => l1);
