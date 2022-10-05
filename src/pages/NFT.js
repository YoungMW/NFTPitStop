import React, { useState } from "react";
import NFTCard from "../components/nftcard";
import "../style.css";
import { UilSearch } from "@iconscout/react-unicons";
import Modal from "../components/Modal";
import WatchList from "../components/WatchList";
import ClipLoader from "react-spinners/HashLoader";

export default function NFT(props) {
  //====================================States==============================================

  const [openModal, setOpenModal] = useState(false); //opening Modal - True or False
  const [openModalDetails, setOpenModalDetails] = useState(""); //opening Modal - True or False

  let NFTsApp = props.NFTsApp;
  let watchListApp = props.watchListApp;
  let setWatchListApp = props.setWatchListApp;
  let collectionSize = props.collectionSize;
  let inputValue = props.inputValue;
  let setInputValue = props.setInputValue;
  let setOwner = props.setOwner;
  let loading = props.loading;

  //=============================================================================================

  const handleClick = () => {
    setOwner(inputValue);
  };

  const addToWatchListClick = (watchListData) => {
    setWatchListApp([...watchListApp, watchListData]);
  };

  const handleRemoveWatchListItem = (index) => {
    const watchListArr = watchListApp.filter((d, i) => i !== index);
    setWatchListApp(watchListArr);
  };

  const handleOpenModalDetails = (modalData) => {
    setOpenModal(true);
    setOpenModalDetails(modalData);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  console.log(watchListApp);
  console.log(NFTsApp);

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
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
                value={inputValue}
              ></input>
              <UilSearch
                size={30}
                className="icon--search"
                onClick={handleClick}
              />
            </div>
            <div className="container">
              <div className="left--section--collectorDetails">
                {NFTsApp ? <h1 className="left-section-header">News</h1> : ""}
              </div>
              <div className="middle--section--container">
                {NFTsApp ? (
                  <h1 className="middle--section--header">
                    Digital Galleria{" "}
                    {collectionSize ? `- ${collectionSize}` : ""}{" "}
                  </h1>
                ) : (
                  ""
                )}

                <div className="main--nft--collection">
                  {NFTsApp ? (
                    <div className="nft--collection">
                      {NFTsApp.map((NFT) => {
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
                            numberOfOwners={
                              NFT.value.statisticsData.statistics
                                ? NFT.value.statisticsData.statistics.num_owners
                                : "Not Found"
                            }
                            totalMinted={
                              NFT.value.statisticsData.statistics
                                ? NFT.value.statisticsData.statistics
                                    .total_minted
                                : "Not Found"
                            }
                            marketCap={
                              NFT.value.statisticsData.statistics
                                ? NFT.value.statisticsData.statistics.market_cap
                                : "Not Found"
                            }
                            totalSales={
                              NFT.value.statisticsData.statistics
                                ? NFT.value.statisticsData.statistics
                                    .total_sales
                                : "Not Found"
                            }
                          ></NFTCard>
                        );
                      })}
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
                {NFTsApp ? (
                  <h1 className="right--section-header">Watch List</h1>
                ) : (
                  ""
                )}
                <WatchList
                  key={Math.random() * 1000}
                  watchListApp={watchListApp}
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
