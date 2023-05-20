import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


function Search() {
  const user = useSelector(store => store.auth.user);
  const [search, setSearch] = useState([]);
  const [keyword, setKeyword] = useState("");
  const config = {
    headers:
      { 'Authorization': 'Bearer ' + user.token }
  }
  useEffect(() => {
    axios.get(`https://medicalstore.mashupstack.com/api/medicine/search?keyword=${keyword}`, config

    ).then(response => {
      console.log(response)
      setSearch(response.data)
    })
  }, [keyword, user.token])



  return (
    <div className="p-5">
      <form >
        <input className="btn btn-outline"
          type="text" placeholder="Search here " value={keyword} onChange={e => setKeyword(e.target.value)} />
      </form>
      <div>
        {search.map((search) => (
          <div key={search.id}>
            <h3>{search.name}</h3>
            <p>Company: {search.company}</p>
            <p>Expiry date: {search.expiry_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
