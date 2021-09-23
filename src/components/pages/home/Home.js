import { useEffect } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../utils/PrivateRoute";
import { userStore } from "./../../../store/store";
import { useRouteMatch } from "react-router";
import Navbar from "../../utils/Navbar";
import CreateEmployee from "./../create-employee/CreateEmployee";
import CreateCustomer from "./../create-customer/CreateCustomer";
import ManageCredit from "./../manage-credit/ManageCredit";
import Logout from "./../logout/Logout";

function Home({ history }) {
  let { path } = useRouteMatch();

  const user = userStore.useState((s) => s.user);

  useEffect(() => {
    if (user.user_type === "admin") history.replace("/home/emp");
    else history.replace("/home/cust");
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <PrivateRoute
          exact={true}
          path={`${path}/emp`}
          component={CreateEmployee}
        />
        <PrivateRoute
          exact={true}
          path={`${path}/cust`}
          component={CreateCustomer}
        />
        <PrivateRoute
          exact={true}
          path={`${path}/man-credit`}
          component={ManageCredit}
        />
        <PrivateRoute exact={true} path={`${path}/logout`} component={Logout} />
      </Switch>
    </>
  );
}

export default Home;
