import React from "react" ; 
import {Dimensions, StyleSheet} from "react-native" ;  

export const window = Dimensions.get('window') ; 
export const screen = Dimensions.get('screen') ; 

export const RootStoreContext = React.createContext(null) ; 

export const generalStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        margin: 4, 
        border: 2,
        borderRadius: 5,
        padding: 10,
    }
})
