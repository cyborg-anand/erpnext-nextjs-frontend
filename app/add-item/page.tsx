import { useState, useEffect } from 'react';
import { createItem, getItems, updateItem, deleteItem } from '../utils/api';

const Items = () => {
  const [items, setItems] = useState<any[]>([]);
  const [itemName, setItemName] = useState('');
  const [editingItem, setEditingItem] = useState('');

  const fetchItems = async () => {
    const response = await getItems();
    if (response) {
      setItems(response.data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = { item_name: itemName, stock_uom: 'Nos' };
    if (editingItem) {
      await updateItem(editingItem, itemData);
    } else {
      await createItem(itemData);
    }
    setItemName('');
    setEditingItem('');
    fetchItems();
  };

  const handleDelete = async (itemName: string) => {
    await deleteItem(itemName);
    fetchItems();
  };

  const handleEdit = (itemName: string) => {
    setItemName(itemName);
    setEditingItem(itemName);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage Items</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          className="border p-2 rounded mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingItem ? 'Update' : 'Add'} Item
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.name} className="mb-2 flex justify-between items-center">
            {item.item_name}
            <div>
              <button
                onClick={() => handleEdit(item.item_name)}
                className="text-yellow-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.item_name)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
