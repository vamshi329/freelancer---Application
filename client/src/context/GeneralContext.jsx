import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socketIoClient from 'socket.io-client';
import API_URL from '../config/api';

export const AuthContext = createContext();
export const ChatContext = createContext();

const AuthContextProvider = ({children}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  const login = async () =>{
    try{
      const loginInputs = {email, password}
        await axios.post(`${API_URL}/login`, loginInputs)
        .then( async (res)=>{
          localStorage.setItem('userId', res.data._id);
          localStorage.setItem('usertype', res.data.usertype);
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('email', res.data.email);
          if(res.data.usertype === 'freelancer'){
              navigate('/freelancer');
          } else if(res.data.usertype === 'client'){
            navigate('/client');
          } else if(res.data.usertype === 'admin'){
              navigate('/admin');
          }
        }).catch((err) =>{
          alert("login failed!!");
          console.log(err);
        });
    }catch(err){
      console.log(err);
    }
  }

  const inputs = {username, email, usertype, password};

  const register = async () =>{
    try{
        await axios.post(`${API_URL}/register`, inputs)
        .then( async (res)=>{
            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('usertype', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            if(res.data.usertype === 'freelancer'){
              navigate('/freelancer');
          } else if(res.data.usertype === 'client'){
            navigate('/client');
          } else if(res.data.usertype === 'admin'){
              navigate('/admin');
          }
        }).catch((err) =>{
            alert("registration failed!!");
            console.log(err);
        });
    }catch(err){
        console.log(err);
    }
  }

  const logout = async () =>{
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype}}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatContextProvider = ({children}) => {
  const WS = API_URL; // Use the same dynamic URL
  const socket = socketIoClient(WS, {
    transports: ["websocket"],
  });
  return (
    <ChatContext.Provider value={{socket}}>
      {children}
    </ChatContext.Provider>
  );
};

export { AuthContextProvider, ChatContextProvider };