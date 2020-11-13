import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Human: undefined;
  PersonScreen: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type HumanParamList = {
  HumanScreen: undefined;
  PersonScreen: undefined;
};

export type HumanProps = {
  route: RouteProp<BottomTabParamList, 'Human'>;
  navigation: StackNavigationProp<BottomTabParamList, 'Human'>;
}

export type PersonProps = {
  route: RouteProp<HumanParamList, 'PersonScreen'>;
  navigation: StackNavigationProp<HumanParamList, 'PersonScreen'>;
}

// Models the data for every person
export interface HumanData {
  id: string,
  name: string,
  password: string,
  words: string,
  videoURL: string,
  avatarURL: string,
}