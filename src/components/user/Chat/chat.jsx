import React, { useEffect, useRef, useState } from 'react';
import { BiArrowBack, BiSupport } from 'react-icons/bi';
import { IoSendSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getChat, sendMessage, startConversation } from '../../../Api/userAPI';
import BASE_URL from '../../../config/config';
import { FaUserCircle } from 'react-icons/fa';

function Chat({ action }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [socket, setSocket] = useState(null);
  const messagesContainerRef = useRef(null);

  const user = useSelector((state) => state.user.data._id);
  const headers = { Authorization: `Bearer ${localStorage.getItem('userToken')}` };

  useEffect(() => {
    const newSocket = io(BASE_URL);
    setSocket(newSocket);
    newSocket.emit('setup', user);

    getChat(headers).then((res) => {
      setConversationId(res.data._id);
      setMessages(res.data.messages);
      newSocket.emit('join chat', res.data._id);
    });
   
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const data = {
    sender: user,
    message: message,
    conversationId: conversationId,
  };

  useEffect(() => {
    if (socket) {
      socket.on('message received', (newMessageReceived) => {
        setMessages([...messages, newMessageReceived]);

      });
    }
    scrollToLatestMessage();
  }, [socket, messages]);

  const scrollToLatestMessage = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleStartChat = () => {
    startConversation(user, headers)
      .then((res) => {
        const newConversationId = res.data.conversation._id;
        setConversationId(newConversationId);
      })
      .catch((error) => {
        console.error('Error starting conversation:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      try {
        socket.emit('new message', data);
        sendMessage(data, headers);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center fixed right-8 bottom-28 z-50 ">
        <div className="bg-[#E8F5FF] min-w-[300px] rounded-lg shadow-lg">
          <div className="flex justify-between bg-white rounded-t-lg py-2">
            <button onClick={(() => action())} className="top-0 relative left-5">
              <BiArrowBack size={20} />
            </button>
            <div>
              <img src="./public/favicon.ico" alt="" />
              <h1 className="text-2xl text-center">QuickServe</h1>
            </div>
            <div></div>
          </div>
          <div className="mx-5">
            <div className="w-full px-2 flex flex-col justify-between overflow-auto scrollbar-thin" ref={messagesContainerRef}>
              <div className="flex flex-col mt-5 h-96">
                {conversationId ? (
                  <>
                    <div className="flex justify-start mb-4">
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                      <div className="ml-2 py-3 px-4 max-w-4/6 bg-blue-900 rounded-br-xl rounded-tr-xl rounded-tl-xl text-white">
                        Hey, How can I Help You
                      </div>
                    </div>
                    <div className="">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.sender === user ? 'flex-row-reverse' : 'flex-row '
                            } mb-4`}
                        >
                          {message.sender === user ? (
                            <FaUserCircle size={32} color='#0D47A1'/>
                          ) : (
                            <img
                            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                            className="object-cover h-8 w-8 rounded-full"
                            alt=""
                          />
                          )}

                          <div
                            className={`ml-2 py-3 px-4 max-w-4/6 bg-blue-900  text-white ${message.sender === user
                              ? 'bg-green-900 mr-2  rounded-br-none rounded-tr-xl rounded-tl-xl rounded-bl-xl'
                              : 'rounded-br-xl rounded-tr-xl rounded-tl-xl'
                              }`}
                          >
                            {message.message}
                          </div>

                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Start chat button when conversation doesn't exist */
                  <div className="flex flex-col items-center justify-center h-full">
                    <button
                      onClick={handleStartChat}
                      className="py-2 px-4 mt-8 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none"
                    >
                      Start Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {conversationId && (
                /* Sending options when conversation exists */
                <div className="border mt-2 border-blue-900 rounded-lg mb-2 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full py-2 pl-2 pr-10 bg-blue-200 border border-blue-900 rounded-lg focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white focus:outline-none font-medium text-sm py-2"
                  >
                    <IoSendSharp size={20} className="text-blue-900" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
