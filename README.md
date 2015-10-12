# wannasport-dev-challenge
The challenge is to build a program to determine the number of available time slots for playing tennis at Kerteminde Tennisklub, one of the WannaSport partner clubs.

### Solution
The solution is a small phantomJS program. Due to the lack of a proper data API, the program does it the dirty way: loads HTML from `http://www.kerteminde-tennisklub.dk/Activity/BookingSheet` and 'scrape' it for necessary data.

### Usage

run `wannasport-phantom.js` with following arguments `[start date] [duratin]`, where `start date` is the starting point and `duration` the amount of days to evaluate. Example `wannasport-phantom.js 20151012 7`.
