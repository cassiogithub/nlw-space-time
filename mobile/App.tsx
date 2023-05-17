import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950 text-zinc-50">
      <Text className="text-5xl font-bold text-zinc-50">Rocketseat</Text>
      <StatusBar style={'light'} translucent />
    </View>
  )
}
