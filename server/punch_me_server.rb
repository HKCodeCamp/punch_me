require 'faye'
require 'pathname'
require 'securerandom'
require 'debugger'

FAYE_URL = 'http://localhost:9292/faye'.freeze
FAYE_CHANNEL = '/punch_me'.freeze

IMAGE_DIR = Pathname.new(__FILE__).dirname.join(
  'public', 'images', 'uploads').freeze

module PunchMeServer
  def post_init
    @image_buffer = nil
  end

  def receive_data(data)
    if @image_buffer
      @image_buffer << data
    elsif data.start_with?("PUNCH")
      data.lines.each do |line|
        publish(line.strip)
      end
    elsif data.start_with?("IMAGE")
      @image_buffer = ""
      @image_buffer << data[data.index("\n") + 1, data.length]
    end
  end

  def unbind
    if @image_buffer
      fn = SecureRandom.uuid
      File.write(IMAGE_DIR.join(fn), @image_buffer)
      publish("IMAGE #{fn}")
      puts "Saved file #{fn}"

      publish("IMAGE #{fn}")
    end
  end

  private

  def publish(*args)
    faye.publish(FAYE_CHANNEL, *args)
  end

  def faye
    @faye ||= Faye::Client.new(FAYE_URL)
  end
end
