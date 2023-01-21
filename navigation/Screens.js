import { Animated, Dimensions, Easing } from 'react-native';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';
import Record from '../screens/ReportDisasters/Record';
import Success from '../screens/ReportDisasters/Success';
import Articles from '../screens/Articles';
import { Block } from 'galio-framework';
import Components from '../screens/Components';
// drawer
import CustomDrawerContent from './Menu';
// screens
import Home from '../screens/Home';
import DisasterReports from '../screens/ReportDisasters/DisasterReports';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import React from 'react';
import Register from '../screens/Register';
import Camps from '../screens/Camps';
// import SettingsScreen from '../screens/Settings';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CreateReports from '../screens/ReportDisasters/CreateReport';
import FloodForm from '../screens/ReportDisasters/FloodForm';
import ReportDetails from '../screens/ReportDisasters/ReportDetails';
import DamageReportDetails from '../screens/DamageReprots/ReportDetails';
import Ticket from '../screens/TicketInformation/Ticket';
import CreateAccount from '../screens/CreateAccount';
import TrendingReports from '../screens/TrendingReports.js/TrendingReports';
import DamageReports from '../screens/DamageReprots/DamageReports';
import Create from '../screens/DamageReprots/Create';
import Alerts from '../screens/Alerts/Alerts';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AlertsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Alerts"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        options={{
          header: ({ navigation }) => <Header title="Alerts" navigation={navigation} />,
          backgroundColor: '#FFFFFF',
        }}
        name="Alerts"
        component={Alerts}
      />
    </Stack.Navigator>
  );
}

function DamageReportsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="DamageReports"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="DamageReports"
        component={DamageReports}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Damage Reports" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />

      <Stack.Screen
        name="Create Damage Report"
        component={Create}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Fund Allottment Details"
        component={DamageReportDetails}
        // options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Create Report" component={CreateReports} />

      <Stack.Screen options={{ headerShown: false }} name="Record" component={Record} />
      <Stack.Screen name="Floods" component={FloodForm} />
      <Stack.Screen name="Success" options={{ headerShown: false }} component={Success} />
      <Stack.Screen name="Details" component={ReportDetails} /> */}
    </Stack.Navigator>
  );
}

function ReportDisasterStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Report Disaster"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="DisasterReports"
        component={DisasterReports}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Disaster Reports" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen name="Create Report" component={CreateReports} />

      <Stack.Screen options={{ headerShown: false }} name="Record" component={Record} />
      <Stack.Screen name="Floods" component={FloodForm} />
      <Stack.Screen name="Success" options={{ headerShown: false }} component={Success} />
      <Stack.Screen name="Details" component={ReportDetails} />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Login" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white title="Profile" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  const tabs = [
    {
      id: 'registerations',
      title: 'Registerations',
    },
    {
      id: 'camps',
      title: 'Camps',
    },
  ];
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen name="Ticket Details" component={Ticket} />
      <Stack.Screen
        name="Camps"
        component={Camps}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Camps" options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Alerts"
        component={AlertsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Disaster Reports"
        component={ReportDisasterStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Damage Reports"
        component={DamageReportsStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Register}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Create Account"
        component={CreateAccount}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
