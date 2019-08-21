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

# check if test responses db exists. If not, copy pristine db 
test -f $responses_database
if [ "$?" = "0" ]; then
	echo "${blue}Database already exists.Skipping...${reset}"
else
	echo "${green}Database does not exist. Creating now...${reset}"
	cp ~/.baseline_testing/public/test_responses.pristine.sqlite ~/.baseline_testing/public/test_responses.sqlite
fi


# clear contents of device_name and users csv files if they already exist
if [ -e "$device_name_file" ] ; then
    > $device_name_file
fi

if [ -e "$users_file" ] ; then
    > $users_file
fi

# get device name and store it in csv file
echo "extracting device name from kalite database"
sqlite3 -header -csv $ka_database "SELECT d.name FROM securesync_device d JOIN securesync_devicemetadata s WHERE s.device_id = d.id AND s.is_own_device = 1" >> $device_name_file

# get list of users and save in csv file
echo "extracting user details from kalite database"
sqlite3 -header -csv $ka_database "select su.id as user_id, su.username, sf.name as group_name,su.first_name, su.last_name from securesync_facilityuser su left join securesync_facilitygroup sf on sf.id=su.group_id where su.deleted = 0" >> $users_file

# clear out users table
echo "Cleaning users table..."
sqlite3 $responses_database "delete from users"

# clear out device table
echo "Cleaning device_name table..."
sqlite3 $responses_database "delete from device;"

# create backup of $users_file and device.csv with headers
# appears as new file with suffix .headers
# then remove headers before importing into sqlite
sed -i.headers '1d' $users_file
sed -i.headers '1d' $device_name_file

# import users csv into user table in test_responses
sqlite3 $responses_database <<!
.mode csv
.import $users_file users
!
echo "Populating users table..."

# import device name into device table in test_responses
sqlite3 $responses_database <<!
.mode csv
.import $device_name_file device
!
echo "Populating device_name table.."

# get details for literacy learners

echo "Done!"