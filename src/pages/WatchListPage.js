import React, { useState } from "react";
import { UilArrowGrowth } from "@iconscout/react-unicons";
import { UilChartDown } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import Modal2 from "../components/Modal2";

const WatchListPage = (props) => {
  const [openModal2, setOpenModal2] = useState(false);
  const [openModalDetails2, setOpenModalDetails2] = useState("");

  const x = props.watchListApp;
  console.log(openModalDetails2);
  console.log(x);
  const handleOpenModal2 = (modalData) => {
    console.log("I am clicked");
    setOpenModal2(true);
    setOpenModalDetails2(modalData);
  };

  const closeModal2 = () => {
    setOpenModal2(false);
    console.log(openModal2);
  };

  console.log(x);

  let nftListToWatchPage = x.map((nft, i) => {
    return (
      <>
        <div className="individual--watchListCards">
          <div
            className="individual--watchListCard--sections"
            onClick={() => {
              handleOpenModal2(nft);
            }}
          >
            <div className="inidividual--watchListCard--left">
              <img
                src={nft.image}
                className="watchListCard--image"
                alt="images"
              />
            </div>
            <div className="inidividual--watchListCard--center">
              <div className="watchList--title--box">
                <div className="title--header--watchList">Title:</div>
                <div className="title--name--watchList">{nft.title}</div>
              </div>
              <div className="watchList--etherscan">
                <a
                  href={`https://etherscan.io/token/${nft.address}`}
                  className="watchList--etherscan--text"
                >{`${nft.address.slice(0, 4)}...${nft.address.slice(
                  nft.address.length - 4
                )}`}</a>
              </div>
              <div className="main--desc">{nft.description}</div>
              <div className="owners--minted--market--cap--box">
                <div className="owners--minted--market--cap--box--left">
                  <div className="number--of--owners--box">
                    <div className="number--of--owners--title">
                      Number of owners:
                    </div>
                    <div className="number--of-owners--value">
                      {nft.numberOfOwners}
                    </div>
                  </div>
                  <div className="total--minted--box">
                    <div className="total--minted--title">Total minted:</div>
                    <div className="total--minted--value">
                      {nft.totalMinted}
                    </div>
                  </div>
                </div>
                <div className="owners--minted--market--cap--box--right">
                  <div className="marketCap--box">
                    <div className="marketCap--title">Market cap (ETH):</div>
                    <div className="marketCap--value">
                      {nft.marketCap || !isNaN(nft.marketCap)
                        ? nft.marketCap
                        : "Not Found"}
                    </div>
                  </div>
                  <div className="marketCap--box">
                    <div className="marketCap--title">Total sales:</div>
                    <div className="marketCap--value">
                      {nft.totalSales ? nft.totalSales : "Not Found"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="individual--watchListCard--right">
              <div className="statistics--left">
                <div className="average--price--box">
                  <div className="statistics--header">Average Price:</div>
                  <div>
                    {nft.averagePrice && !isNaN(nft.averagePrice)
                      ? nft.averagePrice.toFixed(4)
                      : "Not Found"}
                  </div>
                </div>
                <div className="history30--price--box">
                  <div className="statistics--header">Floor Price(30):</div>
                  <div>
                    {nft.floorPriceHistory30 && !isNaN(nft.floorPriceHistory30)
                      ? nft.floorPriceHistory30.toFixed(4)
                      : "Not Found"}
                  </div>
                </div>
              </div>
              <div className="statistics--right">
                <div className="price--change--30">
                  <div className="statistics--header">Price Change(30):</div>
                  <div className="statistics--report">
                    {nft.priceChange30 && !isNaN(nft.priceChange30) ? (
                      nft.priceChange30 >= 0 ? (
                        <>
                          {nft.priceChange30.toFixed(4)}
                          <UilArrowGrowth
                            className="price--change--30--arrow--green"
                            size={30}
                          />
                        </>
                      ) : (
                        <>
                          {nft.priceChange30.toFixed(4)}
                          <UilChartDown
                            className="price--change--30--arrow--red"
                            size={30}
                          />
                        </>
                      )
                    ) : (
                      "Not Found"
                    )}
                  </div>
                </div>
                <div className="totalVolume">
                  <div className="statistics--header">Total Volume (ETH):</div>
                  <div>
                    {nft.totalVolume && !isNaN(nft.totalVolume)
                      ? nft.totalVolume.toFixed(2)
                      : "Not Found"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UilTrashAlt
            className="watchListPageCard--delete--button"
            size={40}
            key={i}
            onClick={() => props.handleRemoveWatchPageItem(i)}
          />
        </div>
      </>
    );
  });

  return (
    <>
      <div className="watchListPage--container">
        <div>
          {x.length !== 0 ? (
            <div>{nftListToWatchPage}</div>
          ) : (
            <div className="no--watchlist--collection--container">
              <div className="no--watchlist-collection--title">
                <p>your watch list is empty</p>
              </div>
            </div>
          )}
        </div>
        <Modal2
          openModalDetails2={openModalDetails2}
          openModal2={openModal2}
          setOpenModal2={setOpenModal2}
          closeModal2={closeModal2}
        />
      </div>
    </>
  );
};

export default WatchListPage;
