require 'faye'

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