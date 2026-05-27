#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"

log() { printf '[jade-deploy] %s\n' "$1"; }

main() {
    cd "$PROJECT_DIR"

    log "Pulling latest code from GitHub"
    git fetch --all --prune
    git reset --hard "origin/${DEPLOY_BRANCH}"

    log "Stopping containers"
    docker compose down --remove-orphans || true

    log "Cleaning build cache"
    docker builder prune -f

    log "Rebuilding containers"
    docker compose build --pull --no-cache

    log "Starting containers"
    docker compose up -d --remove-orphans

    log "Waiting for containers to be healthy"
    sleep 15

    log "Deployment completed!"
    docker compose ps
}

main "$@"
