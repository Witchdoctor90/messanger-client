import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatInput from './inputs/ChatInput';
import RegisterInput from "./inputs/RegisterInput";
import LoginInput from "./inputs/LoginInput"
import axios from 'axios'
import * as signalR from '@microsoft/signalr';
import message from "./Message";

const Chat = () => {
    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;



    useEffect(() => {
        if (connection) {

            connection.on('ReceiveMessage', message => {
                const updatedChat = [...latestChat.current];
                updatedChat.push(message);
                setChat(updatedChat);
            });

            connection.on('ReceiveFrom', (message, user) => {
                let msg = {
                    body: message.body,
                        user: user
                }
                const updatedChat = [...latestChat.current];
                updatedChat.push(msg);
                setChat(updatedChat);
            });

            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (message) => {
        const chatMessage = {
            MessageType: 0,
            Body: message,
        };

        if (connection) {
            try {
                await connection.send("Send", chatMessage);
                console.log("Sended", chatMessage);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const sendToUser = async(receiver, message) => {


        const chatMessage = {
            receiver: receiver,
            Body: message
        }

        if(connection){
            try{
                await connection.send("SendToUser", chatMessage);
                console.log(chatMessage, 'sended')
            }
            catch (error)
            {
                console.log(error);
            }
        }

    }
    const register = async (username, password) => {
        let user = {
            Username: username,
            Password: password
        }

        await axios.post('http://localhost:5193/Auth/Register', user);
    }

    const login = async(username, password) => {
        let user = {
            Username: username,
            Password: password
        }

        let response = await axios.post('http://localhost:5193/Auth/Token', user);
        setToken(response.data.access_token);
        console.log(response);
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5193/hubs/chat', {accessTokenFactory: () =>
                {
                    return localStorage.getItem("access_token");
                },
                transport: signalR.HttpTransportType.WebSockets
            }).configureLogging(signalR.LogLevel.Debug)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
        console.log('Authorized');
    }
    const setToken = (token) => localStorage.setItem("access_token", token);

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat}/>
            <LoginInput login={login}></LoginInput>
            <br/>
            <RegisterInput register={register}></RegisterInput>
        </div>
    );
};

export default Chat;