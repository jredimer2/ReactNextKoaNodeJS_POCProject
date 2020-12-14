import React, { useState, useCallback, Component } from 'react';
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';
import testAuthenticator from 'components/SimAuthentication'
import AuthenticateButton from 'components/AuthenticateButton'
import loadCustomRoutes from 'next/dist/lib/load-custom-routes';

export default function MenuBar(props) {

     return (
        <div>
            <AuthenticateButton onClick={() => {
                console.log('>>>>> AuthenticateButton button clicked ')
                testAuthenticator()
            }
            }>Create cookie</AuthenticateButton>
            <Button title="Load Users List"></Button>
        </div>

    )
}


MenuBar.getInitialProps = async function (ctx) {
    let merchants = {};
    let users = {};
    let responseUsers;
  
    // step2: get users
    try {
  
      const token = getToken(ctx)
      console.log("***** TOKEN = ", token)
  
      responseUsers = await axios.get(`${config.dbrootport}/users?merch_id=${config.merch_id}`, {
        headers: {
          'Authorization': `Bearer ${getToken(ctx)}`
        }
      }
      )
      
    } catch (err) {
      console.error(err);
    }
  
    if (responseUsers != undefined) { users = responseUsers.data }
   
    console.log(">> >> >> MenuBar.Users = ", users)
  
    return { merchants, users }
  }