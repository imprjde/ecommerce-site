import React, { useState } from "react";
import EmptyCart from "./Images/EmptyCart.png";
import { Link } from "react-router-dom";

function CartView({ cart, handleDelete, updateQuantity }) {
  const imageLink =
    "https://img.icons8.com/external-wanicon-lineal-color-wanicon/1x/external-delete-user-interface-wanicon-lineal-color-wanicon.png";

  console.log("PUSHPU", cart);

  // const subTotal = cart[0].price * cart[0].quantity;

  const subTotal = cart.reduce((accumulator, current) => {
    return accumulator + current.price * current.quantity;
  }, 0);

  const randomNum = Math.floor(Math.random() * 5) + 1;

  console.log("TOTOAL-PRICE", subTotal);
  return (
    <div className="w-screen h-screen overflow-x-hidden bg-purple-300">
      <div className="flex flex-row justify-between  ">
        <div className="contnent flex flex-col">
          {cart.length === 0 && (
            <div className="w-[55rem] ml-6 mt-7">
              <img src={EmptyCart} alt="" className="rounded-lg" />
              <Link to="/">
                <button className=" font-semibold text-white mt-10 bg-violet-500 px-3 py-2 rounded-lg ml-1">
                  {" "}
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
          {cart.map((itemsData, index) => {
            return (
              <div className=" m-auto w-auto h-[8rem] bg-white ml-16 pr-5 mr-[28rem] py-2 my-6 rounded-lg ">
                <div className="CartItems flex  justify-center  items-center flex-col ">
                  <div className="flex ml-3 items-center justify-center">
                    <div>
                      <img className="w-[4rem]" src={itemsData.image} alt="" />
                    </div>
                    <div className="flex flex-col space-y-4 justify-center ml-3">
                      <div className="font-bold text-xl w-4/5 flex-grow">
                        {" "}
                        {itemsData.title.length > 20
                          ? `${itemsData.title.substr(0, 15)}...`
                          : itemsData.title}
                      </div>
                      <div className="font-semibold text-base">
                        {itemsData.category}
                      </div>
                    </div>
                    <div className=" flex flex-row justify-center items-center ml-16 space-x-3">
                      <button
                        disabled={itemsData.quantity === 1}
                        onClick={() =>
                          updateQuantity(index, itemsData.quantity - 1)
                        }
                        className="text-gray-700 font-bold text-4xl"
                      >
                        -
                      </button>
                      <span className="font-bold rounded-md text-white px-1 bg-gray-600 text-2xl">
                        {itemsData.quantity}
                      </span>
                      <button
                        disabled={itemsData.quantity === 15}
                        onClick={() =>
                          updateQuantity(index, itemsData.quantity + 1)
                        }
                        className="text-gray-700 font-bold text-4xl"
                      >
                        +
                      </button>
                    </div>
                    <div className="justify-center items-center space-x-9 ml-12 flex flex-row ">
                      <span className="text-xl font-bold">
                        $ {itemsData.price}
                      </span>
                      <span className="text-xl font-bold  ">
                        $ {(itemsData.price * itemsData.quantity).toFixed(2)}
                      </span>
                      <span className="text-xl font-bold pr-4"></span>
                      <button onClick={() => handleDelete(itemsData.id)}>
                        <img
                          className="w-7 cursor-pointer"
                          src={imageLink}
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="billing ml-[58rem] mt-[1.5rem] fixed bg-white flex flex-col rounded-lg px-4">
          <div className="font-medium text-xl mt-5 mb-4">
            <div className="fixed font-bold text-xl text-center justify-center items-center ml-20 ">
              Order Summary
            </div>
            <div className=" flex mt-16 border justify-between border-x-0 border-t-0 pb-4 space-x-40  ">
              <span>Sub Total</span>
              <span>$ {subTotal.toFixed(2)}</span>
            </div>
            <div className=" flex mt-8 border justify-between border-x-0 border-t-0 pb-4 space-x-40  ">
              <span>Shipping Charge</span>
              <span>$ {cart.length === 0 ? "0" : randomNum}</span>
            </div>
            <div className=" flex mt-8 bg-gray-300 px-2 py-3 rounded-lg justify-between border border-x-0 border-t-0 pb-4 space-x-40  ">
              <span>Order Total</span>
              <span>$ {(subTotal + randomNum).toFixed(2)}</span>
            </div>

            <div className=" cursor-pointer flex mt-8 bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-lg justify-center text-center  border border-x-0 border-t-0 pb-4 space-x-40  ">
              <button>Checkout</button>
            </div>
          </div>
          {/* )
          })} */}
        </div>
      </div>
    </div>
  );
}

export default CartView;

