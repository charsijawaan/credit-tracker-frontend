import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import PrivateRoute from "./components/utils/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
