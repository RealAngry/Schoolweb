import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Globe, 
  Mail, 
  Shield, 
  Users, 
  FileText, 
  Clock, 
  Palette,
  AlertCircle,
  Moon,
  Sun,
  Upload
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { useAuth } from '../../context/AuthContext';
import { Separator } from '../ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { toast } from '../ui/use-toast';

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  darkMode: boolean;
  accentColor: string;
  logo: string;
  favicon: string;
}

interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  googleAnalyticsId: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  defaultUserRole: string;
}

interface EmailSettings {
  smtpServer: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  senderEmail: string;
  senderName: string;
  enableEmailNotifications: boolean;
}

interface SecuritySettings {
  loginAttempts: string;
  lockoutDuration: string;
  passwordMinLength: string;
  requireSpecialChars: boolean;
  requireNumbers: boolean;
  requireUppercase: boolean;
  sessionTimeout: string;
  twoFactorAuth: boolean;
}

const WebsiteSettings: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  // Theme settings state
  const [theme, setTheme] = useState<ThemeSettings>({
    primaryColor: '#3b82f6',
    secondaryColor: '#6366f1',
    accentColor: '#10b981',
    darkMode: false,
    logo: '/images/logo.png',
    favicon: '/images/favicon.ico'
  });
  
  // General settings state
  const [general, setGeneral] = useState<GeneralSettings>({
    siteName: 'School Management System',
    siteDescription: 'A comprehensive system for managing school operations',
    contactEmail: 'contact@school.edu',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Education Street, Learning City, 12345',
    googleAnalyticsId: 'UA-XXXXXXXXX-X',
    maintenanceMode: false,
    allowRegistration: true,
    defaultUserRole: 'student'
  });
  
  // Email settings state
  const [email, setEmail] = useState<EmailSettings>({
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'notifications@school.edu',
    smtpPassword: '********',
    senderEmail: 'noreply@school.edu',
    senderName: 'School Management System',
    enableEmailNotifications: true
  });
  
  // Security settings state
  const [security, setSecurity] = useState<SecuritySettings>({
    loginAttempts: '5',
    lockoutDuration: '30',
    passwordMinLength: '8',
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionTimeout: '60',
    twoFactorAuth: false
  });
  
  // Theme handlers
  const handleThemeChange = (key: keyof ThemeSettings, value: string | boolean) => {
    setTheme({
      ...theme,
      [key]: value
    });
  };
  
  // General settings handlers
  const handleGeneralChange = (key: keyof GeneralSettings, value: string | boolean) => {
    setGeneral({
      ...general,
      [key]: value
    });
  };
  
  // Email settings handlers
  const handleEmailChange = (key: keyof EmailSettings, value: string | boolean) => {
    setEmail({
      ...email,
      [key]: value
    });
  };
  
  // Security settings handlers
  const handleSecurityChange = (key: keyof SecuritySettings, value: string | boolean) => {
    setSecurity({
      ...security,
      [key]: value
    });
  };
  
  // Save settings (mock)
  const handleSaveSettings = (settingType: string) => {
    // In a real app, this would send the data to an API
    console.log(`Saving ${settingType} settings:`, 
      settingType === 'theme' ? theme : 
      settingType === 'general' ? general :
      settingType === 'email' ? email :
      security
    );
    
    toast({
      title: "Settings Updated",
      description: `Your ${settingType} settings have been saved successfully.`,
      duration: 3000,
    });
  };
  
  return (
    <div className="h-[calc(100vh-180px)] overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure system settings and preferences
          </p>
        </div>
      </motion.div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="flex items-center">
            <Globe size={16} className="mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center">
            <Mail size={16} className="mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield size={16} className="mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette size={16} className="mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic information about your school management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={general.siteName}
                    onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={general.contactEmail}
                    onChange={(e) => handleGeneralChange('contactEmail', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={general.phoneNumber}
                    onChange={(e) => handleGeneralChange('phoneNumber', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={general.googleAnalyticsId}
                    onChange={(e) => handleGeneralChange('googleAnalyticsId', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={general.address}
                  onChange={(e) => handleGeneralChange('address', e.target.value)}
                  disabled={!isAdmin}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={general.siteDescription}
                  onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
                  rows={3}
                  disabled={!isAdmin}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Registration Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowRegistration">Allow Public Registration</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow users to register for accounts on the system
                    </p>
                  </div>
                  <Switch
                    id="allowRegistration"
                    checked={general.allowRegistration}
                    onCheckedChange={(checked) => handleGeneralChange('allowRegistration', checked)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultUserRole">Default User Role</Label>
                  <Select
                    value={general.defaultUserRole}
                    onValueChange={(value) => handleGeneralChange('defaultUserRole', value)}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger id="defaultUserRole">
                      <SelectValue placeholder="Select default role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The default role assigned to new users upon registration
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Put the site in maintenance mode (only admins can access)
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={general.maintenanceMode}
                    onCheckedChange={(checked) => handleGeneralChange('maintenanceMode', checked)}
                    disabled={!isAdmin}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={() => handleSaveSettings('general')} disabled={!isAdmin}>
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email server settings for notifications and communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={email.smtpServer}
                    onChange={(e) => handleEmailChange('smtpServer', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={email.smtpPort}
                    onChange={(e) => handleEmailChange('smtpPort', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={email.smtpUsername}
                    onChange={(e) => handleEmailChange('smtpUsername', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={email.smtpPassword}
                    onChange={(e) => handleEmailChange('smtpPassword', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={email.senderEmail}
                    onChange={(e) => handleEmailChange('senderEmail', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    value={email.senderName}
                    onChange={(e) => handleEmailChange('senderName', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Send automated email notifications for system events
                  </p>
                </div>
                <Switch
                  id="enableEmailNotifications"
                  checked={email.enableEmailNotifications}
                  onCheckedChange={(checked) => handleEmailChange('enableEmailNotifications', checked)}
                  disabled={!isAdmin}
                />
              </div>
              
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-4 flex items-start space-x-3">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Test Email Configuration</h3>
                  <p className="text-sm mt-1">
                    Before saving, it's recommended to test your email configuration to ensure emails can be sent successfully.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 bg-white" disabled={!isAdmin}>
                    Send Test Email
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={() => handleSaveSettings('email')} disabled={!isAdmin}>
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings to protect your system and user data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={security.loginAttempts}
                    onChange={(e) => handleSecurityChange('loginAttempts', e.target.value)}
                    disabled={!isAdmin}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Number of failed login attempts before account lockout
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    min="5"
                    max="1440"
                    value={security.lockoutDuration}
                    onChange={(e) => handleSecurityChange('lockoutDuration', e.target.value)}
                    disabled={!isAdmin}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Time period account remains locked after exceeding max attempts
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    min="6"
                    max="32"
                    value={security.passwordMinLength}
                    onChange={(e) => handleSecurityChange('passwordMinLength', e.target.value)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="1440"
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    disabled={!isAdmin}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Time of inactivity before user is automatically logged out
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Password Requirements</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                  <Switch
                    id="requireSpecialChars"
                    checked={security.requireSpecialChars}
                    onCheckedChange={(checked) => handleSecurityChange('requireSpecialChars', checked)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireNumbers">Require Numbers</Label>
                  <Switch
                    id="requireNumbers"
                    checked={security.requireNumbers}
                    onCheckedChange={(checked) => handleSecurityChange('requireNumbers', checked)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                  <Switch
                    id="requireUppercase"
                    checked={security.requireUppercase}
                    onCheckedChange={(checked) => handleSecurityChange('requireUppercase', checked)}
                    disabled={!isAdmin}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Require two-factor authentication for all users
                  </p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                  disabled={!isAdmin}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={() => handleSaveSettings('security')} disabled={!isAdmin}>
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                      className="w-12 h-10 p-0 mr-2"
                      disabled={!isAdmin}
                    />
                    <Input
                      value={theme.primaryColor}
                      onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                      className="flex-1"
                      disabled={!isAdmin}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                      className="w-12 h-10 p-0 mr-2"
                      disabled={!isAdmin}
                    />
                    <Input
                      value={theme.secondaryColor}
                      onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                      className="flex-1"
                      disabled={!isAdmin}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex">
                    <Input
                      id="accentColor"
                      type="color"
                      value={theme.accentColor}
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="w-12 h-10 p-0 mr-2"
                      disabled={!isAdmin}
                    />
                    <Input
                      value={theme.accentColor}
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="flex-1"
                      disabled={!isAdmin}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable dark mode as the default theme
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun size={18} className="text-amber-500" />
                  <Switch
                    id="darkMode"
                    checked={theme.darkMode}
                    onCheckedChange={(checked) => handleThemeChange('darkMode', checked)}
                  />
                  <Moon size={18} className="text-indigo-500" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Logo & Branding</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Site Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-center overflow-hidden bg-white">
                      {theme.logo ? (
                        <img src={theme.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <Globe size={32} className="text-gray-400" />
                      )}
                    </div>
                    <Button variant="outline" disabled={!isAdmin}>
                      <Upload size={16} className="mr-2" />
                      Upload New Logo
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-center overflow-hidden bg-white">
                      {theme.favicon ? (
                        <img src={theme.favicon} alt="Favicon" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <Globe size={20} className="text-gray-400" />
                      )}
                    </div>
                    <Button variant="outline" disabled={!isAdmin}>
                      <Upload size={16} className="mr-2" />
                      Upload New Favicon
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recommended size: 32×32px, PNG or ICO format
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 mt-6">
                <h3 className="font-medium mb-2">Preview</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <div 
                    className="h-8 flex items-center px-4" 
                    style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
                  >
                    <div className="w-4 h-4 mr-2 rounded-full bg-white" />
                    <span>Header with Primary Color</span>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-900 flex items-start space-x-2">
                    <div className="w-24 p-2 rounded-md text-center text-white" style={{ backgroundColor: theme.secondaryColor }}>
                      Button
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700 mb-2" />
                      <div className="h-4 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>
                  <div 
                    className="h-6 flex items-center justify-center text-xs text-white"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    Footer with Accent Color
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={() => handleSaveSettings('theme')} disabled={!isAdmin}>
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings; 