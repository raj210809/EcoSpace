import { Drawer } from 'expo-router/drawer';

export default function HomeLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This ensures that index.tsx renders as the default screen for home
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="people" // Add more screens inside the drawer if needed
        options={{ drawerLabel: 'People' }}
      />
    </Drawer>
  );
}
