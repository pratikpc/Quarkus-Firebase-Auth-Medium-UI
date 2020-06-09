import React from 'react';

import firebase from "firebase/app";
import "firebase/auth";

export function ShowIfAuth(props) {
    if (User() != null)
        return <>{props.children}</>;
    else
        return <></>;
}
export function User(){
    return firebase.auth().currentUser;
}
export async function Token(){
    return await User().getIdToken();
}
export function ShowIfNoAuth(props) {
    if (User() == null)
        return <>{props.children}</>;
    else
        return <></>;
}
export async function SignOut(){
    return firebase.auth().signOut();
}

