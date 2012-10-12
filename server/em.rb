require 'eventmachine'
require 'faye'
require 'debugger'

PORT = 9999

FAYE_URL = 'http://localhost:9292/faye'
FAYE_CHANNEL = '/punch_me'

module PunchMeServer
  def receive_data(data)
    data.lines.each do |line|
      faye.publish(FAYE_CHANNEL, line.strip)
    end
  end

  private

  def faye
    @faye ||= Faye::Client.new(FAYE_URL)
  end
end

EventMachine.run do
  EventMachine.start_server('0.0.0.0', PORT, PunchMeServer)
end
