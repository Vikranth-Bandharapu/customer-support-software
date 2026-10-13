import os
import shutil

target_dir = r"C:\Users\admin\Desktop\Customer support Software\assets\images"

# The 5 good images that we generated with UI mockups today
good_images = {
    "csat": "csat-visual.webp",
    "integrations": "integrations-wall.webp",
    "kb": "knowledge-base.webp",
    "sla": "sla-monitor.webp",
    "about": "about-hero.webp"
}

# The images that need replacing because they are old text-on-gradient
replacements = {
    "hero.webp": good_images["integrations"],
    "hero-dash.webp": good_images["sla"],
    "inbox-ui.webp": good_images["kb"],
    "ticket-flow.webp": good_images["sla"],
    "customer-profile.webp": good_images["csat"],
    "automation-nodes.webp": good_images["integrations"],
    "omnichannel.webp": good_images["about"],
    "team-collab.webp": good_images["about"],
    "analytics-chart.webp": good_images["sla"],
    "blog1.webp": good_images["integrations"],
    "blog2.webp": good_images["kb"],
    "blog3.webp": good_images["csat"],
    "blog-1.webp": good_images["sla"],
    "blog-2.webp": good_images["about"],
    "office.webp": good_images["about"],
    "team.webp": good_images["about"]
}

for old_file, new_source in replacements.items():
    source_path = os.path.join(target_dir, new_source)
    dest_path = os.path.join(target_dir, old_file)
    
    if os.path.exists(source_path):
        shutil.copyfile(source_path, dest_path)
        print(f"Replaced {old_file} with {new_source}")
    else:
        print(f"Source {new_source} not found!")
