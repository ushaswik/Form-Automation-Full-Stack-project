import React, { useState } from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';

const References = ({ data, updateData }) => {
  const [references, setReferences] = useState(data.references || []);

  const addReference = () => {
    const newReference = {
      name: '',
      phone: '',
      designation_and_company: ''
    };
    const updatedReferences = [...references, newReference];
    setReferences(updatedReferences);
    updateData('references', updatedReferences);
  };

  const removeReference = (index) => {
    const updatedReferences = references.filter((_, i) => i !== index);
    setReferences(updatedReferences);
    updateData('references', updatedReferences);
  };

  const updateReference = (index, field, value) => {
    const updatedReferences = [...references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    setReferences(updatedReferences);
    updateData('references', updatedReferences);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">References</h2>
      </div>

      <div className="space-y-6">
        {references.map((reference, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Reference {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeReference(index)}
                className="text-red-600 hover:text-red-700 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={reference.name}
                  onChange={(e) => updateReference(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={reference.phone}
                  onChange={(e) => updateReference(index, 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Phone number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation & Company *
                </label>
                <input
                  type="text"
                  value={reference.designation_and_company}
                  onChange={(e) => updateReference(index, 'designation_and_company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Senior Manager, ABC Company"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addReference}
          className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Reference
        </button>
      </div>

      {references.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No references added yet</p>
          <p className="text-sm">Click "Add Reference" to get started</p>
        </div>
      )}
    </div>
  );
};

export default References;
