#!/bin/bash
set -e

function cleanOne() {
  echo "Cleaning $1..."
  rm -rf $1/node_modules
  rm -rf $1/dist
}

cleanOne "be"
cleanOne "fe"
