import React, {useState, useContext, useRef} from "react" ; 
import {View, StyleSheet, VirtualizedList, FlatList, TouchableHighlight, ScrollView} from "react-native" ; 
import {observer} from "mobx-react-lite"
import {Svg} from "react-native-svg" ; 
import {RootStoreContext, generalStyles} from "../env" ; 
import {colors} from "../theme/Colors" ; 
import {SText, StyledMD} from "../components/Text" ; 
import {DropDownIndicator} from "../components/Svgs" ; 
import { useCallback } from "react";
import { Footer } from "../components/Footer";

const Freshness = {
    'High':   {val: 0},
    'Medium': {val: 1},
    'Low':    {val: 2},
}

const Level = {
    'Beginner': {val: 0},
    'Mediocre': {val: 1},
    'Pro':      {val: 2},
}

const parseDataToArrayLike = (data) => {
    var arrayLike = [] ;

    var sections = Object.keys(data)
    for(var sectionIdx in sections) {
        var newSection = {
            title: sections[sectionIdx]   
        }
        var dataArray = [] ;
        var skills = Object.keys(data[sections[sectionIdx]])
        for(var skillIdx in skills) {
            var dataObject = {} ; 
            dataObject["title"] = skills[skillIdx] ;
            dataObject["data"] = data[sections[sectionIdx]][skills[skillIdx]]  ; 
            dataArray.push(dataObject) ; 
        }
        
        newSection["data"] = dataArray ; 
        arrayLike.push(newSection) ; 
    }

    return arrayLike ; 
}

const SkillsScreenHeaderMD = `
# Skills
---

Here you can find some of the major skills that I've learned through out my years of experience in industry and academia. Each skill is labeled by it's freshness in my mind and also my proficiency level at that skill.

`

const Data= {
    'Programming Languages':{
        'C++':{
            freshness: 'high',
            level: 'pro',
            addInfo: 'Used every where, UnrealEngine developing, playing around with FPrime writing native modules for android',
        },
        'C':{
            freshness: 'high',
            level: 'pro',
            addInfo: 'mostly for embedded programming like ESP32 and a bit of socket programming'
        },
        'C#':{
            freshness: 'high',
            level: 'mediocre',
            addInfo: 'In conjunction with unity'
        },
        'Python': {
            freshness: 'high',
            level: 'pro',
            addInfo: 'Django, TensorFlow, PyTorch, ... ',
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
            addInfo: 'Every where, Node, React, React-Native, Expo, bare-WebAPI, ... '
        },
        'ShaderLanguages': {
            freshness: 'high',
            level: 'mediocre',
            addInfo: 'Mostly OpenGL/OpenGL ES',
        },
        'VHDL': {
            title: 'VHDL',
            freshness: 'low',
            level: 'mediocre',
            addInfo: "Used primary to implement algorithms such as FFT onto FPGAs",
        }
    },
    'Software Development': {
        'Web-Services': {
            freshness: 'high',
            level: 'pro',
            addInfo: `Fullstack SaaS developer, PWAs`,
        },
        'Game-Development': {
            freshness: 'high',
            level: 'mediocre',
            addInfo: "Game-development using Unity, Unreal-Engine or W/O any engine at all from bare Shader programming"
        },
        "Embedded Systems": {
            freshness: 'low',
            level: 'mediocre',
            addInfo: `Most 90s kids start they programming experience with micro-controller programming in [Atmel](https://microchip.com) area, my passion for embedded systems still to date continues and evolved to using [RTOS](https://www.freertos.org/about-RTOS.html)`
        },
        "DApps" : {
            freshness: 'medium',
            level: 'medium',
            addInfo: "Developing prototype apps on etheruem's test net",
        },
        "Cross-Platform Software Development": {
            freshness: 'low',
            level: 'medium',
            addInfo: `Developing cross-platform apps using Qt`
        } 
     },
     'General Software Skills': {
         'Version Control Systems': {
             freshness: 'high',
             level: 'medium',
             addInfo: 'Working with Git on daily basis'
         },
         'Build Systems':{
             freshness: 'high',
             level: 'medium',
             addInfo: 'Familiar with [Cmake](https://cmake.org), [Gradle](https://gradle.org), and a bit of [Bazel](https://bazel.build)'
         }
     }
}

