#!/usr/bin/env python3
"""
Fix .js extensions in relative imports, handling directory vs file correctly.

For each relative import:
- If the target is a DIRECTORY (has index.ts)  ->  './x/index.js'
- If the target is a FILE       (has x.ts)     ->  './x.js'
- If already has .js                            ->  leave as is (validate)
"""

import re
import sys
from pathlib import Path

ROOT = Path.home() / "vubon.com.bd"
PACKAGE = sys.argv[1] if len(sys.argv) > 1 else "packages/shared-kernel"
SRC_DIR = ROOT / PACKAGE / "src"

if not SRC_DIR.exists():
    print(f"❌ Not found: {SRC_DIR}")
    sys.exit(1)

# Match relative imports (with or without .js)
REL_IMPORT_RE = re.compile(
    r"""(from\s+['"])(\.{1,2}(?:/[^'"]+?)?)(\.js)?(['"])"""
)


def resolve_import(current_file: Path, import_path: str) -> str:
    """
    Given a relative import path (like './foo' or '../bar'),
    return the correct path with proper extension and /index if needed.
    """
    # Strip trailing / and any existing extension
    import_path = import_path.rstrip("/")
    if import_path.endswith(".js"):
        import_path = import_path[:-3]

    # Resolve relative to current file's directory
    base_dir = current_file.parent
    target_path = (base_dir / import_path).resolve()

    # Try as file first: target.ts, target.tsx
    if (target_path.with_suffix(".ts")).exists() or (target_path.with_suffix(".tsx")).exists():
        return f"{import_path}.js"

    # Try as directory with index: target/index.ts
    if (target_path / "index.ts").exists():
        return f"{import_path}/index.js"

    # Try with explicit extensions that don't need .js
    for ext in [".json", ".mjs", ".cjs"]:
        if (target_path.with_suffix(ext)).exists():
            return f"{import_path}{ext}"

    # Fallback: file
    return f"{import_path}.js"


def process_file(file_path: Path) -> int:
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"  ⚠️  {file_path}: {e}")
        return 0

    original = content
    changes = [0]

    def replacer(match):
        prefix = match.group(1)      # from '
        rel_path = match.group(2)    # ./x
        old_ext = match.group(3) or ""  # .js or ""
        quote = match.group(4)       # '

        # Resolve to canonical form
        new_path = resolve_import(file_path, rel_path)

        if new_path != f"{rel_path}{old_ext}":
            changes[0] += 1

        return f"{prefix}{new_path}{quote}"

    new_content = REL_IMPORT_RE.sub(replacer, content)

    if changes[0] > 0:
        file_path.write_text(new_content, encoding="utf-8")
        return changes[0]
    return 0


def main():
    print("═" * 60)
    print(f"🔧 Fixing .js extensions (directory-aware)")
    print(f"📁 Target: {SRC_DIR}")
    print("═" * 60)
    print()

    total_files = 0
    total_changes = 0

    for ts_file in SRC_DIR.rglob("*.ts"):
        if ts_file.name.endswith(".d.ts"):
            continue

        changes = process_file(ts_file)
        if changes > 0:
            rel = ts_file.relative_to(ROOT)
            print(f"  ✅ {rel}: {changes}")
            total_files += 1
            total_changes += changes

    print()
    print("═" * 60)
    print(f"📊 Files modified: {total_files}")
    print(f"📊 Imports fixed:  {total_changes}")
    print("═" * 60)


if __name__ == "__main__":
    main()
