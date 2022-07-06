import styles from "./styles.module.scss";
function Posting({ data }) {
  console.log(data);
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
  const text = data.text;
  const todayDate = new Date().toLocaleDateString();
  return (
    <div>
      {url ? (
        <a
          href={url}
          alt="link to company's site"
          target="_blank"
          rel="noreferrer"
          className={styles.wrap}
        >
          <div>{companyTitle}</div>
          <div>{companyInfo}</div>
          <div>{todayDate}</div>
        </a>
      ) : (
        <div className={styles.wrap}>
          <div>{companyTitle}</div>
          <div>{companyInfo}</div>
          <div>{todayDate}</div>
        </div>
      )}
    </div>
  );
}

export default Posting;
