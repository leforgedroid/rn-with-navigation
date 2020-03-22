import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RootNavigation';
import {Home} from './src/pages/Home';
import {Splash} from './src/pages/Splash';
import {Login} from './src/pages/Login';
import {useInterval} from './src/hooks/Time';

// React-navigation stack section
type AppStackParmList = {
  Home: {userId: string; name: string};
  Login: {userId: string; name: string};
  Splash: undefined;
};
const AppStack = createStackNavigator<AppStackParmList>();

// **** Start - Reducer section
enum LoginActionType {
  LogIn = 'login',
  LogOut = 'logout',
}
interface ILoginState {
  userId: string;
  email: string;
  token: string;
}
interface ILoginAction {
  type: LoginActionType;
  payload: {
    userId: string;
    email: string;
    token: string;
  };
}
const initialLoginState: ILoginState = {
  userId: '',
  email: '',
  token: '',
};
const loginReducer: React.Reducer<ILoginState, ILoginAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case LoginActionType.LogIn:
      return {
        userId: 'leforge',
        email: 'leforgedroid@gmail.com',
        token: 'asdfasdf',
      };
    case LoginActionType.LogOut:
      return {loggedIn: false, userId: '', email: '', token: ''};
    default:
      throw new Error('Login Reducer Action Type mismatch');
  }
};
// **** End - Reducer section

const App: React.FunctionComponent = () => {
  const [hideSplash, setHideSplash] = useState(false);
  const [authState, loginDispatch] = React.useReducer<
    React.Reducer<ILoginState, ILoginAction>
  >(loginReducer, initialLoginState);
  useInterval(() => {
    setHideSplash(true);
  }, 2000);
  if (!hideSplash) {
    return <Splash />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator initialRouteName="Home">
        <AppStack.Screen
          name="Home"
          component={Home}
          initialParams={{userId: '', name: ''}}
          options={{title: 'My Home'}}
        />
        <AppStack.Screen
          name="Login"
          component={Login}
          initialParams={{name: 'Tim LeForge', userId: 'test'}}
          options={{title: 'Login'}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
