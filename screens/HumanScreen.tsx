import * as React from 'react';
import { Alert, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import Dialog from 'react-native-dialog';

import { Text, View } from '../components/Themed';
import { HumanProps, HumanData } from '../types';
import data from '../data/human.json';

// Counter for alternate colours
var counter: number = 0;

export default function HumanScreen({ route, navigation }: HumanProps) {
  // Visibility for alert prompt
  const [visible, setVisible] = React.useState<Boolean>(false);
  const [personData, setPersonData] = React.useState<HumanData>();

  // Function to render each JSON data as a list
  const renderHumanData = ({ item, index }: { item: HumanData, index: number }) => {
    let colorCode1: string;
    let colorCode2: string;

    if (index % 2 == 0) {
      colorCode1 = '#00B4DB';
      colorCode2 = '#0083B0';
    }
    else {
      colorCode1 = '#FF9800';
      colorCode2 = '#F44336';
    }

    return (
      <View style={styles.button}>
        <ListItem
          onPress={() => {
            showDialog();
            setPersonData(item);
          }}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          linearGradientProps={{
            colors: [colorCode1, colorCode2],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0 },
          }}
          style={{ borderRadius: 14, overflow: 'hidden' }}
        >
          <Avatar rounded source={{ uri: item.avatarURL }} />
          <ListItem.Content>
            <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle style={{ color: 'white' }} numberOfLines={1}>
              {item.words}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color="white" />
        </ListItem>
      </View>
    )
  };

  // Set visibility to show prompt
  const showDialog = () => setVisible(true);

  // Fires when Cancel is pressed
  const handleCancel = () => setVisible(false);

  // Fires when OK is pressed
  const validatePassword = (password: string) => {
    if (password.length == 4 && password === personData?.password) {
      handleCancel();
      navigation.navigate('PersonScreen', {
        data: personData
      });
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

  return (
    <ImageBackground source={{ uri: 'https://images.pexels.com/photos/4529106/pexels-photo-4529106.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} style={styles.container}>
      <View style={styles.textbox}>
        <Text style={styles.title}>你喜欢谁先就谁先👇🏼</Text>
        <Text style={styles.subtitle}>其实谁先都一样的啦</Text>
      </View>
      <FlatList data={data} renderItem={renderHumanData} keyExtractor={(item) => item.id} style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }} />
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
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textbox: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginTop: 2,
    paddingRight: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    marginVertical: 8,
    alignSelf: 'center',
    width: '90%'
  }
});
