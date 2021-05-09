import React from "react" ; 
import {View,Button, StyleSheet, SafeAreaView, ScrollView, Image} from "react-native";
import {SText, StyledMD} from "../components/Text" ; 
import {observer} from "mobx-react-lite" ; 
//import {rootStore} from "../App" ; 
import {RootStoreContext, generalStyles} from "../env" ; 
import { useContext } from "react";
import {colors} from "../theme/Colors" ; 
import {Footer} from "../components/Footer" ; 


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

const HomeHeaderMD = 
`
# Welcome
I'm parsa and welcome to my website. 


`

const HomeContent = 
`
## About

Fore more information follow up in [About](/en/about)

## Interests 
---

I love many things in technology sector, here are few of them that I currently consider to peruse for the rest of my life. Since this specific sector is extremely volatile with respect ot time it may change rapidly, so keep tuning in.


* Computational Systems (e.g. Computational Photography, Computational Dynamic Modeling, ...)
* ML, AI: who doesn't?

# Welcome
I'm parsa and welcome to my website. 
` ; 


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