import {View, Text, StyleSheet, Pressable} from "react-native" ; 
import React from "react" ; 
import Markdown, {} from "react-native-markdown-display" ; 
import {colors} from "../theme/Colors" ; 
import { useContext } from "react";
import Hoverable from "./Hoverable";
import {RootStoreContext} from "../env" ; 
import observer from "mobx-react-lite" ;    

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



export const StyledMD = (props) => {

    const rules = {
        link: (node, children, parent, styles) => (
            // <Pressable
            //     onPress={()=>{
                    
            //     }}
            // >
            <Hoverable key={node.key}> 
                { hover => (
                <Text  href={node.attributes.href} style={[styles.link, hover && {backgroundColor: colors[props.theme].linkActive} ] } accessibilityRole="link">
                    {children}
                </Text> 
                )}
            </Hoverable>
            // </Pressable>
        )
        ,
        heading1: (node, children, parent, styles) => (
            <Hoverable key={node.key}>
                { hover => (
                <View 
                    style=
                    {[hover && {
                        borderLeftWidth: 3,
                        borderLeftColor: colors[props.theme].border,
                    }]}>
                    <Text style={[styles.headings, styles.heading1]}>
                        {children} 
                    </Text>
                    {
                        // hover ? <View style={{position: 'absolute', }}> 
                        //     <Text>
                        //         Test
                        //     </Text>
                        // </View> : null 
                    }
                </View>
                )
                } 
            </Hoverable>
        ),
        heading2: (node, children, parent, styles) => (
            <Hoverable key={node.key}>
                { hover => (
                <View 
                    style=
                    {[hover && {
                        borderLeftWidth: 2,
                        borderLeftColor: colors[props.theme].border,
                    }, {
                        marginBottom: 5,
                    }]}>
                    <Text style={[styles.heading2, {
                        
                    }]}>
                        {children} 
                    </Text>
                    {
                        // hover ? <View style={{position: 'absolute', }}> 
                        //     <Text>
                        //         Test
                        //     </Text>
                        // </View> : null 
                    }
                </View>
                )
                } 
            </Hoverable>),
    
    }

    const markDownStyles = StyleSheet.create({
        link: {
            fontFamily: 'Ubuntu',
            backgroundColor: colors[props.theme].link,
        },
        body: {
            fontFamily: 'Ubuntu',
            fontSize: 15,
            lineHeight: 25,
            color: colors[props.theme].primaryTextColor,
        },
        em :{
            fontFamily: 'Ubuntu',
            color: colors[props.theme].primaryTextColor,
        },
        headings: {
            fontFamily: 'Ubuntu',
            fontWeight: '800',
            color: colors[props.theme].primaryTextColor,
        },
        heading2: {
            fontWeight: '700',
        },
        heading3: {
            fontWeight: '600',
        },
        hr: {
            //color: colors[props.theme].primaryTextColor,
            backgroundColor: colors[props.theme].primaryTextColor, 
        }
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
}; 
