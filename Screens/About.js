import React, {useContext} from "react" ; 
import {View, ScrollView, ActivityIndicator} from "react-native" ;
import {observer} from "mobx-react-lite"
import {SText, StyledMD} from "../components/Text" ; 
import {Footer} from "../components/Footer" ;
import {colors} from "../theme/Colors" ;
import {generalStyles, RootStoreContext} from "../env" ; 
import { useEffect, useState } from "react";


export const About = observer((props)=>{
    const rootStore = useContext(RootStoreContext) ; 
    let aboutMD = require('./MDs/About.md') ; 
    const [text1, setText1] = useState(null); 

    useEffect(()=> {
        fetch(aboutMD).then((res)=>{
            return res.text() ; 
        }).then(text=>{ 
            setText1(text) ;
        })
    }, [])

    return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" 
          contentContainerStyle={[generalStyles.scrollView]}>
    <View style={[{
        alignSelf: 'center',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        width: rootStore.portrait ? "100%" : "80%",
        backgroundColor: colors[rootStore.theme].fillAreaColor,
    }, generalStyles.screenContainer]}>
        {text1 == null ?  
            <ActivityIndicator/>
        :
            <StyledMD theme={rootStore.theme}>
                {text1} 
            </StyledMD> 
        }
        {/* <Button title="Home" onPress={()=>{
                              rootStore.setNavStack("Home"); 
                              props.navigation.navigate("Home") ; }}/> */}

        
    </View>

    <Footer /> 
    </ScrollView>)
})