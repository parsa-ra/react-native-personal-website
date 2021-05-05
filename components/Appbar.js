import React from 'react' ;
import {View, Button, TouchableHighlight} from 'react-native' ;  
import {colors} from "../theme/Colors"; 
import {useNavigation} from "@react-navigation/native"
import {navigationRef, toggleDrawer, navigate} from "./RootNavigation" ; 
import {ImageButton} from "../components/ImageButton" ; 
import {Logo, Sun, Moon} from "../components/Svgs" ; 
import {RootStoreContext} from "../env" ;
import Hoverable from "../components/Hoverable" ;
import { useContext } from 'react';

const drawerPic = require("../assets/images/drawer_pic.png") ; 

export const Appbar = ()=>{
    const rootStore = useContext(RootStoreContext) ; 

    return <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors[rootStore.theme].fillAreaColor,
        borderBottomColor: colors[rootStore.theme].primaryTextColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        maxHeight: 50, 
        padding: 10,
    }}>      
        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
        }}> 
            <ImageButton buttImage={drawerPic} onPressHandler={toggleDrawer} backgroundColor={colors[rootStore.theme].fillAreaColor} />
            <Logo width={60} height={60} /> 
        </View>

        <TouchableHighlight onPress={() => rootStore.toggleColor()}>
            <Hoverable> 
                {(hover) => (
                <View style={{
                    width: 30,
                    height: 30,
                }}>
                    { rootStore.theme == "dark" ? 
                        <Sun fill={hover}/>
                    : 
                        <Moon fill={hover}/>
                    }

                </View>
                )}
            </Hoverable>
        </TouchableHighlight>

    </View>
}