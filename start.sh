#!/bin/bash
set -e
set -x
# redirect to current script dir
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

cd ./server

if command -v docker &> /dev/null; then
    if command -v docker-compose &> /dev/null; then
        docker-compose up -d
        echo "Docker start"
    fi
fi

function check_port {
    local port=$1
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
        if netstat -ano | findstr ":$port" > /dev/null; then
            echo "Port $port is available"
        else
            echo "Port $port is closed"
            exit 1
        fi
    else
        if netstat -tuln | grep ":$port " > /dev/null; then
            echo "Port $port is available"
        else
            echo "Port $port is closed"
            exit 1
        fi
    fi
}

check_port 5432
check_port 6379

npm start