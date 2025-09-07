    // Modals.tsx
    import React from 'react';
    import { Loader } from 'lucide-react';

    interface SignOutModalProps {
    show: boolean;
    loading: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    }

    export const SignOutModal: React.FC<SignOutModalProps> = ({ show, loading, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4">Sign out?</h3>
            <div className="flex justify-end space-x-4">
            <button
                onClick={onCancel}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100 text-sm"
            >
                No
            </button>
            <button
                onClick={onConfirm}
                disabled={loading}
                className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 flex items-center text-sm"
            >
                {loading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : 'Yes'}
                {loading && <span className="ml-2">Signing out...</span>}
            </button>
            </div>
        </div>
        </div>
    );
    };

    interface DeclineModalProps {
    show: boolean;
    reason: string;
    setReason: (reason: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
    }

    export const DeclineModal: React.FC<DeclineModalProps> = ({ show, reason, setReason, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4">Decline Order?</h3>
            <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for declining..."
            className="w-full border rounded p-2 mb-4 text-sm"
            rows={3}
            />
            <div className="flex justify-end space-x-4">
            <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-black text-sm">
                Cancel
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm">
                Decline
            </button>
            </div>
        </div>
        </div>
    );
    };