import { Stack } from 'expo-router/stack';
import { AntDesign } from '@expo/vector-icons';

export default function Layout() {
  return <Stack
  screenOptions={{headerTintColor: 'white', 
  headerTitleAlign: 'center',
  headerStyle: {backgroundColor:'grey', fontWeight: 'bold'}}}>
<Stack.Screen name='ListContacts' options={{title: 'Contacts List:',
headerRight:()=>(<AntDesign name="team" size={24} color="white" />)}}/>
<Stack.Screen name='ProfileContact' options={{title: 'Contact Profile:',
headerRight:()=>(<AntDesign name="user" size={24} color="white" /> )

}}/>
   </Stack>;
}