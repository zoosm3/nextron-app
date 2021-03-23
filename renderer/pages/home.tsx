import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import axios from "axios";
import User from "../user";

const Home = () => {
  const [users, setUsers] = useState<User[] | null>([])

  useEffect(() => {
    const getUser = async () => {
       await axios.get('/api/users').then(result => setUsers(result.data))
    }
    getUser()
  }, [])

  // @ts-ignore
    return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <h1>Users:</h1>
      <div>
        <ul>
          { users.map(user => (<li>ID {user.id} Name {user.name}</li>)) }
        </ul>

      </div>
    </React.Fragment>
  );
};

export default Home;
