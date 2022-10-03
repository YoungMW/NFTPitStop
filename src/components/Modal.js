import React from "react";
import { UilHeart } from "@iconscout/react-unicons";

const Modal = (props) => {
  if (!props.openModal) return null;

  let dataToWatchList = props.openModalDetails;
  console.log(dataToWatchList);

  return (
    <div className="overlay">
      <div className="modal--container">
        <div className="modal--image--container">
          <UilHeart
            size={50}
            className="addToWatchList--Button"
            onClick={() => {
              props.addToWatchListClick(dataToWatchList);
            }}
          ></UilHeart>
          <img
            className="modal--image"
            src={props.openModalDetails.image}
            alt="images"
          />
        </div>
        <div className="modal--Right">
          <button
            onClick={props.closeModal}
            id="modal--closeButton"
            className="modal--closeButton"
          >
            &times;
          </button>
          <div className="title--box">
            <p className="title--header">Title:</p>
            <p className="modal--title">
              {props.openModalDetails.title
                ? props.openModalDetails.title
                : "No Title"}
            </p>
          </div>
          <a
            href={`https://etherscan.io/token/${props.openModalDetails.address}`}
            className="modal--nft--contract--address"
          >{`${props.openModalDetails.address.slice(
            0,
            4
          )}...${props.openModalDetails.address.slice(
            props.openModalDetails.address.length - 4
          )}`}</a>
          <div className="description--box">
            <div className="nft--description">
              {props.openModalDetails.description}
            </div>
            <div className="modal--grid--box">
              <div className="modal--attributes--box">
                {props.openModalDetails.attributes &&
                Array.isArray(props.openModalDetails.attributes)
                  ? props.openModalDetails.attributes.map((attri) => {
                      return (
                        <>
                          <div className="attri--type">{attri.trait_type}:</div>
                          <div className="attri--value">{attri.value}</div>
                        </>
                      );
                    })
                  : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
