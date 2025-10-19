import json, pathlib, yaml
ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA_DIR = ROOT.parent / "data"
CONFIG_FILE = ROOT.parent / "config" / "config.yaml"

def load_config():
    path = CONFIG_FILE if CONFIG_FILE.exists() else (ROOT.parent / "config" / "config.example.yaml")
    with open(path, "r") as f:
        return yaml.safe_load(f)

def load_json(name: str):
    with open(DATA_DIR / name, "r") as f:
        return json.load(f)
