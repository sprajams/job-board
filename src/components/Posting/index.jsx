import styles from "./styles.module.scss";

function Posting({ data }) {
  // most posting has (YCW21) pattern, but account for off cases that do not
  const dataTitleArr = data.title.includes("(")
    ? data.title.split(")")
    : data.title.split(" ");
  const companyTitle = dataTitleArr[0] + ")";
  let companyInfo = dataTitleArr[1];
  //   trim special characters or spaces
  const regex = /[,."' ]/;
  if (regex.test(dataTitleArr[1][0])) {
    companyInfo = dataTitleArr[1].slice(1);
  }
  //   capitalize 1st letter
  companyInfo = companyInfo[0].toUpperCase() + companyInfo.slice(1);

  const url = data.url;
  const todayDate = new Date().toLocaleDateString();

  return (
    <div>
      <a
        // if job posting doesn't provide url, link to job posting at ycombinator
        href={url ? url : `https://news.ycombinator.com/item?id=${data.id}`}
        alt="link to company's site"
        target="_blank"
        rel="noreferrer"
        className={styles.wrap}
      >
        <div>{companyTitle}</div>
        <div>{companyInfo}</div>
        <div>{todayDate}</div>
      </a>
    </div>
  );
}

export default Posting;
