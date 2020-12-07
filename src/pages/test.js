import React, { useState } from 'react';
import { Page, Card } from '@shopify/polaris';
import Merchants from 'components/Merchants'
import Users from 'components/Users'
import config from 'config'

function Test(props) {

  // step4: destructure merchants and users and pass them to Merchants and Users Components
  const { merchants, users } = props;

  console.log('>>>>>> USERS = ', users)

  return (
    <Page title="Multiple queries to a page">
      <Card>
        <Users jsonResponse={users} />
      </Card>
    </Page>

  )
}

// This is to query Merchants list
Test.getInitialProps = async function () {
  let merchants = {};
  let users = {};

  // step1: get merchants
  /*
  try {
    const res1 = await fetch(`http://localhost:3001/merchants`)
    merchants = await res1.json()
  } catch(err) {
    console.error(err);
  }
*/
  // step2: get users
  try {
    const tokenRes = await fetch(`${config.dbrootport}/login`, { method: 'POST' })  
    const tokenJson = await tokenRes.json()

    // token a
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImpvZSIsImVtYWlsIjoiam9lQGdtYWlsLmNvbSIsIm1lcmNoX2lkIjoiMGM2ZjQ4YjctN2Q0Yi00NGNhLWJmOTQtNTg4YzU4OGVlMzBhIn0sImlhdCI6MTYwNzMxMzI3OH0.0eLE2eybZ9yCE2NKq7at3CqrOyslB-C-pcTfDOcmkLU'

    // token b
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImpvZSIsImVtYWlsIjoiam9lQGdtYWlsLmNvbSIsIm1lcmNoX2lkIjoiMGM2ZjQ4YjctN2Q0Yi00NGNhLWJmOTQtNTg4YzU4OGVlMzBiIn0sImlhdCI6MTYwNzMxNjU2NX0.fUKPTs0uO1XqHjEnYl6hXoIc7AYl49DNKi-wl8Ui0Ls'

    console.log(">>>>>>>>>>>> TOKEN = ", tokenJson.token)
    const res2 = await fetch(`${config.dbrootport}/users/?merch_id=${config.merch_id}`, {
      headers: {
        'Authorization': `Bearer ${tokenJson.token}`
      }
    })

    console.log(">>>>>>>>>>>> RES2 = ", res2)

    users = await res2.json()

  } catch (err) {
    console.error(err);
  }

  // step3: return them both together and in Test function destructure them
  return { merchants, users }
}

// Question: How do I query Users list? there's only one getInitialProps()

export default Test;