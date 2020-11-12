import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { HumanProps } from '../types';
import data from '../data/human.json';

interface HumanList {
  kaiyang: string,
  huiwen: string,
  sookfun: string,
  peiyueh: string,
  jienthong: string,
  meixuan: string,
  karhui: string,
  sookteng: string,
  xinping: string,
  manfred: string,
  angelina: string,
  jyesze: string,
  erica: string,
}

interface HumanData {
  name: string,
  words: string,
  videoURL: string,
  avatarURL: string,
}

export default function HumanScreen({ route, navigation }: HumanProps) {
  const personName: keyof HumanList = route.params?.name ? route.params?.name : null;

  if (personName != null) {
    navigation.setOptions({ headerTitle: data[personName].name });
  }
  else {
    navigation.setOptions({ headerTitle: 'Birthday Blessings!' });
  }

  if (personName != null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab Two {data[personName].name}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabTwoScreen.js" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose one of the following!</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
