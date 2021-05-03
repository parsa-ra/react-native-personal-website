import React from "react" ; 
import {View,Button, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {SText, StyledMD} from "../components/Text" ; 
import {observer} from "mobx-react-lite" ; 
//import {rootStore} from "../App" ; 
import {RootStoreContext, generalStyles} from "../env" ; 
import { useContext } from "react";
import {colors} from "../theme/Colors" ; 
import {ImageButton} from "../components/ImageButton" ; 

const styles = StyleSheet.create(
    {
        'header': {
            fontWeight: '600',
            fontSize: 35, 
            textAlignment: 'left',
        },
        'main': {
            fontWeight: '400',
            fontSize: 20,
            textAlignment: 'left',
            paddingLeft: 20,
        },
    }
)

const HomeContent = 
`# Welcome
I'm parsa and welcome to my website. 

## Interests 
---

I love many things in technology sector, here are few of them that I currently consider to peruse for the rest of my life. Since this specific sector is extremely volatile with respect ot time it may change rapidly, so keep tuning in.


* Computational Systems (e.g. Computational Photography, Computational Dynamic Modeling, ...)
* ML, AI: who doesn't?
` ; 


export const Home = observer(({navigation})=> {
    const rootStore = useContext(RootStoreContext) ;

    return (
        <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic"
          style={{height: '100%'}}>
        <View style={[
            {
                alignSelf: 'center',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: rootStore.portrait ? "100%" : "70%",
                backgroundColor: colors[rootStore.theme].fillAreaColor,
            }, generalStyles.screenContainer]
        }>
            
        {/* <Button title="About" onPress={()=>{rootStore.setNavStack("About"); 
                                            navigation.navigate("About");}}/>
        <Button title="Drawer" onPress={()=> navigation.toggleDrawer()}/> */}

        <StyledMD>
            {HomeContent} 
        </StyledMD>
        
    </View>
    </ScrollView>
    </SafeAreaView>
    )
}) ; 