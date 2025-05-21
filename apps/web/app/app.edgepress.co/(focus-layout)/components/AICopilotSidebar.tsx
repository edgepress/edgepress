"use client";

import React, { useState } from "react";

import { Avatar } from "@edgepress/ui/components/avatar";
import { Button } from "@edgepress/ui/components/button";
import { ScrollArea } from "@edgepress/ui/components/scroll-area";
import { cn } from "@edgepress/ui/lib/utils";
import { AlertCircle, Bot, Brain, CheckCircle2, ChevronLeft, ChevronRight, Lightbulb, Send, Sparkles, User, XCircle } from "lucide-react";

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

// Enhanced chat message type
interface ChatMessage {
  content: string;
  role: "bot" | "user";
  timestamp: string;
  status?: "complete" | "processing" | "thinking";
  steps?: {
    description: string;
    status: "completed" | "error" | "in-progress" | "pending";
    step: number;
    total: number;
  }[];
  thinking?: string;
}

// Sample chat messages for demonstration
const initialMessages: ChatMessage[] = [
  {
    content: "Hello! I'm your writing assistant. How can I help improve your content today?",
    role: "bot",
    status: "complete",
    timestamp: new Date().toISOString()
  }
];

export function AICopilotSidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  
  // Handle sending a message to the AI assistant
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      content: inputMessage,
      role: "user",
      status: "complete",
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);
    
    try {
      // Add initial thinking state message
      const botProcessingMessage: ChatMessage = {
        content: "",
        role: "bot",
        status: "thinking",
        thinking: "Analyzing your writing style and content requirements...",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botProcessingMessage]);
      
      // Simulate AI thinking delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update to show multi-step processing
      setMessages(prev => {
        const updatedMessages = [...prev];
        const lastIndex = updatedMessages.length - 1;
        
        if (lastIndex >= 0) {
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            content: "",
            role: "bot",
            status: "processing",
            steps: [
              { description: "Analyzing readability", status: "completed", step: 1, total: 3 },
              { description: "Checking grammar and structure", status: "in-progress", step: 2, total: 3 },
              { description: "Generating improvement suggestions", status: "pending", step: 3, total: 3 }
            ],
            thinking: "Identifying key improvement areas and generating recommendations...",
            timestamp: new Date().toISOString()
          };
        }
        
        return updatedMessages;
      });
      
      // Simulate step 2 completion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages(prev => {
        const updatedMessages = [...prev];
        const lastIndex = updatedMessages.length - 1;
        
        if (lastIndex >= 0) {
          const lastMessage = updatedMessages[lastIndex];
          
          if (lastMessage && lastMessage.steps && lastMessage.steps.length >= 3) {
            const updatedSteps = [...lastMessage.steps];
            // Update steps without modifying the structure
            if (updatedSteps[1]) {
              updatedSteps[1] = { 
                description: updatedSteps[1].description,
                status: "completed",
                step: updatedSteps[1].step,
                total: updatedSteps[1].total 
              };
            }
            
            if (updatedSteps[2]) {
              updatedSteps[2] = { 
                description: updatedSteps[2].description,
                status: "in-progress",
                step: updatedSteps[2].step,
                total: updatedSteps[2].total 
              };
            }
            
            updatedMessages[lastIndex] = {
              ...lastMessage,
              content: "",
              role: "bot",
              steps: updatedSteps,
              thinking: "Finalizing recommendations and formatting suggestions..."
            };
          }
        }
        
        return updatedMessages;
      });
      
      // Simulate step 3 completion and final response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add final AI response
      const botMessage: ChatMessage = {
        content: "I've analyzed your content. Here are some suggestions to improve your writing:\n\n1. Consider adding more concrete examples\n2. The introduction could be more engaging\n3. You might want to break up longer paragraphs for better readability",
        role: "bot",
        status: "complete",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => {
        // Replace the processing message with the final message
        const updatedMessages = [...prev];
        updatedMessages.pop(); // Remove the processing message
        return [...updatedMessages, botMessage];
      });
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle cancelling AI processing
  const handleCancel = () => {
    // In a real implementation, you would cancel the AI request here
    setIsProcessing(false);
    
    // Add a system message indicating cancellation
    const cancelMessage: ChatMessage = {
      content: "Processing cancelled by user.",
      role: "bot",
      status: "complete",
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => {
      const updatedMessages = [...prev];
      // If there's a thinking/processing message, remove it
      const lastMessage = updatedMessages.length > 0 ? updatedMessages[updatedMessages.length-1] : undefined;
      if (lastMessage && (lastMessage.status === "thinking" || lastMessage.status === "processing")) {
        updatedMessages.pop();
      }
      return [...updatedMessages, cancelMessage];
    });
  };
  
  // Handle toggling expanded thinking view
  const toggleExpanded = (index: number) => {
    setIsExpanded(isExpanded === index ? null : index);
  };
  
  // Render different message UI based on status
  const renderMessage = (message: ChatMessage, index: number) => {
    if (message.status === "thinking") {
      return (
        <div className='flex gap-2'>
          <Avatar>
            <Brain className='h-5 w-5' />
          </Avatar>
          <div className='rounded-lg p-3 text-sm bg-muted w-full max-w-[85%]'>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 relative'>
                  <div className='absolute inset-0 border-t-2 border-primary animate-spin rounded-full'></div>
                </div>
                <span className='text-xs font-medium'>Thinking...</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                className='h-6 w-6 p-0' 
                onClick={() => handleCancel()}
              >
                <XCircle className='h-4 w-4 text-muted-foreground' />
                <span className='sr-only'>Cancel</span>
              </Button>
            </div>
            {message.thinking && (
              <div className='text-xs text-muted-foreground pb-1 flex items-start'>
                <div className='bg-background/50 p-1.5 rounded border text-xs'>
                  {message.thinking}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else if (message.status === "processing" && message.steps) {
      return (
        <div className='flex gap-2'>
          <Avatar>
            <Lightbulb className='h-5 w-5' />
          </Avatar>
          <div className='rounded-lg p-3 text-sm bg-muted w-full max-w-[85%]'>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 relative'>
                  <div className='absolute inset-0 border-t-2 border-primary animate-spin rounded-full'></div>
                </div>
                <span className='text-xs font-medium'>Processing...</span>
              </div>
              <div className='flex gap-1'>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className='h-6 w-6 p-0' 
                  onClick={() => toggleExpanded(index)}
                >
                  {isExpanded === index ? (
                    <ChevronRight className='h-4 w-4 text-muted-foreground' />
                  ) : (
                    <ChevronLeft className='h-4 w-4 text-muted-foreground' />
                  )}
                  <span className='sr-only'>Toggle details</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className='h-6 w-6 p-0' 
                  onClick={() => handleCancel()}
                >
                  <XCircle className='h-4 w-4 text-muted-foreground' />
                  <span className='sr-only'>Cancel</span>
                </Button>
              </div>
            </div>
            
            {isExpanded === index && message.thinking && (
              <div className='text-xs text-muted-foreground italic mb-2 bg-background/50 p-1.5 rounded border'>
                {message.thinking}
              </div>
            )}
            
            <div className='space-y-2 border-t pt-2'>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-xs font-medium'>Progress</span>
                <span className='text-xs text-muted-foreground'>
                  {message.steps.filter(s => s.status === 'completed').length}/{message.steps.length}
                </span>
              </div>
              
              {message.steps.map((step) => (
                <div key={step.step} className='flex items-center gap-2'>
                  <div className={cn(
                    'h-4 w-4 flex items-center justify-center rounded-full text-[10px]',
                    step.status === 'completed' ? 'bg-green-500 text-white' : 
                    step.status === 'in-progress' ? 'bg-primary animate-pulse text-white' : 
                    step.status === 'error' ? 'bg-red-500 text-white' : 
                    'border border-muted-foreground text-muted-foreground'
                  )}>
                    {step.status === 'completed' ? '✓' : step.step}
                  </div>
                  <span className={cn(
                    'text-xs flex-1',
                    step.status === 'in-progress' ? 'font-medium' : 
                    step.status === 'completed' ? 'text-muted-foreground line-through' : 
                    step.status === 'error' ? 'text-red-500' : 
                    'text-muted-foreground'
                  )}>
                    {step.description}
                  </span>
                  {step.status === 'in-progress' && (
                    <div className='h-3 w-3 relative'>
                      <div className='absolute inset-0 border-t-2 border-primary animate-spin rounded-full'></div>
                    </div>
                  )}
                  {step.status === 'completed' && (
                    <CheckCircle2 className='h-3 w-3 text-green-500' />
                  )}
                  {step.status === 'error' && (
                    <AlertCircle className='h-3 w-3 text-red-500' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div 
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
      );
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
              <div key={index}>
                {renderMessage(message, index)}
              </div>
            ))}
            
            {isProcessing && !messages[messages.length - 1]?.status && (
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
              disabled={isProcessing}
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
        
          {isProcessing ? (
            <div className='mt-2 flex items-center justify-center'>
              <Button
                size='sm'
                variant='outline'
                className='h-7 text-xs w-full'
                onClick={handleCancel}
              >
                <XCircle className='h-3.5 w-3.5 mr-1' />
                Cancel AI Processing
              </Button>
            </div>
          ) : (
            <div className='mt-2'>
              <div className='text-xs text-muted-foreground mb-1'>
                Quick actions:
              </div>
              <div className='flex gap-2 flex-wrap'>
                <Button
                  size='sm'
                  variant='outline'
                  className='h-7 text-xs'
                  disabled={isProcessing}
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
                  disabled={isProcessing}
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
                  disabled={isProcessing}
                  onClick={() => {
                    setInputMessage('Suggest a better title');
                  }}
                >
                  Better title
                </Button>
              </div>
            </div>
          )}
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
