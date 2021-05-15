import React from "react" ; 
import {View,Button, StyleSheet, SafeAreaView, ScrollView, Image} from "react-native";
import {SText, StyledMD} from "../components/Text" ; 
import {observer} from "mobx-react-lite" ; 
//import {rootStore} from "../App" ; 
import {RootStoreContext, generalStyles} from "../env" ; 
import { useContext } from "react";
import {colors} from "../theme/Colors" ; 
import {Footer} from "../components/Footer" ; 

const env = require("../env.json")

/**
 * 
 * 
 *  START EDITING HERE 
 * 
 */

const HomeHeaderMD = 
`
# Welcome
I'm parsa rahimi, a researcher and developer in area of Artificial Intelligence, Computer Vision Perception, Dapps and Dynamic Networks. 
For more information follow up in [About](${env.domain}en/about), [Skills](${env.domain}en/skills) and [Publications](${env.domain}en/pubs).

`

const HomeContent = 
`
## Introduction
---
Recently I received my M.Sc degree in EE from Sharif University of Technology supervised by [Dr. Arash Amini](http://sharif.ir/~aamini/). Currently I am looking for PHD positions mainly in Computer perception and AI.



## Interests 
---
Here you can find my main research interests.

* ### Automated Learning: AutoML, DARTS, ...

I think adaptable and automated neural network will be one of the key ingredients to true AI)

* ### Computational Systems (e.g. Computational Photography, Computational Dynamic Modeling, ...) 

To better perceive and control our environment using building blocks that we have (i.e. computers).


` ; 

/**
 * 
 * TILL HERE 
 * 
 */


export const Home = observer(({navigation})=> {
    const rootStore = useContext(RootStoreContext) ;

    return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[generalStyles.scrollView]}>
        <View style={[
            {
                alignSelf: 'center',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: rootStore.portrait ? "100%" : "80%",
                flex: 1,
                backgroundColor: colors[rootStore.theme].fillAreaColor,
                paddingRight: 0,
                paddingTop: 0,
            }, generalStyles.screenContainer]
        }>
            
        {/* <Button title="About" onPress={()=>{rootStore.setNavStack("About"); 
                                            navigation.navigate("About");}}/>
        <Button title="Drawer" onPress={()=> navigation.toggleDrawer()}/> */}

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            width: "100%",
        }}>

            <View style={{
                flex:3,
                padding: rootStore.portrait ? 20 : 40,
            }}>
                <StyledMD theme={rootStore.theme}>
                    {HomeHeaderMD}
                </StyledMD>
            </View>

            <View style={{
                flex:1,
                //backgroundColor: colors[rootStore.theme].primary,
                paddingLeft: rootStore.portrait ? 10 : 20,
                paddingRight: rootStore.portrait ? 10 : 20,
                borderTopRightRadius: 5,
                borderLeftWidth: 1,
                borderLeftColor: colors[rootStore.theme].border,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Image source={require("../assets/images/mypic.jpeg")} style={{width: "100%", height: "100%", borderRadius: 10}} resizeMode='contain'/>
            </View>

        </View>

        <View style={{
            padding: 10,
        }}>
        <StyledMD theme={rootStore.theme}>
            {HomeContent} 
        </StyledMD>
        </View>

        </View>

        <Footer/>
    </ScrollView>
    )
}) ; 