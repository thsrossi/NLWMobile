import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
    id: string
}

export default function Details() {
    const [isLoading, setIsLoading] = useState(true);
    const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros)
    const [optionSelected, setOptionSelected] = useState<'Seus palpites' | 'Ranking do grupo'>('Seus palpites')

    const toast = useToast()

    const route = useRoute();
    const { id } = route.params as RouteParams

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
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code,

        })
    }

    useEffect(() => {
        fetchPoolDetails()


    }, [id])


    if (isLoading) {
        return <Loading />
    }

    return (

        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare} />


            <VStack px={5} flex={1} 
            pb={15} mb={20}
            >
                <PoolHeader data={poolDetails} />

                <HStack bgColor={"gray.800"} p={1} rounded="sm" mb={5}>
                    <Option title="Seus palpites" isSelected={optionSelected === "Seus palpites"} onPress={() => { setOptionSelected("Seus palpites") }} />
                    <Option title="Ranking do grupo" isSelected={optionSelected === "Ranking do grupo"} onPress={() => { setOptionSelected("Ranking do grupo") }} />
                </HStack>{
                    poolDetails._count?.participants > 0 ?
                        <Guesses poolId={poolDetails.id} />

                        :

                        <EmptyMyPoolList code={poolDetails.code} onShare={handleCodeShare}></EmptyMyPoolList>
                }
            </VStack>

        </VStack>
    )
}