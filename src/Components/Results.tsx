import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchResults } from "../FetchingApi/useFetchResults";
import { API_URL } from "../services/API_URL";
import { Pagination } from "../services/Pgination";
import "./Home.css";

const Results = ({ searchTerm }: any) => {
  let { results, kFetch } = useFetchResults();

  useEffect(() => {
    kFetch(`${API_URL}questionsans/${searchTerm}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // const myStyle: any = {
  //   margin: "10px",
  //   textAlign: "center",
  //   paddingBottom: "10px",
  // };
  // const cardStyle: any = {
  //   borderRadius: "10px",
  //   backgroundImage: "linear-gradient(to right, #F0E68C , #FBCEB1)",
  //   height: "165px",
  // };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const paginate = (item: number) => {
    setCurrentPage(item);
    window.scrollTo(0, 0);
  };
  const lastIndex: number = currentPage * postsPerPage;
  const firstIndex: number = lastIndex - postsPerPage;
  const currentPost = results && results.slice(firstIndex, lastIndex);

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      {/* <div className="home__header">
        <div className="sorting__div">
          <label>Sort by</label>
          <select className="m-1" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Oldest</option>
            <option value="desc">Latest</option>
          </select>
        </div>
        <span className="m-3">
          {auth.id} ({auth.role})
        </span>
      </div> */}
      <div className="container my-4 mx-auto">
        <div className="row row-cols-3 row-cols-md-3 g-4">
          {results &&
            currentPost.map((val: any, key: any) => {
              console.log(val);
              return (
                // <div className="col-lg-4 mb-4" key={val.questionId}>
                //   <div style={cardStyle} className="card">
                //     <div className="card-body">
                //       <h5 className="card-title">{val.question}</h5>
                //       <Link
                //         style={{ textDecoration: "none" }}
                //         to={`/Details/${val.questionId}`}
                //       >
                //         Read More
                //       </Link>
                //     </div>
                //   </div>
                // </div>

                <div className="col" key={val.questionId}>
                  <div
                    className="card p-0"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#D6D6D6",
                    }}
                  >
                    <div className="card-header text-secondary">
                      {val.createdBy}
                    </div>
                    {/* <img src={imgUrl} className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                      <h5
                        className="card-title"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {val.question.substring(0, 20)}...
                      </h5>
                      {/* <p className="card-text">{desc.substring(0, 20)}...</p> */}
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/Details/${val.questionId}`}
                      >
                        Read More
                      </Link>
                    </div>
                    <div className="card-footer">
                      <small className="text-body-secondary text-secondary">
                        {val.dateLog.split(",")[0]}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {currentPost && (
        <Pagination
          first={postsPerPage}
          last={currentPost.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>

    // <div className="container">
    //   <div>
    //     <h1 style={myStyle}>
    //       Question <span style={{ color: "red" }}>&</span> Answer
    //     </h1>
    //   </div>
    //   <div className="row">
    //     {results &&
    //       currentPost.map((val: any, key: any) => {
    //         return (
    //           <div className="col-lg-4 mb-4" key={val.questionId.S}>
    //             <div style={cardStyle} className="card">
    //               <div className="card-body">
    //                 <h5 className="card-title">{val.question.S}</h5>
    //                 <p
    //                   className="card-text text-truncate"
    //                   style={{ maxWidth: "700px" }}
    //                 >
    //                   <div
    //                     dangerouslySetInnerHTML={{
    //                       __html: DOMPurify.sanitize(val.answer.S),
    //                     }}
    //                   />{" "}
    //                 </p>
    //                 <Link
    //                   style={{ textDecoration: "none" }}
    //                   to={`/Details/${val.questionId.S}`}
    //                 >
    //                   Read More...
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       })}
    //   </div>
    //   {results && (
    //     <Pagination
    //       first={postsPerPage}
    //       last={results.length}
    //       paginate={paginate}
    //       currentPage={currentPage}
    //     />
    //   )}
    // </div>
  );
};

export default Results;
