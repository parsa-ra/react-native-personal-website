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
            title: 'VHDL',
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
            addInfo: "Most 90s kids start they programming experience in [Atmel](https://atmel.com) area, my passion for embedded system still to date continues also I have some experiences using RTOS. ARM "
        }
     }
}

const parsedData = parseDataToArrayLike(Data) ; 


const styles = StyleSheet.create({
    
}) ;

const SkillCard = observer((props) => {
//     console.log("********************") ; 
//     console.log(props.children) ; 
//     console.log(typeof props.children) ; 
    
    return <View style={[{
        borderWidth: 1,
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
            <StyledMD>
                {props.data.addInfo}    
            </StyledMD>
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
    const [opened, setOpened] = useState(false) ;
    const rootStore = useContext(RootStoreContext) ;
    
    const setOpenedCallBack = useCallback(val => {
        setOpened(val) ;
    }, [setOpened]) ; 

    return (
        <View style={
        {
            flex: 1,
            padding: 5,
            border: 5,
        }
        }>
        <View style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors[rootStore.theme].border,
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
                    <SText style={{fontSize: 20}}> {props.title} </SText>
                    <DropDownIndicator height={20} pressHandler={setOpenedCallBack} opened={opened}/>
                </View>
            </TouchableHighlight>

            {opened ? 
            <View style={{
                padding: 10,
                border: 5,
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
    console.log(item) ;
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
