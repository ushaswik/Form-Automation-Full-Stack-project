import React from 'react';
import { Calendar, MapPin, FileText } from 'lucide-react';

const Gaps = ({ data, updateData }) => {
  const handleChange = (field, value) => {
    if (field === 'period') {
      updateData('gaps', {
        ...data.gaps,
        period: { ...data.gaps.period, ...value }
      });
    } else {
      updateData('gaps', { ...data.gaps, [field]: value });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <FileText className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Employment Gaps</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Gap *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea
              value={data.gaps?.reason || ''}
              onChange={(e) => handleChange('reason', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="3"
              placeholder="Explain the reason for employment gap (e.g., COVID-related personal reasons, health issues, family commitments, etc.)"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gap Period Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={data.gaps?.period?.start || ''}
              onChange={(e) => handleChange('period', { ...data.gaps?.period, start: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gap Period End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={data.gaps?.period?.end || ''}
              onChange={(e) => handleChange('period', { ...data.gaps?.period, end: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gap Period (Raw Text)
          </label>
          <input
            type="text"
            value={data.gaps?.period?.raw || ''}
            onChange={(e) => handleChange('period', { ...data.gaps?.period, raw: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Jan 2021 - Jun 2021"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address During Gap *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea
              value={data.gaps?.address_during_gap || ''}
              onChange={(e) => handleChange('address_during_gap', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="2"
              placeholder="Enter the address where you stayed during the gap period"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Employment gaps are common and should be explained clearly for background verification purposes.
        </p>
      </div>
    </div>
  );
};

export default Gaps;

