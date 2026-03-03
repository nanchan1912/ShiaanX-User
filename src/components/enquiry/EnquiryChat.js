import React, { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import enquiryService from '../../services/enquiryService';
import toast from 'react-hot-toast';

const EnquiryChat = ({ enquiryId, initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      const response = await enquiryService.addMessage(enquiryId, newMessage);
      
      // Update local messages state
      setMessages(prev => [...prev, response]);
      setNewMessage('');
    } catch (err) {
      toast.error('Failed to send message');
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="enquiry-chat-panel">
      <div className="chat-header">
        <h3 className="chat-title">Discussion / Requirements</h3>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#a0aec0', marginTop: '2rem' }}>
            No messages yet. Start the conversation!
          </div>
        )}
        
        {messages.map((msg) => {
          // If role is CUSTOMER or if sender is missing (for local optimistic updates), treat as customer in this panel
          const isCustomer = msg.sender?.role === 'CUSTOMER' || !msg.sender;
          const senderType = isCustomer ? 'user' : 'admin';

          return (
            <div key={msg.id} className={`message-bubble ${senderType}`}>
              <div className="message-content">{msg.message}</div>
              <span className="message-time">{formatTime(msg.createdAt)}</span>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={sending}
        />
        <button type="submit" className="send-btn" disabled={sending}>
          <FiSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default EnquiryChat;
