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

const PublicationScreenHeader = 
`# Publications
---

In middle of standing on the shoulder of giants ... 

`;


const PublicationArray = [
    {
        title: 'ICCV 2021 Submission',
        pdf: 'none',
        bib: 'none', 
        description: `In this article we propose and effective yet efficient differentiable computational graph to stabilize videos captured in devices equipped with gyroscope. We can't publish additional infos at this time due to possible violation of ICCV's rules. here you can see example result of the algorithm.`,
        videos: ['/assets/vids/iccv21-1.mp4'],

    },
] ; 

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
                placeholder="Search in Articles"
                placeholderTextColor={props.disabled ? colors[rootStore.theme].disabled : colors[rootStore.theme].border }
                autoCapitalize="words"
            />
        </View> 
    </Pressable>
}   


const PublicationCard = (props) => {
    const [isOpened, setIsOpened] = useState(true) ;
    
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
                {flexDirection: 'row'}
            }>
                <View style={{
                    flex: 3,
                    padding: 10,
                }
                }>
                    <StyledMD>
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
                        viewStyle={{borderWidth: 1, margin: 5}} theme={props.theme}/>
                   <ImageButton buttText="Copy BibTex" disabled={props.bib == 'none' ? true : false} 
                        viewStyle={{borderWidth: 1, margin: 5}} theme={props.theme}/>

                </View>
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
            width: rootStore.portrait ? "100%" : "70%",
            backgroundColor: colors[rootStore.theme].fillAreaColor,
        }, generalStyles.screenContainer]}>
            <StyledMD>
                {PublicationScreenHeader}
            </StyledMD>

            <SearchBar disabled={true}/> 

            <ScrollView> 
                {PublicationArray.map((item) => (
                    <PublicationCard title={item.title} description={item.description} theme={rootStore.theme} key={item.title} pdf={item.pdf} bib={item.bib}/>
                ))}
            </ScrollView>

        </View>
        <Footer/>
        </ScrollView>
    )
}) 