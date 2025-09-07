    // ChatWindow.tsx
    import React from 'react';
    import { X, Send } from 'lucide-react';
    import { ChatMessage } from './types';

    interface ChatWindowProps {
    customerName: string;
    chat: ChatMessage[];
    chatMessage: string;
    setChatMessage: (msg: string) => void;
    sendMessage: () => void;
    onClose: () => void;
    }

    const ChatWindow: React.FC<ChatWindowProps> = ({
    customerName,
    chat,
    chatMessage,
    setChatMessage,
    sendMessage,
    onClose,
    }) => {
    return (
        <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Chat with {customerName}</h3>
            <button onClick={onClose}>
            <X className="h-5 w-5" />
            </button>
        </div>
        <div className="space-y-3 mb-4 h-64 overflow-y-auto">
            {chat.map((msg, i) => (
            <div
                key={i}
                className={`p-2 rounded-lg max-w-xs ${
                msg.sender === 'rider' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                }`}
            >
                <p className="text-xs">{msg.message}</p>
                <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
            </div>
            ))}
        </div>
        <div className="flex">
            <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-l px-2 py-1 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-black text-white px-3 py-1 rounded-r">
            <Send className="h-4 w-4" />
            </button>
        </div>
        </div>
    );
    };

    export default ChatWindow;