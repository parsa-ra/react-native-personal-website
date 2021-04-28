import {View, Text, Button} from "react-native" ;
import React, {useContext} from "react" ; 
import {observer} from "mobx-react-lite" ; 
//import {rootStore} from "../App" ;
import {RootStoreContext} from "../env" ; 

export const About = observer((props)=>{
    const rootStore = useContext(RootStoreContext) ; 

    return <View>
        <Text>
            {rootStore.navStack} 
        </Text>
        <Button title="Home" onPress={()=>{
                              rootStore.setNavStack("Home"); 
                              props.navigation.navigate("Home") ; }}/>
    </View>
})