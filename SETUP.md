# Setup Instructions for Form Automation System

## 📋 Prerequisites

Before setting up the system, ensure you have the following installed:

### Required Software

1. **Python 3.8+**
   ```bash
   python3 --version
   # Should show Python 3.8 or higher
   ```

2. **Node.js 14+**
   ```bash
   node --version
   # Should show v14.0 or higher
   ```

3. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

### System Requirements

- **Operating System**: macOS 10.14+, Ubuntu 18.04+, Windows 10+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Network**: Internet connection for initial setup

## 🔧 Installation Steps

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd form_automation
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Verify installation
pip list | grep -E "(Flask|docx)"
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install Node.js dependencies
npm install

# Verify installation
npm list --depth=0
```

### Step 4: Verify Setup

```bash
# Return to project root
cd ..

# Run automated test
./QUICK_TEST.sh
```

Expected output:
```
🧪 Quick Test - Form Automation System
========================================

1️⃣  Testing Backend Health...
   ✅ Backend is healthy

2️⃣  Testing Frontend Accessibility...
   ✅ Frontend is accessible

3️⃣  Testing Form Processing (Auto-fill)...
   ✅ Form processing successful
   ✅ Generated 9 DOCX files

4️⃣  Verifying DOCX Files...
   ✅ Found 9 DOCX files in output/

5️⃣  Confirming NO New PDF Generation...
   ✅ No new PDF files generated (as expected)

========================================
🎉 ALL TESTS PASSED!
========================================
```

## 🚀 Running the Application

### Quick Start

```bash
# Start the application
./START_APP.sh

# Generate sample forms
python3 auto_fill_forms.py

# Stop the application
./STOP_APP.sh
```

### Manual Start (Alternative)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python server.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 🌐 Access Points

After starting the application:

- **Web Interface**: http://localhost:3000
- **API Health Check**: http://localhost:5000/api/health
- **API Documentation**: See README.md

## 📁 Generated Files

After running the application, check the `output/` directory:

```bash
ls -la output/*.docx
```

You should see 9 DOCX files:
- smart_background verification form 1.docx
- smart_NDA form 1.docx
- smart_LOA form 1.docx
- smart_EPFNominationFormpdf 1.docx
- smart_GratuityFormpdf 1.docx
- smart_DeclarationFormpdf 1.docx
- smart_DeclarationFormforPFAccountpdf 1.docx
- smart_DeclarationforPFAccount Linking with Aadhar 1.docx
- smart_Bounteous_Hyd_Letterhead Template_April 2025 (1) 1.docx

## 🔍 Troubleshooting

### Common Setup Issues

1. **Python version too old**
   ```bash
   # Install Python 3.8+ using:
   # macOS: brew install python@3.9
   # Ubuntu: sudo apt update && sudo apt install python3.9
   # Windows: Download from python.org
   ```

2. **Node.js version too old**
   ```bash
   # Install Node.js 14+ from nodejs.org
   # Or use nvm (Node Version Manager)
   ```

3. **Permission denied on scripts**
   ```bash
   chmod +x *.sh
   ```

4. **Port already in use**
   ```bash
   # Find and kill processes using ports 3000 and 5000
   lsof -ti:3000 | xargs kill -9
   lsof -ti:5000 | xargs kill -9
   ```

### Verification Commands

```bash
# Check Python installation
python3 --version

# Check Node.js installation
node --version

# Check if virtual environment is activated
which python

# Check if backend dependencies are installed
pip list | grep Flask

# Check if frontend dependencies are installed
npm list react

# Test backend connectivity
curl http://localhost:5000/api/health

# Test frontend connectivity
curl http://localhost:3000
```

## 📊 Performance Expectations

- **Startup Time**: 10-15 seconds
- **Form Generation**: 5-10 seconds for 9 forms
- **File Sizes**: 50-150KB per DOCX file
- **Memory Usage**: 100-200MB during operation

## 🔒 Security Considerations

- Application runs on localhost only
- No external network access required
- No authentication system (suitable for internal use)
- All data processed locally

## 📞 Support

If you encounter issues:

1. **Check logs**:
   ```bash
   tail -f backend.log
   tail -f frontend.log
   ```

2. **Run diagnostics**:
   ```bash
   ./QUICK_TEST.sh
   ```

3. **Verify setup**:
   ```bash
   python3 --version
   node --version
   pip list
   npm list --depth=0
   ```

---

**Setup completed successfully when:**
- ✅ All tests pass in `./QUICK_TEST.sh`
- ✅ Web interface loads at http://localhost:3000
- ✅ 9 DOCX files generate in `output/` directory
- ✅ No error messages in logs
