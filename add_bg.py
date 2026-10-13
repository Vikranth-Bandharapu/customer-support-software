import os
import glob
import re

html_files = glob.glob(r"C:\Users\admin\Desktop\Customer support Software\*.html")

orbs = '<div class="orb-1"></div>\n<div class="orb-2"></div>\n<div class="orb-3"></div>\n'

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # If orbs are already there, skip
    if "orb-1" in content:
        continue
        
    # Inject after <body> or <body class="...">
    content = re.sub(r'(<body[^>]*>)', r'\1\n' + orbs, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Added 3D orbs to {os.path.basename(filepath)}")
