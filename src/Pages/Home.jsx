import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CakePreview from "./CakePreview";

import heroCake from "../assets/herocake.jpg";
import motichoor from "../assets/motichoor.jpeg";

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

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCakeForm, setShowCakeForm] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#6B3E2E] font-bold"
      : "text-gray-700";

  const orderProduct = (item) => {
    const msg = `Hi, I want to order ${item.name} (${item.price}).`;
    window.open(
      `https://wa.me/919015118744?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-[#FFF8F1] text-gray-800">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#6B3E2E]">
            Sweet<span className="text-pink-400">Crumbs</span>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-10 text-sm font-semibold">
            <Link to="/" className={isActive("/")}>Home</Link>
            <Link to="/menu" className={isActive("/menu")}>Menu</Link>
            <Link to="/about" className={isActive("/about")}>About</Link>
            <Link to="/contact" className={isActive("/contact")}>Contact</Link>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-3xl font-bold"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ================= MOBILE FULLSCREEN MENU ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h1 className="text-xl font-extrabold text-[#6B3E2E]">
              Sweet<span className="text-pink-400">Crumbs</span>
            </h1>

            <button
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col items-center justify-center h-[80vh] gap-8 text-xl font-semibold">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link to="/menu" onClick={() => setMobileOpen(false)}>
              Menu
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>

            <a
              href="https://wa.me/919015118744"
              className="mt-6 bg-green-500 text-white px-8 py-3 rounded-full font-semibold"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-16 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-4 py-1 rounded-full">
            Fresh bakery & traditional mithai
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Handmade <br />
            <span className="text-[#6B3E2E]">Sweets & Bakes</span>
          </h2>

          <p className="text-gray-600 text-lg">
            From ladoos to designer cakes — made fresh every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/menu"
              className="bg-[#6B3E2E] text-white px-8 py-3 rounded-full font-semibold text-center"
            >
              Explore Menu
            </Link>

            <button
              onClick={() => setShowCakeForm(true)}
              className="border border-[#6B3E2E] text-[#6B3E2E] px-8 py-3 rounded-full font-semibold hover:bg-[#6B3E2E] hover:text-white"
            >
              Custom Cake 🎂
            </button>
          </div>
        </div>

        <img
          src={heroCake}
          alt="Bakery"
          className="rounded-3xl shadow-2xl w-full h-72 sm:h-96 object-cover"
        />
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h3 className="text-4xl font-extrabold text-center mb-10">
          Sweets & Bakery Specials
        </h3>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-2 md:justify-center">
          {["All", "Ladoo", "Cake", "Pastry", "Cookies"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#6B3E2E] text-white"
                  : "bg-white border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products
            .filter(
              (p) => activeCategory === "All" || p.category === activeCategory
            )
            .map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow">
                <div className="h-48 sm:h-56 overflow-hidden rounded-t-2xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4 text-center">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-[#6B3E2E]">{item.price}</p>
                  <button
                    onClick={() => orderProduct(item)}
                    className="mt-4 w-full bg-pink-400 py-3 rounded-full font-semibold"
                  >
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white py-8 text-center text-sm text-gray-600">
        © 2026 SweetCrumbs Bakery
      </footer>

      {/* ================= CAKE MODAL ================= */}
      {showCakeForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCakeForm(false)}
              className="absolute top-3 right-3 text-2xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-extrabold text-center mb-4 text-[#6B3E2E]">
              Design Your Cake 🎂
            </h3>

            <CakePreview />
          </div>
        </div>
      )}
    </div>
  );
}
