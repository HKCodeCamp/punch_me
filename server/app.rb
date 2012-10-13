require 'sinatra'
require 'eventmachine'
require 'thin'

require './punch_me_server.rb'

CONTROL_PORT = 9999
VIEWER_PORT = 8000

class App < Sinatra::Base
  get '/' do
    erb :index
  end
end

EM.run do
  Thin::Server.start('0.0.0.0', VIEWER_PORT) do
    map '/' do
      run App.new
    end
  end

  EM.start_server('0.0.0.0', CONTROL_PORT, PunchMeServer)
end
