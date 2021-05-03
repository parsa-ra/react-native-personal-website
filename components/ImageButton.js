import { PropTypes } from "mobx-react";
import React from "react" ; 
import {TouchableHighlight, Image, Text, View, TextPropTypes} from "react-native" ; 
import {colors} from "../theme/Colors" ; 


export const ImageButton = (props) => {

    return <TouchableHighlight style={{
        justifyContent: "center",
        alignItems: "center",
     }}
     underlayColor = {colors['light'].border}
     onPress={() => props.onPressHandler()} 
    >
        <View style={[{
            flexDirection: 'row',
            backgroundColor: props.backgroundColor,
            borderRadius: 3,
        }, {...props.viewStyle}]}>

            {props.buttImage != "none" ? 
                <Image source={props.buttImage} style={{width:30, height:30}}/> :
            null
            }

            {props.buttText != "none" ? 
                <Text>
                    {props.buttText}
                </Text> : 
            null}

        </View>
    </TouchableHighlight>
}

ImageButton.defaultProps = {
    buttText: "none",
    buttImage: "none",
}


