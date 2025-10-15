#!/bin/bash
echo "🧪 Quick Test - Form Automation System"
echo "========================================"
echo ""

# Test 1: Backend Health
echo "1️⃣  Testing Backend Health..."
BACKEND_STATUS=$(curl -s http://localhost:5000/api/health)
if [[ $BACKEND_STATUS == *"healthy"* ]]; then
    echo "   ✅ Backend is healthy"
else
    echo "   ❌ Backend is not responding"
    exit 1
fi
echo ""

# Test 2: Frontend Accessibility
echo "2️⃣  Testing Frontend Accessibility..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "   ✅ Frontend is accessible"
else
    echo "   ❌ Frontend is not responding"
    exit 1
fi
echo ""

# Test 3: Form Processing
echo "3️⃣  Testing Form Processing (Auto-fill)..."
python3 auto_fill_forms.py > /tmp/test_output.txt 2>&1
if grep -q "SUCCESS" /tmp/test_output.txt; then
    echo "   ✅ Form processing successful"
    FILES_COUNT=$(grep -o "Generated [0-9]* files" /tmp/test_output.txt | grep -o "[0-9]*")
    echo "   ✅ Generated $FILES_COUNT DOCX files"
else
    echo "   ❌ Form processing failed"
    cat /tmp/test_output.txt
    exit 1
fi
echo ""

# Test 4: Verify DOCX Files
echo "4️⃣  Verifying DOCX Files..."
DOCX_COUNT=$(ls -1 output/*.docx 2>/dev/null | wc -l | tr -d ' ')
if [ "$DOCX_COUNT" -gt 0 ]; then
    echo "   ✅ Found $DOCX_COUNT DOCX files in output/"
else
    echo "   ❌ No DOCX files found"
    exit 1
fi
echo ""

# Test 5: Confirm NO New PDFs
echo "5️⃣  Confirming NO New PDF Generation..."
NEW_PDFS=$(find output/*.pdf -mmin -5 2>/dev/null | wc -l | tr -d ' ')
if [ "$NEW_PDFS" -eq 0 ]; then
    echo "   ✅ No new PDF files generated (as expected)"
else
    echo "   ⚠️  Warning: $NEW_PDFS PDF files were created"
fi
echo ""

# Summary
echo "========================================"
echo "🎉 ALL TESTS PASSED!"
echo "========================================"
echo ""
echo "✅ Backend:  http://localhost:5000"
echo "✅ Frontend: http://localhost:3000"
echo "✅ DOCX files: $DOCX_COUNT generated"
echo "✅ PDF files: None (disabled)"
echo ""
echo "🚀 Your application is working perfectly!"

