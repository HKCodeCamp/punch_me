require 'socket'
require 'ipaddr'
require './punch_me_server'

MULTICAST_ADDR = "225.4.5.6"
PORT = 5000

ip =  IPAddr.new(MULTICAST_ADDR).hton + IPAddr.new("0.0.0.0").hton

sock = UDPSocket.new
sock.setsockopt(Socket::IPPROTO_IP, Socket::IP_ADD_MEMBERSHIP, ip)
sock.bind(Socket::INADDR_ANY, PORT)

puts "Listening Multicast Group 225.4.5.6:5000"
loop do
  msg, info = sock.recvfrom(1024)
  puts "MSG #{msg}"
  PunchMeServer.receive_data(msg)
end