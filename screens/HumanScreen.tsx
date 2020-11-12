import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

import { Text, View } from '../components/Themed';
import { HumanProps } from '../types';
import data from '../data/human.json';

interface HumanData {
  id: string,
  name: string,
  words: string,
  videoURL: string,
  avatarURL: string,
}

export default function HumanScreen({ route, navigation }: HumanProps) {
  const personName: String = route.params?.name ? route.params?.name : null;
  const personData: HumanData = data.filter((item) => item.id === personName)[0];

  const renderHumanData = ({ item }: { item: HumanData }) => {
    return (
      <TouchableHighlight style={styles.touchable}>
        <View style={styles.button}>
          <ListItem>
            <Avatar 
              rounded 
              title={item.name}
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}
            />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      </TouchableHighlight>
    )
  };

  // if (personName != null) {
  //   navigation.setOptions({ headerTitle: data[personName].name });
  // }
  // else {
  //   navigation.setOptions({ headerTitle: 'Birthday Blessings!' });
  // }

  if (personName != null) {
    console.log(personData);
    console.log("2");
    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>Tab Two {data[personName].name}</Text> */}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* <EditScreenInfo path="/screens/TabTwoScreen.js" /> */}
      </View>
    );
  }
  else {
    console.log(personData);
    console.log("1");
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose one of the following!</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <FlatList data={data} renderItem={renderHumanData} keyExtractor={(item) => item.id} />
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
  touchable: {
    alignItems: 'stretch'
  },
  button: {
    padding: 10,
    paddingHorizontal: 100,
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    marginVertical: 8,
    marginHorizontal: 16,
  }
});
