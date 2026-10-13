const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    {name: 'hero-dash.webp', w: 1200, h: 800, text: 'Premium SaaS Dashboard', color1: '#0f172a', color2: '#38bdf8'},
    {name: 'inbox-ui.webp', w: 800, h: 600, text: 'Unified Inbox Interface', color1: '#1e1b4b', color2: '#a78bfa'},
    {name: 'ticket-flow.webp', w: 800, h: 400, text: 'Ticket Lifecycle', color1: '#022c22', color2: '#34d399'},
    {name: 'customer-profile.webp', w: 600, h: 800, text: '360 Customer Profile', color1: '#172554', color2: '#60a5fa'},
    {name: 'automation-nodes.webp', w: 1000, h: 600, text: 'Visual Automation Builder', color1: '#2e1065', color2: '#c084fc'},
    {name: 'knowledge-base.webp', w: 800, h: 600, text: 'Knowledge Base UI', color1: '#1f2937', color2: '#9ca3af'},
    {name: 'omnichannel.webp', w: 800, h: 600, text: 'Omnichannel Connectivity', color1: '#083344', color2: '#22d3ee'},
    {name: 'team-collab.webp', w: 800, h: 500, text: 'Team Collaboration', color1: '#312e81', color2: '#818cf8'},
    {name: 'sla-monitor.webp', w: 600, h: 400, text: 'SLA Countdown UI', color1: '#4a044e', color2: '#e879f9'},
    {name: 'analytics-chart.webp', w: 800, h: 500, text: 'Performance Analytics', color1: '#14532d', color2: '#4ade80'},
    {name: 'csat-visual.webp', w: 600, h: 400, text: 'CSAT Score Trends', color1: '#701a75', color2: '#f472b6'},
    {name: 'integrations-wall.webp', w: 1000, h: 600, text: 'App Integrations', color1: '#1e3a8a', color2: '#3b82f6'},
    {name: 'testimonial-1.webp', w: 100, h: 100, text: 'T1', color1: '#0f172a', color2: '#cbd5e1'},
    {name: 'testimonial-2.webp', w: 100, h: 100, text: 'T2', color1: '#0f172a', color2: '#cbd5e1'},
    {name: 'testimonial-3.webp', w: 100, h: 100, text: 'T3', color1: '#0f172a', color2: '#cbd5e1'},
    {name: '404-visual.webp', w: 800, h: 600, text: '404 Error Graphic', color1: '#450a0a', color2: '#f87171'},
    {name: 'about-hero.webp', w: 1200, h: 600, text: 'Our Company Story', color1: '#042f2e', color2: '#2dd4bf'},
    {name: 'team-1.webp', w: 400, h: 400, text: 'Team Member', color1: '#172554', color2: '#93c5fd'},
    {name: 'team-2.webp', w: 400, h: 400, text: 'Team Member', color1: '#172554', color2: '#93c5fd'},
    {name: 'team-3.webp', w: 400, h: 400, text: 'Team Member', color1: '#172554', color2: '#93c5fd'},
    {name: 'blog-1.webp', w: 800, h: 500, text: 'Blog Featured', color1: '#1e1b4b', color2: '#c084fc'},
    {name: 'blog-2.webp', w: 600, h: 400, text: 'Blog Post', color1: '#1e1b4b', color2: '#c084fc'},
    {name: 'blog-3.webp', w: 600, h: 400, text: 'Blog Post', color1: '#1e1b4b', color2: '#c084fc'},
    {name: 'contact-hero.webp', w: 1200, h: 400, text: 'Support Center', color1: '#0f172a', color2: '#e2e8f0'},
    {name: 'agent-avatar.webp', w: 100, h: 100, text: 'Agent', color1: '#022c22', color2: '#6ee7b7'},
    {name: 'customer-avatar.webp', w: 100, h: 100, text: 'Customer', color1: '#2e1065', color2: '#d8b4fe'}
];

const outDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function generate() {
    for (const img of images) {
        const svg = `<svg width="${img.w}" height="${img.h}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad_${img.name.replace('.webp', '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${img.color1};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${img.color2};stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="${img.w}" height="${img.h}" fill="url(#grad_${img.name.replace('.webp', '')})" />
            <circle cx="${img.w * 0.2}" cy="${img.h * 0.8}" r="${Math.min(img.w, img.h) * 0.2}" fill="rgba(255,255,255,0.05)" />
            <circle cx="${img.w * 0.8}" cy="${img.h * 0.2}" r="${Math.min(img.w, img.h) * 0.3}" fill="rgba(255,255,255,0.05)" />
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.max(16, img.w / 15)}" font-weight="bold" fill="white" dominant-baseline="middle" text-anchor="middle">${img.text}</text>
        </svg>`;
        
        await sharp(Buffer.from(svg))
            .webp({ quality: 80 })
            .toFile(path.join(outDir, img.name));
        console.log('Created ' + img.name);
    }
}
generate().catch(console.error);
