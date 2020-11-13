import * as React from 'react';
import { AnimatedEmoji } from 'react-native-animated-emoji';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import TypeWriter from 'react-native-typewriter';

import { Text, View } from '../components/Themed';

const randomEmojis = [
  'tada', 'confetti_ball', 'balloon',
  'tada', 'confetti_ball', 'balloon',
  'tada', 'confetti_ball', 'balloon',
  'tada', 'confetti_ball', 'balloon',
  'tada', 'confetti_ball', 'balloon',
  'tada', 'confetti_ball', 'balloon',
  'tada', 'confetti_ball', 'balloon',
];

export default function HomeScreen({ navigation }) {
  // Location variable for emoji
  let emojiLocation = 0;
  // List of duration for emoji
  const emojiDuration = [2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000]

  // Map each emoji in randomEmojis array and return a component
  const emojiComponents = randomEmojis.map((emoji) => {
    // 100 and 900 are the min. and max. value of the screen
    if (emojiLocation >= 900) {
      emojiLocation = 100;
    }
    // Increase the location by 50 each step
    emojiLocation += 50;

    return (
      <AnimatedEmoji
        index={'emoji.key'}
        style={{ bottom: emojiLocation }}
        name={emoji}
        size={30}
        duration={emojiDuration[Math.floor(Math.random() * Math.floor(emojiDuration.length))]}
      />
    )
  })

  return (
    <ImageBackground source={{ uri: 'https://images.pexels.com/photos/2237190/pexels-photo-2237190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} style={styles.container}>
      <View style={styles.overlay}>
        {emojiComponents}
        <Text style={styles.title}>恭喜你成功了🎉</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TypeWriter typing={1} style={styles.subtitle}>这个时候的你是不是很兴奋、很期待叻🤩</TypeWriter>
        <TypeWriter typing={1} initialDelay={1500} style={styles.subtitle}>不用急，很快很快，你就会看到你的礼物了🎁</TypeWriter>
        <TypeWriter typing={1} initialDelay={2500} style={styles.subtitle}>按左下角的那个Button就是了👇🏼</TypeWriter>
      </View>
    </ImageBackground>
  );
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#fff',
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