import React, {useContext, useState, useEffect} from "react" ; 
import {View, ScrollView, Pressable, Image, Platform, Linking} from "react-native" ;
import {observer} from "mobx-react-lite"
import {SText, StyledMD} from "../components/Text" ; 
import {colors} from "../theme/Colors" ;
import {generalStyles, RootStoreContext} from "../env" ; 
import {Footer} from "../components/Footer" ; 
import {Mail} from "../components/Svgs" ;
import Clipboard from "expo-clipboard" ;
import Hoverable from "../components/Hoverable" ;

const contactMD = `# Contact
---

The ways to contact or follow me ...  
`

const ContactMethod = [
    {
        title: 'Twitter',
        icon: require('../assets/images/twitter.png'),
        data: ['https://twitter.com/_Parano_'] ,
        role: 'link',
        color: ' #1da1f2'
    },
    {
        title: 'Mail',
        icon: require('../assets/images/mail.png'),
        data: ['mailto:parsa.rahimi.n@gmail.com'],
        role: 'link', 
        color: '#dedede'
    },
    {
        title: 'Github',
        icon: require('../assets/images/github.png'),
        data: ['https://github.com/parsa-ra'],
        role: 'link',
        color: '#121212'
    },
    {
        title: 'Stackoverflow',
        icon: require("../assets/images/stack.png"),
        data: ['https://stackoverflow.com/users/11441126/parsa-noshafagh'],
        role: 'link',
        color: '#F48024'
    },
    {
        title: 'LinkedIn',
        icon: require("../assets/images/linkedin.png"),
        data: ['https://www.linkedin.com/in/parsa-rahimi-02400514b'],
        role: 'link',
        color: '#0077b5',
    },
    {
        title: 'Spotify',
        icon: require("../assets/images/spotify.png"),
        data: ["link"],
        role: 'link',
        color: '#1db954',
    }
]

const ContactItem = (props)=>{
    const [pressedIn, setPressedIn] = useState(false) ;


    return (
    <Pressable onPress={()=>{
        if(Platform.OS == 'web'){
            window.open(props.data[0]) ; 
            // Clipboard.setString(props.data[0]) ; 
        }
    }} 
    onPressIn={()=>setPressedIn(true)} 
    onPressOut={()=>setPressedIn(false)}
    accessibilityRole='link'>
        <Hoverable >
            {
            hover => {
                return <View style={{}}>
                    <Image source={props.source} style={{width: 50, height: 50, tintColor:(hover || pressedIn) ? props.color : colors[props.theme].primaryTextColor}} resizeMode='contain' />
                </View>
            }}
        </Hoverable>
    </Pressable>
    
    )

};

export const Contact = observer((props)=>{
    const rootStore = useContext(RootStoreContext) ; 

    return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[generalStyles.scrollView]}>
    <View style={[{
        alignSelf: 'center',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        width: rootStore.portrait ? "100%" : "80%",
        backgroundColor: colors[rootStore.theme].fillAreaColor,
    }, generalStyles.screenContainer]}>

        <View>
        <StyledMD>
            {contactMD} 
        </StyledMD>
        </View >
        {/* <Button title="Home" onPress={()=>{
                              rootStore.setNavStack("Home"); 
                              props.navigation.navigate("Home") ; }}/> */}

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: 20,
        }}>
            {
                ContactMethod.map((item => <ContactItem key={item.title} source={item.icon} color={item.color} data={item.data} theme={rootStore.theme}/> ))
            }
        </View>
        
    </View>
    
    <Footer />
    </ScrollView>)
})