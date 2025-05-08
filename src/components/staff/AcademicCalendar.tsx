
import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

const AcademicCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Academic calendar events (these would typically come from an API)
  const academicEvents = [
    { date: '2025-05-15', title: 'Final Exams Begin', type: 'exam' },
    { date: '2025-05-25', title: 'Graduation Ceremony', type: 'ceremony' },
    { date: '2025-06-01', title: 'Summer Term Begins', type: 'term' },
    { date: '2025-06-15', title: 'Faculty Development Workshop', type: 'workshop' },
    { date: '2025-07-10', title: 'Research Symposium', type: 'research' },
  ];
  
  // Filter events based on the selected date
  const selectedDateEvents = academicEvents.filter(
    event => new Date(event.date).toDateString() === date?.toDateString()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Academic Calendar</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              Events for {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <ul className="space-y-4">
                {selectedDateEvents.map((event, index) => (
                  <li key={index} className="flex items-start gap-4 p-3 rounded-md bg-gray-50">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">Type: {event.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No events scheduled for this date.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {academicEvents.map((event, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${event.type === 'exam' ? 'bg-red-100 text-red-600' : 
                    event.type === 'ceremony' ? 'bg-purple-100 text-purple-600' : 
                    event.type === 'term' ? 'bg-green-100 text-green-600' : 
                    event.type === 'workshop' ? 'bg-amber-100 text-amber-600' : 
                    'bg-blue-100 text-blue-600'}`}>
                    <CalendarIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{event.title}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicCalendar;
