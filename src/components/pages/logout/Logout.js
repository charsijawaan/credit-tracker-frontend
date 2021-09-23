import { useEffect } from "react";

function Logout({history}) {

  useEffect(() => {
    localStorage.clear();
    history.push('/');
  })

  return(<></>)

}

export default Logout;
