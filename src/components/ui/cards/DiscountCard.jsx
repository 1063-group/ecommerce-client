import React, { useEffect, useState } from "react";

const DiscountCard = () => {
  const [time, setTime] = useState({ hours: 6, minutes: 48, seconds: 56 });
  const [productImg, setProductImg] = useState("");

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds -= 1;
        else {
          seconds = 59;
          if (minutes > 0) minutes -= 1;
          else {
            minutes = 59;
            if (hours > 0) hours -= 1;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Random product image
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=50");
        const data = await res.json();
        const random =
          data.products[Math.floor(Math.random() * data.products.length)];
        setProductImg(random.thumbnail || random.images?.[0]);
      } catch (err) {
        console.error("DiscountCard image fetch error:", err);
      }
    })();
  }, []);

  const formatTime = (num) => String(num).padStart(2, "0");

  return (
    <div className="w-1/4 border-2 border-primary rounded-xl flex flex-col justify-between overflow-hidden">
      <div className="flex justify-between items-center mb-4 p-4">
        <h2 className="font-bold text-lg">Товар дня</h2>
        <div className="flex gap-1 text-sm font-mono">
          <span className="px-1 py-0.5 border rounded">
            {formatTime(time.hours)}
          </span>
          :
          <span className="px-1 py-0.5 border rounded">
            {formatTime(time.minutes)}
          </span>
          :
          <span className="px-1 py-0.5 border rounded">
            {formatTime(time.seconds)}
          </span>
        </div>
      </div>

      {productImg && (
        <img
          src={productImg}
          alt="Discount product"
          className="w-full aspect-square object-cover"
        />
      )}
    </div>
  );
};

export default DiscountCard;
