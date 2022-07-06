import { useEffect, useState } from "react";
import Posting from "../Posting";
import styles from "./styles.module.scss";

function Board() {
  const [postIds, setPostIds] = useState([]);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/jobstories.json`)
      .then((res) => res.json())
      .then((data) => {
        setPostIds(data);
      });
  }, []);

  const [postData, setPostData] = useState([]);
  const [numPostDisplay, setNumPostDisplay] = useState(2);
  // on page load, display first 9 job postings
  const fetchPostIds = async (data, num) => {
    if (data.length > 0) {
      const dataToDisplay = data.slice(0, num);
      console.log(dataToDisplay);
      const newStuff = [];
      for (const x in dataToDisplay) {
        const awaitData = await fetch(
          ` https://hacker-news.firebaseio.com/v0/item/${dataToDisplay[x]}.json`
        ).then((res) => res.json());
        newStuff.push(awaitData);
      }
      setPostData(newStuff);
    }
  };
  useEffect(() => {
    fetchPostIds(postIds, numPostDisplay);
  }, [postIds, numPostDisplay]);

  const loadMorePosts = () => {
    setNumPostDisplay(numPostDisplay + 2);
  };

  return (
    <div>
      <h2>HackerNews Jobs</h2>
      <div className={styles.dataContainer}>
        {postData.length > 0
          ? postData.map((x, i) => {
              return (
                <div key={i}>
                  {/* <div>{i}</div>
                <div>{x.title}</div> */}
                  <Posting data={x} />
                </div>
              );
            })
          : null}
      </div>
      <button onClick={loadMorePosts}>load more jobs</button>
    </div>
  );
}
export default Board;
