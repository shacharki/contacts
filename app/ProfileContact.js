import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
    Text,
    View,
    SafeAreaView,
    Button,
    TextInput,
    ActivityIndicator,
   
} from 'react-native';

const ProfileContact = (() => {
  const {name, lastName, phone} = useLocalSearchParams()

    return (
        <SafeAreaView >
            <Text >Profile: {name} {lastName} {phone}</Text>
            <Button onPress={()=>router.back()} title='go back'/>
        </SafeAreaView>
    );


})

export default ProfileContact;

