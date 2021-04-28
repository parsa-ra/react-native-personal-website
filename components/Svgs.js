import {Svg, Path} from "react-native-svg" ;
import {TouchableHighlight, View} from "react-native" ; 
import React, {useEffect, useRef, useState} from "react" ; 
import {colors} from "../theme/Colors" ; 

export const DropDownIndicator = (props)=> {
    const pointYsDown = [30, 120, 30] ;
    const pointYsUp   = [70, -20, 70] ;  
    const [isDown, setIsDown] = useState(false) ;
    const [currentYs, setCurrentYs] = useState(pointYsDown) ; 


    return <TouchableHighlight style={{}} onPress={
        ()=> {
            props.pressHandler(!isDown);
            setIsDown(!isDown);
            setCurrentYs(isDown ? pointYsDown : pointYsUp) ; 
        }} underlayColor={props.underlayColor}>
        <View style={{
            aspectRatio: 1,
            height: props.height,
            width: props.height,
        }} >
            <Svg width="100%" height="100%" viewBox="0 0 100 100">
            <Path 
                d = {`M 10 ${currentYs[0]} Q 50 ${currentYs[1]} 90 ${currentYs[2]}`}
                stroke= "black"
                strokeWidth= "10" 
                fill="none"
            />
            </Svg>
        </View>
    </TouchableHighlight>
    
};

DropDownIndicator.defaultProps = {
    underlayColor: "#eaeaeaff"
}