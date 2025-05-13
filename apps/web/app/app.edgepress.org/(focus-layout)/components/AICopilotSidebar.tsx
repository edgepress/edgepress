"use client";

import React, { useState } from "react";

import { Avatar } from "@edgepress/ui/components/avatar";
import { Button } from "@edgepress/ui/components/button";
import { ScrollArea } from "@edgepress/ui/components/scroll-area";
import { cn } from "@edgepress/ui/lib/utils";
import { Bot, ChevronLeft, ChevronRight, Send, Sparkles, User } from "lucide-react";

import { useSidebar } from "./SidebarContext";

// Create a custom Textarea component for the Copilot
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Sample chat message type
interface ChatMessage {
  content: string;
  role: "bot" | "user";
  timestamp: string;
}

// Sample chat messages for demonstration
const initialMessages: ChatMessage[] = [
  {
    content: "Hello! I'm your writing assistant. How can I help improve your content today?",
    role: "bot",
    timestamp: new Date().toISOString(),
  }
];

export function AICopilotSidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Handle sending a message to the AI assistant
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      content: inputMessage,
      role: "user",
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);
    
    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add AI response
      const botMessage: ChatMessage = {
        content: "I've analyzed your content. Here are some suggestions to improve your writing:\n\n1. Consider adding more concrete examples\n2. The introduction could be more engaging\n3. You might want to break up longer paragraphs for better readability",
        role: "bot",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* AI Copilot Sidebar */}
      <div
        className={cn(
          'fixed top-0 bottom-0 right-0 w-[320px] bg-background rounded-md border border-muted shadow-md z-10',
          'flex flex-col transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className='p-3 border-b flex items-center justify-between'>
          <h3 className='font-medium flex items-center gap-2'>
            <Bot className='h-4 w-4' />
            AI Writing Assistant
          </h3>
          <div className='flex gap-1'>
            <Button size='sm' variant='ghost' className='h-8 w-8 p-0'>
              <Sparkles className='h-4 w-4' />
              <span className='sr-only'>AI Features</span>
            </Button>
          </div>
        </div>
        
        {/* Chat Messages Area */}
        <ScrollArea className='flex-1 p-3'>
          <div className='space-y-4'>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={cn(
                  'flex gap-2 max-w-full',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'bot' && (
                  <Avatar>
                    <Bot className='h-5 w-5' />
                  </Avatar>
                )}
                
                <div
                  className={cn(
                    'rounded-lg p-3 text-sm max-w-[85%]',
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted'
                  )}
                >
                  <div className='whitespace-pre-line'>{message.content}</div>
                </div>
                
                {message.role === 'user' && (
                  <Avatar>
                    <User className='h-5 w-5' />
                  </Avatar>
                )}
              </div>
            ))}
            
            {isProcessing && (
              <div className='flex gap-2'>
                <Avatar>
                  <Bot className='h-5 w-5' />
                </Avatar>
                <div className='rounded-lg p-3 text-sm bg-muted'>
                  <div className='flex gap-1'>
                    <span className='animate-bounce'>·</span>
                    <span className='animate-bounce animation-delay-200'>
                      ·
                    </span>
                    <span className='animate-bounce animation-delay-400'>
                      ·
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Input Area */}
        <div className='p-3 border-t'>
          <div className='flex gap-2'>
            <Textarea 
              className='min-h-9 resize-none'
              value={inputMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInputMessage(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder='Ask me how to improve your writing...'
            />
            <Button 
              size='icon' 
              disabled={isProcessing || !inputMessage.trim()}
              onClick={handleSendMessage}
            >
              <Send className='h-4 w-4' />
              <span className='sr-only'>Send</span>
            </Button>
          </div>
          
          <div className='mt-2'>
            <div className='text-xs text-muted-foreground mb-1'>
              Quick actions:
            </div>
            <div className='flex gap-2 flex-wrap'>
              <Button
                size='sm'
                variant='outline'
                className='h-7 text-xs'
                onClick={() => {
                  setInputMessage("Improve my article's readability");
                }}
              >
                Improve readability
              </Button>
              <Button
                size='sm'
                variant='outline'
                className='h-7 text-xs'
                onClick={() => {
                  setInputMessage('Fix grammar and spelling');
                }}
              >
                Fix grammar
              </Button>
              <Button
                size='sm'
                variant='outline'
                className='h-7 text-xs'
                onClick={() => {
                  setInputMessage('Suggest a better title');
                }}
              >
                Better title
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar Toggle Button */}
      <button 
        className={cn(
          'fixed top-1/2 transform -translate-y-1/2 z-20',
          'h-10 w-6 bg-muted flex items-center justify-center rounded-md border rounded-r-none border-r-0',
          'transition-all duration-300 ease-in-out',
          isSidebarOpen 
            ? 'right-[320px]'
            : 'right-0'
        )}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <ChevronRight className='h-4 w-4' />
        ) : (
          <ChevronLeft className='h-4 w-4' />
        )}
      </button>
    </>
  );
} 
