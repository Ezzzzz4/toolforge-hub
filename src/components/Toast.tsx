"use client";

import { useEffect, useState, useCallback } from "react";

interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}

let toastId = 0;
const listeners: Set<(toast: Toast) => void> = new Set();

export function showToast(message: string, type: "success" | "error" | "info" = "success") {
    const toast: Toast = { id: String(++toastId), message, type };
    listeners.forEach((listener) => listener(toast));
}

export default function ToastContainer() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Toast) => {
        setToasts((prev) => [...prev, toast]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, 3000);
    }, []);

    useEffect(() => {
        listeners.add(addToast);
        return () => {
            listeners.delete(addToast);
        };
    }, [addToast]);

    if (toasts.length === 0) return null;

    return (
        <div
            style={{
                position: "fixed",
                bottom: "1rem",
                right: "1rem",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            }}
        >
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-lg)",
                        backgroundColor:
                            toast.type === "success"
                                ? "var(--color-success)"
                                : toast.type === "error"
                                    ? "var(--color-error)"
                                    : "var(--color-primary)",
                        color: "white",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        boxShadow: "var(--shadow-lg)",
                        animation: "slideIn 0.2s ease-out",
                    }}
                >
                    {toast.type === "success" && "✓ "}
                    {toast.type === "error" && "✗ "}
                    {toast.message}
                </div>
            ))}
            <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}
