"use client";

import { supabase } from "@/app/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function EditProduct({ product }) {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [images, setImages] = useState();
  const [discount, setDiscount] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [error, setError] = useState(false);

  let navigate = useRouter();

  return (
    <div className="">
      <Image
        src={"/icon/edit.svg"}
        width={20}
        height={20}
        alt="edit"
        className="m-3 absolute cursor-pointer"
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      ></Image>
      <div className="w-full flex justify-center items-center mt-20 ">
        {isVisible ? (
          <div className="z-50 fixed mt-44 w-[80%] border border-gray-200 shadow shadow-gray-300 bg-white px-3 py-5 flex flex-col items-center gap-5 rounded-sm">
            <Image
              src={"/icon/plus.svg"}
              width={25}
              height={25}
              alt="edit"
              className="cursor-pointer rotate-45"
              onClick={() => {
                setIsVisible(false);
              }}
            ></Image>
            <h2 className="text-gray-600">Edit Product</h2>
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
            <div className="flex gap-5 justify-between items-center"></div>
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
              <option value="Sports & Entertainment">
                Sports & Entertainment
              </option>
              <option value="Beauty & Personal Care">
                Beauty & Personal Care
              </option>
            </select>
            <input
              type="number"
              placeholder="discount..."
              name="desc"
              onChange={(e) => {
                if (e.target.value >= 1) {
                  setDiscount(e.target.value);
                }
              }}
              min={0}
              className="w-[50%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
            />
            <button
              className="btn btn-yellow"
              onClick={() => {
                let updatedData = {};
                if (title) updatedData.title = title;
                if (desc) updatedData.desc = desc;
                if (price) updatedData.price = price;
                if (images) updatedData.imageURL = images;
                if (category) updatedData.category = category;
                if (discount) updatedData.discount = discount;

                console.log(updatedData);
                async function fetchData() {
                  let { data, error } = await supabase
                    .from("products")
                    .update(updatedData)
                    .eq("productsId", product?.productsId)
                    .select();
                  if (error) {
                    setError(true);
                  } else {
                    setError(false);
                    console.log(data);
                    setIsVisible(false);
                    navigate.push("/");
                  }
                }
                fetchData();
              }}
            >
              edit product
            </button>
            <button
              className="btn btn-red"
              onClick={() => {
                setIsDelete(true);
              }}
            >
              delet proruct
            </button>
            <div className={`${isDelete ? "flex" : "hidden"} gap-4 `}>
              <button
                className="btn btn-red"
                onClick={() => {
                  async function fetchData() {
                    let { data, error } = await supabase
                      .from("products")
                      .delete()
                      .eq("productsId", product.productsId);

                    if (error) {
                      setError(true);
                    } else {
                      navigate.push("/");
                    }
                  }
                  fetchData();
                }}
              >
                delete
              </button>
              <button
                className="btn btn-yellow"
                onClick={() => {
                  setIsDelete(false);
                }}
              >
                cancel
              </button>
            </div>
            {error && <p className="text-red-500">try again please</p>}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default EditProduct;
