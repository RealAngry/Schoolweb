import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  GraduationCap, 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw, 
  ChevronDown,
  Printer
} from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { Label } from '../ui/label';

// Define available report types
const reportTypes = [
  {
    id: 'student-attendance',
    title: 'Student Attendance Report',
    description: 'Detailed report of student attendance records by class and date range',
    icon: <GraduationCap size={20} className="text-blue-500" />,
    format: ['PDF', 'CSV', 'Excel']
  },
  {
    id: 'teacher-performance',
    title: 'Teacher Performance Report',
    description: 'Evaluation metrics and performance indicators for teaching staff',
    icon: <Users size={20} className="text-green-500" />,
    format: ['PDF', 'Excel']
  },
  {
    id: 'exam-results',
    title: 'Examination Results',
    description: 'Comprehensive analysis of examination results by class and subject',
    icon: <FileText size={20} className="text-purple-500" />,
    format: ['PDF', 'CSV', 'Excel']
  },
  {
    id: 'fee-collection',
    title: 'Fee Collection Summary',
    description: 'Summary of fees collected, pending, and overall financial status',
    icon: <FileText size={20} className="text-amber-500" />,
    format: ['PDF', 'Excel']
  },
  {
    id: 'event-calendar',
    title: 'School Event Calendar',
    description: 'Calendar of upcoming school events, holidays, and important dates',
    icon: <Calendar size={20} className="text-red-500" />,
    format: ['PDF', 'iCal']
  },
];

// Report card component
const ReportCard = ({ 
  report, 
  onGenerate 
}: { 
  report: typeof reportTypes[0], 
  onGenerate: (reportId: string, format: string) => void 
}) => {
  const [format, setFormat] = useState(report.format[0]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate API call with timeout
    setTimeout(() => {
      onGenerate(report.id, format);
      setGenerating(false);
    }, 1500);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-800">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
          {report.icon}
        </div>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            {report.format.map(f => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {report.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {report.description}
      </p>

      <div className="flex space-x-2">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <>
              <RefreshCw size={14} className="mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download size={14} className="mr-2" />
              Generate
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

// Filter options
const dateRanges = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

const Reports: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('month');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);

  // Filter reports based on search and type
  const filteredReports = reportTypes.filter(report => {
    // Filter by report type
    if (selectedReportType !== 'all' && report.id !== selectedReportType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Handle report generation
  const handleGenerateReport = (reportId: string, format: string) => {
    console.log(`Generating ${reportId} in ${format} format for ${dateRange} date range`);
    // In a real app, this would call an API endpoint
    
    // Simulate download notification
    setTimeout(() => {
      alert(`${reportId}.${format.toLowerCase()} is ready for download`);
    }, 500);
  };

  // Generate all reports
  const handleGenerateAllReports = () => {
    setIsGeneratingBatch(true);
    // Simulate batch generation
    setTimeout(() => {
      filteredReports.forEach(report => {
        console.log(`Generated ${report.id} in ${report.format[0]} format`);
      });
      setIsGeneratingBatch(false);
      alert('All reports have been generated and are ready for download');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate and download school management reports
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.print()}
            className="flex items-center"
          >
            <Printer size={16} className="mr-2" />
            Print
          </Button>
          <Button
            disabled={isGeneratingBatch || filteredReports.length === 0}
            onClick={handleGenerateAllReports}
          >
            {isGeneratingBatch ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download size={16} className="mr-2" />
                Generate All
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Label htmlFor="report-type" className="block text-sm font-medium mb-2">
              Report Type
            </Label>
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                {reportTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Label htmlFor="date-range" className="block text-sm font-medium mb-2">
              Date Range
            </Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="date-range">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-none">
            <Button variant="outline" size="default" className="w-full md:w-auto">
              <Filter size={16} className="mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReportCard 
                report={report} 
                onGenerate={handleGenerateReport} 
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No reports found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;