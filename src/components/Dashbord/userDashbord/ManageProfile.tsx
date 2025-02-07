import { useState } from "react";

export default function ManageProfile() {
  const [shippingAddress, setShippingAddress] = useState("");

  const handleSave = () => {
    console.log("Saved Address:", shippingAddress);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Manage Profile</h2>
      <p className="text-gray-600">Update your default shipping address.</p>

      <input
        type="text"
        placeholder="Enter your shipping address"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        className="w-full mt-4 p-2 border rounded-md"
      />

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Save Address
      </button>
    </div>
  );
}
