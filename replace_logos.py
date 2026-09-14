import os
import glob

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('img/logo.png', 'assets/images/logo.png')
    content = content.replace('img/logo 1.png', 'assets/images/logo.png')
    content = content.replace('img/logo_ms.png', 'assets/images/logo.png')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Replaced in", len(html_files), "files")
