1. listen to TCP

    IP_ADDR = "192.168.X.X"
    PORT = 9999

    $ ruby faye.rb &
    $ ruby em.rb &
    $ open client.html


2. listen to UDP Multicast

    MULTICAST_ADDR = "225.4.5.6"
    PORT = 5000

    $ ruby faye.rb &
    $ ruby multicast_server.rb &
    $ open client.html
