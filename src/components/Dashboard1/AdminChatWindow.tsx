    // AdminChatWindow.tsx
    import React from 'react';
    import { X, Send } from 'lucide-react';
    import { AdminMessage } from './types';

    interface AdminChatWindowProps {
    adminChat: AdminMessage[];
    chatMessage: string;
    setChatMessage: (msg: string) => void;
    setAdminChat: React.Dispatch<React.SetStateAction<AdminMessage[]>>;
    onClose: () => void;
    }

    const AdminChatWindow: React.FC<AdminChatWindowProps> = ({
    adminChat,
    chatMessage,
    setChatMessage,
    setAdminChat,
    onClose,
    }) => {
    const handleSendMessage = () => {
        if (!chatMessage.trim()) return;
        const now = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        });
        const newMsg: AdminMessage = {
        sender: 'rider',
        message: chatMessage,
        timestamp: now,
        };

        setAdminChat((prev) => [...prev, newMsg]);

        // Simulate auto-reply
        setTimeout(() => {
        setAdminChat((prev) => [
            ...prev,
            {
            sender: 'admin',
            message: 'Your request has been received. Support team is on it.',
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            },
        ]);
        }, 1000);

        setChatMessage('');
    };

    return (
        <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Admin Support</h3>
            <button onClick={onClose}>
            <X className="h-5 w-5" />
            </button>
        </div>

        <div className="space-y-3 mb-4 h-64 overflow-y-auto">
            {adminChat.map((msg, i) => (
            <div
                key={i}
                className={`p-2 rounded-lg max-w-xs ${
                msg.sender === 'rider' ? 'bg-blue-100 ml-auto' : 'bg-red-100'
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
            placeholder="Ask the admin..."
            className="flex-1 border rounded-l px-2 py-1 text-sm"
            onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
            }}
            />
            <button onClick={handleSendMessage} className="bg-black text-white px-3 py-1 rounded-r">
            <Send className="h-4 w-4" />
            </button>
        </div>
        </div>
    );
    };

    export default AdminChatWindow;