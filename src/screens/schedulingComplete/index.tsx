import React from "react";
import {useNavigation} from '@react-navigation/native'
import { StatusBar, useWindowDimensions } from 'react-native'

import BackgroundSvg from "../../assets/background.svg"
import DoneSvg from "../../assets/done.svg"
import { ConfirmButton } from "../../components/ConfirmButton";
import { Container, Content, Title, Message, Footer} from './styles'


export function SchedulingComplete(){
    const { width } = useWindowDimensions()
    const navigation = useNavigation()

    function handleConfirm(){
        navigation.navigate("Home" )
    }
    return(
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <BackgroundSvg width={width}/>
            
            <Content>
                 <DoneSvg width={80} height={80}/>
                 <Title>Carro alugado!</Title>

                 <Message>
                     Agora você só precisa ir {'\n'}
                     até a concessionária da RENTX {'\n'}
                     pegar o seu automóvel.
                 </Message>

                 
            </Content>

            <Footer>
                <ConfirmButton title="Ok" onPress={handleConfirm}/>
            </Footer>
        </Container>
    )
}