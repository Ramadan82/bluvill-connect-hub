
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample events data - in a real app, this would come from the database
  const events = [
    {
      id: '1',
      title: 'Introduction to Programming',
      date: new Date(),
      time: '10:00 AM - 11:30 AM',
      type: 'lecture',
      course: 'Computer Science 101'
    },
    {
      id: '2',
      title: 'Database Design Quiz',
      date: new Date(),
      time: '2:00 PM - 3:00 PM',
      type: 'assessment',
      course: 'Database Systems'
    },
    {
      id: '3',
      title: 'Group Project Meeting',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      time: '3:30 PM - 4:30 PM',
      type: 'meeting',
      course: 'Software Engineering'
    }
  ];

  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );

  // Function to get the badge color based on event type
  const getEventBadgeColor = (type: string) => {
    switch(type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'assessment':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'meeting':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Academic Calendar</h2>
        <p className="text-gray-500">View your schedule, upcoming classes, and assessments.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
            />
            <div className="mt-4 space-y-2">
              <p className="font-medium">Event Types:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">Lecture</Badge>
                <Badge variant="outline" className="bg-red-100 text-red-800">Assessment</Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800">Meeting</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? (
                <>Events for {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</>
              ) : (
                <>Events</>
              )}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''} scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="outline" className={getEventBadgeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{event.course}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">No Events Today</h3>
                <p className="text-gray-500">
                  There are no scheduled events for the selected date.
                </p>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button>
                <CalendarIcon className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
