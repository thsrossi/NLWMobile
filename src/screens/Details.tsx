import { useRoute } from "@react-navigation/native";
import { useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams{
    id: string
}

export default function Details(){
    const [isLoading, setIsLoading] = useState(true);
    const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros)

    const toast = useToast()

    const route = useRoute();
    const {id} = route.params as RouteParams

    async function fetchPoolDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)
        } catch (error) {
            console.log(error)
            return toast.show({
                title: "Não foi possível carregar os detalhes do bolão",
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPoolDetails()
    
      
    }, [id])
    

    if(isLoading){
        return <Loading/>
    }

    return(

        <VStack flex={1} bgColor="gray.900">
            <Header title={id} showBackButton showShareButton/>
            {
                poolDetails._count?.participants > 1 ? 
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails}/>

                    
                </VStack> :
                <EmptyMyPoolList code={poolDetails.code}></EmptyMyPoolList>
            }

        </VStack>
    )
}