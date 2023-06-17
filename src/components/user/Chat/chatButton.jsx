import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import Chat from './chat';

const ChatButton = ({action}) => {
  return (
    <>
    <div className="fixed bottom-4 right-4 z-10">
      <button onClick={(()=>action())} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center focus:outline-none">
        <FontAwesomeIcon icon={faComments} />
      </button>
    </div>
    </>
  );
};

export default ChatButton;
