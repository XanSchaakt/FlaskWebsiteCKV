import os
import json

# Basismap waar de groepen zich bevinden
base_path = 'static/tekeningen'

# Lijst van groepen (je kunt deze aanpassen afhankelijk van welke groepen je hebt)
groepen = ['Docenten', 'K1', 'K5']

# Dictionary om afbeeldingen per groep op te slaan
images = {}

# Doorloop de groepen en verzamel de gesorteerde afbeeldingen
for groep in groepen:
    groep_path = os.path.join(base_path, groep, 'Heads')  # Voeg 'Heads' toe aan het pad
    
    # Controleer of de groep met 'Heads' bestaat
    if os.path.isdir(groep_path):
        # Verkrijg een lijst van alle PNG-bestanden in de groep
        image_files = [f for f in os.listdir(groep_path) if f.endswith('.png')]
        
        # Sorteer de afbeeldingsbestanden op naam
        image_files.sort()
        
        # Voeg de gesorteerde lijst van afbeeldingen toe aan de dictionary
        images[groep] = image_files
    else:
        print(f"Waarschuwing: De map '{groep}/Heads' bestaat niet op het pad: {groep_path}")

# Schrijf de gesorteerde afbeeldingen naar een JSON-bestand
output_file = 'static/images.json'
with open(output_file, 'w') as json_file:
    json.dump(images, json_file, indent=2)

print(f"De gesorteerde afbeeldingen zijn opgeslagen in '{output_file}'.")
