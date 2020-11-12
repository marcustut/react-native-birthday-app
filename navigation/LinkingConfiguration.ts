import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Human: {
            screens: {
              HumanScreen: {
                path: 'human/:name',
                parse: {
                  name: (name: any) => `${String(name).toLowerCase()}`,
                },
                stringify: {
                  name: (name: any) => name,
                },
              },
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
