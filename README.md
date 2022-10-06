# NFTPitStop
One Stop Solution to keep track of your favourite NFTs. This application is built using JavaScript React, HTML & CSS on VSC.

APIs from Alchemy and NFTPort were used to tabulate the relevant data.

# Table of Contents

1. [ Application Description ](#desc)
2. [ Parent Components Creation ](#parentcomponents)
* [App Component](#app)
* [Home Component](#home)
* [About Component](#about)
* [Navigation Bar Component](#navbar)
* [NFT Component](#nft)
* [WatchList Page Component](#watchlistpage)
3. [ Child Components Creation ](#childcomponents)
* [NFT Cards Component](#nftcards)
* [Modals Component](#modals)
* [WatchList Component](#watchlist)
4. [ Page Routings ](#routings)

<a name="desc"></a>
## 1. Application Description
Stay updated with latests NFT price changes and market trends. 

With just the Wallet Address you can View & Share NFT Collections and keep track of your favourite NFTs' market trends by adding them into your Watchlist.
 
<a name="parentcomponents"></a>
## 2. Parent Components Creation
<p>The Components are the foundation for this application and will be pieced together to form the final product.</p>

<p>Some of the parent components include:</p>
<li>App</li>
<li>Home</li>
<li>About</li>
<li>Navigation Bar</li>
<li>NFT</li>

<a name="app"></a>
<h3>2.1. App Component</h3>
<p>The App Component is the parent to multiple components, namely the Home, About, NavBar, NFT and WatchListPage. This component is vital for the integration amongst all the Child Components.</p>

<p>States and libraries are set up to enable propping and lifting from Parent to Child and Child to Parent Components, respectively.</p>

```
import React, { useState, useEffect } from "react";
import NFT from "./pages/NFT";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./NavBar";
import WatchListPage from "./pages/WatchListPage";
import { fetchNFTs } from "./nftAPI/fetchAPIs";
```


<p>React hooks such as useStates in the App Component are created to allow the seamless flow of activities from user input, to fetching of data and finally displaying them on the screen.</p>


```
const [inputValue, setInputValue] = useState(""); //setting user's input value - owner address
const [owner, setOwner] = useState(""); //setting owner's NFT address
const [NFTsApp, setNFTsApp] = useState(""); //setting NFT's meta data from fetchNFT() and prop to NFT Cards
const [watchListApp, setWatchListApp] = useState([]); //creating an Array for WatchList and WatchListPage (to be propped)
const [collectionSize, setCollectionSize] = useState(""); //setting the collectionSize of the NFT collection and propped for display
const [loading, setLoading] = useState(false); //For loading during fetching NFT data from wallet address
const [nftPortData, setNftPortData] = useState(""); //Getting additional market data for each NFT Collection by fetching
```


Another React hook, the useEffect method is used to render the asynchronous fetch function whenever the "owner" state changes, i.e. any changes in user input will excecute the fetch function using Alchemy's API for NFT data using the wallet address entered by the user. 


```
useEffect(() => {
    if (owner) {
      fetchNFTs(owner, setCollectionSize, setLoading, setNFTsApp);
    }
  }, [owner]);
```


<a name="home"></a>
<h3>2.2. Home Component</h3>
<p>The Home Component is the main page of the application and it houses an input box and a search button.</p>

<p>Over here, React props are being lifted through the handle search function tied to the search button. The user's input will be stored resulting in a change in "owner" state, rendering the fetching of NFT data.</p>

```
 <input
   className="home--page--input"
   placeholder="Enter Wallet Address..."
   onChange={(event) => {
    setInputValue(event.target.value);
   }}
  />
  <NavLink className="home--page--icon--search--box" to="nft">
   <UilSearch
     size={30}
     className="home--page--icon--search"
     onClick={handleClick}
   />
  </NavLink>
```


<a name="about"></a>
<h3>2.3. About Component</h3>
<p>The About Component is the Introductary/Instructional page of the user to understand the basics of the application.</p>

<a name="navbar"></a>
<h3>2.4. Navigation Bar Component</h3>
<p>Importing the react-router-dom library and using the <Link> tag, routing can be conducted between pages.</p>


```
 import { NavLink } from "react-router-dom";
 
  <div className="Navbar">
      <NavLink className="nav-logo" to="/">
        NFTPitStop
      </NavLink>
      <div className="nav-items">
        <NavLink className="navBar--links" to="/">
          Home
        </NavLink>
        <NavLink className="navBar--links" to="/about">
          About
        </NavLink>
        <NavLink className="navBar--links" to="/nft">
          NFT
        </NavLink>
        <NavLink className="navBar--links" to="/watchlistpage">
          Watch List
        </NavLink>
      </div>
 
```


<a name="nft"></a>
<h3>2.5. NFT Component</h3>
<p>The NFT Component populates the entire NFT collection from the desired wallet address into a gallery. This is being done by fetching data from Alchemy's NFT API, mapping through the array, returning NFT Cards that will be displayed in a grid format.</p>
   
   
```
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
```
   
   
   
<p>In this Component, user input is allowed and will be handled by the handleClick function through the useState hook. The user will be allowed to favourite/add to watch list any NFT of their choice, this is done by creating a new watchListApp array. The user will also be allowed to remove any previously added NFT in the watch list, this is done through the handleRemoveWatchListItem function by filtering out the NFT id from the array.</p>
   
<p>Separately, on clicking any NFT card, a modal displaying more details on the NFT will be shown for viewing. This is accomplished through the handleOpenModalDetails function. When this function is executed, an additional data from NFTPort's API is fetched to display market values that will be useful for the user.</p>

   
   
```
 const handleClick = () => {
    //setting owner as the wallet addressed key in by user
    setOwner(inputValue);
  };

  const addToWatchListClick = (watchListData) => {
    //pushing in data to an WatchList Array for population
    setWatchListApp([...watchListApp, watchListData]);
  };

  const handleRemoveWatchListItem = (index) => {
    //removing item from WatchList Array via index filtering
    const watchListArr = watchListApp.filter((d, i) => d.id !== index);
    setWatchListApp(watchListArr);
  };

  const handleOpenModalDetails = async (modalData) => {
    //Opening Modal and running a fetch async function to retreive market data
    console.log(modalLoading);
    await getNFTsPortData(modalData.address);
    setOpenModalDetails(modalData);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
```
   
<p>Fetching data from NFTPort's API. This is executed when the user clicks on any NFT Card and opens the Modal.</p>
 
  

```
const getNFTsPortData = async (address) => {
    setModalLoading(true);
    console.log(modalLoading);
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "efaddfe2-8f9c-4c03-a5b8-5a91820e7b19",
        },
      };

      const statisticsData = await fetch(
        `https://api.nftport.xyz/v0/transactions/stats/${address}?chain=ethereum`,
        options
      )
        .then((statisticsData) => statisticsData.json())
        .catch((err) => console.error(err));

      let nftStatistics;
      setModalLoading(false);
      if (statisticsData) {
        nftStatistics = statisticsData;
        setNftPortData(nftStatistics);
      } else {
        nftStatistics = statisticsData.error.code;
        setNftPortData(nftStatistics);
      }
    } catch (e) {
      setModalLoading(false);
    }
  };
```
  
   
<a name="watchlistpage"></a>
<h3>2.6. WatchList Page Component</h3>
<p>The WatchList Page Component displays the entire NFT collection that the user has favourite-ed.</p>

<p>Individual cards of the Watch List Page will display additional market information such as market cap, average price, price changes and more. These additional data is fetched from NFTPort's API as mentioned above. For efficiency, green and red arrows marking the price changes are used. Multiple conditional statements will be used to ensure that the data returned from the APIs are logical for the codes set up in this application. More details can be seen below.</p>
 
<p>The user will also be allowed to trigger the modals to view additional details like before.</p>
   
   
```
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
                      {(nft.statistics && nft.statistics.num_owners) ||
                      (nft.statistics &&
                        !isNaN(nft.statistics.num_owners) &&
                        nft.statistics.num_owners !== null)
                        ? nft.statistics.num_owners
                        : "Not Found"}
                    </div>
                  </div>
                  <div className="total--minted--box">
                    <div className="total--minted--title">Total minted:</div>
                    <div className="total--minted--value">
                      {(nft.statistics && nft.statistics.total_minted) ||
                      (nft.statistics &&
                        !isNaN(nft.statistics.total_minted) &&
                        nft.statistics.total_minted !== null)
                        ? nft.statistics.total_minted
                        : "Not Found"}
                    </div>
                  </div>
                </div>
                <div className="owners--minted--market--cap--box--right">
                  <div className="marketCap--box">
                    <div className="marketCap--title">Market cap (ETH):</div>
                    <div className="marketCap--value">
                      {(nft.statistics && nft.statistics.market_cap) ||
                      (nft.statistics &&
                        !isNaN(nft.statistics.market_cap) &&
                        nft.statistics.market_cap !== null)
                        ? nft.statistics.market_cap.toFixed(2)
                        : "Not Found"}
                    </div>
                  </div>
                  <div className="marketCap--box">
                    <div className="marketCap--title">Total sales:</div>
                    <div className="marketCap--value">
                      {(nft.statistics && nft.statistics.total_sales) ||
                      (nft.statistics &&
                        !isNaN(nft.statistics.total_sales) &&
                        nft.statistics.total_sales !== null)
                        ? nft.statistics.total_sales
                        : "Not Found"}
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
                    {(nft.statistics && nft.statistics.average_price) ||
                    (nft.statistics &&
                      !isNaN(nft.statistics.average_price) &&
                      nft.statistics.average_price !== null)
                      ? nft.statistics.average_price.toFixed(4)
                      : "Not Found"}
                  </div>
                </div>
                <div className="history30--price--box">
                  <div className="statistics--header">Floor Price(30):</div>
                  <div>
                    {(nft.statistics &&
                      nft.statistics.floor_price_historic_thirty_day) ||
                    (nft.statistics &&
                      !isNaN(nft.statistics.floor_price_historic_thirty_day) &&
                      nft.statistics.floor_price_historic_thirty_day !== null)
                      ? nft.statistics.floor_price_historic_thirty_day.toFixed(
                          4
                        )
                      : "Not Found"}
                  </div>
                </div>
              </div>
              <div className="statistics--right">
                <div className="price--change--30">
                  <div className="statistics--header">Price Change(30):</div>
                  <div className="statistics--report">
                    {(nft.statistics && nft.statistics.thirty_day_change) ||
                    (nft.statistics &&
                      !isNaN(nft.statistics.thirty_day_change) &&
                      nft.statistics.thirty_day_change !== null) ? (
                      nft.statistics.thirty_day_change >= 0 ? (
                        <>
                          {nft.statistics.thirty_day_change.toFixed(4)}
                          <UilArrowGrowth
                            className="price--change--30--arrow--green"
                            size={30}
                          />
                        </>
                      ) : (
                        <>
                          {nft.statistics.thirty_day_change.toFixed(4)}
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
                    {(nft.statistics && nft.statistics.total_volume) ||
                    (nft.statistics &&
                      !isNaN(nft.statistics.total_volume) &&
                      nft.statistics.total_volume !== null)
                      ? nft.statistics.total_volume.toFixed(2)
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
```
 
   
<p>Filter buttons are implemented to allow users to filter between highest price changes-lower price changes and more.</p>

<p>This is done by the find() method, ceiving through the array and implementing multiple conditional statements to achieve the necessary sorting as required by the user.</p>
