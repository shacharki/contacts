
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link,Redirect,useRootNavigationState  } from 'expo-router';
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
const StyledHeaderText = "font-semibold text-slate-2000 items-center justify-center";
const StyledContact = "w-90 bg-red flex-1 items-center justify-center shadow rounded";
const StyledContactNumber = 'text-500 flex-1 items-center justify-center text-md font-bold mt-2';
const StyledPhoneNumber = '"text-blue-500"';
const StyledSearch = "focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-100 shadow-sm"

const ContactList = (() => {
    const [error, setError] = useState(undefined);

    const [allcontacts, setcontact] = useState([]); //say set main state 
    const [allcontactsfilter, setcontactfilter] = useState([]); // filter state
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
 
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            // try {
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
                    setcontactfilter(data)
                } else {
                    setError("no contacts faund.")
                }
                setIsLoading(false)

            } else {
                setError("Permission to access contact denied.")
            }
            // }catch (error) {
            //         alert(error)
            //       }
        })();
    }, []);

    const getContactData = (data, property) => {
        if (data) {
            return data.map((data, index) => {
                return (
                    <View key={index}>
                        <Text className={StyledPhoneNumber}> {index == 0 && data[property]}</Text>
                    </View>
                )

            });
        }
    }



    const filtercontacts = (value) => {
        // setSearchText(event)
        console.log("1111", value)
        setIsLoading(true)
        console.log("1111", isLoading)
        const filtervalue = allcontactsfilter?.filter((contact) => {
            //console.log("22222", contact)

            if (contact.firstName && contact.lastName) {
                let lowercase = `${contact.firstName} ${contact.lastName}`
                lowercase.toLowerCase();
                //console.log("33333", lowercase)

                let searchlowercase = (value || "")?.toString().toLowerCase();
                //console.log("44444", searchlowercase)

                // if (lowercase != undefined && searchlowercase != undefined)
                return lowercase?.indexOf(searchlowercase) > -1;
            }
        });
        setSearchText(setcontact(filtervalue));
        setIsLoading(false)
    };

    const renderItem = ( item ) => (
    //     <Link
    //     href= "/ProfileContact"
    //       // /* 1. Navigate to the details route with query params */
    //     //   params: { item },
    //   > 
        <View style={{ minHeight: 70, padding: 5 }}>
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
        // </Link>
    );

    return (
        <SafeAreaView className={StyledHeader}>
            <Text className={StyledHeaderText}>Contacts List:</Text>
            <Link  href={{pathname: "/ProfileContact", params: {name: 'shachar', lastName: 'kinreich'}}}>About</Link >
            <TextInput
                className={StyledSearch}
                type={"text"}
                name={"search"}
                placeholder={'search contact...'}
                value={searchText}
                onChange={value => filtercontacts(value)}
                disabled={isLoading} />
            {isLoading ? (
                <View>
                    <ActivityIndicator size={35} color="green" />
                </View>
            ) :
                <FlatList
                    data={allcontacts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (renderItem(item))}
                    ListEmptyComponent={() => (
                        <Text style={{ fontSize: 20, marginVertical: 40 }}>No contact </Text>)}
                />}
            {/* {getAllContacts()} */}
            <Text>{error}</Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );


})

export default ContactList;
