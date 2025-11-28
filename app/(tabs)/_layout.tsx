import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='map' options={{ headerShown: false }} />
        <Tabs.Screen name='profil' options={{ headerShown: false }} />
        <Tabs.Screen name='shop' options={{ headerShown: false }} />
        <Tabs.Screen name='historique' options={{ headerShown: false, href: null }} />
    </Tabs>
  );
};

export default TabsLayout;