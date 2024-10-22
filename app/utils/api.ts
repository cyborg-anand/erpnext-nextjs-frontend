import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

const headers = {
  'Authorization': `token ${API_KEY}:${API_SECRET}`,
  'Content-Type': 'application/json',
};

// Create Item
export const createItem = async (itemData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/resource/Item`, itemData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

// Read Items (Fetch)
export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/resource/Item`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Update Item
export const updateItem = async (itemName: string, itemData: any) => {
  try {
    const response = await axios.put(`${API_URL}/api/resource/Item/${itemName}`, itemData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

// Delete Item
export const deleteItem = async (itemName: string) => {
  try {
    const response = await axios.delete(`${API_URL}/api/resource/Item/${itemName}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

// Create Company
export const createCompany = async (companyData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/resource/Company`, companyData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating company:', error);
  }
};

// Read Companies (Fetch)
export const getCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/resource/Company`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};

// Update Company
export const updateCompany = async (companyName: string, companyData: any) => {
  try {
    const response = await axios.put(`${API_URL}/api/resource/Company/${companyName}`, companyData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating company:', error);
  }
};

// Delete Company
export const deleteCompany = async (companyName: string) => {
  try {
    const response = await axios.delete(`${API_URL}/api/resource/Company/${companyName}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error deleting company:', error);
  }
};

// Create Invoice
export const createInvoice = async (invoiceData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/resource/Sales Invoice`, invoiceData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
  }
};
