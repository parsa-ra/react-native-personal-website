import {View, Text} from "react-native" ; 
import React from "react" ; 

// Make sure to feed it Stylesheet type props
export const SText = (props) => {
    return <Text style={[{
        fontFamily: 'Ubuntu',
    }, props.style]}>
        {props.children}
    </Text>
}