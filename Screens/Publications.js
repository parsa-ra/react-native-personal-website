import React, {useContext} from "react" ; 
import {View, ScrollView} from "react-native" ;
import {observer} from "mobx-react-lite"
import {SText, StyledMD} from "../components/Text" ; 
import {colors} from "../theme/Colors" ;
import {generalStyles, RootStoreContext} from "../env" ; 
import { Footer } from "../components/Footer";

const PublicationScreenHeader = 
`# Publications
---

In middle of standing on the shoulder of giants ... 

`;


const PublicationArray = [
    {
        title: 'ICCV 2021 Submission',

    }
]


const PublicationCard = (props) => {

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

        </View>
        <Footer/>
        </ScrollView>
    )
}) 