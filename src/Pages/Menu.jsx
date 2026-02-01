import { useState } from "react";

import motichoor from "../assets/motichoor.jpeg"
const products = [
  {
    name: "Motichoor Ladoo",
    price: "₹499 / kg",
    category: "Ladoo",
    img: motichoor,
  },
  {
    name: "Besan Ladoo",
    price: "₹449 / kg",
    category: "Ladoo",
    img: "https://sangamsweets.in/cdn/shop/files/BesanLadduNew.webp?v=1745229887",
  },
  {
    name: "Chocolate Truffle Cake",
    price: "₹699",
    category: "Cake",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ73gwfixIJOfHQvoNcsDT228sisBgwZ7vGLA&s",
  },
  {
    name: "Red Velvet Pastry",
    price: "₹149",
    category: "Pastry",
    img: "https://www.simplytrinicooking.com/wp-content/uploads/red-velvet-cake.jpg",
  },
  {
    name: "Butter Cookies Box",
    price: "₹299",
    category: "Cookies",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCmyTLjhmZCPs4O9e1NBgXQtdMu3Ik-np3dQ&s",
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const openWhatsApp = (product) => {
    const message = `Hi, I want to order ${product.name} (${product.price}). Please share availability.`;
    const phone = "919015118744"; // replace with real number
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF8F1] pt-28">

      {/* PAGE HEADER */}
      <div className="text-center mb-14 px-6">
        <h1 className="text-5xl font-extrabold text-[#6B3E2E] mb-3">
          Our Menu
        </h1>
        <p className="text-gray-600">
          Fresh bakery items & traditional Indian sweets
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 px-6">
        {["All", "Ladoo", "Mithai", "Cake", "Pastry", "Cookies"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition
              ${
                activeCategory === cat
                  ? "bg-[#6B3E2E] text-white"
                  : "bg-white border hover:bg-[#6B3E2E] hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10 pb-24">
        {products
          .filter(
            (item) =>
              activeCategory === "All" ||
              item.category === activeCategory
          )
          .map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-[2rem] shadow hover:shadow-2xl transition overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.name}
                onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80")
                }
                className="h-60 w-full object-cover"
              />

              <div className="p-6 text-center space-y-3">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-[#6B3E2E] font-semibold">
                  {item.price}
                </p>

                <button
                  onClick={() => openWhatsApp(item)}
                  className="w-full bg-pink-400 text-black py-3 rounded-full font-semibold hover:bg-pink-500 transition"
                >
                  Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
