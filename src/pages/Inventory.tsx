import React, { useEffect, useState } from "react";
import axios from "axios";

interface InventoryItem {
  id?: number;
  name: string;
  category: string;
  stock: number;
  unit: string;
  unit_price: number;
  reorder_level: number;
  last_updated: string;
}

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState<InventoryItem>({
    name: "",
    category: "",
    stock: 0,
    unit: "",
    unit_price: 0,
    reorder_level: 0,
    last_updated: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/inventory");
      setInventory(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:8000/api/inventory", newItem);
      fetchInventory();
      closeModal();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const handleEditItem = async () => {
    if (!newItem.id) return;

    try {
      await axios.put(
        `http://localhost:8000/api/inventory/${newItem.id}`,
        newItem
      );
      fetchInventory();
      closeModal();
    } catch (err) {
      console.error("Error editing item:", err);
    }
  };

  const openEditModal = (item: InventoryItem) => {
    setNewItem(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    resetForm();
  };

  const resetForm = () => {
    setNewItem({
      name: "",
      category: "",
      stock: 0,
      unit: "",
      unit_price: 0,
      reorder_level: 0,
      last_updated: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Inventory</h2>
        <button
          onClick={() => {
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Item
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Category</th>
            <th className="border px-3 py-2">Stock</th>
            <th className="border px-3 py-2">Unit</th>
            <th className="border px-3 py-2">Unit Price</th>
            
            <th className="border px-3 py-2">Last Updated</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="border px-3 py-2">{item.name}</td>
              <td className="border px-3 py-2">{item.category}</td>
              <td className="border px-3 py-2">{item.stock}</td>
              <td className="border px-3 py-2">{item.unit}</td>
              <td className="border px-3 py-2">
                ₱{Number(item.unit_price).toFixed(2)}
              </td>
              <td className="border px-3 py-2">{item.reorder_level}</td>
              <td className="border px-3 py-2">{item.last_updated}</td>
              <td className="border px-3 py-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={newItem.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={newItem.category}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={newItem.stock}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={newItem.unit}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="unit_price"
                placeholder="Unit Price"
                step="0.01"
                value={newItem.unit_price}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="reorder_level"
                placeholder=""
                value={newItem.reorder_level}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="last_updated"
                value={newItem.last_updated}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={isEditing ? handleEditItem : handleAddItem}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
