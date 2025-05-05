const Student = require('../models/Student');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

// @desc    Export student data (individual or all)
// @route   GET /api/export/students/:id
// @access  Private
exports.exportStudentData = asyncHandler(async (req, res, next) => {
  const format = req.query.format || 'pdf';
  const id = req.params.id;
  
  let students;
  
  // Get individual student or all students
  if (id !== 'all') {
    const student = await Student.findById(id).populate('createdBy', 'displayName');
    
    if (!student) {
      return next(
        new ErrorResponse(`Student not found with id of ${id}`, 404)
      );
    }
    
    students = [student];
  } else {
    // Get all students with optional filters
    const query = { ...req.query };
    
    // Fields to exclude from filtering
    const excludeFields = ['format', 'select', 'sort'];
    excludeFields.forEach(field => delete query[field]);
    
    students = await Student.find(query).populate('createdBy', 'displayName');
  }
  
  // Export based on format
  if (format === 'pdf') {
    return exportToPdf(students, res);
  } else if (format === 'excel') {
    return exportToExcel(students, res);
  } else {
    return next(
      new ErrorResponse(`Unsupported export format: ${format}`, 400)
    );
  }
});

// @desc    Export report data
// @route   POST /api/export/reports/:type
// @access  Private
exports.exportReportData = asyncHandler(async (req, res, next) => {
  const reportType = req.params.type;
  const format = req.query.format || 'pdf';
  const filters = req.body;
  
  // Based on report type, generate appropriate data
  let reportData;
  
  switch (reportType) {
    case 'attendance':
      // Logic to get attendance report data
      reportData = await getAttendanceReportData(filters);
      break;
    case 'marks':
      // Logic to get marks report data
      reportData = await getMarksReportData(filters);
      break;
    case 'students':
      // Logic to get student listings
      reportData = await getStudentReportData(filters);
      break;
    default:
      return next(
        new ErrorResponse(`Unsupported report type: ${reportType}`, 400)
      );
  }
  
  // Export based on format
  if (format === 'pdf') {
    return exportReportToPdf(reportType, reportData, res);
  } else if (format === 'excel') {
    return exportReportToExcel(reportType, reportData, res);
  } else {
    return next(
      new ErrorResponse(`Unsupported export format: ${format}`, 400)
    );
  }
});

// Helper function to export student data to PDF
const exportToPdf = (students, res) => {
  // Create a document
  const doc = new PDFDocument({ margin: 50 });
  
  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=students-${Date.now()}.pdf`);
  
  // Pipe to response
  doc.pipe(res);
  
  // Add school logo/header
  doc.fontSize(25).text('School Management System', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text('Student Information Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
  doc.moveDown(2);
  
  // Add student information
  students.forEach((student, index) => {
    if (index > 0) {
      doc.addPage();
    }
    
    doc.fontSize(16).text(`Student Details: ${student.name}`, { underline: true });
    doc.moveDown();
    
    const details = [
      { label: 'ID', value: student.id },
      { label: 'Class', value: `${student.class} - ${student.section}` },
      { label: 'Roll Number', value: student.rollNo },
      { label: 'Gender', value: student.gender },
      { label: 'Father\'s Name', value: student.fatherName },
      { label: 'Mother\'s Name', value: student.motherName },
      { label: 'Contact Number', value: student.contactNo },
      { label: 'Email', value: student.email || 'N/A' },
      { label: 'Address', value: student.address },
      { label: 'Joining Date', value: new Date(student.joiningDate).toLocaleDateString() },
      { label: 'Status', value: student.status === 'active' ? 'Active' : 'Inactive' }
    ];
    
    details.forEach(detail => {
      doc.fontSize(12).text(`${detail.label}: ${detail.value}`);
      doc.moveDown(0.5);
    });
    
    // Add created by info
    if (student.createdBy) {
      doc.moveDown();
      doc.fontSize(10).text(`Added by: ${student.createdBy.displayName || 'System'}`);
    }
  });
  
  // Finalize the PDF and end the stream
  doc.end();
};

// Helper function to export student data to Excel
const exportToExcel = async (students, res) => {
  // Create workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Students');
  
  // Define columns
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 15 },
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Class', key: 'class', width: 10 },
    { header: 'Section', key: 'section', width: 10 },
    { header: 'Roll No', key: 'rollNo', width: 10 },
    { header: 'Gender', key: 'gender', width: 10 },
    { header: 'Father\'s Name', key: 'fatherName', width: 25 },
    { header: 'Mother\'s Name', key: 'motherName', width: 25 },
    { header: 'Contact No', key: 'contactNo', width: 15 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Address', key: 'address', width: 40 },
    { header: 'Joining Date', key: 'joiningDate', width: 15 },
    { header: 'Status', key: 'status', width: 10 }
  ];
  
  // Style the header
  worksheet.getRow(1).font = { bold: true };
  
  // Add rows
  students.forEach(student => {
    worksheet.addRow({
      id: student.id,
      name: student.name,
      class: student.class,
      section: student.section,
      rollNo: student.rollNo,
      gender: student.gender,
      fatherName: student.fatherName,
      motherName: student.motherName,
      contactNo: student.contactNo,
      email: student.email || 'N/A',
      address: student.address,
      joiningDate: new Date(student.joiningDate).toLocaleDateString(),
      status: student.status === 'active' ? 'Active' : 'Inactive'
    });
  });
  
  // Set content type and disposition
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=students-${Date.now()}.xlsx`);
  
  // Write to response
  await workbook.xlsx.write(res);
  res.end();
};

