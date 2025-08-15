#!/usr/bin/env python3
"""
Simple script to generate placeholder PWA icons
"""
from PIL import Image, ImageDraw, ImageFont
import os

# Icon sizes needed for PWA
sizes = [72, 96, 128, 144, 152, 192, 384, 512]

# Create icons directory if it doesn't exist
os.makedirs('icons', exist_ok=True)

def create_icon(size):
    # Create a square image with ETASV blue background
    img = Image.new('RGB', (size, size), '#1E3A8A')
    draw = ImageDraw.Draw(img)
    
    # Add white background circle
    padding = size // 8
    circle_size = size - 2 * padding
    draw.ellipse([padding, padding, padding + circle_size, padding + circle_size], fill='white')
    
    # Add ETASV text
    try:
        # Try to use a default font
        font_size = max(12, size // 8)
        font = ImageFont.load_default()
    except:
        font = None
    
    # Draw ETASV text
    text = "ETASV"
    if font:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    else:
        text_width = len(text) * (size // 15)
        text_height = size // 10
    
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2 - size // 20
    
    draw.text((text_x, text_y), text, fill='#1E3A8A', font=font)
    
    # Add smaller "TRAINING" text below
    training_text = "TRAINING"
    training_font_size = max(8, size // 15)
    if font:
        bbox = draw.textbbox((0, 0), training_text, font=font)
        training_width = bbox[2] - bbox[0]
    else:
        training_width = len(training_text) * (size // 20)
    
    training_x = (size - training_width) // 2
    training_y = text_y + text_height + size // 30
    
    draw.text((training_x, training_y), training_text, fill='#64748B', font=font)
    
    return img

# Generate all icon sizes
for size in sizes:
    print(f"Creating {size}x{size} icon...")
    icon = create_icon(size)
    icon.save(f'icons/icon-{size}x{size}.png', 'PNG')
    print(f"✓ Saved icons/icon-{size}x{size}.png")

print("\n✅ All PWA icons generated successfully!")
print("Icons created:")
for size in sizes:
    print(f"  - icons/icon-{size}x{size}.png")