const parsedData = parseDataToArrayLike(Data) ; 


const styles = StyleSheet.create({
    
}) ;

const SkillCard = observer((props) => {
 
    return <View style={[{
        flex: 1,
        border: 5,
        margin: 5,
        padding: 5,
    },{...props.style}]}>
        <View style={{
            padding: 0,
            borderBottomColor: props.borderColor,
            borderBottomWidth: 1,
            flex: 1,
            flexDirection: "row",
        }}>
            <SText style={{fontSize: 20, color: colors[props.theme].primaryTextColor}}>
                {props.title}
            </SText>
        </View>
        <View style={{
            flex: 1,
            flexDirection: 'row',
        }}>
        <View style={{flex:3}}>
            <StyledMD theme={props.theme}>
                {props.data.addInfo}    
            </StyledMD>
        </View>

        <View style={{
            flex: 1,
            borderLeftColor: colors[props.theme].border,
            borderLeftWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <SText style={{fontSize: 14, color: colors[props.theme].primaryTextColor}}>
                Freshness: {props.data.freshness}
            </SText>
            <SText style={{fontSize: 14, color: colors[props.theme].primaryTextColor}}>
                Level: {props.data.level}
            </SText>
        </View>

        </View> 

    </View>
}) ;

SkillCard.defaultProps = {
    borderColor: colors['light'].border ,
}

const _getItemDetails = (data, index) => {
    const title = Object.keys(data)[index] ; 
    return {
        title: title,
        data: data[title],
    };
}

export const SectionContainer = observer((props) => {
    const [opened, setOpened] = useState(true) ;
    const rootStore = useContext(RootStoreContext) ;
    
    const setOpenedCallBack = useCallback(val => {
        setOpened(val) ;
    }, [setOpened]) ; 

    return (
        <View style={{
            flex: 1,
            padding: 5,
            border: 5,
        }
        }>
        <View style={{
            borderBottomWidth : 1,
            borderBottomColor: colors[rootStore.theme].border,
            padding: 0,
            flex: 1,
        }}>
            <TouchableHighlight style={{}} onPress={
                ()=> {
                    setOpened(!opened) ;
                }} underlayColor={props.underlayColor}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    flex: 1,
                    borderBottomWidth: opened ? 1 : 0,
                    borderColor: colors['light'].border,
                }}>
                    <SText style={{fontSize: 25, color: colors[rootStore.theme].primaryTextColor}}> {props.title} </SText>
                    <DropDownIndicator height={20} pressHandler={setOpenedCallBack} opened={opened} theme={rootStore.theme}/>
                </View>
            </TouchableHighlight>

            {opened ? 
            <View style={{
                padding: 10,
                borderLeftColor: colors[rootStore.theme].border,
                marginBottom: 10,
                marginTop: 10,
                marginLeft: 10,
                borderLeftWidth: 5
            }}>

                {/* <FlatList 
                    data={props.data}
                    renderItem={({item}) => {
                        return <SkillCard title={item.title} data={item.data}/> 
                    }}
                    keyExtractor={(item) => item.title}
                /> */}

                {
                    props.data.map((item) => 
                        <SkillCard key={item.title} title={item.title} data={item.data} theme={rootStore.theme}/>
                    )
                }
                
            </View> : null }
        </View>
    </View> )
});

SectionContainer.defaultProps = {
    underlayColor: "#eaeaeaff",
    title: "none"
}

export const SkillFlexController = (props) => {

    return <View style={{

    }}>

    </View>
}

const _renderItem = ({item}) => {
    //console.log(item) ;
    return <SectionContainer title={item.title} data={item.data}/>
} 

export const Skills = observer((props) => {
    const rootStore = useContext(RootStoreContext) ; 

    return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[generalStyles.scrollView]}>
    <View style={[{
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: colors[rootStore.theme].fillAreaColor,
        width: rootStore.portrait ? '100%' : '70%', 
        padding: 10,
    }, generalStyles.screenContainer]}>

        <StyledMD theme={rootStore.theme}>
            {SkillsScreenHeaderMD}
        </StyledMD>

        <FlatList 
            data={parsedData}
            renderItem={_renderItem}
            keyExtractor={ item => item.title }
            theme={rootStore.them}
        />

    </View>

    <Footer/>
    </ScrollView>)
}) ;
