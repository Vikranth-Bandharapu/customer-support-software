import os
import shutil

target_dir = r"C:\Users\admin\Desktop\Customer support Software\assets\images"

# Mapping of beautiful AI-generated images to replace the old text-on-gradient placeholders
replacements = {
    "hero.webp": "hero-dash.webp", # or inbox-ui.webp
    "team.webp": "team-collab.webp",
    "office.webp": "about-hero.webp",
    "blog1.webp": "automation-nodes.webp",
    "blog2.webp": "knowledge-base.webp",
    "blog3.webp": "csat-visual.webp",
    "blog-1.webp": "ticket-flow.webp",
    "blog-2.webp": "team-collab.webp"
}

for old_file, new_source in replacements.items():
    source_path = os.path.join(target_dir, new_source)
    dest_path = os.path.join(target_dir, old_file)
    
    if os.path.exists(source_path):
        shutil.copyfile(source_path, dest_path)
        print(f"Replaced {old_file} with {new_source}")
    else:
        print(f"Source {new_source} not found!")
