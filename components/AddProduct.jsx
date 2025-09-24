"use client";

import { supabase } from "@/app/supabase";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GetID from "./GetID";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [category, setCategory] = useState("");
  const [imageModel, setimageModel] = useState("file");

  let inputImage = useRef(null);

  const [loading, setLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [notCompeleted, setNotCompeleted] = useState(false);
  const [isLogin, setIsLogin] = useState();
  const [error, setError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  let navigate = useRouter();

  useEffect(() => {
    async function checkIsLogin() {
      let login = await GetID();

      login?.userId ? setIsLogin(login) : setIsLogin(false);
    }
    checkIsLogin();
  }, []);
  if (isLogin) {
    return (
      <div className=" flex flex-col items-center gap-5 mt-3 mb-6">
        <h2 className="text-center text-gray-700">add your product</h2>

        <div className="w-[90%] h-px bg-black"></div>

        <input
          type="text"
          placeholder="title..."
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        />
        <textarea
          type="text"
          placeholder="desc..."
          name="desc"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          className="w-[70%] h-[100px] resize-y border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        ></textarea>
        <input
          type="number"
          placeholder="price..."
          name="desc"
          onChange={(e) => {
            if (e.target.value >= 1) {
              setPrice(e.target.value);
            }
          }}
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        />
        <div
          className="cursor-pointer border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
          onClick={() => {
            setIsImage(!isImage);
          }}
        >
          <p>select image</p>
        </div>
        <div
          className={`${
            isImage ? "flex" : "hidden"
          } border border-gray-300 shadow shadow-gray-200 w-[80%] flex-col items-center gap-6 py-6`}
        >
          <select
            name=""
            id=""
            onChange={(e) => {
              setimageModel(e.target.value);
            }}
          >
            <option value="" disabled hidden>
              how to use image ?
            </option>
            <option value="file">file</option>
            <option value="URL">URL</option>
          </select>
          {imageModel == "file" ? (
            <div className="">
              <label
                htmlFor="images"
                className="cursor-pointer border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
              >
                select images
              </label>

              <input
                type="file"
                name="images"
                id="images"
                min={0}
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (!files.length) return;

                  const formData = new FormData();
                  files.forEach((file) => formData.append("images", file));
                  setLoading(true);
                  fetch("/api/upload-image", { method: "POST", body: formData })
                    .then((res) => {
                      if (!res.ok) throw new Error(res.status);
                      return res.json();
                    })
                    .then((data) => {
                      setImages(data.urls);
                      console.log(data.urls);
                      setLoading(false);
                      setImagesURL("");
                    })
                    .catch((err) => console.error("Upload failed:", err));
                }}
                className="hidden"
                multiple
                accept="image/*"
              />
            </div>
          ) : (
            <div className="w-full flex justify-center gap-3">
              <input
                type="text"
                placeholder="images URL..."
                name="title"
                ref={inputImage}
                className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
              />

              <button
                className="btn btn-yellow"
                onClick={() => {
                  const value = inputImage.current.value.trim();
                  if (!value) return; // خالی بود، هیچی اضافه نشه

                  setImagesURL((prev) => [...prev, value]);
                  inputImage.current.value = "";
                  setImages([]); // بهتره [] باشه نه ""
                }}
              >
                add
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-5 justify-between items-center">
          {loading && <p>loading...</p>}
          {images &&
            images.length > 0 &&
            images?.map((image) => {
              return (
                <Image
                  src={image}
                  alt="image"
                  width={100}
                  height={100}
                  key={image}
                  className="border border-gray-200 rounded-sm"
                ></Image>
              );
            })}
        </div>
        <select
          name="category"
          id=""
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          defaultValue=""
          className="border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        >
          <option value="" disabled hidden>
            category
          </option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home-Kitchen">Home-Kitchen</option>
          <option value="groceries">groceries</option>
          <option value="Books-Stationery">Books-Stationery</option>
          <option value="Sports-Entertainment">Sports-Entertainment</option>
          <option value="Beauty-Personal-Care">Beauty-Personal-Care</option>
        </select>
        <button
          className="btn btn-yellow"
          onClick={() => {
            console.log(images.length ? images : imagesURL);
            console.log(title);
            console.log(desc);
            console.log(price);
            console.log(category);

            async function fetchData() {
              if (
                !title ||
                !desc ||
                !price ||
                (!images.length && !imagesURL.length) ||
                !category
              ) {
                setNotCompeleted(true);
                return;
              }
              if (price <= 0) {
                console.log(price);
                setPriceError(true);
                return;
              }

              let { data, error } = await supabase.from("products").insert({
                id: `${new Date().getTime()}${Math.floor(
                  Math.random() * 1000000
                )}`,
                productsId: `${new Date().getTime()}${Math.floor(
                  Math.random() * 1000000
                )}`,
                title: title,
                price: price,
                date: new Date().getTime(),
                desc: desc,
                imageURL: images.length ? images : imagesURL,
                category: category,
                userId: isLogin?.userId,
              });
              console.log(data);
              error ? setError(true) : setError(false);
              navigate.push("/");
            }
            fetchData();
          }}
        >
          add product
        </button>
        {notCompeleted && (
          <p className="text-red-500">please completed all input</p>
        )}
        {/* { notIsLogin && <p className="text-red-500">please login</p>} */}
        {error && <p className="text-red-500">try again</p>}
        {priceError && <p className="text-red-500">your price is not valid</p>}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center mt-5">
        <button
          className="btn btn-yellow"
          onClick={() => {
            navigate.push("/account");
          }}
        >
          login
        </button>
      </div>
    );
  }
}
