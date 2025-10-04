import React from "react";

const SellOnPage = () => {
  const advantages = [
    { title: "500 000", desc: "oylik tashriflar" },
    { title: "> 300", desc: "kunlik buyurtmalar" },
    { title: "7 yil", desc: "O‘zbekiston bozorida" },
    { title: "Kam komissiyalar", desc: "boshqa saytlarga qaraganda o‘rtacha 12% past" },
    { title: "Tez to‘lovlar", desc: "haftada 1 marta" },
    { title: "To‘liq qo‘llab-quvvatlash", desc: "Biz hamkorlikning har bir bosqichida yordam beramiz" },
  ];

  const workModels = [];

  const marketplaceTasks = [
    { title: "Kuzatuvchilar", desc: "Biz ko'p millionli auditoriyaga kirish imkoniyatini beramiz" },
    { title: "Buyurtmani qayta ishlash", desc: "Biz barcha kiruvchi buyurtmalarni qayta ishlaymiz" },
    { title: "Yetkazib berish", desc: "Biz sizning mahsulotlaringizni mijozlarga yetkazib beramiz" },
    { title: "Hisobotlar", desc: "Biz real vaqtda analitik hisobotlarni taqdim etamiz" },
    { title: "Reklamalar", desc: "Biz sizning brendingizni targ'ib qilish va reklama qilishda yordam beramiz" },
    { title: "Nosozliklarsiz", desc: "Biz uzluksiz ishlashni kafolatlaymiz" }
  ];

  const yourTasks = [
    { title: "Mahsulot", desc: "Omboringizda mahsulotlaringizni saqlaysiz" },
    { title: "Narxi", desc: "Mahsulot narxlari va chegirmalarini sozlaysiz" },
    { title: "Контент", desc: "Mahsulot kartalariga kontent va tavsiflarni qo'shasiz" },
    { title: "Analitika", desc: "Shaxsiy hisobingizda savdo va mukofotingizni kuzatib borasiz" },
  ];

  const deliveryModels = [
    {
      title: "Olcha tomonidan yetkazib berish",
      desc: "Buyurtmani tasdiqlaganingizdan so'ng, bizning kuryerimiz tovarlarni olish uchun sizning omboringizga keladi. Keyinchalik, tovarlar TTMga (tovarlarni tayyorlash markazi) va u yerdan mijozga yuboriladi. Bunday holda, ko‘tarilgan komissiya qo‘llaniladi."
    },
    {
      title: "Sotuvchi tomonidan yetkazib berish",
      desc: "Buyurtmani tasdiqlaganingizdan so'ng, siz o'zingiz bizga TTM (tovarlarni tayyorlash markazi) ga olib kelasiz. Keyin kuryerimiz uni xaridorga yetkazib beradi. Bunday holda, kamaytirilgan komissiya qo‘llaniladi."
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Ecommerceda soting</h1>
          <p className="text-lg text-gray-600 mb-6">
            Olcha do'koniga mahsulotlaringizni ro'yxatga kiriting va savdolaringizni oshiring
          </p>
          <button className="btn btn-primary">Hamkorga aylaning</button>
        </section>

        {/* Afzalliklar */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Bizning afzalliklarimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((item, i) => (
              <div key={i} className="card bg-base-200 shadow hover:shadow-lg transition">
                <div className="card-body text-center">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mehnat modellari */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Mehnat modellari</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workModels.map((m, i) => (
              <div key={i} className="card bg-base-200 shadow hover:shadow-lg">
                <div className="card-body">
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="text-sm text-gray-600">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vazifalar */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="text-xl font-bold mb-4">Bizning vazifalar</h3>
              <ul className="space-y-3">
                {marketplaceTasks.map((t, i) => (
                  <li key={i}>
                    <span className="font-semibold">{t.title}</span>
                    <p className="text-sm text-gray-600">- {t.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="text-xl font-bold mb-4">Siz nima qilasiz</h3>
              <ul className="space-y-3">
                {yourTasks.map((t, i) => (
                  <li key={i}>
                    <span className="font-semibold">{t.title}</span>
                    <p className="text-sm text-gray-600">- {t.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Yetkazib berish modellari */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Yetkazib berish modellari</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {deliveryModels.map((m, i) => (
              <div key={i} className="card bg-base-200 shadow hover:shadow-lg">
                <div className="card-body">
                  <h3 className="font-semibold mb-2">{m.title}</h3>
                  <p className="text-sm text-gray-600">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video */}
          <div className="mt-10 flex justify-center">
            <video
              src="https://olcha.uz/image/original/media/cdn_1/2024-03-18/f9jMCMaPxCPyjy1ORPfn8L1Um1qJVIv6AS1vb0GtpfDh7wt2NxHAZtzPeWa8.mp4"
              controls
              className="rounded-2xl shadow-lg w-full max-w-3xl"
            />
          </div>
        </section>

        {/* Savol va javob */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">Savol va javob</h2>
              <p className="text-gray-600 mb-6">
                Savollaringiz bormi? Bizga telegram orqali yozing yoki qo‘ng‘iroq qiling.
              </p>
              <div className="flex gap-3 mb-4">
                <button className="btn btn-neutral">Qo‘ng‘iroq qilish</button>
                <button className="btn btn-info">Telegramga yozish</button>
              </div>
              <button className="btn btn-success">Ko‘proq javoblar bilimlar bazasida →</button>
            </div>

            <div className="space-y-3">
              <div className="collapse collapse-arrow bg-base-200 rounded-xl">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  Qanday qilib onlayn sotishni boshlashim mumkin?
                </div>
                <div className="collapse-content">
                  <p>Olcha platformasida ro‘yxatdan o‘ting va mahsulotlaringizni qo‘shing.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200 rounded-xl">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  Narsalarni sotish uchun eng yaxshi do‘kon qaysi?
                </div>
                <div className="collapse-content">
                  <p>Olcha marketplace – tez o‘sayotgan va ishonchli platforma.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200 rounded-xl">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  Olchada do‘kon ochish qancha turadi?
                </div>
                <div className="collapse-content">
                  <p>Do‘kon ochish bepul, faqat komissiya olinadi.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellOnPage;
