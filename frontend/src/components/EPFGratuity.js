import React, { useState } from 'react';
import { User, Calendar, MapPin, Building, Plus, Trash2, FileText, Heart } from 'lucide-react';

const EPFGratuity = ({ data, updateData }) => {
  const [witnesses, setWitnesses] = useState(data.epf_and_gratuity?.witnesses || []);

  const handleChange = (field, value) => {
    updateData('epf_and_gratuity', { ...data.epf_and_gratuity, [field]: value });
  };

  const handleNomineeChange = (field, value) => {
    updateData('epf_and_gratuity', {
      ...data.epf_and_gratuity,
      nominee: { ...data.epf_and_gratuity.nominee, [field]: value }
    });
  };

  const handleFamilyMemberChange = (field, value) => {
    updateData('epf_and_gratuity', {
      ...data.epf_and_gratuity,
      family_member_1: { ...data.epf_and_gratuity.family_member_1, [field]: value }
    });
  };

  const addWitness = () => {
    const newWitnesses = [...witnesses, ''];
    setWitnesses(newWitnesses);
    updateData('epf_and_gratuity', { ...data.epf_and_gratuity, witnesses: newWitnesses });
  };

  const removeWitness = (index) => {
    const newWitnesses = witnesses.filter((_, i) => i !== index);
    setWitnesses(newWitnesses);
    updateData('epf_and_gratuity', { ...data.epf_and_gratuity, witnesses: newWitnesses });
  };

  const handleWitnessChange = (index, value) => {
    const newWitnesses = [...witnesses];
    newWitnesses[index] = value;
    setWitnesses(newWitnesses);
    updateData('epf_and_gratuity', { ...data.epf_and_gratuity, witnesses: newWitnesses });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <FileText className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">EPF & Gratuity Information</h2>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PF Account Number *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.epf_and_gratuity?.pf_account_no || ''}
                  onChange={(e) => handleChange('pf_account_no', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter PF account number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marital Status *
              </label>
              <select
                value={data.epf_and_gratuity?.marital_status || ''}
                onChange={(e) => handleChange('marital_status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Religion *
              </label>
              <input
                type="text"
                value={data.epf_and_gratuity?.religion || ''}
                onChange={(e) => handleChange('religion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter religion"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <input
                type="text"
                value={data.epf_and_gratuity?.department || ''}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter department"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Held *
              </label>
              <input
                type="text"
                value={data.epf_and_gratuity?.post_held || ''}
                onChange={(e) => handleChange('post_held', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter post held"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Appointment *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={data.epf_and_gratuity?.date_of_appointment || ''}
                  onChange={(e) => handleChange('date_of_appointment', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Nominee Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Heart className="h-5 w-5 text-primary-600 mr-2" />
            Nominee Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nominee Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.epf_and_gratuity?.nominee?.name || ''}
                  onChange={(e) => handleNomineeChange('name', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter nominee name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship *
              </label>
              <input
                type="text"
                value={data.epf_and_gratuity?.nominee?.relationship || ''}
                onChange={(e) => handleNomineeChange('relationship', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter relationship"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={data.epf_and_gratuity?.nominee?.date_of_birth || ''}
                  onChange={(e) => handleNomineeChange('date_of_birth', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share *
              </label>
              <input
                type="text"
                value={data.epf_and_gratuity?.nominee?.share || ''}
                onChange={(e) => handleNomineeChange('share', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 100%"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nominee Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  value={data.epf_and_gratuity?.nominee?.address || ''}
                  onChange={(e) => handleNomineeChange('address', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="2"
                  placeholder="Enter nominee address"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Family Member */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Family Member Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Family Member Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.epf_and_gratuity?.family_member_1?.name || ''}
                  onChange={(e) => handleFamilyMemberChange('name', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter family member name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship *
              </label>
              <input
                type="text"
                value={data.epf_and_gratuity?.family_member_1?.relationship || ''}
                onChange={(e) => handleFamilyMemberChange('relationship', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter relationship"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="text"
                value={data.epf_and_gratuity?.family_member_1?.age || ''}
                onChange={(e) => handleFamilyMemberChange('age', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter age"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Family Member Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  value={data.epf_and_gratuity?.family_member_1?.address || ''}
                  onChange={(e) => handleFamilyMemberChange('address', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="2"
                  placeholder="Enter family member address"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Witnesses */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Witnesses</h3>
            <button
              type="button"
              onClick={addWitness}
              className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Witness
            </button>
          </div>

          {witnesses.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p>No witnesses added yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {witnesses.map((witness, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={witness}
                      onChange={(e) => handleWitnessChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter witness name"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWitness(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Details */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Form Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Sign Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={data.epf_and_gratuity?.form_sign_date || ''}
                  onChange={(e) => handleChange('form_sign_date', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Sign Place *
              </label>
              <input
                type="text"
                value={data.epf_and_gratuity?.form_sign_place || ''}
                onChange={(e) => handleChange('form_sign_place', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter place of signing"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.epf_and_gratuity?.employer_name || ''}
                  onChange={(e) => handleChange('employer_name', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter employer name"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  value={data.epf_and_gratuity?.employer_address || ''}
                  onChange={(e) => handleChange('employer_address', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter employer address"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This information is used for EPF and Gratuity forms. All fields are required for proper processing.
        </p>
      </div>
    </div>
  );
};

export default EPFGratuity;


