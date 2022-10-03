import React from "react";
import { UilArrowGrowth } from "@iconscout/react-unicons";
import { UilChartDown } from "@iconscout/react-unicons";

const WatchListPage = (props) => {
  const x = props.watchListData;

  let nftListToWatchPage = x.map((nft) => {
    return (
      <div className="inidividual--watchListCards">
        <div className="inidividual--watchListCard--left">
          <img src={nft.image} className="watchListCard--image" alt="images" />
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
        </div>
        <div className="individual--watchListCard--right">
          <div className="statistics--left">
            <div className="average--price--box">
              <div className="statistics--header">Average Price</div>
              <div>
                {!nft.statistics ? nft.averagePrice.toFixed(4) : "Not Found"}
              </div>
            </div>
            <div className="history30--price--box">
              <div className="statistics--header">Floor Price(30)</div>
              <div>
                {!nft.statistics
                  ? nft.floorPriceHistory30.toFixed(4)
                  : "Not Found"}
              </div>
            </div>
          </div>
          <div className="statistics--right">
            <div className="price--change--30">
              <div className="statistics--header">Price Change(30)</div>
              <div className="statistics--report">
                {!nft.statistics ? (
                  !nft.statistics && nft.priceChange30 > 0 ? (
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

                {/* {!nft.statistics && nft.priceChange30 > 0 ? (
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
                )} */}
              </div>
            </div>
            <div className="totalVolume">
              <div className="statistics--header">Total Volume</div>
              <div>
                {!nft.statistics ? nft.totalVolume.toFixed(4) : "Not Found"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="watchListPage--container">
        <div> {nftListToWatchPage}</div>
      </div>
    </>
  );
};

export default WatchListPage;
