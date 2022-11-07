import { VStack, Icon } from "native-base";
import {Octicons} from '@expo/vector-icons'

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";


export default function Pools(){
    const {navigate} = useNavigation();

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
            title="Meus bolões"
            />
            <VStack mt={6} mx={5} borderBottomColor="gray.600" borderBottomWidth={1} pb={4} mb={4}>
                <Button 
                title="BUSCAR BOLÃO POR CÓDIGO"
                leftIcon={<Icon as={Octicons} name="search" color={'black'}/>}
                onPress={()=>{ navigate('find')}}
                />
            </VStack> 
        </VStack> 
    )
}