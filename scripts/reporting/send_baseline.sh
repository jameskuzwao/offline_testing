#!/bin/bash
#colors
#=======
export red=`tput setaf 1`
export green=`tput setaf 2`
export yellow=`tput setaf 3`
export blue=`tput setaf 4`

# reset to default bash text style
export reset=`tput sgr0`

# make actual text bold
export bold=`tput bold`

# Go into reports folder
cd ~/reports/baseline

#check reports folder for most recent baseline report and send to google server
sshpass -p $SSHPASS scp `ls ~/reports/baseline -t | head -n1` edulution@130.211.93.74:/home/edulution/reports/baseline
# if connection lost the script will exit with status 1 and output error message
if [ "$?" = "0" ]; then
	echo "${green}${bold}Baseline submitted successfully!${bold}"
else
	echo "${red}${bold}Baseline not submitted. Please check your internet connection and try again${reset}" 1>&2
	exit 1
fi