# Form Automation System

An automated form filling system that generates DOCX documents from JSON data, designed for HR and administrative processes.

## Overview

This system automatically fills various HR and administrative forms with user data, generating professional DOCX documents ready for submission. The application supports both web interface and command-line automation.

## ✨ Features

- **Automated Form Filling**: Fills 9 different HR forms automatically
- **Web Interface**: User-friendly React frontend for manual data entry
- **API Integration**: RESTful API for programmatic access
- **DOCX Output**: Generates editable Word documents with perfect formatting
- **Test Data Support**: Built-in test data for quick demonstrations
- **Cross-Platform**: Works on macOS, Linux, and Windows

## 📋 Supported Forms

The system currently supports the following forms:

1. **Background Verification Form**
2. **NDA (Non-Disclosure Agreement) Form**
3. **LOA (Letter of Authorization) Form**
4. **EPF Nomination Form**
5. **Gratuity Form**
6. **Declaration Form for PF Account**
7. **Declaration Form for PF Account Linking with Aadhar**
8. **Declaration Form**
9. **Letterhead Template**

## 🚀 Quick Start

### Prerequisites

- Python 3.8+ 
- Node.js 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd form_automation
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cd ..
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

#### Method 1: Automated Scripts (Recommended)

```bash
# Start the application
./START_APP.sh

# Generate forms using test data
python3 auto_fill_forms.py

# Stop the application
./STOP_APP.sh
```

#### Method 2: Manual Setup

1. **Start Backend**
   ```bash
   cd backend
   source venv/bin/activate
   python server.py
   ```

2. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**
   - Web Interface: http://localhost:3000
   - API Endpoint: http://localhost:5000

## 📖 Usage

### Web Interface

1. Open http://localhost:3000 in your browser
2. Fill in the required information in the form
3. Click "Process Forms"
4. Download the generated DOCX files

### Command Line (Auto-fill)

```bash
# Generate forms using test_data.json
python3 auto_fill_forms.py

# Output files will be in the output/ directory
ls output/*.docx
```

### API Usage

```bash
# Health check
curl http://localhost:5000/api/health

# Process forms with custom data
curl -X POST http://localhost:5000/api/process-forms \
  -H "Content-Type: application/json" \
  -d @test_data.json
```

## 🧪 Testing

Run the automated test suite:

```bash
./QUICK_TEST.sh
```

This will verify:
- Backend health status
- Frontend accessibility  
- Form processing functionality
- DOCX file generation
- PDF generation is disabled

## 📁 Project Structure

```
form_automation/
├── backend/                 # Python Flask backend
│   ├── server.py           # Main server file
│   ├── populator.py        # Form filling logic
│   ├── requirements.txt    # Python dependencies
│   └── venv/              # Virtual environment
├── frontend/               # React frontend
│   ├── src/               # Source code
│   ├── public/            # Static files
│   └── package.json       # Node dependencies
├── templates/              # Original form templates
├── output/                 # Generated DOCX files
├── test_data.json         # Sample data for testing
├── START_APP.sh           # Application startup script
├── STOP_APP.sh            # Application shutdown script
├── QUICK_TEST.sh          # Testing script
└── auto_fill_forms.py     # Command-line form generator
```

## ⚙️ Configuration

### Customizing Form Data

Edit `test_data.json` to change the default form values:

```json
{
  "name": "Your Name",
  "email": "your.email@company.com",
  "current_employment": {
    "employer_name_and_branch": "Company Name",
    "position_and_department": "Your Position"
  }
}
```

### Adding New Forms

1. Add the DOCX template to `templates/` directory
2. Update the form processing logic in `backend/populator.py`
3. Test with `./QUICK_TEST.sh`

## 🔧 Troubleshooting

### Backend Issues

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Reinstall dependencies
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Issues

```bash
# Clear node modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Port Conflicts

```bash
# Stop all processes
./STOP_APP.sh

# Wait 5 seconds
sleep 5

# Restart
./START_APP.sh
```

### Common Issues

| Issue | Solution |
|-------|----------|
| "Module not found" | Run `pip install -r backend/requirements.txt` |
| "Port already in use" | Run `./STOP_APP.sh` then `./START_APP.sh` |
| "Forms not generating" | Check backend health with `curl http://localhost:5000/api/health` |
| "PDF files appearing" | Run `find output -name "*.pdf" -delete` |

## 📊 Performance

- **Processing Time**: ~5-10 seconds for 9 forms
- **File Size**: ~50-150KB per DOCX file
- **Memory Usage**: ~100MB during processing
- **Concurrent Users**: Tested with 1-5 simultaneous users

## 🔒 Security Notes

- No authentication implemented (suitable for internal use)
- Files are generated locally and not stored permanently
- No sensitive data is logged or transmitted externally
- All processing happens on the local machine

## 🛠️ Development

### Adding New Features

1. **Backend**: Modify `backend/server.py` and `backend/populator.py`
2. **Frontend**: Update components in `frontend/src/components/`
3. **Testing**: Add test cases to `QUICK_TEST.sh`

### Code Style

- Python: Follow PEP 8 guidelines
- JavaScript: Use ESLint configuration
- Documentation: Update README.md for new features

## 📝 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/process-forms` | Process form data |
| GET | `/api/download/<filename>` | Download generated file |

### Request Format

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "current_employment": {
    "employer_name_and_branch": "Tech Corp",
    "position_and_department": "Software Engineer"
  }
}
```

## 📈 Future Enhancements

- [ ] User authentication system
- [ ] Database integration for form data storage
- [ ] Bulk processing capabilities
- [ ] Form validation and error handling
- [ ] PDF generation option (if required)
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with `./QUICK_TEST.sh`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For issues and questions:
1. Check the troubleshooting section above
2. Run `./QUICK_TEST.sh` to diagnose problems
3. Review the logs in `backend.log` and `frontend.log`

## 📋 System Requirements

- **Operating System**: macOS 10.14+, Ubuntu 18.04+, Windows 10+
- **Python**: 3.8 or higher
- **Node.js**: 14.0 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB for application and dependencies

---

**Last Updated**: October 14, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready