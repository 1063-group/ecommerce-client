import React, { useEffect, useState } from "react";

const DiscountCard = () => {
  // Boshlang‘ich vaqt (soat, minut, sekund)
  const [time, setTime] = useState({
    hours: 6,
    minutes: 48,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatlash (masalan: 06, 07 ...)
  const formatTime = (num) => String(num).padStart(2, "0");

  return (
    <div className="w-1/4 border-2 border-red-500 rounded-xl p-2 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
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
      <div className="flex-1 flex items-center justify-center">
        <img src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=" alt="" />
      </div>
    </div>
  );
};

export default DiscountCard;
