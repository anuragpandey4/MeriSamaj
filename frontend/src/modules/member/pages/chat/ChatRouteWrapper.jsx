import React from 'react';
import { useParams } from 'react-router-dom';
import ChatPage from '../social/ChatPage';
import ChatRoomPage from './ChatRoomPage';

const ChatRouteWrapper = () => {
  // Routes use either :memberId (line 116) or :chatId (line 149) as param name
  const params = useParams();
  const id = params.id || params.chatId || params.memberId;

  if (id && id.startsWith('c')) {
    return <ChatRoomPage chatId={id} />;
  }
  return <ChatPage memberId={id} />;
};

export default ChatRouteWrapper;
