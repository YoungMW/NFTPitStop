import React, { useEffect, useState } from "react";
import NFTCard from "../components/nftcard";
import "../style.css";
import { fetchNFTs } from "../nftAPI/fetchAPIs";
import { UilSearch } from "@iconscout/react-unicons";
import Modal from "../components/Modal";
import WatchList from "../components/WatchList";
import ClipLoader from "react-spinners/HashLoader";

export default function NFT(props) {
  //====================================States==============================================
  const [owner, setOwner] = useState(
    //setting owner's NFT address
    "0x90BBCbe91a042558ed9589ddf9f180E736886FC3"
  );
  const [inputValue, setInputValue] = useState(); //setting user's input value - owner address
  const [NFTs, setNFTs] = useState(""); //setting NFT's meta data from fetchNFT()
  const [collectionSize, setCollectionSize] = useState(""); //retrieving total number of NFTs from API
  const [openModal, setOpenModal] = useState(false); //opening Modal - True or False
  const [openModalDetails, setOpenModalDetails] = useState(""); //opening Modal - True or False
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (owner) {
      fetchNFTs(owner, setNFTs, setCollectionSize, setLoading);
    }
  }, [owner]);

  console.log(NFTs);
  const handleClick = () => {
    setOwner(inputValue);
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const addToWatchListClick = (watchListData) => {
    setWatchList([...watchList, watchListData]);
    props.setWatchListData([...watchList, watchListData]);
  };

  console.log(watchList);
  const handleRemoveWatchListItem = (index) => {
    const watchListArr = watchList.filter((d, i) => i !== index);
    setWatchList(watchListArr);
  };

  const handleOpenModalDetails = (modalData) => {
    setOpenModal(true);
    setOpenModalDetails(modalData);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="overview--nft--app">
        {loading ? (
          <ClipLoader size={100} color={"#ffffff"} loading={loading} />
        ) : (
          <div className="nft--app">
            <div className="search--bar">
              <input
                className="search--input"
                type="text"
                placeholder="Enter Wallet Address..."
                onChange={handleInput}
              ></input>
              <UilSearch
                size={30}
                className="icon--search"
                onClick={handleClick}
              />
            </div>
            <div className="container">
              <div className="left--section--collectorDetails">
                <h1 className="left-section-header">News</h1>
              </div>
              <div className="middle--section--container">
                <h1 className="middle--section--header">
                  Digital Galleria {collectionSize ? `- ${collectionSize}` : ""}
                </h1>
                <div className="main--nft--collection">
                  {NFTs ? (
                    <div className="nft--collection">
                      {NFTs.map((NFT) => {
                        return (
                          <NFTCard
                            key={NFT.value.title + `${Math.random() * 1000}`}
                            image={NFT.value.image}
                            id={NFT.value.id}
                            title={NFT.value.title}
                            address={NFT.value.contractAddress}
                            description={NFT.value.description}
                            attributes={NFT.value.attributes}
                            supply={NFT.value.supply}
                            tokenType={NFT.value.tokenType}
                            floorPrice={NFT.value.floorPrice}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            handleOpenModalDetails={handleOpenModalDetails}
                            statistics={NFT.value.statisticsData.error}
                            averagePrice={
                              NFT.value.statisticsData.statistics
                                ? NFT.value.statisticsData.statistics
                                    .average_price
                                : "Not Found"
                            }
                            floorPriceHistory30={
                              NFT.value.statisticsData.statistics
                                ? NFT.value.statisticsData.statistics
                                    .floor_price_historic_thirty_day
                                : "Not Found"
                            }
                            priceChange30={
                              NFT.value.statisticsData.statistics
                                ? NFT.value.statisticsData.statistics
                                    .thirty_day_change
                                : "Not Found"
                            }
                            totalVolume={
                              NFT.value.statisticsData.statistics
                                ? NFT.value.statisticsData.statistics
                                    .total_volume
                                : "Not Found"
                            }
                          ></NFTCard>
                        );
                      })}

                      {/* {NFTs ? (
                      NFTs.map((NFT) => {
                        console.log(NFT);
                        return (
                          <NFTCard
                            key={NFT.value.title + `${Math.random() * 1000}`}
                            image={NFT.value.image}
                            id={NFT.value.id}
                            title={NFT.value.title}
                            address={NFT.value.contractAddress}
                            description={NFT.value.description}
                            attributes={NFT.value.attributes}
                            supply={NFT.value.supply}
                            tokenType={NFT.value.tokenType}
                            floorPrice={NFT.value.floorPrice}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            handleOpenModalDetails={handleOpenModalDetails}
                          ></NFTCard>
                        );
                      })
                    ) : (
                      <div>No NFTs found</div>
                    )} */}
                    </div>
                  ) : (
                    <>
                      <div className="no--nft-collection--title">
                        <p>enter wallet address to view NFT collection</p>
                      </div>
                      <div className="no--nft--collection" />
                    </>
                  )}
                </div>
                <br />
              </div>
              <div className="right--section--container">
                <h1 className="right--section-header">Watch List</h1>
                <WatchList
                  key={Math.random() * 1000}
                  watchList={watchList}
                  handleOpenModalDetails={handleOpenModalDetails}
                  handleRemoveWatchListItem={handleRemoveWatchListItem}
                />
              </div>
            </div>
            <Modal
              key={openModalDetails.address + Math.random() * 1000}
              openModal={openModal}
              closeModal={closeModal}
              setOpenModal={setOpenModal}
              openModalDetails={openModalDetails}
              addToWatchListClick={addToWatchListClick}
            />
          </div>
        )}
      </div>
    </>
  );
}
