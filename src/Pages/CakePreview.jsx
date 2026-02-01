import { useEffect, useState } from "react";

/* ================= CAKE IMAGES ================= */
const cakeImages = {
  Round: {
    Chocolate:
      "https://5.imimg.com/data5/SELLER/Default/2024/6/430032552/NS/YQ/YI/222540455/chocolate-cake-500x500.jpg",
    Vanilla:
      "https://thescranline.com/wp-content/uploads/2025/02/VANILLA-CAKE-25-S-01.jpg",
    "Red Velvet":
      "https://thescranline.com/wp-content/uploads/2023/06/RED-VELVET-CAKE-23-S-01.jpg",
  },
  Square: {
    Chocolate:
      "https://cakofy.com/cdn/shop/files/A_decadent_Square_Truffle_Cake_Gurgaon_Delhi_NCR_Cakofy.png?v=1754301306",
    Vanilla:
      "https://bakings.in/wp-content/uploads/2024/08/Moms-Pineapple-Delight-Square-Cake.jpg",
    "Red Velvet":
      "https://onehotoven.com/wp-content/uploads/2025/04/feature-RV-cake-1-1.jpg",
  },
};

/* ================= PRICING ================= */
const priceByWeight = {
  "0.5 Kg": 400,
  "1 Kg": 700,
  "2 Kg": 1300,
  "3 Kg": 1900,
};

export default function CakePreview() {
  const [shape, setShape] = useState("Round");
  const [flavor, setFlavor] = useState("Chocolate");
  const [weight, setWeight] = useState("1 Kg");
  const [occasion, setOccasion] = useState("Birthday");
  const [eggless, setEggless] = useState(false);
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [availability, setAvailability] = useState(null);
  const [referenceImage, setReferenceImage] = useState(null);
  const [referencePreview, setReferencePreview] = useState(null);
  const [expressDelivery, setExpressDelivery] = useState(false);

  const image = cakeImages[shape][flavor];
  const basePrice = priceByWeight[weight];

  const finalPrice =
    basePrice + (eggless ? 100 : 0) + (expressDelivery ? 150 : 0);

  /* ================= HELPERS ================= */
  const checkAvailability = (dateValue) => {
    const selected = new Date(dateValue);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = (selected - today) / (1000 * 60 * 60 * 24);
    const day = selected.getDay();

    if (day === 0) return { status: "Not Available", color: "text-red-600" };
    if (diffDays <= 1)
      return { status: "Limited Slots", color: "text-yellow-600" };
    return { status: "Available", color: "text-green-600" };
  };

  const isToday = (date) => {
    if (!date) return false;
    const selected = new Date(date);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selected.getTime() === today.getTime();
  };

  const orderCake = () => {
    const text = `
Custom Cake Order 🎂

Occasion: ${occasion}
Shape: ${shape}
Flavor: ${flavor}
Weight: ${weight}
Eggless: ${eggless ? "Yes" : "No"}
Express Delivery: ${expressDelivery ? "Yes (+₹150)" : "No"}
Delivery Date: ${deliveryDate || "Not selected"}
Message on Cake: ${message || "N/A"}

Reference Image:
${referenceImage ? "I will send the reference image separately in this chat." : "Not provided"}

Total Price: ₹${finalPrice}

Please confirm availability.
`;

    window.open(
      `https://wa.me/919015118744?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const SummaryRow = ({ label, value }) => (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setReferenceImage(file);
    setReferencePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!isToday(deliveryDate)) setExpressDelivery(false);
  }, [deliveryDate]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* ================= LEFT (PREVIEW) ================= */}
      <div className="md:w-5/12 space-y-4">
        <div className="h-56 sm:h-64 rounded-2xl overflow-hidden shadow">
          <img src={image} alt="Cake" className="h-full w-full object-cover" />
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500">Estimated Price</p>
          <p className="text-2xl font-extrabold text-[#6B3E2E]">
            ₹{finalPrice}
          </p>
        </div>

        <div className="bg-[#FFF8F1] rounded-xl p-4 space-y-2">
          <p className="font-bold text-sm">Order Summary</p>
          <SummaryRow label="Occasion" value={occasion} />
          <SummaryRow label="Shape" value={shape} />
          <SummaryRow label="Flavor" value={flavor} />
          <SummaryRow label="Weight" value={weight} />
          <SummaryRow label="Eggless" value={eggless ? "Yes" : "No"} />
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-[#6B3E2E]">₹{finalPrice}</span>
          </div>
        </div>

        <button
          onClick={orderCake}
          className="w-full bg-green-600 text-white py-3 rounded-full font-semibold text-lg"
        >
          Order on WhatsApp
        </button>
      </div>

      {/* ================= RIGHT (FORM) ================= */}
      <div className="md:w-7/12 bg-[#FFF8F1] rounded-2xl p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Occasion</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full mt-1 border rounded-lg p-2"
            >
              <option>Birthday</option>
              <option>Wedding</option>
              <option>Anniversary</option>
              <option>Kids Party</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Weight</label>
            <select
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full mt-1 border rounded-lg p-2"
            >
              <option>0.5 Kg</option>
              <option>1 Kg</option>
              <option>2 Kg</option>
              <option>3 Kg</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Cake Shape</label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["Round", "Square"].map((item) => (
              <button
                key={item}
                onClick={() => setShape(item)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  shape === item ? "bg-[#6B3E2E] text-white" : "bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Flavor</label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["Chocolate", "Vanilla", "Red Velvet"].map((item) => (
              <button
                key={item}
                onClick={() => setFlavor(item)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  flavor === item ? "bg-pink-400" : "bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Delivery Date</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => {
                setDeliveryDate(e.target.value);
                setAvailability(checkAvailability(e.target.value));
              }}
              className="w-full mt-1 border rounded-lg p-2"
            />
            {availability && (
              <p className={`text-xs mt-1 ${availability.color}`}>
                {availability.status}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-6 sm:mt-0">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={eggless}
                onChange={() => setEggless(!eggless)}
              />
              Eggless (+₹100)
            </label>

            <label
              className={`flex items-center gap-2 text-sm ${
                isToday(deliveryDate) ? "" : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <input
                type="checkbox"
                disabled={!isToday(deliveryDate)}
                checked={expressDelivery}
                onChange={() => setExpressDelivery(!expressDelivery)}
              />
              ⚡ Express Delivery (+₹150)
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Message on Cake</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mt-1 border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Reference Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm mt-1"
          />
          {referencePreview && (
            <div className="mt-3 flex items-center gap-3">
              <img
                src={referencePreview}
                alt="Reference"
                className="h-20 w-20 rounded-lg object-cover border"
              />
              <p className="text-xs text-gray-500">
                This image will be sent separately on WhatsApp after chat opens
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
