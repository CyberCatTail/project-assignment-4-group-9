#!/bin/bash
set -x

# redirect to current script dir
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "start build project"
cd ./client

npm install

npm run build

echo "package finished!"

cd "$SCRIPT_DIR"

echo "start build server"
cd ./server
npm install

