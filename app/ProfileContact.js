import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { EvilIcons } from '@expo/vector-icons';

import {
    Text,
    SafeAreaView,
    Pressable

} from 'react-native';

const StyledHeader = "bg-white space-y-3 p-6 sm:px-8 sm:py-6 lg:p-2 xl:px-6 xl:py-6 items-center justify-center"
const StyledText = "p-4 l bg-white text-lg font-bold shadow rounded-lg"
const StyledButton = "bg-black leading-6 py-3 px-4 rounded-lg"
const ProfileContact = (() => {
    const { name, lastName, phone } = useLocalSearchParams()

    return (
        <SafeAreaView className={StyledHeader} >
            <EvilIcons name="user" size={100} color="black" />
            <Text className={StyledText} >Name: {name} {lastName}</Text>
            <Text className={StyledText} >Phone: {phone}</Text>
            <Pressable className={StyledButton} onPress={() => router.back()}>
                <Text className="text-white text-lg">
                    Go Back
                </Text>
            </Pressable>

        </SafeAreaView>
    );
})

export default ProfileContact;

