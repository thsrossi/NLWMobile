import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName, overwrite, } from 'country-list';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import ptBR from 'dayjs/locale/pt-br'

import { Team } from './Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
};

interface Props {
  data: GameProps;
  onGuessConfirm?: () => void;
  setFirstTeamPoints?: (value: string) => void;
  setSecondTeamPoints?: (value: string) => void;
};

dayjs.extend(utc)

overwrite([{
  code: 'GB-ENG',
  name: 'England'
}])

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm }: Props) {
  const { colors, sizes } = useTheme();
  const when = dayjs(data.date).utc().locale(ptBR).format("DD [de] MMMM [de] YYYY [às] HH[h]mm")

  function formatTeamName(teamName:string){
    return teamName.replace(regex, '').split(' ')[0]
  }


  const regex = new RegExp(/[^a-zA-Z0-9 ]/g)
  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {formatTeamName(getName(data.firstTeamCountryCode))} vs. {formatTeamName(getName(data.secondTeamCountryCode))}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          guess={data?.guess?.firstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          guess={data?.guess?.secondTeamPoints}
        />
      </HStack>

      {
        !data.guess &&
        <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onGuessConfirm}>
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      }
    </VStack>
  );
}