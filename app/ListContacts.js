
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import * as Contacts from 'expo-contacts';

const StyledHeader = "bg-white p-8 sm:px-2 sm:py-6 lg:p-2 xl:px-2 xl:py-2 items-center justify-center"
const StyledLink = "p-4 l padding items-center justify-center";
const StyledNameText = "flex-auto padding flex space-x-5";
const StyledLoading = "flex-auto p-20 items-center justify-center space-y-15";
const StyledSearch = "flex-5 text-lg border font-bold w-full placeholder-slate-1400 rounded-md py-3 pl-10 ring-1 ring-slate-100"
const StyledNoContacts = "p-4 l text-red-600 text-lg font-bold rounded-lg"
const styleUser = "space-y-14"
const StyledText = "text-left"

const ContactList = (() => {
    const [error, setError] = useState(undefined);
    const [masterData, setcontact] = useState([]);
    const [filterData, setFilterData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            setSearchText("")
            try {
                const { status } = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [
                            Contacts.Fields.FirstName,
                            Contacts.Fields.LastName,
                            Contacts.Fields.PhoneNumbers],
                    });
                    if (data.length > 0) {
                        setcontact(data)
                        setFilterData(data)
                    } else {
                        setError("no contacts faund.")
                    }
                    setIsLoading(false)
                } else {
                    setError("Permission to access contact denied.")
                }
            } catch (error) {
                alert(error)
            }
        })();
    }, []);

    const searchFilter = (text) => {
        if (text) {
            setIsLoading(true)
            const newData = masterData.filter((item) => {
                let first =''
                let last = ''
                if (item.firstName) {
                    first = item.firstName?.toString().toUpperCase()
                }
                if (item.lastName) {
                    last = item.lastName?.toString().toUpperCase()
                }
                const textData = text?.toString().toUpperCase()
                return ((first).indexOf(textData) > -1 || (last).indexOf(textData) > -1);
            });
            setFilterData(newData)
            setSearchText(text)
        } else {
            setFilterData(masterData)
            setSearchText(text)
        }
        setIsLoading(false)
    }

    const renderItem = (item) => (
        <View className={styleUser}>
            <Link
                className={StyledLink}
                href={{
                    pathname: "/ProfileContact",
                    params: {
                        firstName: item?.firstName == null ? 'Missing name' : item.firstName,
                        lastName: item?.lastName == null ? '' : item.lastName,
                        phone: item?.phoneNumbers == undefined || null
                            ? []
                            : item?.phoneNumbers[0]?.number
                    }
                }}
            >
                <FontAwesome5 name="user-circle" size={24} />
                <View className={StyledNameText}>
                    <Text className={StyledText}>
                        {item?.firstName == null
                            ? "update name in your contacts"
                            : item.firstName}{" "}
                        {item?.lastName == null ? null : item.lastName}
                    </Text>
                    <Text className={StyledText} >
                        {item?.phoneNumbers == undefined || null
                            ? []
                            : item?.phoneNumbers[0]?.number}
                    </Text>
                </View>
            </Link>
        </View>
    );

    return (
        <SafeAreaView className={StyledHeader}>
            <TextInput
                className={StyledSearch}
                autoCorrect={false}
                placeholder='  Search here...'
                value={searchText}
                onChangeText={text => searchFilter(text)}
                disabled={isLoading}
                clearButtonMode='always' />
            {isLoading ? (
                <View className={StyledLoading}>
                    <ActivityIndicator size={"large"} color="#5500dc" />
                </View>
            ) :
                <FlatList
                    className={"w-full "}
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (renderItem(item))}
                    ListEmptyComponent={() => (
                        <Text className={StyledNoContacts}>No Contacts Found</Text>)}
                />}
            <Text>{error}</Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
})

export default ContactList;
