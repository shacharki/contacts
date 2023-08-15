
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link, useRootNavigationState } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    ActivityIndicator,
    FlatList,
    Pressable,
} from 'react-native';
import * as Contacts from 'expo-contacts';
const StyledHeader = "bg-white space-y-8 p-8 sm:px-8 sm:py-6 lg:p-2 xl:px-6 xl:py-6 items-center justify-center"
const StyledContacts = "font-semibold flex-1 minHeight-70 padding-5 text-slate-2000 items-center justify-center";
const StyledContact = "w-90 bg-red  flex-1 items-center justify-center shadow rounded";
const StyledContactNumber = 'text-500 flex-1 items-center justify-center text-md font-bold mt-2';
const StyledLoading = '"flex-1 items-center justify-center"';
const StyledSearch = "focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-100 shadow-sm"

const ContactList = (() => {
    const [error, setError] = useState(undefined);

    const [masterData, setcontact] = useState([]); //say set main state 
    const [filterData, setFilterData] = useState([]); // filter state
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        (async () => {
            setIsLoading(true)
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
                const itemData = `${item.firstName || ''} ${item.lastName || ''}`
                itemData.toUpperCase()
                const textData = text?.toString().toUpperCase()
                return (first || last).indexOf(textData) > -1;
            });
            setFilterData(newData)
            setSearchText(text)
        } else {
            setFilterData(masterData)
            setSearchText(text)
        }
        setIsLoading(false)
    }


    const ItemSeparatorView = () => {
        return (<View style={{ height: 0.5, width: "100%", backgroundColor: "black" }} />)
    }

    const renderItem = (item) => (
        <Link
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
            <View style={{ minHeight: 70, padding: 5 }} className={StyledContacts}>
                <AntDesign name="user" size={24} color="black" />
                <Text>
                    {item?.firstName == null
                        ? "update name in your contacts"
                        : item.firstName}
                    {item?.lastName == null ? null : item.lastName}
                </Text>
                <Text style={{ color: "red" }}>
                    {item?.phoneNumbers == undefined || null
                        ? []
                        : item?.phoneNumbers[0]?.number}
                </Text>
            </View>
        </Link>

    );

    return (
        <SafeAreaView className={StyledHeader}>
            <Link href={{ pathname: "/ProfileContact", params: { name: 'shachar', lastName: 'kinreich' } }}>About</Link >
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
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (renderItem(item))}
                    ItemSeparatorComponent={ItemSeparatorView}
                    ListEmptyComponent={() => (
                        <Text style={{ fontSize: 20, marginVertical: 40 }}>No contact </Text>)}
                />}
            <Text>{error}</Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );


})

export default ContactList;
