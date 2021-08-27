import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/Body";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { store, rrfProps } from "./store/store";

export default function App() {
  return (
    <Provider store={store} className="App">
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Body />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
