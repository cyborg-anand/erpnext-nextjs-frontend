import { useState, useEffect } from 'react';
import { createCompany, getCompanies, updateCompany, deleteCompany } from '../utils/api';

const Companies = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [editingCompany, setEditingCompany] = useState('');

  const fetchCompanies = async () => {
    const response = await getCompanies();
    if (response) {
      setCompanies(response.data);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const companyData = { company_name: companyName, default_currency: 'INR' };
    if (editingCompany) {
      await updateCompany(editingCompany, companyData);
    } else {
      await createCompany(companyData);
    }
    setCompanyName('');
    setEditingCompany('');
    fetchCompanies();
  };

  const handleDelete = async (companyName: string) => {
    await deleteCompany(companyName);
    fetchCompanies();
  };

  const handleEdit = (companyName: string) => {
    setCompanyName(companyName);
    setEditingCompany(companyName);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage Companies Here</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            className="border p-2 rounded mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingCompany ? 'Update' : 'Add'} Company
          </button>
        </form>
  
        <ul>
          {companies.map((company) => (
            <li key={company.name} className="mb-2 flex justify-between items-center">
              {company.company_name}
              <div>
                <button
                  onClick={() => handleEdit(company.company_name)}
                  className="text-yellow-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(company.company_name)}
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
  
  export default Companies;
  
