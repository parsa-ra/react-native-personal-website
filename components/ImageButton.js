import { PropTypes } from "mobx-react";
import React from "react" ; 
import {TouchableHighlight, Image, Text, View, TextPropTypes} from "react-native" ;
import {SText} from "../components/Text" ; 
import {colors} from "../theme/Colors" ; 


export const ImageButton = (props) => {

    return <TouchableHighlight style={{
        justifyContent: "center",
        alignItems: "center",
     }}
     underlayColor = {colors['light'].border}
     disabled = {props.disabled}  
     onPress={() => props.onPressHandler()} 
    >
        <View style={[{
            flexDirection: 'row',
            backgroundColor: props.backgroundColor,
            borderRadius: 3,
            padding: 5,
            borderColor: props.disabled ? colors[props.theme].disabled : colors[props.theme].primaryTextColor,
        }, {...props.viewStyle}]}>

            {props.buttImage != "none" ? 
                <Image source={props.buttImage} style={{width:30, height:30}}/> :
            null
            }

            {props.buttText != "none" ? 
                <SText style={{
                    color: props.disabled ? colors[props.theme].disabled : colors[props.theme].primaryTextColor,
                }}>
                    {props.buttText}
                </SText> : 
            null}

        </View>
    </TouchableHighlight>
}

ImageButton.defaultProps = {
    buttText: "none",
    buttImage: "none",
    disabled: false,
    theme: 'light',
}


