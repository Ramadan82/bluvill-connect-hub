
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Moon, Sun, Globe, Key, ShieldAlert } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [calendarReminders, setCalendarReminders] = useState(true);
  const [timeFormat, setTimeFormat] = useState("12hour");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("GMT+01:00");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  const handleResetSettings = () => {
    // In a real app, reset all settings to default
    setDarkMode(false);
    setEmailNotifications(true);
    setPushNotifications(true);
    setCalendarReminders(true);
    setTimeFormat("12hour");
    setLanguage("en");
    setTimezone("GMT+01:00");
    
    toast({
      title: "Settings Reset",
      description: "Your preferences have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-500">Customize your account preferences and notification settings.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Appearance */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center">
              <Sun className="h-5 w-5 mr-2 text-yellow-500" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize how the student portal looks for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-gray-500">
                  Enable dark mode to reduce eye strain and save battery.
                </p>
              </div>
              <Switch 
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Separator />
            <div>
              <Label className="block mb-2">Time Format</Label>
              <RadioGroup 
                value={timeFormat} 
                onValueChange={setTimeFormat}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="12hour" id="12hour" />
                  <Label htmlFor="12hour">12-hour (1:00 PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="24hour" id="24hour" />
                  <Label htmlFor="24hour">24-hour (13:00)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        
        {/* Notifications */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-blue-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage how and when you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive emails for important updates, grades, and announcements.
                </p>
              </div>
              <Switch 
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive notifications on your device for updates and reminders.
                </p>
              </div>
              <Switch 
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="calendar-reminders">Calendar Reminders</Label>
                <p className="text-sm text-gray-500">
                  Receive reminders for upcoming classes and assignment due dates.
                </p>
              </div>
              <Switch 
                id="calendar-reminders"
                checked={calendarReminders}
                onCheckedChange={setCalendarReminders}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Localization */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-500" />
              <CardTitle>Localization</CardTitle>
            </div>
            <CardDescription>Set your preferred language and timezone</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="yo">Yoruba</SelectItem>
                  <SelectItem value="ig">Igbo</SelectItem>
                  <SelectItem value="ha">Hausa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GMT+01:00">Nigeria (GMT+01:00)</SelectItem>
                  <SelectItem value="GMT+00:00">GMT+00:00</SelectItem>
                  <SelectItem value="GMT-05:00">Eastern Time (GMT-05:00)</SelectItem>
                  <SelectItem value="GMT-08:00">Pacific Time (GMT-08:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Security */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2 text-red-500" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">
                  Enhance your account security by enabling two-factor authentication.
                </p>
              </div>
              <Button variant="outline" className="flex items-center">
                <Key className="h-4 w-4 mr-2" />
                Setup 2FA
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-gray-500">
                  Change your password regularly to keep your account secure.
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Session Management</h3>
                <p className="text-sm text-gray-500">
                  Manage your active sessions and sign out from other devices.
                </p>
              </div>
              <Button variant="outline">Manage Sessions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={handleResetSettings}>Reset to Default</Button>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
