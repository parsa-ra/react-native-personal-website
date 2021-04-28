import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'expo';
import {Asset} from 'expo-asset' ; 
import * as Font from "expo-font" ; 
import AppLoading from 'expo-app-loading' ; 
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, Platform} from 'react-native';
import {Appbar} from "./components/Appbar" ; 
import { observer } from 'mobx-react-lite';
import {RootStore} from "./Stores/RootStore" ; 
import {NavigationContainer} from "@react-navigation/native" ; 
import {createStackNavigator} from "@react-navigation/stack" ; 
import {createDrawerNavigator} from "@react-navigation/drawer" ; 
import {Home, About, Skills} from "./Screens" ;
import {isReadyRef, navigationRef} from "./components/RootNavigation" ; 
import {window, screen, RootStoreContext} from "./env" ; 
import {colors} from "./theme/Colors" ; 

export const rootStore = RootStore.create({
  navStack: "home",
  width: window.width,
  height: window.height,
  drawerType: 'front',
  theme: 'light',
}) ; 


const Drawer = createDrawerNavigator() ; 
const StackNav = createStackNavigator() ; 
const DrawerNav = observer(()=>(
  <Drawer.Navigator 
    initialRouteName="Skills" 
    drawerType={rootStore.drawerType} 
    drawerStyle={{
      backgroundColor: colors[rootStore.theme].fillAreaColor,
      width:150
    }}
    screenOptions={{
      headerStyle: {
        backgroundColor: "#eaba33" 
      },
      headerTitleStyle: {
        fontSize: 30,
        fontFamily: 'Ubuntu',
        fontWeight: '500', 
      }
    }}>
    <Drawer.Screen name="Home" component={Home} options={{
      headerStyle: {
        backgroundColor: "#eaba33" 
      },
      headerTitleStyle: {
        fontSize: 30,
        fontFamily: 'Ubuntu',
        fontWeight: '500', 
      }
    }}/>
    <Drawer.Screen name="About" component={About} />
    <Drawer.Screen name="Skills" component={Skills} />
  </Drawer.Navigator>
))


export default function App() {
  const [loadingDone, setLoadingDone] = useState(false) ;
  
  // const Nav = (props) => {
  //   return <NavigationContainer>
  //       <Drawer.Screen name="home" component={Home}/>
  //       <Drawer.Screen name="about" component={About}/>
  //   </NavigationContainer>
  // }
  Dimensions.addEventListener('change', ({window, screen})=>{
    rootStore.setDims(window.width, window.height) ; 
  }) ; 

  useEffect(()=>{
    //setLoadingDone(true) ; 
    isReadyRef.current = false ; 
  }, []) 

  const _loadAssets = async()=>{ 
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/drawer_pic.png"),
      ]),
      Font.loadAsync({
        Ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
      })
    ]); 
  };
  
  const _onApploadingFinish = () => {
    console.log(colors[rootStore.theme].primary) ; 
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
          linking={{config:{screens:{
            "Home": "en/home",
            "About": "en/about" 
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

    <ActivityIndicator size="large"/>  
    <AppLoading 
          startAsync= {_loadAssets}
          onFinish={ _onApploadingFinish } 
          onError={ _onLoadingError }
      />
    </View>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',

  },
});
