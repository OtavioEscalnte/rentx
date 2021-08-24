import React from "react";

import LottieView from 'lottie-react-native'
import load_car from '../../assets/load_car.json'

import {Container} from './styles'

export function LoadAnimation(){
    return(
        <Container>
            <LottieView
                source={load_car}
                style={{height:200}}
                resizeMode="contain"
                autoPlay
                loop
            />

            
        </Container>
    )
}