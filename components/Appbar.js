import React from 'react' ;
import {View, Button} from 'react-native' ;  
import {colors} from "../theme/Colors"; 
import {useNavigation} from "@react-navigation/native"
import {navigationRef, toggleDrawer} from "./RootNavigation" ; 
import {ImageButton} from "../components/ImageButton" ; 
import {RootStoreContext} from "../env" ;
import { useContext } from 'react';

const drawerPic = require("../assets/images/drawer_pic.png") ; 

export const Appbar = ()=>{
    const rootStore = useContext(RootStoreContext) ; 

    return <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors[rootStore.theme].primary,
        alignItems: 'stretch',
        maxHeight: 50, 
        padding: 10,
    }}>       
        {/*<Button title="Drawer" onPress={()=>{toggleDrawer()}}/> */}
        <ImageButton buttImage={drawerPic} onPressHandler={toggleDrawer} backgroundColor={colors[rootStore.theme].fillAreaColor} />

        
    </View>
}