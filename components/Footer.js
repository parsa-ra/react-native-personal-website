import React, {useContext} from "react" ; 
import {View, Platform} from "react-native" ; 
import {generalStyles, RootStoreContext} from "../env" ; 
import {colors} from "../theme/Colors" ; 
import {ImageButton} from "../components/ImageButton" ; 
import {SText, StyledMD} from "../components/Text" ;
import { Logo } from "./Svgs";

export const Footer = (props) => {
    const rootStore = useContext(RootStoreContext) ; 
    const date = new Date() ;

    return (
        <View style={[{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopColor: colors[rootStore.theme].border, 
            borderTopWidth: 1,
            //flexWrap: "wrap",
            backgroundColor: colors[rootStore.theme].fillAreaColor,
            minHeight: 100,
        }]}>
            <Logo height={40} width={40}/> 
            <SText style={{color: colors[rootStore.theme].primaryTextColor}}> Copyright © 2020-{date.getFullYear().toString()}, Made by Parsa </SText>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                <SText style={{color: colors[rootStore.theme].primaryTextColor}}>Source available at </SText>
                <ImageButton buttImage={require("../assets/images/github.png")} width={20} height={20} onPressHandler={()=>{
                    if(Platform.OS == 'web'){
                        if(window){window.open("https://github.com/parsa-ra") ;} 
                    }
                }}/>
                <SText style={{color: colors[rootStore.theme].primaryTextColor}}>do whatever you like with it XD ... </SText>
            </View>

        </View>
    )
}