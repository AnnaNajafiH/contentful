import { useState, useEffect } from "react";
import localData from "./data/data";
import { createClient } from "contentful";

import "./App.css";

function App() {
  const [data, setData] = useState([]);


  const client = createClient({
    space: import.meta.env.VITE_SPACE_ID ,
    environment: "master", // defaults to 'master' if not set
    accessToken:import.meta.env.VITE_ACCESS_TOKEN,
  });

  // const getAll = () => {
  //   client
  //     .getEntries()
  //     .then((response) => setData(response.items))
  //     .catch(console.error);
  // };

  const getAll = async (type = "user", limit = 10, skip = 5) => {
    try {
      const entry = await client.getEntries({
        content_type: type,
        limit,
        skip,
      });
      setData(entry?.items);
      // console.log(entry)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAll("user, 10 , 2");
    return () => {};
  }, []);

  return (
    <>
      {data.map((e) => (
        <div key={e?.fields.userId}>{e?.fields.userName}</div>
      ))}
    </>
  );
}

export default App;
