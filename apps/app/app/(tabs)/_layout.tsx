import { SymbolView } from 'expo-symbols';
import { Link, Tabs } from 'expo-router';
import { View, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import TopNavBar from '@/components/nav/NavBar';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

const TAB_TITLES: Record<string, string> = {
  index: 'Tab One',
  two: 'Tab Two',
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('index');

  return (
    <View style={styles.container}>
      <TopNavBar
        title={TAB_TITLES[activeTab] ?? 'App'}
        rightAction={<ThemeSwitcher />}
      />
      <Tabs
        screenListeners={{
          state: (e) => {
            const state = e.data.state;
            const routeName = state.routes[state.index].name;
            setActiveTab(routeName);
          },
        }}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tab One',
            tabBarIcon: ({ color }) => (
              <SymbolView
                name={{ ios: 'chevron.left.forwardslash.chevron.right', android: 'code', web: 'code' }}
                tintColor={color}
                size={28}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Tab Two',
            tabBarIcon: ({ color }) => (
              <SymbolView
                name={{ ios: 'chevron.left.forwardslash.chevron.right', android: 'code', web: 'code' }}
                tintColor={color}
                size={28}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});