#!/bin/sh
# vim:sw=4:ts=4:et

set -e

/docker-entrypoint.d/20-envsubst-on-templates.sh

nginx

exec "$@"