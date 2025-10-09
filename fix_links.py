#get directory of current script
import os
script_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Script directory: {script_dir}")

#for each html in this dir, replace links from "replace.csv" with corresponding mapping
import csv
import re

def load_replacements(csv_file):
    replacements = {}
    with open(csv_file, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) >= 2:
                old_link, new_link = row[0].strip(), row[1].strip()
                replacements[old_link] = new_link
    return replacements

def replace_links_in_file(file_path, replacements):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for old_link, new_link in replacements.items():
        # Use regex to replace links in href attributes
        pattern = re.compile(r'href=["\']' + re.escape(old_link) + r'["\']')
        content = pattern.sub(f'href="{new_link}"', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    csv_file = os.path.join(script_dir, 'replace.csv')
    replacements = load_replacements(csv_file)

    for filename in os.listdir(script_dir):
        if filename.endswith('.html'):
            file_path = os.path.join(script_dir, filename)
            print(f"Processing file: {file_path}")
            replace_links_in_file(file_path, replacements)

if __name__ == "__main__":
    main()