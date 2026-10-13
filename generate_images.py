import os
import random
from PIL import Image, ImageDraw, ImageFont
import math

def generate_image(filename, width, height, text, bg_colors):
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Create gradient background
    for y in range(height):
        r = int(bg_colors[0][0] + (bg_colors[1][0] - bg_colors[0][0]) * y / height)
        g = int(bg_colors[0][1] + (bg_colors[1][1] - bg_colors[0][1]) * y / height)
        b = int(bg_colors[0][2] + (bg_colors[1][2] - bg_colors[0][2]) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
        
    # Draw some abstract shapes for SaaS look
    for _ in range(5):
        x = random.randint(0, width)
        y = random.randint(0, height)
        r = random.randint(50, min(width, height)//3)
        draw.ellipse([x-r, y-r, x+r, y+r], fill=(255, 255, 255, 30), outline=None)
        
    # Add text
    try:
        font = ImageFont.truetype("arial.ttf", size=max(20, width//15))
    except:
        font = ImageFont.load_default()
        
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    text_width = right - left
    text_height = bottom - top
    
    draw.text(((width - text_width) / 2, (height - text_height) / 2), text, font=font, fill=(255, 255, 255))
    
    # Save as webp, quality 80 to keep under 100kb
    img.save(filename, 'webp', quality=80)
    print(f"Generated {filename} ({os.path.getsize(filename)} bytes)")

colors = [
    ((15, 23, 42), (56, 189, 248)), # Dark blue to light blue
    ((88, 28, 135), (192, 132, 252)), # Purple
    ((17, 24, 39), (52, 211, 153)), # Dark to emerald
    ((30, 41, 59), (148, 163, 184)), # Slate
]

os.makedirs('assets/images', exist_ok=True)

images = [
    ('hero-dash.webp', 1200, 800, 'Premium SaaS Dashboard'),
    ('inbox-ui.webp', 800, 600, 'Unified Inbox Interface'),
    ('ticket-flow.webp', 800, 400, 'Ticket Lifecycle'),
    ('customer-profile.webp', 600, 800, '360 Customer Profile'),
    ('automation-nodes.webp', 1000, 600, 'Visual Automation Builder'),
    ('knowledge-base.webp', 800, 600, 'Knowledge Base UI'),
    ('omnichannel.webp', 800, 600, 'Omnichannel Connectivity'),
    ('team-collab.webp', 800, 500, 'Team Collaboration'),
    ('sla-monitor.webp', 600, 400, 'SLA Countdown UI'),
    ('analytics-chart.webp', 800, 500, 'Performance Analytics'),
    ('csat-visual.webp', 600, 400, 'CSAT Score Trends'),
    ('integrations-wall.webp', 1000, 600, 'App Integrations'),
    ('testimonial-1.webp', 100, 100, 'T1'),
    ('testimonial-2.webp', 100, 100, 'T2'),
    ('testimonial-3.webp', 100, 100, 'T3'),
    ('404-visual.webp', 800, 600, '404 Error Graphic'),
    ('about-hero.webp', 1200, 600, 'Our Company Story'),
    ('team-1.webp', 400, 400, 'Team Member'),
    ('team-2.webp', 400, 400, 'Team Member'),
    ('team-3.webp', 400, 400, 'Team Member'),
    ('blog-1.webp', 800, 500, 'Blog Featured'),
    ('blog-2.webp', 600, 400, 'Blog Post'),
    ('blog-3.webp', 600, 400, 'Blog Post'),
    ('contact-hero.webp', 1200, 400, 'Support Center'),
    ('agent-avatar.webp', 100, 100, 'Agent'),
    ('customer-avatar.webp', 100, 100, 'Customer')
]

for name, w, h, text in images:
    generate_image(f'assets/images/{name}', w, h, text, random.choice(colors))
