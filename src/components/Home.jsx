import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ConfirmPopup from "./ConfirmPopup";
import Shimmer from "./Shimmer";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import EmptyCart from "./Images/EmptyCart.png";
import logo from "./Images/ReactShopLogo.png";

function Home({
  apiData,
  FilteredCartItems,
  isLoading,
  handleAddToCart,
  handleDelete,
  setCartItems,
  cartItems,
  cart,
  updateQuantity,
}) {
  const [cartModal, setCartModal] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
 const [filterData, setFilterData]= useState([])
  const modalRef = useRef();

  const imageURL =
    "https://img.icons8.com/external-bartama-outline-32-bartama-graphic/256/external-bin-e-mail-bartama-outline-32-bartama-graphic.png";

  const handleCheckboxChange = (checkboxIndex) => {
    if (checkboxIndex === 1) {
      setChecked1(true);
      setChecked2(false);
      setChecked3(false);
    } else if (checkboxIndex === 2) {
      setChecked1(false);
      setChecked2(true);
      setChecked3(false);
    } else if (checkboxIndex === 3) {
      setChecked1(false);
      setChecked2(false);
      setChecked3(true);
    }
  };
  const handleClear = () => {
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
  };
  
  console.log('API-DATA', apiData)
  console.log('FILTER', filterData)
  return (
    <div className="">
      <nav className="bg-purple-400 border-4 border-x-0 border-t-0 border-purple-500 pb-4 pt-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-80  justify-between">
              <span className="text-white font-bold text-xl" href="#">
                <img className="w-[5rem] mb-1" src={logo} alt="" />
              </span>

              <form class="flex items-center w-[30rem]">
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border text-lg border-gray-300 text-gray-900 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search "
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="flex">
              <button onClick={() => setCartModal(!cartModal)}>
                <div class="h-screen flex justify-center items-center">
                  <div class="relative py-2">
                    <div class="t-0 absolute left-3">
                      <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                        {cart.length}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="bg-white"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="file: mt-4 h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        fill="bg-white"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex ">
        <div className="bg-[#0dcaf0] shadow-xl  w-[13rem] px-4 py-6 hidden sm:block sticky h-auto">
          <div className="mt- sticky  top-40">
            <h1 className="font-bold text-md text-center text-gray-800 justify-center m-auto mb-8 text-4xl rounded-lg items-center">
              Filters
            </h1>
            <div className="bg-gray-700 py-2  rounded-lg w-[10rem] ">
              <div className="text-white mb-6 py-2  justify-end flex pr-7 space-x-3">
                <span className="font-bold text-lg">Electronics</span>
                <button
                  onClick={() => setSearch("Electronics")}
                  className="cursor-pointer"
                >
                  {" "}
                  <input
                    checked={checked1}
                    onChange={() => handleCheckboxChange(1)}
                    className="mt-2.5 cursor-pointer "
                    type="checkBox"
                  />
                </button>
              </div>
              <div className="text-white justify-end mb-6 flex pr-7 space-x-3">
                <span className="font-bold text-lg">Clothing</span>
                <button
                  onClick={() => setSearch("clothing")}
                  className="cursor-pointer"
                >
                  {" "}
                  <input
                    checked={checked2}
                    onChange={() => handleCheckboxChange(2)}
                    className="mt-2.5 cursor-pointer"
                    type="checkBox"
                  />
                </button>
              </div>
              <div className="text-white mb-6 justify-end flex pr-7 space-x-3">
                <span className="font-bold text-lg">Jewellery</span>
                <button
                  onClick={() => setSearch("jewelery")}
                  className="cursor-pointer"
                >
                  {" "}
                  <input
                    checked={checked3}
                    onChange={() => handleCheckboxChange(3)}
                    className="mt-2.5 cursor-pointer "
                    type="checkBox"
                  />
                </button>
              </div>
              <div className="text-white mb-6 justify-end flex  space-x-3">
                <button
                  onClick={() => {
                    setSearch("");
                    handleClear();
                  }}
                  className="font-bold text-md text-center justify-center m-auto bg-black px-2 py-2 rounded-lg items-center"
                >
                  {" "}
                  <span>Clear Filter</span>{" "}
                </button>
              </div>
            </div>
            <div className="mt-28 flex">
              <span className="text-black flex font-bold text-center justify-center items-center">
                {" "}
                <span className="font-bold text-xl mr-1">&#169;</span> Prajwal S
                Devadiga
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}

        <div className="flex-1 flex flex-col mx-2 bg-gray-100 h-screen overflow-x-hidden">
          <div className="container mx-5 my-4">
            <div className="flex flex-wrap ">
              {isLoading ? (
                <Shimmer />
              ) : (
                apiData
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.title.toLowerCase().includes(search.toLowerCase()) ||
                      val.category
                        .toLowerCase()
                        .trim()
                        .includes(search.toLowerCase().trim())
                    ) {
                     
                      return val;
                    }
                    
                  })
                  .map((data) => {
                    return (
                      <div
                        className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4"
                        key={data.id}
                      >
                        <div
                          href=""
                          className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
                        >
                          <div className="relative pb-48 rounded-2xl overflow-hidden">
                            <img
                              className="absolute inset-0 mt-2 rounded-lg h-full w-full object-cover"
                              src={data.image}
                              alt=""
                            />
                          </div>
                          <div className="p-4">
                            <h2 className="mt-2 mb-2 text-left font-bold">
                              {" "}
                              {data.title.length > 20
                                ? `${data.title.substr(0, 20)}...`
                                : data.title}
                            </h2>
                            {/* <p className="text-sm">price</p> */}
                            <p className="text-sm text-gray-600 font-serif text-left">
                              Category:
                              <span className="font-bold text-black">
                                {""}{" "}
                                {data.category.charAt(0).toUpperCase() +
                                  data.category.slice(1)}
                              </span>
                            </p>
                            <div className="mt-3 flex justify-between items-center">
                              <span className="font-bold text-xl">
                                $ {data.price}
                              </span>
                              <button
                                onClick={() => handleAddToCart(data)}
                                className="px-1 w-[7rem] py-1 mx-1 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none font-semibold text-sm"
                              >
                                Add to cart
                              </button>
                            </div>
                          </div>

                          <div className="p-1 flex items-center text-sm text-gray-600">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 fill-current text-yellow-500"
                            >
                              <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                            </svg>
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 fill-current text-yellow-500"
                            >
                              <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                            </svg>
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 fill-current text-yellow-500"
                            >
                              <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                            </svg>
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 fill-current text-yellow-500"
                            >
                              <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                            </svg>
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 fill-current text-gray-400"
                            >
                              <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                            </svg>
                            <span className="ml-2">{data.rating.rate}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          {/* Modal Starts From Here  */}

          <div
            className={`fixed z-50 mt-28 p-4 overflow-x-hidden overflow-y-auto ${
              cartModal ? "" : "hidden"
            } md:inset-0 max-h-full`}
          >
            <ConfirmPopup
              confirmModal={confirmModal}
              setConfirmModal={setConfirmModal}
              setCartItems={setCartItems}
            />
            <div
              ref={modalRef}
              className="relative m-auto w-[60rem] max-w-2xl max-h-full"
            >
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Your Cart
                  </h3>
                  <button onClick={() => setCartModal(!cartModal)}>
                    <h1 className="font-bold text-2xl">x</h1>
                  </button>
                </div>

                <div
                  className={`p-6 space-y-6 h-64 overflow-y-auto overflow-x-hidden ${
                    cartItems.length === 0 ? "overflow-y-hidden" : ""
                  }  transition duration-300 ease-in-out`}
                >
                  {cartItems.length === 0 ? (
                    <div className="overflow-y-hidden">
                      <img src={EmptyCart} alt="" />
                    </div>
                  ) : (
                    cart.map((modalItems, index) => {
                      return (
                        <div class="flex items-center border-2 border- mx-2 rounded-lg bg-white px-6 py-5">
                          <div class="flex w-2/5">
                            <div class="w-20">
                              <img class="h-24" src={modalItems.image} alt="" />
                            </div>
                            <div class="flex flex-col justify-between ml-4 flex-grow">
                              <span class="font-bold text-sm">
                                {modalItems.title}
                              </span>
                              <span class="text-red-500 text-xs">
                                {modalItems.category}
                              </span>
                            </div>
                          </div>
                          <div class="flex justify-center w-1/5">
                            <button
                              disabled={modalItems.quantity === 1}
                              onClick={() =>
                                updateQuantity(index, modalItems.quantity - 1)
                              }
                            >
                              <svg
                                class="fill-current text-gray-600 w-3"
                                viewBox="0 0 448 512"
                              >
                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                              </svg>
                            </button>

                            <input
                              class="mx-2 border text-center w-8"
                              type="text"
                              value={modalItems.quantity}
                            />

                            <button
                              disabled={modalItems.quantity === 15}
                              onClick={() =>
                                updateQuantity(index, modalItems.quantity + 1)
                              }
                            >
                              <svg
                                class="fill-current text-gray-600 w-3"
                                viewBox="0 0 448 512"
                              >
                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                              </svg>
                            </button>
                          </div>
                          <span class="text-center w-1/5 font-semibold text-sm">
                            $ {modalItems.price}
                          </span>
                          <span class="text-center w-1/5 font-semibold text-sm">
                            ${" "}
                            {(modalItems.price * modalItems.quantity).toFixed(
                              2
                            )}
                          </span>
                          <button
                            onClick={() => handleDelete(modalItems.id)}
                            className="font-semibold text-xl"
                          >
                            <img className="w-6" src={imageURL} alt="" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="flex items- justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    disabled={cartItems.length === 0}
                    onClick={() => setConfirmModal(!confirmModal)}
                    className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove all items
                  </button>
                  <Link to="/cart">
                    <button
                      data-modal-hide="defaultModal"
                      type="button"
                      className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500"
                    >
                      Go to Cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
