import React, { createContext, useContext, useState, useMemo } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    // Initial mock data based on high-fidelity screenshots
    const [projects, setProjects] = useState([
        {
            id: 'p1',
            title: "DeFi Yield Aggregator Protocol",
            category: "WEB3",
            status: "LIVE BUILD",
            type: "project",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070",
            reward: 3500
        },
        {
            id: 'p2',
            title: "Neural Network Content Moderator",
            category: "AI",
            status: "BETA",
            type: "project",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070",
            reward: 4200
        },
        {
            id: 'p3',
            title: "Cross-Platform Wallet Bridge",
            category: "MOBILE",
            status: "TESTING",
            type: "project",
            image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1974",
            reward: 2800
        },
        {
            id: 'p4',
            title: "GraphQL Performance Profiler",
            category: "DEVTOOLS",
            status: "LIVE BUILD",
            type: "project",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
            reward: 1500
        },
        {
            id: 'p5',
            title: "Zero-Knowledge Identity Vault",
            category: "WEB3",
            status: "TESTING",
            type: "project",
            image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2070",
            reward: 6000
        }
    ]);

    // Antigravity Sync: Function for Sponsors to add data
    const addProject = (formData) => {
        const newProject = {
            id: Date.now().toString(),
            ...formData,
            reward: parseInt(formData.reward) || 0,
            status: formData.status || "NEW",
            type: formData.type || "project",
            tags: formData.tags || [],
            due: formData.due || "1 Week",
            color: formData.color || "bg-indigo-600",
            icon: formData.icon || "💎",
            image: formData.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"
        };

        setProjects(prev => [newProject, ...prev]);
    };

    // Managed Stats: Dynamic calculation for Home.jsx
    const stats = useMemo(() => {
        const totalValue = projects.reduce((sum, p) => sum + (p.reward || 0), 10555250); // Base + dynamic
        return {
            totalValueEarned: totalValue.toLocaleString(),
            gigsListed: projects.length + 2610 // Base + dynamic
        };
    }, [projects]);

    return (
        <ProjectContext.Provider value={{ projects, addProject, stats }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
};
