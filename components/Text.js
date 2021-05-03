import {View, Text, StyleSheet} from "react-native" ; 
import React from "react" ; 
import Markdown, {} from "react-native-markdown-display" ; 
import {colors} from "../theme/Colors" ; 
import { useContext } from "react";
import Hoverable from "./Hoverable";
import {RootStoreContext} from "../env" ; 

// Make sure to feed it Stylesheet type props
export const SText = (props) => {
    
    const stylesArray = [{fontFamily: 'Ubuntu'}, props.style] ; 
    // if(props.url != "none"){
    //     stylesArray.push({
    //         backgroundColor: props.linkColor
    //     }) ; 
    // }

    return (
    <Text style={stylesArray}>
        {props.children}
    </Text>
    )
}

SText.defaultProps = { 
    link: "none" ,
    linkColor: "#cce7ff"
}

const rules = {
    link: (node, children, parent, styles) => (
        <Hoverable key={node.key}> 
            { hover => (
            <Text  href={node.attributes.href} style={[styles.link, hover && {backgroundColor: '#aab1ff'} ] } accessibilityRole="link">
                {children}
            </Text> 
            )}
        </Hoverable>
    )
    ,
    heading1: (node, children, parent, styles) => (
        <Hoverable key={node.key}>
            { hover => (
            <View 
                style=
                {[hover && {
                    borderLeftWidth: 3,
                    borderLeftColor: "#000000",
                }]}>
                <Text style={[styles.headings, styles.heading1]}>
                    {children} 
                </Text>
                {
                    hover ? <View style={{position: 'absolute', }}> 
                        <Text>
                            Test
                        </Text>
                    </View> : null 
                }
            </View>
            )
            } 
        </Hoverable>
    )

}


export const StyledMD = (props) => {
    const rootStore = useContext(RootStoreContext) ; 

    const markDownStyles = StyleSheet.create({
        link: {
            fontFamily: 'Ubuntu',
            backgroundColor: colors[rootStore.theme].link,
        },
        body: {
            fontFamily: 'Ubuntu',
            fontSize: 15,
            lineHeight: 25,
            color: colors[rootStore.theme].primaryTextColor,
        },
        em :{
            fontFamily: 'Ubuntu',
            color: colors[rootStore.theme].primaryTextColor,
        },
        headings: {
            fontFamily: 'Ubuntu',
            fontWeight: '800',
            color: colors[rootStore.theme].primaryTextColor,
        },
    })
    

    return (
        <Markdown 
            style={markDownStyles}
            mergeStyle={true}
            rules={rules} 
            >
                {props.children} 
        </Markdown>
    )
}
