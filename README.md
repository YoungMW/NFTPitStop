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
<p>Importing the react-router-dom library and using the <Link> tag, routing can be conducted between pages.</p>

