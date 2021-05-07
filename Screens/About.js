import React, {useContext} from "react" ; 
import {View, ScrollView} from "react-native" ;
import {observer} from "mobx-react-lite"
import {SText, StyledMD} from "../components/Text" ; 
import {Footer} from "../components/Footer" ;
import {colors} from "../theme/Colors" ;
import {generalStyles, RootStoreContext} from "../env" ; 

const aboutMD = `# About
---

Things about me ... 
`

export const About = observer((props)=>{
    const rootStore = useContext(RootStoreContext) ; 

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
        <StyledMD>
            {aboutMD} 
        </StyledMD>
        {/* <Button title="Home" onPress={()=>{
                              rootStore.setNavStack("Home"); 
                              props.navigation.navigate("Home") ; }}/> */}
    </View>

    <Footer /> 
    </ScrollView>)
})