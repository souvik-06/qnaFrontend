// import { createStyles, makeStyles, Theme } from "@material-ui/core";
import "./Pagination.css";

interface propsType {
  first: number;
  last: number;
  paginate: any;
  currentPage: number;
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     ul: {
//       listStyle: "none",
//       display: "flex",
//       marginTop: 50,
//     },
//     li: {
//       marginLeft: 5,
//     },
//     button: {
//       padding: "10px",
//       background: "none",
//       border: "none",
//       borderRadius: "20%",

//       "&:hover": {
//         backgroundColor: "black",
//         color: "white",
//       },
//     },
//     spanBg: {
//       backgroundColor: "black",
//       color: "white",
//     },
//   })
// );

export function Pagination(props: propsType) {
  const pageNumbers: number[] = [];
  // const classStyle = useStyles();
  for (let i = 1; i <= Math.ceil(props.last / props.first); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination__div">
      <ul>
        {pageNumbers.map((item) => (
          <li key={item}>
            <button
              onClick={() => {
                props.paginate(item);
              }}
            >
              {/* {item} */}
              {item === props.currentPage ? (
                <span>{item}</span>
              ) : (
                <span>{item}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
