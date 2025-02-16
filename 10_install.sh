#!/bin/bash
set -e

# -----------------------------------------------------------------------------
#                                 Helper functions
# -----------------------------------------------------------------------------

function installOne() {
  # Install one component (install node modules etc.).
  dirName=$1
  echo ---
  echo --- Install in /$dirName
  echo ---
  pwd
  cd $dirName
  npm ci
  cd ..
}

function buildOne() {
  # Build one component (compile TS to JS etc.).
  dirName=$1
  echo ---
  echo --- Build in /$dirName
  echo ---
  pwd
  cd $dirName
  npm run tsc
  cd ..
}

function installAndBuildOne() {
  installOne $1
  buildOne $1
}

# -----------------------------------------------------------------------------
#                                 Entry point
# -----------------------------------------------------------------------------

installOne "be"
installOne "fe"
