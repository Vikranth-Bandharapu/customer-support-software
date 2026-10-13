import os
from PIL import Image
import glob

brain_dir = r"C:\Users\admin\.gemini\antigravity\brain\906f06c1-74f7-4d59-bf1f-83d9ce6b7a1b"
target_dir = r"C:\Users\admin\Desktop\Customer support Software\assets\images"

files_to_convert = [
    ("csat_ui", "csat-visual.webp"),
    ("integrations_ui", "integrations-wall.webp"),
    ("knowledge_ui", "knowledge-base.webp"),
    ("sla_ui", "sla-monitor.webp"),
    ("about_ui", "about-hero.webp")
]

for prefix, target_name in files_to_convert:
    matches = glob.glob(os.path.join(brain_dir, f"{prefix}_*.jpg"))
    if matches:
        latest = sorted(matches)[-1]
        img = Image.open(latest)
        target_path = os.path.join(target_dir, target_name)
        img.save(target_path, "webp", quality=80)
        print(f"Converted {latest} -> {target_path}")
    else:
        print(f"No match found for {prefix}")
