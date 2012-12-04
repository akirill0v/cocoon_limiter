# CocoonLimiter

Makes it possible to limit the amount of items added by cocoon.

## Installation

Add this line to your application's Gemfile:

    gem 'cocoon_limiter'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install cocoon_limiter

In application.js or other file add:

    //= require cocoon
    //= require cocoon_limiter

## Usage

Add 'cocoon-limit' data attribute to insert link:

``` haml
  # ...
  .choose_file
    = f.simple_fields_for :screenshots do |screenshot_field|
      = render "screenshot_fields", :f => screenshot_field
    # ...
    %p
      You can add
      <b data-counter></b>
      items
    = link_to_add_association t(".add_trailer"), f, :trailers, :data => {:'cocoon-limit' => 5 }
```

And from application.js (or any other) call:

``` javascript
  $('.choose_file').cocoon_limiter();
```

Html element with 'data-counter' attribute is a counter widget (updated
after insert or remove items).

You can decide what the tag will be updated when you change the number
of items in the list.

Just bind 'cocoon:changed' event.

``` javascript
  $('.choose_file').bind('cocoon:changed', function(e, left_count){
    $('#any_other_widget').text(left_count);
  })
```

## More examples and demos

[Here](http://cocoon-limiter.herokuapp.com "Cocoon Limiter demo") you can learn more. Soon.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
