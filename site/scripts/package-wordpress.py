"""Package a verified WordPress-target build; no credentials are required."""
import argparse
from pathlib import Path
import zipfile

parser = argparse.ArgumentParser()
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()
site = Path(__file__).resolve().parents[1]
dist = site / "dist"
for page in ("index.html", "en/index.html"):
    html = (dist / page).read_text()
    if "/wp-content/plugins/foglie-bio-preview/site/" not in html:
        raise SystemExit("Build the WordPress target before packaging.")
    if 'href="https://www.laruotabio.it/foglie-bio-plus/' not in html or 'href="/foglie-bio-plus/en/"' not in html:
        raise SystemExit("The WordPress preview must use the dedicated /foglie-bio-plus/ routes.")
args.output.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(args.output, "w", zipfile.ZIP_DEFLATED) as archive:
    archive.write(site / "wordpress/foglie-bio-preview.php", "foglie-bio-preview/foglie-bio-preview.php")
    for file in sorted(dist.rglob("*")):
        if file.is_file():
            archive.write(file, "foglie-bio-preview/site/" + file.relative_to(dist).as_posix())
print(args.output.resolve())
