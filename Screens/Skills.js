import React, {useState, useContext, useRef} from "react" ; 
import {View, StyleSheet, VirtualizedList} from "react-native" ; 
import {Svg} from "react-native-svg" ; 
import {RootStoreContext} from "../env" ; 
import {colors} from "../theme/Colors" ; 
import {SText} from "../components/Text" ; 
import {DropDownIndicator} from "../components/Svgs" ; 
import { useCallback } from "react";


const Data= {
    'Programming Languages':{
        'C++':{
            freshness: 'high',
            level: 'pro',
            addInfo: 'Every where, from UnrealEngine developing to playing around with FPrime',
        },
        'C':{
            freshness: 'high',
            level: 'pro',
            addInfo: 'mostly for embedded programming, ESP32'
        },
        'C#':{
            freshness: 'high',
            level: 'mediocre',
            addInfo: 'In conjunction with unity'
        },
        'Python': {
            freshness: 'high',
            level: 'pro',
            addInfo: 'You named it ...',
        },
        'Java': {
            freshness: 'high',
            level: 'pro',
            addInfo: 'used in projects involving Android, Hadoop, ...'
        },
        'Rust': {
            freshness: 'medium',
            level: 'mediocre',
            addInfo: 'use for lightning-fast Actix web-framework',
        },
        'JavaScript': {
            freshness: 'high', 
            level: 'pro',
            addInfo: 'every where, Node, React, React-Native, Expo, bare-WebAPI, ... '
        },
        'ShaderLanguages': {
            freshness: 'high',
            level: 'mediocre',
            addInfo: 'Mostly OpenGL/OpenGL ES',
        },
        'VHDL': {
            freshness: 'low',
            level: 'mediocre',
            addInfo: "",
        }
    },
    'Software Development': {
        'Web-Services': {
            freshness: 'high',
            level: 'pro',
            addInfo: '',
        },
        'Game-Development': {
            freshness: 'high',
            level: 'mediocre',
            addInfo: "Experience game-development using Unity, Unreal-Engine or W/O any engine at all from bare Shader programming"
        },
        "Embedded Systems": {
            freshness: 'low',
            level: 'mediocre',
            addInfo: "Most 00s start they programming experience in Atmel area, my passion for embedded system still to date continues also I have some experiences using RTOS. ARM "
        }
    },
    'FillTest1':{},
    'FillTest2':{},
    'FillTest3':{},
    'FillTest4':{},
    'FillTest5':{},
    'FillTest6':{},
    'FillTest7':{},
    'FillTest8':{},
    'FillTest9':{},
    'FillTest10':{},
    'FillTest11':{},
    'FillTest12':{},
    'FillTest13':{},
}

const styles = StyleSheet.create({
    
}) ;


const SkillCard = (props) => {
    return <View style={[{
        borderWidth: 2,
        borderRadius: 5, 
        borderColor: props.borderColor,
        flex: 1,
        border: 5,
        margin: 5,
    },{...props.style}]}>
        <View style={{
            padding: 0,
            borderBottomColor: props.borderColor,
            borderBottomWidth: 1,
            flex: 1,
            flexDirection: "row",
        }}>
            <SText style={{fontSize: 20}}>
                {props.title}
            </SText>
        </View>
        <View style={{flex: 2}}>

        </View>
        <View style={{flex:2}}>
            <SText>
                {props.data.addInfo}    
            </SText>
        </View>


    </View>
}

SkillCard.defaultProps = {
    borderColor: '#eaeaeaff'
}

const _getItemDetails = (data, index) => {
    const title = Object.keys(data)[index] ; 
    return {
        title: title,
        data: data[title],
    };
}

export const SectionContainer = (props) => {
    const [opened, setOpened] = useState(false) ;
    
    const setOpenedCallBack = useCallback(val => {
        setOpened(val) ;
    }, [setOpened]) ; 

    return <View style={
        {
            flex: 1,
            padding: 5,
            border: 5,
        }
        }>
        <View style={{
            borderRadius: 5,
            borderWidth: 2,
            borderColor: colors['light'].border,
            padding: 0,
            flex: 1,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                flex: 1,
                borderBottomWidth: 1,
            }}>
                <SText style={{fontSize: 20}}> {props.title} </SText>
                <DropDownIndicator height={20} pressHandler={setOpenedCallBack} />
            </View>

            {opened ? 
            <View style={{
                padding: 10,
                border: 5,
            }}>
                {console.log(props.data)}
                 <VirtualizedList 
                    data={props.data}
                    initialNumToRender={5}
                    renderItem={({item}) => <SkillCard data={item.data} title={item.title}/>}
                    keyExtractor={(item) => item.title}
                    getItemCount={(data) => Object.keys(data).length}
                    getItem={_getItemDetails}
                /> 
            </View> : null }
        </View>
    </View>
}

SectionContainer.defaultProps = {
    title: "none"
}

export const SkillFlexController = (props) => {

    return <View style={{

    }}>

    </View>
}

const _getItem = (data, index) => {
    const title = Object.keys(data)[index] ;
    return {
        data: data[Object.keys(data)[index]],
        title: title
    }
}

export const Skills = (props) => {
    const rootStore = useContext(RootStoreContext) ; 

    return (
    <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1,
        border: 5,
        padding: 10,
    }}>
        <VirtualizedList 
            style={{
                flex: 1,
            }}
            data={Data}
            initialNumToRender={5}
            renderItem={({item}) => <SectionContainer data={item.data} title={item.title}/>}
            keyExtractor={(item) => item.title}
            getItemCount={(data) => Object.keys(data).length}
            getItem={_getItem}
        /> 

    </View>)
}
