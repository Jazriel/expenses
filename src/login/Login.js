import moment from 'moment';
import React, { useContext } from 'react';
import {useDispatch} from 'react-redux';

import {actionCreators} from '../redux';
import {firebaseUi, uiConfig, getExpenses} from '../firebase';
import './Login.css';
import { NotificationsContext } from '../notifications/notifications';

export default ({className, onLoginCallback}) => {
    const dispatch = useDispatch();
    const alert = useContext(NotificationsContext);

    const config = {...uiConfig, callbacks: {
        ...uiConfig.callbacks,
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
            onLoginCallback();
            alert({message: 'Successfully signed in', severity: 'success'});
            dispatch(actionCreators.setUser(authResult.user));
            getExpenses(authResult.user.uid).then((expensesQuery) => {
                const expenses = expensesQuery.docs
                    .map(doc => doc.data())
                    .map(data => ({...data, date: moment(data.date)}));
                dispatch(actionCreators.setExpenses(Object.values(expenses)));
            });
            return false;
    }}};

    firebaseUi.start('#firebaseui-auth-container', config);

    return (
        <div className={className} id="firebaseui-auth-container" />);
}




// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   ],
//   // Terms of service url.
//   tosUrl: '<your-tos-url>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>'
// };


// The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);