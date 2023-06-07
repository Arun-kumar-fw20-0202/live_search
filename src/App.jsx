import axios from "axios";
import { throttle } from "lodash";
import "./App.css";
import { useEffect, useState } from "react";
import { Items } from "./Components/items";

function App() {
  const [search, setSearch] = useState("");
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const throttledSearch = throttle((value) => {
      if (value != "") {
        setLoading(true);
        axios
          .get(
            `https://live-search-data.onrender.com/list?_limit=10&q=${search}`
          )
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(true);
          });
      } else {
        setData([]);
      }
    }, 1000); // Adjust the throttle time (in milliseconds) as per your needs

    throttledSearch(search);

    let items = document.querySelector(".items");
    if (search != "") {
      items.classList.add("active");
    } else {
      items.classList.remove("active");
    }

    return () => {
      throttledSearch.cancel();
    };
  }, [search]);

  // console.log(data);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  // console.log(newData);

  return (
    <>
      <div className="main">
        <header>
          <div className="inputbx">
            <input
              onChange={handleSearchChange}
              type="search"
              placeholder="Your Query..."
            />
          </div>
          <div className="links">
            <a href="#">Home</a>
            <a href="#">Course</a>
            <a href="#">About Us</a>
            <a href="#">Settings</a>
          </div>
        </header>
        <div className="items">
          <>
            {loading ? (
              <h1>Please Wati...</h1>
            ) : (
              data.map((ele, i) => <Items key={i} {...ele} />)
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default App;
