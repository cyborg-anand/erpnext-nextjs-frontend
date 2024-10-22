import { useState, useEffect } from 'react';
import { createInvoice, getItems, getCompanies } from '../utils/api';

const CreateInvoice = () => {
  const [items, setItems] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [customer, setCustomer] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch items and companies on page load
  useEffect(() => {
    const fetchData = async () => {
      const itemsResponse = await getItems();
      const companiesResponse = await getCompanies();
      if (itemsResponse && companiesResponse) {
        setItems(itemsResponse.data);
        setCompanies(companiesResponse.data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData = {
      customer,
      company: selectedCompany,
      items: [
        {
          item_code: selectedItem,
          qty: quantity,
        },
      ],
    };

    const response = await createInvoice(invoiceData);
    if (response) {
      alert('Invoice created successfully');
    } else {
      alert('Error creating invoice');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Customer:</label>
        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
          required
        />

        <label className="block mb-2">Select Company:</label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
          required
        >
          <option value="" disabled>Select a company</option>
          {companies.map((company) => (
            <option key={company.name} value={company.name}>
              {company.company_name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Select Item:</label>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
          required
        >
          <option value="" disabled>Select an item</option>
          {items.map((item) => (
            <option key={item.name} value={item.name}>
              {item.item_name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 rounded mb-4 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
