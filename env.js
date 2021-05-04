import React from "react" ; 
import {Dimensions, StyleSheet} from "react-native" ;  

export const window = Dimensions.get('window') ; 
export const screen = Dimensions.get('screen') ; 

export const RootStoreContext = React.createContext(null) ; 

export const generalStyles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },  
    screenContainer: {
        flex: 1,
        margin: 10, 
        border: 10,
        borderRadius: 5,
        padding: 10,
        minHeight: "100%",
        justifyContent: "space-between"
    }
})
