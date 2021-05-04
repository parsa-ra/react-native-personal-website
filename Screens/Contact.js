import React, {useContext} from "react" ; 
import {View, ScrollView} from "react-native" ;
import {observer} from "mobx-react-lite"
import {SText, StyledMD} from "../components/Text" ; 
import {colors} from "../theme/Colors" ;
import {generalStyles, RootStoreContext} from "../env" ; 
import {Footer} from "../components/Footer" ; 

const contactMD = `# Contact
---

The way to contact me ... 
`

export const Contact = observer((props)=>{
    const rootStore = useContext(RootStoreContext) ; 

    return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[generalStyles.scrollView]}>
    <View style={[{
        alignSelf: 'center',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        width: rootStore.portrait ? "100%" : "70%",
        backgroundColor: colors[rootStore.theme].fillAreaColor,
    }, generalStyles.screenContainer]}>
        <StyledMD>
            {contactMD} 
        </StyledMD>
        {/* <Button title="Home" onPress={()=>{
                              rootStore.setNavStack("Home"); 
                              props.navigation.navigate("Home") ; }}/> */}
    </View>
    
    <Footer />
    </ScrollView>)
})