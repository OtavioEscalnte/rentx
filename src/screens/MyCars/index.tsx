import React, {useState, useEffect} from "react";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import { StatusBar, FlatList } from "react-native";
import { useNavigation  } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'
import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate


} from './styles'
import { BackButton } from "../../components/BackButton";
import theme from "../../styles/theme";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

interface CarProps {
    id:string
    use_id: string
    car: CarDTO
    startDate: string
    endDate: string
}

export function MyCars(){
    const [cars, setCars] = useState<CarProps[]>([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()

    useEffect(()=> {
        async function fetchCars(){
            try{
                const response = await api.get('/schedules_byuser?user_id=1')
                
                setCars(response.data)
            }catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

    },[])

    function handleBack(){
        navigation.goBack()
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

                <SubTitle>
                    Conforto, segurança e praticidade
                </SubTitle>
            </Header>
            {loading ? <LoadAnimation/> : 
            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
                    <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                </Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={item=> item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=> (
                        <CarWrapper>
                            <Car data={item.car}/>
                            <CarFooter>
                                <CarFooterTitle>Periodo</CarFooterTitle>
                                <CarFooterPeriod>
                                <CarFooterDate>{item.startDate}</CarFooterDate>
                                    <AntDesign 
                                        name="arrowright"
                                        size={20}
                                        color={theme.colors.title}
                                        style={{marginHorizontal: 10}}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                </CarFooterPeriod>
                            </CarFooter>
                        </CarWrapper>
                    )}
                />
            </Content>
            }

            
        </Container>
    )
}