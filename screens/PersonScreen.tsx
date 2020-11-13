import React from 'react';
import { StyleSheet, ImageBackground, Dimensions, Alert, Button } from 'react-native';
import { AnimatedEmoji } from 'react-native-animated-emoji';
import YoutubePlayer from 'react-native-youtube-iframe';
import TypeWriter from 'react-native-typewriter';

import { Text, View } from '../components/Themed';
import { PersonProps, HumanData } from '../types';

const randomEmojis = [
  'heart_eyes', 'kissing_heart', 'blush', 'sunglasses',
  'kissing_closed_eyes', 'birthday', 'ok_woman', 'disappointed_relieved',
  'stuck_out_tongue_winking_eye', 'innocent',
  'grin', 'smiley', 'mega', 'house', 'heart', 'v',
  'see_no_evil', 'meat_on_bone', 'wedding', 'hamburger',
  'cake', 'icecream', 'speech_balloon', 'love_letter'
];

function youtubeParser(url: string){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

export default function PersonScreen({ route, navigation }: PersonProps) {
  // Person Data as State
  const [personData, setPersonData] = React.useState<HumanData>(route.params?.data);
  // YouTube Video playing state
  const [playing, setPlaying] = React.useState<Boolean>(false);

  // useEffect() is the React Hooks for componentDidMount()
  React.useEffect(() => {
    // Set the header tile to the person's name
    navigation.setOptions({
      title: personData.name
    })

    // Run annoyingAlerts() after 5s
    const timer = setTimeout(() => annoyingAlerts(), 5000);

    // Cleanup the timer 
    return () => clearTimeout(timer);
  }, [])

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

  // Handle video state change
  const onStateChange = React.useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("谢谢你，看完了🤪");
    }
  }, []);

  // Return custom YouTube Player if videoURL is provided
  const youtubePlayer = () => {
    if (personData.videoURL != "") {
      return (
        <View>
          <YoutubePlayer
            height={207}
            width={368}
            play={playing}
            videoId={youtubeParser(personData.videoURL)}
            onChangeState={onStateChange}
          />
        </View>
      )
    }
    else {
      return;
    }
  }

  // Trigger annoying alerts
  const annoyingAlerts = () => {
    Alert.alert(
      '请耐心看完，我们很可是用心准备的🥺',
      '',
      [
        {
          text: 'Okay',
          onPress: () => {
            Alert.alert(
              '可以吗？😬',
              '',
              [
                {
                  text: '可以啦',
                  onPress: () => {
                    Alert.alert(
                      '真的可以吗？',
                      '',
                      [
                        {
                          text: '是啦是啦🙄',
                          onPress: () => {
                            Alert.alert(
                              'Haiya, 给你看啦，给你看啦',
                              '',
                              [
                                {
                                  text: '...无言🤐',
                                  onPress: () => {
                                    Alert.alert(
                                      '不过你要答应我一样事情😛',
                                      '',
                                      [
                                        {
                                          text: '又什么🤷🏻‍♂️',
                                          onPress: () => {
                                            Alert.alert(
                                              '一定要看完啊😤',
                                              '',
                                              [
                                                {
                                                  text: 'okay...',
                                                  onPress: () => { }
                                                }
                                              ]
                                            )
                                          }
                                        }
                                      ]
                                    )
                                  }
                                }
                              ]
                            )
                          }
                        }
                      ]
                    )
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <ImageBackground source={require('../assets/images/CGPhoto.jpg')} style={styles.container}>
      <View style={styles.overlay}>
        {emojiComponents}
        <Text style={styles.title}>写给你的话 📝</Text>
        <TypeWriter
          typing={1}
          initialDelay={1000}
          style={styles.text}
          onTypingEnd={() => {
          }}>
          {personData.words}
        </TypeWriter>
        { personData.videoURL != "" && <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.25)" /> }
        {youtubePlayer()}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    color: '#FFF',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
}); 