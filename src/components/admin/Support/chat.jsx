// React code (AdminChat.js)

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Sidebar from './chatSidebar';
import { IoSendSharp } from 'react-icons/io5';
import { getChat, getConversation, sendMessage } from '../../../Api/AdminAPI';
import BASE_URL from '../../../config/config';

const socket = io(BASE_URL);

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    getChat(headers).then((res) => {
      const data = res.data;
      const users = data.map((message) => message.user);
      setUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message received', (newMessageReceived) => {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      });
    }
  }, []);

  const sendReply = (event) => {
    event.preventDefault();
    if (selectedUser && message.trim() !== '') {
      const data = {
        conversationId: conversationId,
        message: message,
      };
      socket.emit('new message', data);
      sendMessage(data, headers);
      setMessage('');
    }
  };

  const selectUser = (userId, username) => {
    setSelectedUser({ userId, username });
    getConversation(userId, headers).then((res) => {
      setMessages(res.data.messages);
      setConversationId(res.data._id);
      socket.emit('join chat', res.data._id);
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar Users={users} selectuser={selectUser} />
        <div className="flex bg-white w-full h-screen">
          {selectedUser ? (
            <div className="w-full flex flex-col  h-full">
              <div className="bg-blue-800 h-20  items-center flex">
                <h2 className="text-lg text-white ml-5 font-semibold">Chat with {selectedUser.username}</h2>
              </div>
              <div className="h-full overflow-auto scrollbar-thin mt-3 ">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${msg.sender === selectedUser.userId ? 'flex-row ' : 'flex-row-reverse'
                      } items-center mb-2 ml-2`}
                  >
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      alt=""
                      className="h-10 w-10 rounded-full mr-2"
                    />
                    <div
                      className={`${msg.sender === selectedUser.userId ? 'bg-gray-200' : 'bg-blue-500 text-white mr-2'
                        } py-2 px-4 rounded-lg max-w-3/4`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={sendReply}>
                <div className="border mt-2 border-blue-900 bg-blue-200 rounded-lg mb-2 mx-3">
                  <div className="flex">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-grow py-2 pl-2 bg-blue-200 rounded-lg focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center px-4 py-2 ml-2  text-white rounded-lg focus:outline-none"
                    >
                      <IoSendSharp size={20} className="text-blue-900" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-3/4 flex  items-center justify-center">
              <p className='text-2xl'>

                Please select a user to start the chat
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
