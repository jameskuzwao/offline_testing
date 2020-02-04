#!/bin/bash

# Restart testing server
forever_path=/usr/local/bin/forever
node_path=/usr/local/bin/node

$forever_path -c $node_path stopall > /dev/null
$forever_path start -c $node_path ~/.baseline_testing/index.js > /dev/null
$forever_path -c $node_path logs 0 > /dev/null
