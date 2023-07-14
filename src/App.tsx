import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddQnA from "./Components/AddQnA";
import { Error } from "./Components/Error";
import { Header } from "./Components/Header";
import Results from "./Components/Results";
import { Home } from "./Components/Home";
import { useFetchData } from "./FetchingApi/useFetchData";
import { Details } from "./Components/Details";
import { Master } from "./Master/Master";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Unauthorized from "./Components/Unauthorized";
import RequireAuth from "./Components/RequireAuth";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  let { transformedData, kFetch, setTransformedData } = useFetchData();

  return (
    <div>
      <header className="App-header">
        <Header
          transformedData={transformedData}
          kFetch={kFetch}
          setTransformedData={setTransformedData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>
      <Routes>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="linkpage" element={<LinkPage/>} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route
          element={<RequireAuth allowedRoles={["User", "Admin", "Master"]} />}
        >
          <Route
            path="/"
            element={<Home transformedData={transformedData} kFetch={kFetch} />}
          />
          <Route path="/Details/:id" element={<Details />} />
          <Route
            path="/results"
            element={<Results searchTerm={searchTerm} />}
          />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={["Admin", "Master", "User"]} />}
        >
          <Route path="/add" element={<AddQnA />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["Master"]} />}>
          <Route path="/master/" element={<Master />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
