import React, { useState } from 'react';
import { Building, Calendar, Phone, User, Briefcase, Plus, Trash2 } from 'lucide-react';

const EmploymentInfo = ({ data, updateData }) => {
  const [employmentHistory, setEmploymentHistory] = useState(data.employment_history || []);

  const handleCurrentEmploymentChange = (field, value) => {
    updateData('current_employment', { ...data.current_employment, [field]: value });
  };

  const addEmploymentEntry = () => {
    const newEmployment = {
      employer_name_and_branch: '',
      position_and_department: '',
      landline: '',
      employment_period: { start: '', end: '', raw: '' },
      employee_code: '',
      last_salary: '',
      reason_for_leaving: '',
      reporting_manager: '',
      agency_details: '',
      contract_agency: '',
      can_verify: true
    };
    const updatedHistory = [...employmentHistory, newEmployment];
    setEmploymentHistory(updatedHistory);
    updateData('employment_history', updatedHistory);
  };

  const removeEmploymentEntry = (index) => {
    if (employmentHistory.length > 0) {
      const updatedHistory = employmentHistory.filter((_, i) => i !== index);
      setEmploymentHistory(updatedHistory);
      updateData('employment_history', updatedHistory);
    }
  };

  const handleEmploymentChange = (index, field, value) => {
    const updatedHistory = [...employmentHistory];
    if (field === 'employment_period') {
      updatedHistory[index] = { 
        ...updatedHistory[index], 
        employment_period: { ...updatedHistory[index].employment_period, ...value }
      };
    } else {
      updatedHistory[index] = { ...updatedHistory[index], [field]: value };
    }
    setEmploymentHistory(updatedHistory);
    updateData('employment_history', updatedHistory);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <Building className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Employment Information</h2>
      </div>

      <div className="space-y-8">
        {/* Current Employment */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Building className="h-5 w-5 text-primary-600 mr-2" />
            Current Employment
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer Name & Branch *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.current_employment.employer_name_and_branch || ''}
                  onChange={(e) => handleCurrentEmploymentChange('employer_name_and_branch', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter employer name and branch"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position & Department *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.current_employment.position_and_department || ''}
                  onChange={(e) => handleCurrentEmploymentChange('position_and_department', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Position - Department"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landline
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={data.current_employment.landline || ''}
                  onChange={(e) => handleCurrentEmploymentChange('landline', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter landline number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Period Start
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={data.current_employment.employment_period_start || ''}
                  onChange={(e) => handleCurrentEmploymentChange('employment_period_start', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Period End
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={data.current_employment.employment_period_end || ''}
                  onChange={(e) => handleCurrentEmploymentChange('employment_period_end', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee Code *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={data.current_employment.employee_code || ''}
                  onChange={(e) => handleCurrentEmploymentChange('employee_code', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter employee code"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Salary (per month) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input
                  type="text"
                  value={data.current_employment.last_salary || ''}
                  onChange={(e) => handleCurrentEmploymentChange('last_salary', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter salary in rupees (e.g., 50000)"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Leaving *
              </label>
              <input
                type="text"
                value={data.current_employment.reason_for_leaving || ''}
                onChange={(e) => handleCurrentEmploymentChange('reason_for_leaving', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter reason for leaving"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reporting Manager Details
              </label>
              <textarea
                value={data.current_employment.reporting_manager || ''}
                onChange={(e) => handleCurrentEmploymentChange('reporting_manager', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="2"
                placeholder="Name, Department and contact details"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agency Details (if temporary or contractual)
              </label>
              <input
                type="text"
                value={data.current_employment.agency_details || ''}
                onChange={(e) => handleCurrentEmploymentChange('agency_details', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter agency details if applicable"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Agency
              </label>
              <input
                type="text"
                value={data.current_employment.contract_agency || ''}
                onChange={(e) => handleCurrentEmploymentChange('contract_agency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter contract agency if applicable"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.current_employment.can_verify || false}
                  onChange={(e) => handleCurrentEmploymentChange('can_verify', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Can verify employment details
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Employment History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <Building className="h-5 w-5 text-primary-600 mr-2" />
              Previous Employment History
            </h3>
            <button
              type="button"
              onClick={addEmploymentEntry}
              className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Employment
            </button>
          </div>

          {employmentHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Building className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No previous employment added yet.</p>
              <p className="text-sm">Click "Add Employment" to add previous employment details.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {employmentHistory.map((employment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-700">Employment {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeEmploymentEntry(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employer Name & Branch *
                      </label>
                      <input
                        type="text"
                        value={employment.employer_name_and_branch}
                        onChange={(e) => handleEmploymentChange(index, 'employer_name_and_branch', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter employer name and branch"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position & Department *
                      </label>
                      <input
                        type="text"
                        value={employment.position_and_department}
                        onChange={(e) => handleEmploymentChange(index, 'position_and_department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Position - Department"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Landline
                      </label>
                      <input
                        type="tel"
                        value={employment.landline}
                        onChange={(e) => handleEmploymentChange(index, 'landline', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter landline number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employment Period Start
                      </label>
                      <input
                        type="date"
                        value={employment.employment_period.start}
                        onChange={(e) => handleEmploymentChange(index, 'employment_period', { ...employment.employment_period, start: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employment Period End
                      </label>
                      <input
                        type="date"
                        value={employment.employment_period.end}
                        onChange={(e) => handleEmploymentChange(index, 'employment_period', { ...employment.employment_period, end: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employment Period (Raw Text)
                      </label>
                      <input
                        type="text"
                        value={employment.employment_period.raw}
                        onChange={(e) => handleEmploymentChange(index, 'employment_period', { ...employment.employment_period, raw: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., 2020-01-07 to 2024-11-08"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employee Code *
                      </label>
                      <input
                        type="text"
                        value={employment.employee_code}
                        onChange={(e) => handleEmploymentChange(index, 'employee_code', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter employee code"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Salary (per month) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">₹</span>
                        <input
                          type="text"
                          value={employment.last_salary}
                          onChange={(e) => handleEmploymentChange(index, 'last_salary', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter salary in rupees (e.g., 50000)"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Leaving *
                      </label>
                      <input
                        type="text"
                        value={employment.reason_for_leaving}
                        onChange={(e) => handleEmploymentChange(index, 'reason_for_leaving', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reason for leaving"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reporting Manager Details
                      </label>
                      <textarea
                        value={employment.reporting_manager}
                        onChange={(e) => handleEmploymentChange(index, 'reporting_manager', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows="2"
                        placeholder="Name, Department and contact details"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Agency Details
                      </label>
                      <input
                        type="text"
                        value={employment.agency_details}
                        onChange={(e) => handleEmploymentChange(index, 'agency_details', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter agency details"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contract Agency
                      </label>
                      <input
                        type="text"
                        value={employment.contract_agency}
                        onChange={(e) => handleEmploymentChange(index, 'contract_agency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter contract agency"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={employment.can_verify}
                          onChange={(e) => handleEmploymentChange(index, 'can_verify', e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Can verify employment details
                        </span>
                      </label>
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
          <strong>Note:</strong> This information will be used for employment-related forms and background verification. You can add multiple previous employment entries.
        </p>
      </div>
    </div>
  );
};

export default EmploymentInfo;