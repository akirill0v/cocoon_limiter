# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'cocoon_limiter/version'

Gem::Specification.new do |gem|
  gem.name          = "cocoon_limiter"
  gem.version       = CocoonLimiter::VERSION
  gem.authors       = ["Kirillov Alexander"]
  gem.email         = ["saratovsource@gmail.com"]
  gem.description   = %q{Extends the cocoon, adding the possibility of limiting the number of records added.}
  gem.summary       = %q{Extends the cocoon, adding the possibility of limiting the number of records added.}
  #gem.homepage      = ""
  gem.rubyforge_project = "cocoon_limiter"

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_dependency "railties", ">= 3.0", "< 5.0"
end
