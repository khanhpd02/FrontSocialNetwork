// import { createContext, useReducer, ReactNode, Dispatch } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

// // Define the shape of the context data
// interface ChatState {
//   chatId: string;
//   user: Record<string, any>;
// }

// // Define action types
// type ChatAction = { type: "CHANGE_USER"; payload: Record<string, any> };

// // Create the context with proper types
// export const ChatContext = createContext<
//   | {
//       data: ChatState;
//       dispatch: Dispatch<ChatAction>;
//     }
//   | undefined
// >(undefined);

// interface ChatContextProviderProps {
//   children: ReactNode;
// }

// export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
//   const currentUser = useSelector((state: RootState) => state.info.info);

//   const INITIAL_STATE: ChatState = {
//     chatId: "null",
//     user: {},
//   };

//   const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
//     switch (action.type) {
//       case "CHANGE_USER":
//         return {
//           user: action.payload,
//           chatId:
//             currentUser.data.firebaseData.uid > action.payload.uid
//               ? currentUser.data.firebaseData.uid + action.payload.uid
//               : action.payload.uid + currentUser.data.firebaseData.uid,
//         };

//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//   return (
//     <ChatContext.Provider value={{ data: state, dispatch }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Define the shape of the context data
interface ChatState {
  chatId: string;
  user: Record<string, any>;
}

// Define action types
type ChatAction = { type: "CHANGE_USER"; payload: Record<string, any> };

// Create the context with proper types
interface ChatContextType {
  data: ChatState;
  dispatch: Dispatch<ChatAction>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const currentUser = useSelector((state: RootState) => state.info.info);

  const INITIAL_STATE: ChatState = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.data.firebaseData.uid > action.payload.uid
              ? currentUser.data.firebaseData.uid + action.payload.uid
              : action.payload.uid + currentUser.data.firebaseData.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};
