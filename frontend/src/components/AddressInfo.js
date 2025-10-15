import React, { useState } from 'react';
import { MapPin, Phone, Clock, Plus, Trash2, Home } from 'lucide-react';

const AddressInfo = ({ data, updateData }) => {
  const [previousAddresses, setPreviousAddresses] = useState(data.previous_addresses || []);

  const handleCurrentAddressChange = (field, value) => {
    updateData('current_address', { ...data.current_address, [field]: value });
  };

  const handlePermanentAddressChange = (field, value) => {
    updateData('permanent_address', { ...data.permanent_address, [field]: value });
  };

  const addPreviousAddress = () => {
    const newAddress = {
      town_or_city_name: '',
      phone_number: '',
      duration_of_stay: { raw: '' },
      address_type: 'previous'
    };
    const updatedAddresses = [...previousAddresses, newAddress];
    setPreviousAddresses(updatedAddresses);
    updateData('previous_addresses', updatedAddresses);
  };

  const removePreviousAddress = (index) => {
    const updatedAddresses = previousAddresses.filter((_, i) => i !== index);
    setPreviousAddresses(updatedAddresses);
    updateData('previous_addresses', updatedAddresses);
  };

  const handlePreviousAddressChange = (index, field, value) => {
    const updatedAddresses = [...previousAddresses];
    if (field === 'duration_of_stay') {
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        duration_of_stay: { ...updatedAddresses[index].duration_of_stay, raw: value }
      };
    } else {
      updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    }
    setPreviousAddresses(updatedAddresses);
    updateData('previous_addresses', updatedAddresses);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <MapPin className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
      </div>

      <div className="space-y-8">
        {/* Current Address */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Home className="h-5 w-5 text-primary-600 mr-2" />
            Current Address
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  value={data.current_address.full_address || ''}
                  onChange={(e) => handleCurrentAddressChange('full_address', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter complete current address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Town/City *
              </label>
              <input
                type="text"
                value={data.current_address.town_or_city_name}
                onChange={(e) => handleCurrentAddressChange('town_or_city_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter town/city name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                value={data.current_address.state || ''}
                onChange={(e) => handleCurrentAddressChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter state/province"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={data.current_address.postal_code || ''}
                onChange={(e) => handleCurrentAddressChange('postal_code', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter postal code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={data.current_address.phone_number}
                  onChange={(e) => handleCurrentAddressChange('phone_number', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Phone number at current address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration of Stay
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.current_address.duration_of_stay.raw}
                  onChange={(e) => handleCurrentAddressChange('duration_of_stay', { raw: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 2 years, 6 months"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Permanent Address */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 text-primary-600 mr-2" />
            Permanent Address
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  value={data.permanent_address.full_address || ''}
                  onChange={(e) => handlePermanentAddressChange('full_address', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter complete permanent address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Town/City *
              </label>
              <input
                type="text"
                value={data.permanent_address.town_or_city_name}
                onChange={(e) => handlePermanentAddressChange('town_or_city_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter town/city name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                value={data.permanent_address.state || ''}
                onChange={(e) => handlePermanentAddressChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter state/province"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={data.permanent_address.postal_code || ''}
                onChange={(e) => handlePermanentAddressChange('postal_code', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter postal code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={data.permanent_address.phone_number}
                  onChange={(e) => handlePermanentAddressChange('phone_number', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Phone number at permanent address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration of Stay
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.permanent_address.duration_of_stay.raw}
                  onChange={(e) => handlePermanentAddressChange('duration_of_stay', { raw: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 10 years, 2 months"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Previous Addresses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <MapPin className="h-5 w-5 text-primary-600 mr-2" />
              Previous Addresses
            </h3>
            <button
              type="button"
              onClick={addPreviousAddress}
              className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Address
            </button>
          </div>

          {previousAddresses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No previous addresses added yet.</p>
              <p className="text-sm">Click "Add Address" to add previous addresses.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {previousAddresses.map((address, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-700">Previous Address {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removePreviousAddress(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <textarea
                          value={address.town_or_city_name}
                          onChange={(e) => handlePreviousAddressChange(index, 'town_or_city_name', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          rows="2"
                          placeholder="Enter previous address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          value={address.phone_number}
                          onChange={(e) => handlePreviousAddressChange(index, 'phone_number', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration of Stay
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={address.duration_of_stay.raw}
                          onChange={(e) => handlePreviousAddressChange(index, 'duration_of_stay', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="e.g., 1 year, 3 months"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Address information is used for various forms including background verification and employment records. You can add multiple previous addresses if needed.
        </p>
      </div>
    </div>
  );
};

export default AddressInfo;