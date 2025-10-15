import React, { useState } from 'react';
import { FileText, Download, User, MapPin, GraduationCap, Building, Users, Clock, CreditCard } from 'lucide-react';
import PersonalInfo from './components/PersonalInfo';
import AddressInfo from './components/AddressInfo';
import EducationInfo from './components/EducationInfo';
import EmploymentInfo from './components/EmploymentInfo';
import References from './components/References';
import Gaps from './components/Gaps';
import EPFGratuity from './components/EPFGratuity';
import FormPreview from './components/FormPreview';
import ProcessForms from './components/ProcessForms';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    father_name: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    nationality: '',
    pan_card: '',
    aadhar_card: '',
    din: '',
    passport_no: '',
    passport_issue_date: '',
    passport_expiry_date: '',
    religion: '',
    
    // Address Information
    current_address: {
      full_address: '',
      town_or_city_name: '',
      state: '',
      postal_code: '',
      phone_number: '',
      duration_of_stay: { start: '', end: '', raw: '' }
    },
    permanent_address: {
      full_address: '',
      town_or_city_name: '',
      state: '',
      postal_code: '',
      phone_number: '',
      duration_of_stay: { start: '', end: '', raw: '' }
    },
    previous_address: {
      town_or_city_name: '',
      phone_number: '',
      duration_of_stay: { start: '', end: '', raw: '' }
    },
    
    // Education Information
    highest_qualification: {
      university_and_college: '',
      location_full_address: '',
      degree_or_course: '',
      period: { start: '', end: '', raw: '' },
      roll_or_registration: ''
    },
    previous_qualification: {
      university_and_college: '',
      location_full_address: '',
      degree_or_course: '',
      period: { start: '', end: '', raw: '' },
      roll_or_registration: ''
    },
    
    // Employment Information
    current_employment: {
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
    },
    
    // Employment History
    employment_history: [],
    
    // References
    references: [],
    
    // Gaps
    gaps: {
      reason: '',
      period: { start: '', end: '', raw: '' },
      address_during_gap: ''
    },
    
    // EPF and Gratuity
    epf_and_gratuity: {
      pf_account_no: '',
      marital_status: '',
      religion: '',
      department: '',
      post_held: '',
      date_of_appointment: '',
      nominee: {
        name: '',
        address: '',
        relationship: '',
        date_of_birth: '',
        share: ''
      },
      family_member_1: {
        name: '',
        relationship: '',
        age: '',
        address: ''
      },
      witnesses: [],
      form_sign_date: '',
      form_sign_place: '',
      employer_name: '',
      employer_address: ''
    }
  });

  const steps = [
    { id: 1, name: 'Personal Info', icon: User },
    { id: 2, name: 'Address Info', icon: MapPin },
    { id: 3, name: 'Education', icon: GraduationCap },
    { id: 4, name: 'Employment', icon: Building },
    { id: 5, name: 'References', icon: Users },
    { id: 6, name: 'Gaps', icon: Clock },
    { id: 7, name: 'EPF/Gratuity', icon: CreditCard },
    { id: 8, name: 'Preview', icon: FileText },
    { id: 9, name: 'Process', icon: Download }
  ];

  const updateFormData = (section, data) => {
    if (section === 'personal') {
      // For personal info, update the root level fields
      setFormData(prev => ({
        ...prev,
        ...data
      }));
    } else {
      // For other sections, update the specific section
      setFormData(prev => ({
        ...prev,
        [section]: data
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo data={formData} updateData={updateFormData} />;
      case 2:
        return <AddressInfo data={formData} updateData={updateFormData} />;
      case 3:
        return <EducationInfo data={formData} updateData={updateFormData} />;
      case 4:
        return <EmploymentInfo data={formData} updateData={updateFormData} />;
      case 5:
        return <References data={formData} updateData={updateFormData} />;
      case 6:
        return <Gaps data={formData} updateData={updateFormData} />;
      case 7:
        return <EPFGratuity data={formData} updateData={updateFormData} />;
      case 8:
        return <FormPreview data={formData} />;
      case 9:
        return <ProcessForms data={formData} />;
      default:
        return <PersonalInfo data={formData} updateData={updateFormData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Form Automation</h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2
                    ${isActive ? 'bg-primary-600 border-primary-600 text-white' : 
                      isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                      'bg-white border-gray-300 text-gray-500'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-md font-medium ${
              currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          {currentStep < steps.length && (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700"
            >
              {currentStep === steps.length - 1 ? 'Process Forms' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
