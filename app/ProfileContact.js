import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { EvilIcons,Ionicons } from '@expo/vector-icons';

import {
    Text,
    View,
    SafeAreaView,
    Button,
   
} from 'react-native';

const StyledHeader = "bg-white space-y-5 p-8 sm:px-8 sm:py-6 lg:p-2 xl:px-6 xl:py-6 items-center justify-center"
const StyledText = "p-4 l bg-white font-bold shadow rounded-lg"
const StyledButton = "bg-grey-500 hover:bg-green-700 text-white font-bold py-[5rem] px-4 rounded ml-4 mt-4"
const ProfileContact = (() => {
  const {name, lastName, phone} = useLocalSearchParams()

    return (
        <SafeAreaView className={StyledHeader} >
            <EvilIcons name="user" size={100} color="black" />
            <Text className={StyledText} >Name: {name} {lastName}</Text>
            <Text className={StyledText} >Phone: {phone}</Text>
            <Button className={StyledButton} onPress={()=>router.back()} title='go back'>
                <Ionicons name="chevron-back" size={24} color="black" /></Button>

      
        </SafeAreaView>
    );


})

export default ProfileContact;

