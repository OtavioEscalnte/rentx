import React, {useState, useEffect} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Feather } from '@expo/vector-icons'
import { Accessory } from "../../components/accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { format } from 'date-fns'

import { Container, Header, CarImages,Content,Details,Description,Brand,Name,Rent,Period,Price,Accessories, RentalPeriod,DateInfo,DateTitle, DateValue, CalendarIcon,RentalPrice,RentalPriceLabel,RentalPriceDetails,RentalPriceQuota,RentalPriceTotal , Footer} from './styles'
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { CarDTO } from "../../dtos/CarDTO";
import { getPlatformDate } from "../../utils/getPlataformDate";
import { api } from "../../services/api";
import { Alert } from "react-native";



interface Params{
    car:CarDTO
    dates: string[]
}

interface RentalPeriod{
    start: string
    end: string
}



export function SchedulingDetails(){
    const [loading, setLoading] = useState(false)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    const theme = useTheme()
    const navigation = useNavigation()
    const route = useRoute()
    const { car, dates } = route.params as Params

    const rentTotal = Number(dates.length * car.rent.price)

    async function handleConfirm(){
        const schedulesBycar = await api.get(`/schedules_bycars/${car.id}`)

        
            const unavailable_dates = [
            ...schedulesBycar.data.unavailable_dates,
            ...dates,
        ]
    
        await api.post('schedules_bycars',{
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy')
         })
         

         api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
        .then(()=> navigation.navigate('SchedulingComplete'))
        .catch(()=> {
            setLoading(false)
            Alert.alert('Não foi possivel confirmar o agendamento')
        })
        }
        
    

    function handleBack(){
        navigation.goBack()
    }

    useEffect(()=> {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy'),
        })
    },[])
    return(
        <Container>
            <Header>
                <BackButton onPress={handleBack}/>
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos}
            />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name> 
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                {
                    car.accessories.map(accessory =>(
                        <Accessory 
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />

                    ))
                }
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                            name="chevron-right"
                            size={RFValue(10)}
                            color={theme.colors.text}
                        />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo> 
                </RentalPeriod>
            
                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} X${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button 
                    title="Alugar agora" 
                    color={theme.colors.success} 
                    onPress={handleConfirm} 
                    enabled={!loading} 
                    loading={loading}/>
            </Footer>

        </Container>
    )
}