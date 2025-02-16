#!/bin/bash
set -e

function cleanOne() {
  echo "Cleaning dist $1..."
  rm -rf $1/dist
}

cleanOne "be"
cleanOne "fe"
