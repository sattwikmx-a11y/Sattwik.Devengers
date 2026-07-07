import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Download, Copy, RefreshCw, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your AI Civic Companion. How can I assist you with government services, civic issues, or procedures today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Here is some information regarding your request: "${newUserMessage.text}". \n\n* This process typically takes 5-7 working days.\n* You will need: Aadhar Card, Proof of Address, and recent photographs.\n\nWould you like me to generate a complete checklist PDF?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[80vh] max-h-[800px] glass-panel rounded-2xl overflow-hidden border-primary/20">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center relative">
            <Bot className="w-6 h-6 text-primary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-[#09090B]"></div>
          </div>
          <div>
            <h2 className="font-semibold">Sattwik AI</h2>
            <p className="text-xs text-accent flex items-center gap-1">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg text-muted transition-colors" title="Download Chat">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg text-muted transition-colors" title="Clear Chat">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[80%] md:max-w-[70%] flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-5 py-3 rounded-2xl whitespace-pre-wrap ${
                msg.sender === 'user' 
                  ? 'bg-secondary text-white rounded-tr-sm' 
                  : 'bg-white/10 border border-white/10 rounded-tl-sm text-white/90'
              }`}>
                {msg.text}
              </div>
              
              <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button className="hover:text-white transition-colors flex items-center gap-1">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="px-5 py-4 bg-white/10 border border-white/10 rounded-2xl rounded-tl-sm flex gap-2 items-center">
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <button type="button" className="absolute left-4 p-2 text-muted hover:text-white transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a government service or civic issue..."
            className="w-full bg-white/5 border border-white/20 rounded-xl py-4 pl-14 pr-16 focus:outline-none focus:border-primary focus:bg-white/10 transition-all text-white placeholder-muted"
          />
          
          <button
            type="submit"
            disabled={!input.trim()}
            className={`absolute right-3 p-2 rounded-lg transition-all ${
              input.trim() 
                ? 'bg-primary text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                : 'bg-white/10 text-muted cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-xs text-muted mt-3">
          Sattwik AI can make mistakes. Consider verifying important government information.
        </p>
      </div>

    </div>
  );
};

export default AIAssistant;
