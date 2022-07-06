import { useEffect, useState } from "react";
import Posting from "../Posting";
import Loading from "../Loading";
import styles from "./styles.module.scss";

function Board() {
  const [postIds, setPostIds] = useState([]);

  // on page load, fetch all post IDs
  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/jobstories.json`)
      .then((res) => res.json())
      .then((data) => {
        setPostIds(data);
      });
  }, []);

  const [postData, setPostData] = useState([]);
  const [numPostDisplay, setNumPostDisplay] = useState(9);
  //   fetch data of first posting in the postIds array before moving on to next posting
  const fetchPostIds = async (data, num) => {
    if (data.length > 0) {
      // grab number of posting that should be displayed
      const dataToDisplay = data.slice(0, num);
      // work around to avoid duplicates on posts displayed
      const newStuff = [];
      for (const x in dataToDisplay) {
        const awaitData = await fetch(
          ` https://hacker-news.firebaseio.com/v0/item/${dataToDisplay[x]}.json`
        ).then((res) => res.json());
        newStuff.push(awaitData);
      }
      setIsLoading(false);
      setPostData(newStuff);
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  // fetch and display job postings on page load, and when user clicks to load more
  useEffect(() => {
    fetchPostIds(postIds, numPostDisplay);
  }, [postIds, numPostDisplay]);

  // handle when user clicks to load more
  const loadMorePosts = () => {
    setNumPostDisplay(numPostDisplay + 6);
    setIsLoading(true);
  };

  return (
    <div className={styles.outer}>
      <h2 className={styles.title}>HackerNews Jobs Bulletin</h2>
      <div className={styles.dataContainer}>
        {postData.length > 0
          ? postData.map((x, i) => {
              return (
                <div key={i}>
                  <Posting data={x} />
                </div>
              );
            })
          : null}
      </div>
      <div className={styles.dataLoading}>{isLoading ? <Loading /> : null}</div>
      {postData.length > 0 ? (
        <button onClick={loadMorePosts} className={styles.btn}>
          <span className={styles.btnTop}>load more</span>
          <span className={styles.btnBottom}></span>
        </button>
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default Board;
