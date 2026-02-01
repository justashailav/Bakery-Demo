
import { useState } from "react";

export default function CustomCake({ close }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    occasion: "",
    weight: "",
    flavor: "",
    date: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (!form.name || !form.phone || !form.occasion) {
      alert("Please fill required fields");
      return;
    }

    const text = `
🎂 Custom Cake Order

Name: ${form.name}
Phone: ${form.phone}
Occasion: ${form.occasion}
Weight: ${form.weight}
Flavor: ${form.flavor}
Date: ${form.date}

Details:
${form.message}
    `;

    window.open(
      `https://wa.me/919015118744?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    close(); // CLOSE MODAL after submit
  };

  return (
    <div className="space-y-4">
      <input name="name" placeholder="Your Name *" className="w-full p-3 border rounded-lg" onChange={handleChange} />
      <input name="phone" placeholder="Phone Number *" className="w-full p-3 border rounded-lg" onChange={handleChange} />

      <select name="occasion" className="w-full p-3 border rounded-lg" onChange={handleChange}>
        <option value="">Select Occasion *</option>
        <option>Birthday</option>
        <option>Wedding</option>
        <option>Anniversary</option>
        <option>Baby Shower</option>
        <option>Other</option>
      </select>

      <input name="weight" placeholder="Cake Weight (e.g. 1kg)" className="w-full p-3 border rounded-lg" onChange={handleChange} />
      <input name="flavor" placeholder="Preferred Flavor" className="w-full p-3 border rounded-lg" onChange={handleChange} />
      <input type="date" name="date" className="w-full p-3 border rounded-lg" onChange={handleChange} />

      <textarea name="message" rows="3" placeholder="Design / message on cake" className="w-full p-3 border rounded-lg" onChange={handleChange} />

      <button
        onClick={submit}
        className="w-full bg-[#6B3E2E] text-white py-3 rounded-full font-semibold"
      >
        Send on WhatsApp
      </button>
    </div>
  );
}
