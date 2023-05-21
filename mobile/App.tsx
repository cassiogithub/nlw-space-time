import { StatusBar } from 'expo-status-bar'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import LogoNlw from './src/assets/nlw-logo.svg'

import { styled } from 'nativewind'
import { useEffect } from 'react'

const discovery = {
  authorizationEndpoint: 'https://api.imgur.com/oauth2/authorize',
  tokenEndpoint: 'https://api.imgur.com/oauth2/token',
}

export default function App() {
  const StyledStripes = styled(Stripes)
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '77d4784eefae93c32581',
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
      // imgur requires an empty array
      scopes: [],
    },
    discovery,
  )

  useEffect(() => {
    console.log(
      makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    )

    if (response?.type === 'success') {
      const { code } = response.params
      console.log(code)
    }
  }, [response])

  if (!hasLoadedFonts) {
    return
  }

  return (
    <ImageBackground
      source={blurBg}
      className="flex-1 items-center justify-center bg-gray-900 px-8 py-10 text-gray-50"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <LogoNlw />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua capsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style={'light'} translucent />
    </ImageBackground>
  )
}
