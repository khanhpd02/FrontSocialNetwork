import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { RecoilRoot } from "recoil";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// import { AuthContextProvider } from "src/context/AuthContext";
// import { ChatContextProvider } from "src/context/ChatContext";

<PersistGate loading={null} persistor={persistor}></PersistGate>;
root.render(
  <Provider store={store}>
    <RecoilRoot>
      <AuthContextProvider>
        <ChatContextProvider>
          <Provider store={store}>
            <RecoilRoot>
              <App />
            </RecoilRoot>
          </Provider>
        </ChatContextProvider>
      </AuthContextProvider>
    </RecoilRoot>
  </Provider>
);
