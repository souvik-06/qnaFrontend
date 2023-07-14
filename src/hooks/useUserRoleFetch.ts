import { useState } from "react";
import { API_URL } from "../services/API_URL";

const useUserRoleFetch = (userEmail: string) => {
  const [data, setData] = useState();
  //fetch data of user
  try {
    fetch(`${API_URL}userinfo/${userEmail}`)
      .then(async (response) => await response.json())
      .then((result) => setData(result));
  } catch (err) {
    let error: any = err;
    console.log(error.message);
  }
  //return role of user
  return data;
};


export default useUserRoleFetch;
