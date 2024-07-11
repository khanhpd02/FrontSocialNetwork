import { useEffect, useState } from "react";
import { useChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import MessageChatHome from "./Message/MessageChatHome";
const BodyRightChatHome = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useChatContext();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  return (
    <div className=" p-4 flex-1 overflow-y-auto  max-h-[21rem] w-full min-h-[21rem]">
      {messages.map((m, index) => (
        <MessageChatHome message={m} key={index} />
      ))}
    </div>
  );
};

export default BodyRightChatHome;
