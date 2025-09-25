// src/pages/SingleProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Award,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

export default function SingleProducts() {
  const { id } = useParams(); // ✅ URL dan product ID olish
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState("6/128 GB");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ API chaqirish
  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-3 font-medium">Mahsulot yuklanmoqda...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error shadow-lg max-w-md">
          <span>❌ Mahsulot topilmadi. Iltimos, boshqa mahsulotni tanlang</span>
        </div>
      </div>
    );
  }

  const monthly = Math.round(product.price / 12);
  const discountedPrice =
    product.price - (product.price * (product.discountPercentage || 0)) / 100;
  const storageOptions = ["6/128 GB", "8/128 GB", "8/256 GB", "12/512 GB"];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-[95%] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <span
            className="link link-hover cursor-pointer"
            onClick={() => navigate("/")}
          >
            Bosh sahifa
          </span>
          <span>/</span>
          <span className="link link-hover capitalize">
            {product.category}
          </span>
          <span>/</span>
          <span className="font-bold">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="card bg-base-100 shadow-xl mb-6 relative">
                {/* Favorite & Share */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`btn btn-circle btn-sm ${
                      isFavorite ? "btn-error text-white" : "btn-outline"
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="btn btn-circle btn-sm btn-outline">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                  <div className="badge badge-error absolute top-4 left-4">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}

                {/* Main Image */}
                <figure className="p-6 h-96 flex items-center justify-center">
                  <img
                    src={product.images?.[selectedImage] || product.thumbnail}
                    alt={product.title}
                    className="max-h-full object-contain"
                  />
                </figure>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 justify-center">
                {product.images?.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`btn btn-sm rounded-lg ${
                      selectedImage === i
                        ? "btn-primary"
                        : "btn-outline border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="font-medium">{product.rating}</span>
              </div>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Storage Options */}
            <div>
              <h3 className="font-semibold mb-2">Xotira hajmi:</h3>
              <div className="flex flex-wrap gap-2">
                {storageOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedStorage(option)}
                    className={`btn btn-sm ${
                      selectedStorage === option
                        ? "btn-primary"
                        : "btn-outline border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2">Miqdor:</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-outline btn-sm"
                >
                  -
                </button>
                <span className="px-4 py-2 border rounded-lg bg-base-100 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn btn-outline btn-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <div className="flex justify-between bg-base-200 p-2 rounded-lg">
                <span>Brand:</span>
                <span className="font-semibold capitalize">
                  {product.brand || "Premium Brand"}
                </span>
              </div>
              <div className="flex justify-between bg-base-200 p-2 rounded-lg">
                <span>Kategoriya:</span>
                <span className="font-semibold capitalize">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between bg-base-200 p-2 rounded-lg">
                <span>Kafolat:</span>
                <span className="font-semibold">12 oy</span>
              </div>
            </div>

            {/* Service */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" /> Tez yetkazib berish
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" /> Kafolat
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-info" /> 14 kun qaytarish
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-warning" /> Sifat sertifikati
              </div>
            </div>
          </div>

          {/* Right Column - Purchase */}
          <div className="lg:col-span-3">
            <div className="card bg-base-100 shadow-xl sticky top-8 p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold">
                  {(discountedPrice * quantity).toLocaleString()} so'm
                </p>
                {product.discountPercentage > 0 && (
                  <p className="text-sm line-through text-gray-400">
                    {(product.price * quantity).toLocaleString()} so'm
                  </p>
                )}
                <p className="text-primary font-semibold">
                  {(monthly * quantity).toLocaleString()} so'm / 12 oy
                </p>
                <p className="text-xs text-gray-500">
                  0% foizsiz muddatli to'lov
                </p>
              </div>

              <div className="space-y-2">
                {/* Savatga qo‘shish tugmasi */}
                <button
                  className="btn btn-success w-full mb-2"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.title,
                        price: discountedPrice,
                        image: product.images?.[0] || product.thumbnail,
                        quantity,
                      })
                    );
                    navigate("/korzinka"); // ✅ Korzinka sahifasiga o‘tadi
                  }}
                >
                  Savatga qo‘shish
                </button>

                <button className="btn btn-primary w-full">
                  Bir klikda sotib olish
                </button>
              </div>

              <div className="divider"></div>

              <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-center">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>4 soatdan 4 ish kunigacha yetkazib beriladi</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Shield className="w-5 h-5 text-success" />
                  <span>100% xavfsiz to‘lov</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
