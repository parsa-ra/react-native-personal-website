import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {Asset} from 'expo-asset' ; 
import * as Font from "expo-font" ; 
import AppLoading from 'expo-app-loading' ; 
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, Platform, Keyboard} from 'react-native';
import {Appbar} from "./components/Appbar" ; 
import {Footer} from "./components/Footer" ;
import { observer } from 'mobx-react-lite';
import {RootStore} from "./Stores/RootStore" ; 
import {NavigationContainer, DefaultTheme} from "@react-navigation/native" ; 
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer" ; 
import {isReadyRef, navigationRef} from "./components/RootNavigation" ; 
import {window, screen, RootStoreContext} from "./env" ; 
import {colors} from "./theme/Colors" ; 
import {PinSvg} from "./components/Svgs" ; 
import * as Screens from "./Screens" ;

const env = require("./env.json") ; 


export const rootStore = RootStore.create({
  navStack: "home",
  width: window.width,
  height: window.height,
  drawerType: 'front',
  theme: 'light',
  keyboardHidden: true,
  lang: 'en',
}) ; 

const Drawer = createDrawerNavigator() ; 

const DrawerContent = observer((props)=>(
    <DrawerContentScrollView {...props}>
      { rootStore.portrait ? null : 
        <DrawerItem  label= {({color, focused}) => (<PinSvg width={30} height={30} pinned={rootStore.drawerType == 'permanent' ? true : false} theme={rootStore.theme}/>)} 
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={()=>rootStore.toggleDrawerType()}
      />
      }
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
))

const DrawerNav = observer(()=>(
  <Drawer.Navigator 
    initialRouteName="Home" 
    screenOptions={{
      background: colors[rootStore.theme].secondaryFillAreaColor,
      drawerType: rootStore.drawerType,
      drawerStyle: {
        backgroundColor: colors[rootStore.theme].fillAreaColor,
        width: rootStore.portrait ? "50%" : "20%"
      },
      drawerLabelStyle: {
        fontFamily: 'Ubuntu',
        fontSize: 20,
        color: colors[rootStore.theme].primaryTextColor,
      },
      
      headerShown: false,
      drawerActiveBackgroundColor: colors[rootStore.theme].drawerActiveColor,
      drawerInactiveBackgroundColor: colors[rootStore.theme].drawerInactiveColor,
    }}
    drawerContent={(props)=>(
     <DrawerContent {...props} /> 
    )}
    >

    {/* Screens Loaded Here */}
    {Object.keys(Screens).map((screen)=> <Drawer.Screen key={screen} name={screen} component={Screens[screen]} />)}
    {/* <Drawer.Screen name="Home" component={Screens.Home}  />
    <Drawer.Screen name="About" component={Screens.About} />
    <Drawer.Screen name="Skills" component={Screens.Skills} />
    <Drawer.Screen name="Publications" component={Screens.Publications} /> 
    <Drawer.Screen name="Contact" component={Screens.Contact} /> */}


  </Drawer.Navigator>
))


 export const App = observer(() => {
  const [loadingDone, setLoadingDone] = useState(false) ;
  var navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme,
      background: colors[rootStore.theme].secondaryFillAreaColor,
      primary: colors[rootStore.theme].primary,
      border: colors[rootStore.theme].border,
      text: colors[rootStore.theme].primaryContrastTextColor,
      card: colors[rootStore.theme].fillAreaColor,
    },
  };
  
  Dimensions.addEventListener('change', ({window, screen})=>{
    rootStore.setDims(window.width, window.height) ; 
  }) ; 

  // Keyboard.addEventListener('keyboardDidShow', ()=>{
  //   rootStore.setKeyboardState(false) ; 
  // }) ; 

  // Keyboard.addEventListener('keyboardDidHide', ()=>{
  //   rootStore.setKeyboardState(true) ; 
  // })

  useEffect(()=>{
    //setLoadingDone(true) ; 
    isReadyRef.current = false ; 
    if(!rootStore.portrait){
      rootStore.setDrawerType('permanent') ; 
    }
  }, [])
  
  useEffect(()=>{
    navTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme,
        background: colors[rootStore.theme].secondaryFillAreaColor,
        primary: colors[rootStore.theme].primary,
        border: colors[rootStore.theme].border,
        text: colors[rootStore.theme].primaryContrastTextColor,
        card: colors[rootStore.theme].fillAreaColor,
      },
    };
  }, [rootStore.theme])

  const _loadAssets = async()=>{ 
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/drawer_pic.png"),
        require("./assets/images/mypic.jpeg"),
      ]),
      Font.loadAsync({
        Ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
      })
    ]); 
  };
  
  const _onApploadingFinish = () => {
    //console.log(colors[rootStore.theme].primary) ; 
    setLoadingDone(true) ;
  }

  const _onLoadingError = () => {
    // Show some error notification stuff
    setLoadingDone(false) ; 
  }

  return loadingDone ? 
    <RootStoreContext.Provider value={rootStore}>
      <View style={styles.container}>
        <NavigationContainer 
          theme={navTheme}
          linking={{config:{screens:{
            "Home": `${rootStore.lang}/home`,
            "About": `${rootStore.lang}/about`,
            "Skills": `${rootStore.lang}/skills`,
            "Publications": `${rootStore.lang}/pubs`,
            "Contact": `${rootStore.lang}/contact`,
          }}}} 
          onReady={()=>{isReadyRef.current = true;}}
          ref={navigationRef}>

          <Appbar/>

          <DrawerNav />   

        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </RootStoreContext.Provider> 
    : <View style={
      {flexDirection:'column',
       alignItems: 'center', 
       justifyContent: 'center',
       flex: 1,
      }
    }>

    <ActivityIndicator size="large" color={colors['light'].primary}/>  
    <AppLoading 
          startAsync= {_loadAssets}
          onFinish={ _onApploadingFinish } 
          onError={ _onLoadingError }
      />
    </View>
}) ;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[rootStore.theme].secondaryFillAreaColor,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
