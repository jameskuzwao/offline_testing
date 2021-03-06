#!/bin/bash

# source helper function to check if database exists
source ~/.baseline_testing/scripts/check_db_exists.sh

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

scripts_dir=~/.baseline_testing/sql/

if db_exists $BASELINE_DATABASE_NAME ; then
	# Let the user know that the database already exists and skip
	echo "${blue}Database already exists.Skipping...${reset}"
else
	echo "${red}Database does not exist. Please contact support...${reset}"
	exit 1
	# # create database for baseline testing
	# sudo -u postgres bash -c "createdb baseline_testing"
	
	# # create role for the database and grant permissions
	# sudo -u postgres bash -c "psql -c \"CREATE USER $BASELINE_DATABASE_USER WITH PASSWORD '$BASELINE_DATABASE_PASSWORD';\""
	# sudo -u postgres bash -c "psql -c \"GRANT ALL ON DATABASE $BASELINE_DATABASE_NAME TO $BASELINE_DATABASE_USER;\""

	# # run table/view/function creation scripts
	# # loop through the sql files in the scripts directory and execute each one
	# echo "${green}Creating database tables...${reset}"
	# for file in $scripts_dir/*.sql; do
	# 	psql postgresql://$BASELINE_DATABASE_USER:$BASELINE_DATABASE_PASSWORD@$BASELINE_DATABASE_HOST/$BASELINE_DATABASE_NAME -a -f $file
	# done
fi

# get device name and store it in csv file
echo "extracting users and device name from kolibri"
# run R script to get users and device from kolibri
Rscript ~/.baseline_testing/scripts/get_kolibri_users_and_device.R

if [ "$?" = "0" ]; then
	echo "${green}Done!${reset}"
else
	echo "${red}${bold}There was a problem extracting learners from Kolibri${reset}"
fi
