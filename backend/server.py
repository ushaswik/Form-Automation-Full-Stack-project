#!/usr/bin/env python3
"""
Backend server for Form Automation Frontend
Handles form processing and file downloads
"""

import os
import json
import subprocess
import tempfile
import shutil
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = '../output'  # Output files are in the parent directory
TEMPLATES_FOLDER = '../templates'  # Templates are in the parent directory

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/api/process-forms', methods=['POST'])
def process_forms():
    """Process the form data and generate filled documents"""
    try:
        # Get form data from request
        form_data = request.json
        
        # Create temporary directory for this session
        with tempfile.TemporaryDirectory() as temp_dir:
            # Transform form data to match populator's expected structure
            transformed_data = {
            "source_file": "Frontend Input",
            "form_fields": {
                "personal_details": {
                    "name": form_data.get('name', ''),
                    "gender": form_data.get('gender', ''),
                    "date_of_birth": {
                        "value": form_data.get('date_of_birth', ''),
                        "iso": form_data.get('date_of_birth', '')
                    },
                    "father_name": form_data.get('father_name', ''),
                    "nationality": form_data.get('nationality', ''),
                    "pan_card": form_data.get('pan_card', ''),
                    "aadhar_card": form_data.get('aadhar_card', ''),
                    "din": form_data.get('din', ''),
                    "passport_no": form_data.get('passport_no', ''),
                    "passport_issue_date": {
                        "value": form_data.get('passport_issue_date', ''),
                        "iso": form_data.get('passport_issue_date', '')
                    },
                    "passport_expiry_date": {
                        "value": form_data.get('passport_expiry_date', ''),
                        "iso": form_data.get('passport_expiry_date', '')
                    },
                    "email": form_data.get('email', ''),
                    "religion": form_data.get('religion', '')
                },
                "employment_history": [
                    {
                        "employer_name_and_branch": form_data.get('current_employment', {}).get('employer_name_and_branch', ''),
                        "employer_address": form_data.get('current_employment', {}).get('employer_address', ''),
                        "position_and_department": form_data.get('current_employment', {}).get('position_and_department', ''),
                        "landline": form_data.get('current_employment', {}).get('landline', ''),
                        "employment_period": form_data.get('current_employment', {}).get('employment_period', {}),
                        "employee_code": form_data.get('current_employment', {}).get('employee_code', ''),
                        "last_salary": form_data.get('current_employment', {}).get('last_salary', ''),
                        "reason_for_leaving": form_data.get('current_employment', {}).get('reason_for_leaving', ''),
                        "reporting_manager": form_data.get('current_employment', {}).get('reporting_manager', ''),
                        "agency_details": form_data.get('current_employment', {}).get('agency_details', ''),
                        "contract_agency": form_data.get('current_employment', {}).get('contract_agency', ''),
                        "can_verify": form_data.get('current_employment', {}).get('can_verify', True)
                    }
                ] + (form_data.get('employment_history', []) or []),
                "education_history": {
                    "highest_qualification": form_data.get('highest_qualification', {}),
                    "previous_qualification": form_data.get('previous_qualification', {})
                },
                "address_history": {
                    "current": {
                        "town_or_city_name": form_data.get('current_address', {}).get('full_address', ''),
                        "phone_number": form_data.get('phone', ''),
                        "duration_of_stay": form_data.get('current_address', {}).get('duration_of_stay', {})
                    },
                    "previous": {
                        "town_or_city_name": form_data.get('previous_address', {}).get('full_address', '') if isinstance(form_data.get('previous_address'), dict) else '',
                        "phone_number": form_data.get('phone', ''),
                        "duration_of_stay": {}
                    },
                    "permanent": {
                        "town_or_city_name": form_data.get('permanent_address', {}).get('full_address', ''),
                        "phone_number": form_data.get('phone', ''),
                        "duration_of_stay": form_data.get('permanent_address', {}).get('duration_of_stay', {})
                    }
                },
                # Add address list for multi-address tables
                "address_list": [
                    {
                        "address_type": "current",
                        "town_or_city_name": form_data.get('current_address', {}).get('full_address', ''),
                        "phone_number": form_data.get('phone', ''),
                        "duration_of_stay": form_data.get('current_address', {}).get('duration_of_stay', {})
                    },
                    {
                        "address_type": "permanent", 
                        "town_or_city_name": form_data.get('permanent_address', {}).get('full_address', ''),
                        "phone_number": form_data.get('phone', ''),
                        "duration_of_stay": form_data.get('permanent_address', {}).get('duration_of_stay', {})
                    }
                ] + ([
                    {
                        "address_type": "previous",
                        "town_or_city_name": addr.get('full_address', ''),
                        "phone_number": form_data.get('phone', ''),
                        "duration_of_stay": addr.get('duration_of_stay', {})
                    } for addr in form_data.get('previous_address', []) if isinstance(addr, dict)
                ] if isinstance(form_data.get('previous_address'), list) else []),
                "references": form_data.get('references', []),
                "gaps": form_data.get('gaps', {}),
                "epf_and_gratuity": form_data.get('epf_and_gratuity', {})
            }
            }
            
            # Write transformed form data to JSON file
            json_file = os.path.join(temp_dir, 'extracted_data.json')
            with open(json_file, 'w') as f:
                json.dump(transformed_data, f, indent=2)
                
            # Copy templates to temp directory
            templates_dir = os.path.join(temp_dir, 'templates')
            shutil.copytree(TEMPLATES_FOLDER, templates_dir)
            
            # Create output directory
            output_dir = os.path.join(temp_dir, 'output')
            os.makedirs(output_dir, exist_ok=True)
            
            # Run the populator script
            populator_script = os.path.join(os.path.dirname(__file__), 'populator.py')
            result = subprocess.run([
                'python', populator_script, 
                json_file, 
                templates_dir, 
                output_dir
            ], capture_output=True, text=True, cwd=os.path.dirname(__file__))
            
            if result.returncode != 0:
                return jsonify({
                    'success': False,
                    'error': f'Form processing failed: {result.stderr}'
                }), 500
            
            # Copy output files to permanent location and generate download links
            output_files = []
            download_links = []
            
            for filename in os.listdir(output_dir):
                if filename.endswith('.docx'):
                    source_path = os.path.join(output_dir, filename)
                    dest_path = os.path.join(OUTPUT_FOLDER, filename)
                    shutil.copy2(source_path, dest_path)
                    output_files.append(filename)
                    
                    # Add DOCX download link
                    download_links.append({
                        'filename': filename,
                        'url': f'/api/download/{filename}',
                        'type': 'docx'
                    })
            
            return jsonify({
                'success': True,
                'message': f'Successfully processed {len(output_files)} forms',
                'downloadLinks': download_links
            })
            
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"❌ Error in process_forms: {str(e)}")
        print(f"❌ Full traceback: {error_details}")
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500

@app.route('/api/download/<filename>')
def download_file(filename):
    """Download a processed form file"""
    try:
        # Try the filename as-is first, then with secure_filename
        file_path = os.path.join(OUTPUT_FOLDER, filename)
        if not os.path.exists(file_path):
            # Try with secure_filename (spaces converted to underscores)
            secure_name = secure_filename(filename)
            file_path = os.path.join(OUTPUT_FOLDER, secure_name)
        
        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True)
        else:
            # List available files for debugging
            available_files = [f for f in os.listdir(OUTPUT_FOLDER) if f.endswith('.docx')]
            return jsonify({
                'error': f'File not found: {filename}',
                'available_files': available_files[:5]  # Show first 5 files
            }), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    print("🚀 Starting Form Automation Backend Server...")
    print("📁 Templates folder:", TEMPLATES_FOLDER)
    print("📁 Output folder:", OUTPUT_FOLDER)
    print("🌐 Server running on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
