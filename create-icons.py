#!/usr/bin/env python3
"""
Script to generate PWA icons from the new ETA master icon
"""
from PIL import Image
import os

# Icon sizes needed for PWA
sizes = [72, 96, 128, 144, 152, 192, 384, 512]

# Create icons directory if it doesn't exist
os.makedirs('icons', exist_ok=True)

def create_icon(size):
    # Load the master ETA icon
    try:
        master_icon = Image.open('icons/eta-icon-master.png')
        
        # Convert to RGBA if needed for transparency support
        if master_icon.mode != 'RGBA':
            master_icon = master_icon.convert('RGBA')
        
        # Resize the image to the target size with high-quality resampling
        resized_icon = master_icon.resize((size, size), Image.Resampling.LANCZOS)
        
        return resized_icon
        
    except FileNotFoundError:
        print("Error: eta-icon-master.png not found in icons directory")
        return None
    except Exception as e:
        print(f"Error processing icon: {e}")
        return None

# Generate all icon sizes
for size in sizes:
    print(f"Creating {size}x{size} icon...")
    icon = create_icon(size)
    if icon:
        icon.save(f'icons/icon-{size}x{size}.png', 'PNG')
        print(f"✓ Saved icons/icon-{size}x{size}.png")
    else:
        print(f"✗ Failed to create icons/icon-{size}x{size}.png")

print("\n✅ All PWA icons generated successfully from ETA master icon!")
print("Icons created:")
for size in sizes:
    if os.path.exists(f'icons/icon-{size}x{size}.png'):
        print(f"  - icons/icon-{size}x{size}.png")
    else:
        print(f"  - icons/icon-{size}x{size}.png (FAILED)")