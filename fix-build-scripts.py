#!/usr/bin/env python3
"""Fix build scripts in the 3 target packages."""

import json
from pathlib import Path

ROOT = Path.home() / "vubon.com.bd"

TARGETS = [
    "packages/shared-kernel/package.json",
    "apps/auth-service/package.json",
    "apps/user-service/package.json",
]

BUILD_SCRIPT = "tsc && tsc-alias -p tsconfig.json"

for rel in TARGETS:
    path = ROOT / rel
    if not path.exists():
        print(f"❌ Not found: {rel}")
        continue

    pkg = json.loads(path.read_text())
    old = pkg.get("scripts", {}).get("build", "")

    pkg.setdefault("scripts", {})["build"] = BUILD_SCRIPT
    path.write_text(json.dumps(pkg, indent=2) + "\n")

    print(f"✅ {rel}")
    print(f"   old: {old}")
    print(f"   new: {BUILD_SCRIPT}")
