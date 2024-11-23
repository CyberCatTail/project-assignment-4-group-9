#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

cd ./server

if command -v docker &> /dev/null; then
    if command -v docker-compose &> /dev/null; then
        docker-compose up -d
        echo "Docker start"
    fi
fi

npm run dev-init

