import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from "axios";
import User from "../user";

const Home = () => {
  const [users, setUsers] = useState<User[] | null>([])
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    const getUser = async () => {
      await axios.get('http://localhost:9001/api/users').then(result => setUsers(result.data))
    }
    const sayHello = async () => {
      await axios.get('http://localhost:9001/api/hello-world').then(result => setMessage(result.data.message))
    }
    getUser(),
    sayHello()
  }, [])

  // @ts-ignore
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <h1>{message}</h1>
      <h1>Users:</h1>
      <div>
        <ul>
          {users.map(user => (<li>ID {user.id} Name {user.name}</li>))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
