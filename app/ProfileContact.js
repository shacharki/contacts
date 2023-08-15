import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
    Text,
    View,
    SafeAreaView,
    Button,
    TextInput,
    ActivityIndicator,
    FlatList,
    Pressable
} from 'react-native';

const ProfileContact = (() => {
  const {name, lastName} = useLocalSearchParams()

    return (
        <SafeAreaView >
            <Text >Profile: {name} {lastName}</Text>
            <Button onPress={()=>router.back()} title='go back'/>
        </SafeAreaView>
    );


})

export default ProfileContact;

