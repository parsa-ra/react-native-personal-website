import {Svg, Path, Circle, } from "react-native-svg" ;
import {TouchableHighlight, View, StyleSheet} from "react-native" ; 
import React, {useEffect, useContext, useState} from "react" ; 
import {colors} from "../theme/Colors" ; 
import {RootStoreContext} from "../env" ;
import Hoverable from "./Hoverable" ;


const SvgStyles = StyleSheet.create({
    container: {
        aspectRatio: 1,
    }
}) ; 

export const DropDownIndicator = (props)=> {
    const pointYsDown = [30, 120, 30] ;
    const pointYsUp   = [70, -20, 70] ;  
    var currentYs = props.opened ? pointYsUp : pointYsDown ;

    useEffect(()=>{
        currentYs = props.opened ? pointYsUp :  pointYsDown ; 
        console.log(currentYs) ; 
    }, [props.opened]) ;

    // useEffect(()=> {
    //     console.log(props.showHover) ; 
    // }, [props.showHover])

    return (
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
    )
};

DropDownIndicator.defaultProps = {
    underlayColor: "#eaeaeaff"
}

const NavPic = ({state}) => {
    switch(state){ 
        case 0: return <PinSvg/> ;
        case 1: return <PinSvg/> //L
        case 2: return <PinSvg/> //P
        case 3: return <PinSvg/> //P
    }
}

export const PinSvg = (props) => {
    return (
        <Hoverable accessible={true}>
        {hover => (
            <View accessible={false} style={{
                aspectRatio: 1,
                height: props.height,
                width: props.width,
            }}>
                <Svg width="100%" height="100%" viewBox="0 0 100 100">
                    <Path 
                        d = 'M 10 90 L 42.5 42.5 L 30 30 Q 60 40 50 20 Q 100 0 80 50 Q 60 40 70 70 L 57.5 57.5 L 10 90'
                    /> 
                    {
                        props.pinned ? 
                        <Path d = 'M 25 5 L 75 95' strokeWidth="10" stroke="black" fill="none"/>
                        : null
                    }
                </Svg>
            </View>
            )
        }  
        </Hoverable>
    )
}

export const NavButton = (props) => {
    const rootStore = useContext(RootStoreContext) ; 
    const isPinned = useState(false) ; 

    return ( <TouchableHighlight >
            <View style={{
                aspectRatio: 1,
                height: props.height,
                width: props.width
            }}>

                <NavPic state={(rootStore.portrait << 1) + (isPinned & 1)} /> 

            </View>
        </TouchableHighlight>
    )
}

export const Logo = (props) => {
    return (
    <View style={{
        aspectRatio: 1,
        height: props.height,
        width: props.width,
        marginLeft: 30,
    }}>
        <Svg width="100%" height="100%" viewBox="0 0 1045.44 864">
            <Path id="shape0" transform="matrix(1.62119053092193 0 0 1.49634761278181 761.462558801524 183.595816697935)" fill="none" stroke="#12516e" stroke-width="40" stroke-linecap="square" stroke-linejoin="bevel" d="M82.7894 317.095C93.8061 294.675 77.0011 330.095 73.9071 334.417C55.5355 353.225 30.3419 365.766 5.51291 321.907C-0.779074 305.128 2.24221 321.012 0.541068 293.915C-6.0489 188.947 49.7671 -6.28472 48.0611 0.155455"/><Path id="shape1" transform="matrix(1.62119053092193 0 0 1.49634761278181 642.427380629087 502.460145282227)" fill="none" stroke="#12516e" stroke-width="40" stroke-linecap="square" stroke-linejoin="bevel" d="M134.896 3.9161C141.147 -15.2381 129.62 40.327 81.6022 74.1672C21.8535 116.274 -15.2865 128.474 6.10209 118.435"/><Path id="shape2" transform="matrix(1.62119053092193 0 0 1.49634761278181 130.137648488796 89.9829296490907)" fill="none" stroke="#12516e" stroke-width="40" stroke-linecap="square" stroke-linejoin="bevel" d="M491.307 143.401C515.326 111.685 394.111 271.892 317.435 323.118C239.258 375.192 83.376 428.384 24.3169 320.953C0.165792 277.021 -0.910807 216.557 0.334557 167.94C2.25792 92.8552 29.5713 -18.6459 24.9831 2.65785"/>
        </Svg>
    </View>)
}

export const Sun = (props) => {

    const r = 20 ;
    const s = 10 ; 
    const l = 15 ;
    const c = Math.sqrt(2)/2 ; 


    return (
        <View style={[SvgStyles.container, {height: props.height, width: props.width}]}>
            <Svg width="100%" height="100%" viewBox="0 0 100 100">
                        <Circle 
                            cx="50"
                            cy="50" 
                            r= {r.toString()}
                            strokeWidth="5" 
                            stroke="#343434"
                            fill={props.fill ? "#ffee44" : "none"}
                        />
                        <Path d={`M 50 ${50-r-s} L 50 ${50-r-s-l} M ${50+c*r + c*s}  ${50-c*r-c*s} l ${c*l} ${-c*l} M ${50+r+s} ${50} l ${l} ${0} M ${50+ c*r + c*s}  ${50+c*r+c*s} l ${c*l} ${c*l} M ${50}  ${50+r+s} l ${0} ${l} M ${50-c*r -c*s}  ${50+ c*r + c*s } l ${-c*l} ${c*l} M ${50-r-s} ${50} l ${-l} ${0} M ${50-c*r-c*s}  ${50-c*r-c*s} l ${-l*c} ${-l*c}`} strokeWidth="5" stroke="#343434"/>
 
            </Svg> 

        </View>
    )

}


export const Moon = (props) => {

    return (
        <View style={[SvgStyles.container, {height: props.height, width: props.width}]}>
            <Svg width="100%" height="100%" viewBox="0 0 100 100">
                <Path 
                    d={`M 80 70 A 40 40 0 1 1 80 30 A 30 30 0 1 0 80 70`}
                    strokeWidth="5"
                    stroke="#343434"
                    fill={props.fill ? "#eaeaea" : "none"}
                />
            </Svg> 
        </View>
    )
}