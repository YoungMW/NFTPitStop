import React, { useState } from "react";
import NFT from "./pages/NFT";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./NavBar";
import WatchListPage from "./pages/WatchListPage";

export default function App() {
  const [NFTsApp, setNFTsApp] = useState(""); //setting NFT's meta data from fetchNFT()
  const [watchListApp, setWatchListApp] = useState([]); //retrieving total number of NFTs from API
  const [collectionSize, setCollectionSize] = useState("");

  const handleRemoveWatchPageItem = (index) => {
    const watchListPageArr = watchListApp.filter((d, i) => i !== index);
    setWatchListApp(watchListPageArr);
  };

  console.log(NFTsApp);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/nft"
          element={
            <NFT
              setNFTsApp={setNFTsApp}
              NFTsApp={NFTsApp}
              watchListApp={watchListApp}
              setWatchListApp={setWatchListApp}
              setCollectionSize={setCollectionSize}
              collectionSize={collectionSize}
            />
          }
        />
        <Route
          path="/watchlistpage"
          element={
            <WatchListPage
              watchListApp={watchListApp}
              handleRemoveWatchPageItem={handleRemoveWatchPageItem}
            />
          }
        />
      </Routes>
    </div>
  );
}
