# CoVidualize: An Interactive 3D Simulator for CoVid-19

## Built by Ritvik Pandey and Siddharth Nath

## Submitted to Geom Hacks 2020: Top 20 of 241

## Inspiration

After witnessing a hoard of CoVid-19 information and statistics all over the Internet and news sources alike, we wished to keep all information in a localized and easy-to-access data table with access to all the publicly available statistics per country. Additionally, apart from making a sophisticated data table, we wanted something visual to help our audience comprehend the sheer magnitude of the pandemic. We’ve really mainly paid attention to numbers instead of visuals, which is why we had the inspiration to have an interactive simulation of the recovered cases and total deaths per country.  We believe our project will help provide perspective to those truly unsure and nervous about the virus, and we wish to continue adding features and updated graphics to give the best user experience we can. 

## What it does

CoVidualize provides two key items: a public data table with CoVid-19 statistics for each country, and an interactive 3D globe displaying the scaled number of total deaths (in red), and total recovered (in green). The data table and statistics are updated daily, as well as the visual bars and globe we built. For our first page, we display the global total cases, deaths, recovered, and the daily cases, deaths, and recovered, which updates every day. Additionally, you can enter the name of any country and it will display the information specific to it. Scroll down, and we display the 3D globe and red and green bars in each country. The red bars represent the total deaths, and the green bars represent the total recovered. We scaled the statistics displayed on the globe with an algorithm we developed so that the percentiles remain constant, therefore it becomes easier to discern the proportionality between recovered and deaths per country. 


## How we built it

We mainly used JavaScript, HTML, and CSS to build CoVidualize. We used the https://covid19api.com/ and  https://www.trackcorona.live/api/countries to obtain our information and data points that we then displayed in our table and on the globe. We used three.js libraries to build the interactive 3D globe. To go into more detail, we used the above APIs to gain access to the latitude and longitude per country, and then converted those into a (x,y,z) coordinate pair via spherical coordinates. We were able to build a cube at that point with a given height using our scaling algorithm so the proportionality would remain accurate using the deaths and recovered data points (entered into an array).  
