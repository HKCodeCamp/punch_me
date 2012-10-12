require 'faye'

bayeux = Faye::RackAdapter.new(:mount => '/faye')
bayeux.listen(9292)
