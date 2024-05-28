import { useState, useEffect } from "react";
import localData from "./data/data";
import { createClient } from "contentful";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const space = "f5tcp40e8krx";
  const accessToken = "JAFIfvuB9iid1VaMJXQrVZl2dIUHU8J7_XI45K73MHc";
  const client = createClient({
    space,
    environment: "master", // defaults to 'master' if not set
    accessToken,
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
