import React, {useContext, useState, useRef} from "react" ; 
import {View, ScrollView, TouchableHighlight, TextInput, Pressable} from "react-native" ;
import {observer} from "mobx-react-lite"
import {SText, StyledMD} from "../components/Text" ; 
import {ImageButton} from "../components/ImageButton" ; 
import {colors} from "../theme/Colors" ;
import {generalStyles, RootStoreContext} from "../env" ; 
import { Footer } from "../components/Footer";
import {DropDownIndicator, Magnifier} from "../components/Svgs" ;
import { useEffect } from "react";
import { Video } from "expo-av";


/**
 * 
 * 
 * START EDITING HERE
 * 
 * 
 */

const PublicationScreenHeader = 
`# Publications
---

In middle of standing on the shoulder of giants ... 

`;

// Put your publication in Array like following. 
const PublicationArray = [
    {
        title: 'ICCV 2021 Submission',
        pdf: 'none',
        bib: 'none', 
        description: `In this article we propose an effective yet efficient differentiable computational graph to stabilize videos captured in devices equipped with gyroscope. here you can see an example output of our algorithm.`,
        videoSource: `https://parano.arvanvod.com/V6jkaZoDwZ/EKg1kd2Nx6/origin_FsWCEgGQYiGE4NxWn70miVWv4qcgpk9gtzpGbesz.mp4`,

    },
] ; 

/**
 * 
 *  TILL HERE
 * 
 */

const SearchBar = (props) => {
    const rootStore = useContext(RootStoreContext) ;
    const [focused, setFocused] = useState(false);
    const textInputRef = useRef(null) ;


    return <Pressable
        onPress={()=> {if(textInputRef.current != null) {textInputRef.current.focus();}}}
        disabled={props.disabled}
    >
        <View style={{
            flexDirection: 'row',
            padding: 10,
            borderWidth: 1,
            borderRadius: 2,
            borderColor: props.disabled ? colors[rootStore.theme].disabled : colors[rootStore.theme].border,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
        }}
        pointerEvents={props.disabled ? "none" : "auto"}
        >
            <Magnifier height={30} width={30} disabled={props.disabled} theme={rootStore.theme}/> 

            <TextInput
                ref={textInputRef}
                placeholder= {`Search in Articles ${props.disabled ? "(Disabled)" : ""}`}
                placeholderTextColor={props.disabled ? colors[rootStore.theme].disabled : colors[rootStore.theme].border }
            />
        </View> 
    </Pressable>
}   


const PublicationCard = (props) => {
    const [isOpened, setIsOpened] = useState(true) ;
    const video  = useRef(null) ;
    const [videoStatus, setVideoStatus] = useState({}) ; 
    
    return (
        <View style={{
            margin: 5,
            border: 5,
            backgroundColor: colors[props.theme].fillAreaColor,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
        }}>
            <TouchableHighlight onPress={()=>setIsOpened(!isOpened)} underlayColor={colors[props.theme].border}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: colors[props.theme].border, 
                paddingRight: 10,
                paddingLeft: 10,
            }}>
                <SText style={{
                    fontWeight: "600",
                    fontSize: 20,
                    paddingTop: 20,
                    paddingBottom: 20,
                    color: colors[props.theme].secondaryTextColor,
                }}> {props.title} </SText> 

                <DropDownIndicator opened={isOpened} height={20} width={20} theme={props.theme}/>        
            </View>
            </TouchableHighlight>
                
            {isOpened ? <View style={
                {}
            }>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        flex: 3,
                        padding: 10,
                    }
                    }>
                        <StyledMD theme={props.theme}>
                            {props.description}
                        </StyledMD> 
                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        padding: 10,
                        borderLeftColor: colors[props.theme].border,
                        borderLeftWidth: 1,
                    }}>
                    <ImageButton buttText="Download PDF" disabled={props.pdf == 'none' ? true : false}
                            viewStyle={{borderWidth: 1, margin: 5, flex:1, width: "100%", justifyContent: 'center'}} theme={props.theme}/>
                    <ImageButton buttText="Copy BibTex" disabled={props.bib == 'none' ? true : false} 
                            viewStyle={{borderWidth: 1, margin: 5, flex:1, width: "100%", justifyContent: 'center'}} theme={props.theme}/>

                    </View>
                </View> 

                {/* {
                    props.vids != 'none' ? props.vids.map(
                        (item) => {
                            return(
                                <Video 
                                    key = {item}
                                    ref = {video}
                                    source= {require(item)}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping={false}
                                    onError={(err) => console.log(err) }

                                />
                            )
                        }
                    ) : null 
                } */}

                {
                    props.videoSource != 'none' 
                    ?
                    <Video 
                            ref = {video}
                            source= {props.videoSource}
                            useNativeControls
                            resizeMode="contain"
                            isLooping={false}
                            onError={err => console.error(err) }
                            //onPlaybackStatusUpdate={status => console.log(status)}
                        />
                    : 
                    null
                }   

            </View> : null }

        </View>
    )
};

PublicationCard.defaultProps = {
    theme: 'light',
    title: 'none',
    pdf: 'none',
    description: 'none',
    bib: 'none',
    vids: 'none',
    videoSource: 'none',
}


export const Publications = observer((props) => {
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
            <StyledMD theme={rootStore.theme}>
                {PublicationScreenHeader}
            </StyledMD>

            <SearchBar disabled={true}/> 

            <ScrollView> 
                {PublicationArray.map((item) => {

                    return <PublicationCard title={item.title} description={item.description} theme={rootStore.theme} key={item.title} pdf={item.pdf} bib={item.bib} videoSource={item.videoSource}/>
                })}
            </ScrollView>

        </View>
        <Footer/>
        </ScrollView>
    )
}) 