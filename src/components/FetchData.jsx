import { useEffect, useState } from "react";

const FetchData = () => {
  const [state, setState] = useState([]);
  const url = "https://picsum.photos/v2/list?page=";
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(url + page)
      .then((response) => response.json())
      .then((data) => {
        let datawithLikes = data.map((item) => ({ ...item, like: 0 }));
        setState((prevState) => [...prevState, ...datawithLikes]);
      });
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = (id) => {
    setState((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, like: item.like + 1 } : item
      )
    );
  };

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "flex-end", width: "80%" }}>
        Photo Gallery
      </h1>
      <div className="mainContainer">
        {state?.map((item) => {
          return (
            <div className="container" key={item.id}>
              <img src={item.download_url} height={250} width={250} alt="" />
              <p>Author: {item.author}</p>
              <i
                className="fa-solid fa-thumbs-up"
                onClick={() => handleLike(item.id)}
                style={{ color: "#0c6df9" }}
              />
              <p>{item.like === 0 ? "" : item.like}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FetchData;
