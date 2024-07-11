import {store} from "./lib/services/reduxStore"
import { Provider } from "react-redux";
import RoutesComponent from "./Routes";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RoutesComponent/>
      </Provider>
    </div>
  );
}

export default App;
