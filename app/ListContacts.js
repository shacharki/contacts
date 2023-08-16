
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import * as Contacts from 'expo-contacts';

const StyledHeader = "bg-white p-8  sm:px-2 sm:py-6 lg:p-2 xl:px-2 xl:py-2 items-center justify-center"
const StyledContacts = "flex-1 items-center justify-center bg-white";
const StyledContact = "w-90 bg-red  flex-1 items-center justify-center shadow rounded";
const StyledContactNumber = 'text-500 flex-1 items-center justify-center text-md font-bold mt-4';
const StyledLoading = "flex-1 items-center justify-center space-y-5";
const StyledSearch = "flex-4 text-lg font-bold w-full  leading-16 placeholder-slate-1400 rounded-md py-3 pl-10 ring-1 ring-slate-100 shadow-sm"
const StyledText = "text-slate-800"
const styleUser = "space-y-14 "
const styleUserViwe = "bg-indigo-50 shadow-md h-20 px-max  font-semibold rounded-md border border-slate-200 items-center justify-center"

const ContactList = (() => {
    const [error, setError] = useState(undefined);
    const [masterData, setcontact] = useState([]); //say set main state 
    const [filterData, setFilterData] = useState([]); // filter state
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
                let first = ''
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
        <Link
            className={"p-3 l bg-white shadow rounded-lg items-center justify-center"}
            href={{
                pathname: "/ProfileContact",
                params: {
                    name: item?.firstName == null ? 'Missing name' : item.firstName,
                    lastName: item?.lastName == null ? '' : item.lastName,
                    phone: item?.phoneNumbers == undefined || null
                        ? []
                        : item?.phoneNumbers[0]?.number
                }
            }}
        >
                <FontAwesome5 name="user-circle" size={24} color="black" />

            <View className={"flex-auto flex space-x-5"}>
                <Text className={"text-s border-b "}>
                    {item?.firstName == null
                        ? "update name in your contacts"
                        : item.firstName}{" "}
                    {item?.lastName == null ? null : item.lastName}
                </Text>
                <Text className={"color-green"} >
                    {item?.phoneNumbers == undefined || null
                        ? []
                        : item?.phoneNumbers[0]?.number}
                </Text>
            </View>
        </Link>
    );

    return (
        <SafeAreaView className={StyledHeader}>
            <TextInput
                className={StyledSearch}
                autoCorrect={false}
                placeholder='search...'
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
                        <Text class={StyledText}>No contacts found</Text>)}
                />}
            <Text>{error}</Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
})

export default ContactList;
