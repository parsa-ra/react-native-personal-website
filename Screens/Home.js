import React from "react" ; 
import {View,Button, StyleSheet} from "react-native";
import {SText} from "../components/Text" ; 
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


export const Home = observer(({navigation})=> {
    const rootStore = useContext(RootStoreContext) ;

    return <View style={[
            {
                alignSelf: 'center',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                backgroundColor: colors[rootStore.theme].fillAreaColor,
            }, generalStyles.screenContainer]
        }>
        <SText style={styles.header}>Welcome</SText>
        <SText style={styles.main}>Hi I'm Parsa, I hope this website will provide you the information you're looking for.</SText>

        <Button title="About" onPress={()=>{rootStore.setNavStack("About"); 
                                            navigation.navigate("About");}}/>
        <Button title="Drawer" onPress={()=> navigation.toggleDrawer()}/>

        <ImageButton buttText="Salam"/> 
        
    </View>
}) ; 