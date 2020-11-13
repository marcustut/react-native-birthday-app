import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, Dimensions, Alert, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from './components/Themed';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  // State of app unlocked or not.
  const [unlocked, setUnlocked] = React.useState<Boolean>(false);
  // State for sound object
  const [isPlaying, setIsPlaying] = React.useState<Boolean>(false);
  const [sound, setSound] = React.useState<Audio.Sound>(new Audio.Sound());
  // Visibility for alert prompt
  const [visible, setVisible] = React.useState<Boolean>(false);

  // When the component is mounted
  React.useEffect(() => {
    // Set the AudioMode
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
    });

    if (!isPlaying) {
      // Play the audio
      sound.loadAsync(require('./assets/audio/A-Hoax-Mary-Riddle.mp3'), { shouldPlay: true, isLooping: true }, false);

      // Sets the playing state to true
      setIsPlaying(true);
    }

    if (unlocked) {
      sound.stopAsync();

      setIsPlaying(false);
    }
  }, [unlocked])

  // Set visibility to show prompt
  const showDialog = () => setVisible(true);

  // Fires when Cancel is pressed
  const handleCancel = () => setVisible(false);

  // Fires when OK is pressed
  const validatePassword = (password: string) => {
    if (password.length == 4 && password === '9732') {
      handleCancel();
      setUnlocked(true);
    }
    else if (password.length != 4) {
      return;
    }
    else {
      Alert.alert(
        '密码错误❌',
        'Please try again.'
      );
    }
  }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    if (unlocked) {
      return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      );
    } else {
      return (
        <SafeAreaProvider>
          <ImageBackground source={{ uri: 'https://images.pexels.com/photos/193349/pexels-photo-193349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} style={styles.container}>
            <View style={styles.overlay}>
              <Text style={styles.title}>欢迎来到《解秘中心》🕵🏼‍♂️</Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              <Text style={styles.subtitle}>如果你已经准备好，请输入密码 📡</Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => showDialog()}>
                <Text style={styles.buttonText}>
                  UNLOCK
                </Text>
              </TouchableOpacity>
              <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
                <Dialog.Title>请输入密码🔐</Dialog.Title>
                <Dialog.Input
                  autoFocus
                  keyboardType='numeric'
                  maxLength={4}
                  onChangeText={validatePassword}
                  placeholder='Enter here...'
                />
              </Dialog.Container>
            </View>
          </ImageBackground>
          <StatusBar />
        </SafeAreaProvider>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonContainer: {
    elevation: 0,
    backgroundColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 35,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  }
}); 
