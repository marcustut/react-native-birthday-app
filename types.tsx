import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Human: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type HumanParamList = {
  HumanScreen: undefined;
};

export type HumanProps = {
  route: RouteProp<BottomTabParamList, 'Human'>;
  navigation: StackNavigationProp<BottomTabParamList, 'Human'>;
}