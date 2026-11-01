#!/usr/bin/env python3
"""Upgrade all NestJS packages to latest (12.x) across the monorepo."""

import json
import os
import sys
from pathlib import Path

ROOT = Path.home() / "vubon.com.bd"

# Latest NestJS 12 versions
NESTJS_PACKAGES = {
    "@nestjs/common": "^12.1.0",
    "@nestjs/core": "^12.1.0",
    "@nestjs/cqrs": "^12.0.0",
    "@nestjs/graphql": "^14.0.2",
    "@nestjs/platform-express": "^12.1.0",
    "@nestjs/swagger": "^12.0.2",
    "@nestjs/config": "^12.0.1",
    "@nestjs/jwt": "^12.0.2",
    "@nestjs/passport": "^12.0.0",
    "@nestjs/throttler": "^6.7.1",
    "@nestjs/terminus": "^12.1.0",
    "@nestjs/event-emitter": "^12.0.1",
    "@nestjs/testing": "^12.1.0",
    "@nestjs/cli": "^12.0.7",
    "@nestjs/schematics": "^12.0.5",
}


def find_package_jsons():
    """Find all package.json in workspace."""
    results = []
    for folder in ["apps", "packages"]:
        base = ROOT / folder
        if not base.exists():
            continue
        for subdir in base.iterdir():
            if subdir.is_dir() and not subdir.name.startswith("."):
                pkg = subdir / "package.json"
                if pkg.exists():
                    results.append(pkg)
    # root package.json
    root_pkg = ROOT / "package.json"
    if root_pkg.exists():
        results.append(root_pkg)
    return results


def upgrade_package_json(pkg_path):
    """Upgrade NestJS versions in a package.json."""
    try:
        data = json.loads(pkg_path.read_text())
    except Exception as e:
        return False, f"parse error: {e}"

    changed = False
    sections = ["dependencies", "devDependencies", "peerDependencies"]

    for section in sections:
        if section not in data:
            continue
        for pkg, new_ver in NESTJS_PACKAGES.items():
            if pkg in data[section]:
                old_ver = data[section][pkg]
                if old_ver != new_ver:
                    data[section][pkg] = new_ver
                    print(f"  {pkg}: {old_ver} -> {new_ver}")
                    changed = True

    if changed:
        pkg_path.write_text(json.dumps(data, indent=2) + "\n")
        return True, "updated"
    return False, "no changes"


def main():
    print("═" * 60)
    print("🔧 NestJS 12 Upgrade — Monorepo-wide")
    print("═" * 60)
    print()

    packages = find_package_jsons()
    print(f"📁 Found {len(packages)} package.json files")
    print()

    updated = 0
    for pkg_path in packages:
        rel = pkg_path.relative_to(ROOT)
        print(f"📦 {rel}")
        changed, msg = upgrade_package_json(pkg_path)
        if changed:
            updated += 1
            print(f"   ✅ {msg}")
        else:
            print(f"   ⏭️  {msg}")
        print()

    print("═" * 60)
    print(f"✅ Total updated: {updated} / {len(packages)}")
    print("═" * 60)


if __name__ == "__main__":
    main()
