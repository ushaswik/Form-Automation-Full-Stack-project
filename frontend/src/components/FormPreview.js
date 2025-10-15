import React from 'react';
import { FileText, User, MapPin, GraduationCap, Building, CheckCircle, Users, Clock, CreditCard } from 'lucide-react';

const FormPreview = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  const formatPeriod = (period) => {
    if (!period) return 'Not provided';
    if (period.raw) return period.raw;
    if (period.start && period.end) {
      const start = new Date(period.start).toLocaleDateString();
      const end = new Date(period.end).toLocaleDateString();
      return `${start} - ${end}`;
    }
    return 'Not provided';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <FileText className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Form Preview</h2>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Name:</span>
              <p className="text-gray-900">{data.name || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Father's Name:</span>
              <p className="text-gray-900">{data.father_name || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Date of Birth:</span>
              <p className="text-gray-900">{formatDate(data.date_of_birth)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Gender:</span>
              <p className="text-gray-900 capitalize">{data.gender || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email:</span>
              <p className="text-gray-900">{data.email || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Phone:</span>
              <p className="text-gray-900">{data.phone || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Nationality:</span>
              <p className="text-gray-900">{data.nationality || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">PAN Card:</span>
              <p className="text-gray-900">{data.pan_card || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Aadhar Card:</span>
              <p className="text-gray-900">{data.aadhar_card || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Religion:</span>
              <p className="text-gray-900">{data.religion || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Current Address</h4>
              <p className="text-gray-700 text-sm mb-1">{data.current_address?.full_address || data.current_address?.town_or_city_name || 'Not provided'}</p>
              <p className="text-gray-500 text-xs">Phone: {data.current_address?.phone_number || 'Not provided'}</p>
              <p className="text-gray-500 text-xs">Duration: {formatPeriod(data.current_address?.duration_of_stay)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Permanent Address</h4>
              <p className="text-gray-700 text-sm mb-1">{data.permanent_address?.full_address || data.permanent_address?.town_or_city_name || 'Not provided'}</p>
              <p className="text-gray-500 text-xs">Phone: {data.permanent_address?.phone_number || 'Not provided'}</p>
              <p className="text-gray-500 text-xs">Duration: {formatPeriod(data.permanent_address?.duration_of_stay)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Previous Address</h4>
              <p className="text-gray-700 text-sm mb-1">{data.previous_address?.town_or_city_name || 'Not provided'}</p>
              <p className="text-gray-500 text-xs">Phone: {data.previous_address?.phone_number || 'Not provided'}</p>
              <p className="text-gray-500 text-xs">Duration: {formatPeriod(data.previous_address?.duration_of_stay)}</p>
            </div>
          </div>
        </div>

        {/* Education Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <GraduationCap className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Education Information</h3>
          </div>
          <div className="space-y-4">
            {/* Highest Qualification */}
            {data.highest_qualification && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Highest Qualification</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">Institution:</span>
                    <p className="text-gray-900">{data.highest_qualification.university_and_college || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Degree:</span>
                    <p className="text-gray-900">{data.highest_qualification.degree_or_course || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Location:</span>
                    <p className="text-gray-900">{data.highest_qualification.location_full_address || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Period:</span>
                    <p className="text-gray-900">{formatPeriod(data.highest_qualification.period)}</p>
                  </div>
                  {data.highest_qualification.roll_or_registration && (
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-500">Roll/Registration:</span>
                      <p className="text-gray-900">{data.highest_qualification.roll_or_registration}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Previous Qualification */}
            {data.previous_qualification && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Previous Qualification</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">Institution:</span>
                    <p className="text-gray-900">{data.previous_qualification.university_and_college || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Degree:</span>
                    <p className="text-gray-900">{data.previous_qualification.degree_or_course || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Location:</span>
                    <p className="text-gray-900">{data.previous_qualification.location_full_address || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Period:</span>
                    <p className="text-gray-900">{formatPeriod(data.previous_qualification.period)}</p>
                  </div>
                  {data.previous_qualification.roll_or_registration && (
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-500">Roll/Registration:</span>
                      <p className="text-gray-900">{data.previous_qualification.roll_or_registration}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Employment Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Building className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Employment Information</h3>
          </div>
          <div className="space-y-4">
            {/* Current Employment */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Current Employment</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Employer:</span>
                  <p className="text-gray-900">{data.current_employment?.employer_name_and_branch || 'Not provided'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Position:</span>
                  <p className="text-gray-900">{data.current_employment?.position_and_department || 'Not provided'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Employee Code:</span>
                  <p className="text-gray-900">{data.current_employment?.employee_code || 'Not provided'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Last Salary:</span>
                  <p className="text-gray-900">{data.current_employment?.last_salary || 'Not provided'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Period:</span>
                  <p className="text-gray-900">{formatPeriod(data.current_employment?.employment_period)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Reason for Leaving:</span>
                  <p className="text-gray-900">{data.current_employment?.reason_for_leaving || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Employment History */}
            {data.employment_history && data.employment_history.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Previous Employment History</h4>
                {data.employment_history.map((employment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-2">
                    <h5 className="font-medium text-gray-800 mb-2">Employment #{index + 1}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-500">Employer:</span>
                        <p className="text-gray-900">{employment.employer_name_and_branch || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Position:</span>
                        <p className="text-gray-900">{employment.position_and_department || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Employee Code:</span>
                        <p className="text-gray-900">{employment.employee_code || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Last Salary:</span>
                        <p className="text-gray-900">{employment.last_salary || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Period:</span>
                        <p className="text-gray-900">{formatPeriod(employment.employment_period)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Reason for Leaving:</span>
                        <p className="text-gray-900">{employment.reason_for_leaving || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">References</h3>
            </div>
            <div className="space-y-3">
              {data.references.map((reference, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Reference #{index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Name:</span>
                      <p className="text-gray-900">{reference.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Phone:</span>
                      <p className="text-gray-900">{reference.phone || 'Not provided'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-500">Designation & Company:</span>
                      <p className="text-gray-900">{reference.designation_and_company || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gaps */}
        {data.gaps && (data.gaps.reason || data.gaps.address_during_gap) && (
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Employment Gaps</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Reason:</span>
                <p className="text-gray-900">{data.gaps.reason || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Period:</span>
                <p className="text-gray-900">{formatPeriod(data.gaps.period)}</p>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-500">Address During Gap:</span>
                <p className="text-gray-900">{data.gaps.address_during_gap || 'Not provided'}</p>
              </div>
            </div>
          </div>
        )}

        {/* EPF & Gratuity */}
        {data.epf_and_gratuity && data.epf_and_gratuity.pf_account_no && (
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">EPF & Gratuity Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">PF Account Number:</span>
                <p className="text-gray-900">{data.epf_and_gratuity.pf_account_no || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Marital Status:</span>
                <p className="text-gray-900">{data.epf_and_gratuity.marital_status || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Department:</span>
                <p className="text-gray-900">{data.epf_and_gratuity.department || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Post Held:</span>
                <p className="text-gray-900">{data.epf_and_gratuity.post_held || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Date of Appointment:</span>
                <p className="text-gray-900">{formatDate(data.epf_and_gratuity.date_of_appointment)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Employer Name:</span>
                <p className="text-gray-900">{data.epf_and_gratuity.employer_name || 'Not provided'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-md">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <p className="text-sm text-green-800">
            <strong>Ready to process!</strong> All information has been collected. Click "Process Forms" to generate the filled documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;