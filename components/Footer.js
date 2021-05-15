import React, {useContext} from "react" ; 
import {View, Platform} from "react-native" ; 
import {generalStyles, RootStoreContext} from "../env" ; 
import {colors} from "../theme/Colors" ; 
import {ImageButton} from "../components/ImageButton" ; 
import {SText, StyledMD} from "../components/Text" ;
import { Logo } from "./Svgs";

export const Footer = (props) => {
    const rootStore = useContext(RootStoreContext) ; 
    const date = new Date() 
    const info = require("../env.json") ; 

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
            minHeight: 150,
        }]}>
            <Logo height={40} width={40}/> 
            <SText style={{color: colors[rootStore.theme].primaryTextColor}}> Copyright © 2020-{date.getFullYear().toString()}, Made by Parsa </SText>
            <View style={
                {flexDirection: 'row', 
                 justifyContent: 'center', 
                 alignItems:'center',
                 flexWrap: 'wrap',
                }
            }>
                <SText style={{color: colors[rootStore.theme].primaryTextColor}}>Source available at </SText>
                <ImageButton buttImage={require("../assets/images/github.png")} width={20} height={20} onPressHandler={()=>{
                    if(Platform.OS == 'web'){
                        if(window){window.open("https://github.com/parsa-ra/react-native-personal-website") ;} 
                    }
                }}/>
                <SText style={{color: colors[rootStore.theme].primaryTextColor}}>do whatever you like with it XD ... </SText>
            </View>
            <SText style={{
                color: colors[rootStore.theme].border
            }}>
                Updated at {info.lastModifiedDate} 
            </SText>

        </View>
    )
}