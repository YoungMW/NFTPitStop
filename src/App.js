import React, { useState, useEffect } from "react";
import NFT from "./pages/NFT";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./NavBar";
import WatchListPage from "./pages/WatchListPage";
import { fetchNFTs } from "./nftAPI/fetchAPIs";

export default function App() {
  //====================================States==============================================
  const [inputValue, setInputValue] = useState(""); //setting user's input value - owner address
  const [owner, setOwner] = useState(""); //setting owner's NFT address
  const [NFTsApp, setNFTsApp] = useState(""); //setting NFT's meta data from fetchNFT()
  const [watchListApp, setWatchListApp] = useState([]); //retrieving total number of NFTs from API
  const [collectionSize, setCollectionSize] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRemoveWatchPageItem = (index) => {
    const watchListPageArr = watchListApp.filter((d, i) => i !== index);
    setWatchListApp(watchListPageArr);
  };

  console.log(NFTsApp);
  console.log(watchListApp);

  useEffect(() => {
    if (owner) {
      fetchNFTs(owner, setCollectionSize, setLoading, setNFTsApp);
    }
  }, [owner]);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              inputValue={inputValue}
              setInputValue={setInputValue}
              setOwner={setOwner}
            />
          }
        />
        <Route
          path="/nft"
          element={
            <NFT
              inputValue={inputValue}
              setInputValue={setInputValue}
              setOwner={setOwner}
              setNFTsApp={setNFTsApp}
              NFTsApp={NFTsApp}
              watchListApp={watchListApp}
              setWatchListApp={setWatchListApp}
              setCollectionSize={setCollectionSize}
              collectionSize={collectionSize}
              loading={loading}
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