// Helper function to get attendance report data
const getAttendanceReportData = async (filters) => {
  // This would connect to your attendance model and return data
  // For now, returning a placeholder
  return {
    title: 'Attendance Report',
    date: new Date(),
    filters,
    data: []
  };
};

// Helper function to get marks report data
const getMarksReportData = async (filters) => {
  // This would connect to your marks model and return data
  // For now, returning a placeholder
  return {
    title: 'Marks Report',
    date: new Date(),
    filters,
    data: []
  };
};

// Helper function to get student report data
const getStudentReportData = async (filters) => {
  // Get students based on filters
  const students = await Student.find(filters).populate('createdBy', 'displayName');
  
  return {
    title: 'Student Listing Report',
    date: new Date(),
    filters,
    data: students
  };
};

// Helper function to export reports to PDF
const exportReportToPdf = (reportType, reportData, res) => {
  // Create a document
  const doc = new PDFDocument({ margin: 50 });
  
  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${reportType}-report-${Date.now()}.pdf`);
  
  // Pipe to response
  doc.pipe(res);
  
  // Add report header
  doc.fontSize(25).text('School Management System', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(reportData.title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Generated on: ${reportData.date.toLocaleDateString()}`, { align: 'center' });
  doc.moveDown(2);
  
  // Add report-specific content
  switch (reportType) {
    case 'attendance':
      // Format attendance data
      doc.fontSize(16).text('Attendance Summary', { underline: true });
      doc.moveDown();
      // Add attendance-specific content
      break;
    case 'marks':
      // Format marks data
      doc.fontSize(16).text('Marks Summary', { underline: true });
      doc.moveDown();
      // Add marks-specific content
      break;
    case 'students':
      // Format student listing
      doc.fontSize(16).text('Student Listing', { underline: true });
      doc.moveDown();
      
      if (reportData.data.length === 0) {
        doc.text('No students found matching the criteria.');
      } else {
        reportData.data.forEach((student, index) => {
          doc.fontSize(14).text(`${index + 1}. ${student.name} (${student.id})`);
          doc.fontSize(12).text(`Class: ${student.class}-${student.section}, Roll No: ${student.rollNo}`);
          doc.fontSize(12).text(`Status: ${student.status === 'active' ? 'Active' : 'Inactive'}`);
          doc.moveDown();
        });
      }
      break;
  }
  
  // Finalize the PDF and end the stream
  doc.end();
};

// Helper function to export reports to Excel
const exportReportToExcel = async (reportType, reportData, res) => {
  // Create workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(reportData.title);
  
  // Add title and metadata
  worksheet.mergeCells('A1:G1');
  worksheet.getCell('A1').value = reportData.title;
  worksheet.getCell('A1').font = { bold: true, size: 16 };
  worksheet.getCell('A1').alignment = { horizontal: 'center' };
  
  worksheet.mergeCells('A2:G2');
  worksheet.getCell('A2').value = `Generated on: ${reportData.date.toLocaleDateString()}`;
  worksheet.getCell('A2').alignment = { horizontal: 'center' };
  
  // Add report-specific content
  switch (reportType) {
    case 'attendance':
      // Format attendance data
      // Set columns based on attendance structure
      break;
    case 'marks':
      // Format marks data
      // Set columns based on marks structure
      break;
    case 'students':
      // Format student listing
      // Define columns
      worksheet.getRow(4).values = [
        'ID', 'Name', 'Class', 'Section', 'Roll No', 'Gender', 'Status'
      ];
      worksheet.getRow(4).font = { bold: true };
      
      // Add data rows
      let rowIndex = 5;
      reportData.data.forEach(student => {
        worksheet.getRow(rowIndex).values = [
          student.id,
          student.name,
          student.class,
          student.section,
          student.rollNo,
          student.gender,
          student.status === 'active' ? 'Active' : 'Inactive'
        ];
        rowIndex++;
      });
      break;
  }
  
  // Set content type and disposition
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${reportType}-report-${Date.now()}.xlsx`);
  
  // Write to response
  await workbook.xlsx.write(res);
  res.end();
}; 