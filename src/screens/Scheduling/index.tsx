import React, {useState} from "react";
import { useNavigation , useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { format } from 'date-fns'

import ArrowSvg from '../../assets/arrow.svg'
import { Container, Header, Title,RentalPeriod, DataInfo, DataTitle,DataValue,Content,Footer} from './styles'
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval, MarkedDateProps } from "../../components/Calendar";
import { getPlatformDate } from "../../utils/getPlataformDate";
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriod{
    startFormatted: string
    endFormatted:string
}

interface Params{
    car:CarDTO
}

export function Scheduling(){
    const [lastSelectedDate, setlastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)


    const theme = useTheme()
    const navigation = useNavigation()
    const route = useRoute()
    const { car } = route.params as Params

    function handleConfirm(){
      
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            })
        }

    function handleBack(){
        navigation.goBack()
    }

    function handleChangeDate(date:DayProps){
            let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
            let end = date

            if(start.timestamp > end.timestamp){
                start = end
                end = start            
            }

            setlastSelectedDate(end)
            const interval = generateInterval(start, end)
            setMarkedDates(interval)

            const firstDate = Object.keys(interval)[0]
            const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

            setRentalPeriod({
                startFormatted:format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
                endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),

            })
        }

    return(
        <Container>
            <Header>
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
                <BackButton 
                    onPress={handleBack}
                    color={theme.colors.shape}
                    />

                <Title>
                    Escolha uma {'\n'}
                    data de inicio e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DataInfo>
                        <DataTitle>DE</DataTitle>
                        <DataValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DataValue>
                    </DataInfo>

                    <ArrowSvg/>

                    <DataInfo>
                        <DataTitle>Até</DataTitle>
                        <DataValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DataValue>

                    </DataInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button 
                    title="Confirmar" 
                    onPress={handleConfirm}
                    enabled={!!rentalPeriod.startFormatted}
                    />
            </Footer>
        </Container>
    )
}