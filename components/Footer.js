import React, {useContext} from "react" ; 
import {View} from "react-native" ; 
import {generalStyles, RootStoreContext} from "../env" ; 
import {colors} from "../theme/Colors" ; 
import {SText} from "../components/Text" ;
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
            flexWrap: "wrap",
            backgroundColor: colors[rootStore.theme].fillAreaColor,
            minHeight: 60,
        }]}>
            <Logo height={40} width={40}/> 
            <SText style={{color: colors[rootStore.theme].primaryTextColor}}> Copyright © 2020-{date.getFullYear().toString()}, Made by Parsa </SText>

        </View>
    )
}