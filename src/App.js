import React, { useState } from "react";
import NFT from "./pages/NFT";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./NavBar";
import WatchListPage from "./pages/WatchListPage";

export default function App() {
  const [watchListData, setWatchListData] = useState([]);

  console.log(watchListData);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/nft"
          element={<NFT setWatchListData={setWatchListData} />}
        />
        <Route
          path="/watchlistpage"
          element={<WatchListPage watchListData={watchListData} />}
        />
      </Routes>
    </div>
  );
}
