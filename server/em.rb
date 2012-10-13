require 'eventmachine'
require 'debugger'
require 'punch_me_server'

PORT = 9999

EventMachine.run do
  EventMachine.start_server('0.0.0.0', PORT, PunchMeServer)
end
