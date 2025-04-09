import os
import json
import shutil
import re
from PIL import Image

onderdeel = ["Heads" , "Bodys" , "Legs"]

with open("static/images.json", "r", encoding="utf-8") as f:
  data = json.load(f)


pad = "static/tekeningen/"
groepen = os.listdir(pad)

hoofden = os.listdir(pad + "Heads/")
aantalItems = len(hoofden)
origineelAantal = aantalItems

print("Current Image Count: " + str(aantalItems))

newImagesPath = "newImages/"
newImages = os.listdir(newImagesPath)

print("Found " + str(len(newImages)) + " new images")

for newImage in newImages:
    compound = newImage.split('@')
    author , group = compound
    group = group[:-4]

    key = str(aantalItems + 1)
    data[key] = {
        "bestandsnaam": key + ".png",
        "group": group,
        "author": author
    }

    newPath = pad+newImage
    shutil.move(newImagesPath+newImage, newPath)

    img = Image.open(newPath)
    w,h = img.size

    part_height = h // 3
    parts = [img.crop((0, i * part_height, w, (i + 1) * part_height)) for i in range(3)]

    # Opslaan van de gesneden delen
    for i, deel in enumerate(parts):
        deel.save(f"static/tekeningen/{onderdeel[i]}/{aantalItems + 1}.png")

    aantalItems += 1

with open('static/images.json', 'w') as f:
    json.dump(data, f, indent=4)



with open("static/script.js", "r", encoding="utf-8") as bestand:
  inhoud = bestand.read()

def vervanger(match):
  return f"{match.group(1)}{aantalItems}{match.group(2)}"

nieuwe_inhoud = re.sub(
  r"(let\s+aantalAfbeeldingen\s*=\s*)\d+(\s*;)",
  vervanger,
  inhoud
)

# Schrijf de gewijzigde inhoud terug naar het bestand
with open("static/script.js", "w", encoding="utf-8") as bestand:
  bestand.write(nieuwe_inhoud)



print("New image count: " + str(aantalItems))