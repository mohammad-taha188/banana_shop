"use client";

import { supabase } from "@/app/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import GetID from "./GetID";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [images, setImages] = useState();
  const [category, setCategory] = useState();

  const [loading, setLoading] = useState(false);
  const [notCompeleted, setNotCompeleted] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);

  let navigate = useRouter();

  useEffect(() => {
    async function checkIsLogin() {
      let login = await GetID();

      login?.userId ? setIsLogin(true) : setIsLogin(false);
    }
    checkIsLogin();
  }, []);
  if (isLogin) {
    return (
      <div className=" flex flex-col items-center gap-5 mt-3">
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
          min={0}
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        />
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
              })
              .catch((err) => console.error("Upload failed:", err));
          }}
          className="hidden"
          multiple
          accept="image/*"
        />
        <div className="flex gap-5 justify-between items-center">
          {loading && <p>loading...</p>}
          {images &&
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
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Books & Stationery">Books & Stationery</option>
          <option value="Sports & Entertainment">Sports & Entertainment</option>
          <option value="Beauty & Personal Care">Beauty & Personal Care</option>
        </select>
        <button
          className="btn btn-yellow"
          onClick={() => {
            async function fetchData() {
              if (!title || !desc || !price || !images || !category) {
                setNotCompeleted(true);
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
                desc: desc,
                imageURL: images,
                category: category,
                userId: isLogin?.userId,
              });
              console.log(data);
              error ? setError(true) : setError(false);
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
