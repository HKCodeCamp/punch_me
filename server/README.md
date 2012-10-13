# Prerequisites

    gem install faye eventmachine
    
or

	bundle install

# Supported Browsers

Chrome refuses to do "cross-origin" for Paper.js for local files so only Firefox is supported at the moment.

# Go Punching!

1. listen to TCP

		IP_ADDR = "192.168.X.X"
		PORT = 9999

    	$ ruby faye.rb &
    	$ ruby em.rb &
    	$ open index.html


2. listen to UDP Multicast

		MULTICAST_ADDR = "225.4.5.6"
		PORT = 5000
		
		$ ruby faye.rb &
		$ ruby multicast.rb &
		$ open index.html
