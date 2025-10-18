import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import { ChatIcon } from './icons/ChatIcon';
import { CloseIcon } from './icons/CloseIcon';
import { useTranslation } from '../i18n';
import { useTheme } from './theme/ThemeContext';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: t('chatbot.initialMessage') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update initial message if language changes
    setMessages(msgs => msgs.map((msg, index) => index === 0 ? { ...msg, text: t('chatbot.initialMessage') } : msg));
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponseText = await getChatbotResponse(input);
    const botMessage: Message = { text: botResponseText, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-[var(--color-secondary)] text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-transform transform focus:outline-none z-20"
        style={{ animation: `${theme === 'dark' ? 'pulse-glow-fab' : 'pulse-scale'} 2s infinite ease-in-out` }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-[var(--bg-medium)] border border-[var(--border-color)] rounded-lg shadow-2xl shadow-[var(--shadow-color)] flex flex-col z-20">
          <header className="p-4 bg-black/20 border-b border-[var(--border-color)] text-center">
            <h2 className="text-lg font-bold text-[var(--text-accent-primary)]">{t('chatbot.title')}</h2>
          </header>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-[var(--color-accent)] text-white rounded-br-none'
                      : 'bg-[var(--bg-light)] text-[var(--text-primary)] rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                 <div className="max-w-[80%] p-3 rounded-lg bg-[var(--bg-light)] text-[var(--text-primary)] rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-[var(--text-accent-primary)] rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-[var(--text-accent-primary)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-[var(--text-accent-primary)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-[var(--border-color)]">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                disabled={isLoading}
              />
              <button onClick={handleSend} className="bg-[var(--color-secondary)] text-[var(--text-inverted)] px-4 rounded-r-md hover:bg-[var(--color-secondary-hover)] disabled:bg-gray-500">
                {t('chatbot.send')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;