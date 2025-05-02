
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, Plus, Paperclip } from 'lucide-react';

const MessagesPage = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  
  // Sample conversations data - in a real app, these would come from a database
  const conversations = [
    {
      id: '1',
      recipient: {
        id: '101',
        name: 'Dr. Sarah Johnson',
        avatar: null,
        role: 'Professor',
        course: 'Computer Science 101'
      },
      messages: [
        {
          id: 'm1',
          sender: 'them',
          content: 'Hello! I wanted to follow up on your question from yesterday\'s lecture about algorithm complexity.',
          timestamp: '2023-11-14T14:30:00Z'
        },
        {
          id: 'm2',
          sender: 'me',
          content: 'Thank you for checking in. I was wondering if you could explain the difference between O(n log n) and O(n²) time complexity with an example?',
          timestamp: '2023-11-14T14:35:00Z'
        },
        {
          id: 'm3',
          sender: 'them',
          content: 'Of course! O(n log n) is typically seen in efficient sorting algorithms like mergesort. O(n²) appears in less efficient sorts like bubble sort. Let\'s take an example with 100 elements...',
          timestamp: '2023-11-14T14:40:00Z'
        },
        {
          id: 'm4',
          sender: 'them',
          content: 'Would you like to schedule a time to discuss this further during office hours?',
          timestamp: '2023-11-14T14:42:00Z'
        },
      ]
    },
    {
      id: '2',
      recipient: {
        id: '102',
        name: 'Prof. Michael Smith',
        avatar: null,
        role: 'Department Chair',
        course: 'Software Engineering'
      },
      messages: [
        {
          id: 'm5',
          sender: 'them',
          content: 'Hello there! Just following up on your group project progress. How is everything coming along?',
          timestamp: '2023-11-13T10:15:00Z'
        },
        {
          id: 'm6',
          sender: 'me',
          content: 'Hi Professor Smith, our team has completed the requirements analysis phase and we\'re currently working on the system design. We should be ready for the checkpoint review next week.',
          timestamp: '2023-11-13T10:30:00Z'
        }
      ]
    },
    {
      id: '3',
      recipient: {
        id: '103',
        name: 'Academic Advising',
        avatar: null,
        role: 'Student Services',
        course: null
      },
      messages: [
        {
          id: 'm7',
          sender: 'me',
          content: 'Hello, I\'d like to schedule an appointment to discuss my course selection for next semester.',
          timestamp: '2023-11-10T09:00:00Z'
        },
        {
          id: 'm8',
          sender: 'them',
          content: 'Hi there! I\'d be happy to help you with course selection. We have availability next Tuesday between 2-4 PM or Wednesday morning. Which would work better for you?',
          timestamp: '2023-11-10T09:45:00Z'
        }
      ]
    }
  ];
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    // In a real app, this would send the message to the backend
    // and then update the UI accordingly
    console.log('Sending message:', newMessage, 'to conversation:', activeConversation);
    
    // Clear the input field after sending
    setNewMessage('');
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const activeConvo = conversations.find(c => c.id === activeConversation);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Messages</h2>
        <p className="text-gray-500">Communicate with professors and university staff.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search messages..." 
                className="pl-8" 
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                New Message
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-4 pt-2 border-b">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="flagged" className="flex-1">Flagged</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y">
                {conversations.map(convo => (
                  <div 
                    key={convo.id} 
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${activeConversation === convo.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setActiveConversation(convo.id)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={convo.recipient.avatar || undefined} />
                        <AvatarFallback className="bg-blue-200 text-blue-700">
                          {getInitials(convo.recipient.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-medium truncate">{convo.recipient.name}</h4>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(convo.messages[convo.messages.length - 1].timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {convo.recipient.role}
                          {convo.recipient.course && ` • ${convo.recipient.course}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 truncate">
                      {convo.messages[convo.messages.length - 1].content}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="unread" className="flex-1 p-0 m-0 overflow-auto">
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <p className="text-gray-500">No unread messages</p>
              </div>
            </TabsContent>
            
            <TabsContent value="flagged" className="flex-1 p-0 m-0 overflow-auto">
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <p className="text-gray-500">No flagged messages</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Conversation View */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {activeConvo ? (
            <>
              <div className="p-4 border-b flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={activeConvo.recipient.avatar || undefined} />
                  <AvatarFallback className="bg-blue-200 text-blue-700">
                    {getInitials(activeConvo.recipient.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConvo.recipient.name}</h3>
                  <p className="text-sm text-gray-500">
                    {activeConvo.recipient.role}
                    {activeConvo.recipient.course && ` • ${activeConvo.recipient.course}`}
                  </p>
                </div>
              </div>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConvo.messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === 'me' 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : 'bg-gray-100 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p 
                        className={`text-xs mt-1 text-right ${
                          message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-6">
                <p className="text-gray-500">Select a conversation to view messages</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
