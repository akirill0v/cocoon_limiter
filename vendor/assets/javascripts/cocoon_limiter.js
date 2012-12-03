;(function ( $, window, undefined ) {

  // Create the defaults once
  var pluginName = 'cocoon_limiter',
      document = window.document,
      defaults = {
        count: 5,
        cocoon_counter_name: "cocoon_counter",
        counter: "[data-counter]",
        increment_link: ".add_fields"
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    // reference
    
    this.element.reference = this;
    this.items = new Array();

    // jQuery has an extend method which merges the contents of two or 
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.assign_all_elements = function(){
      this.counter_widget = $(this.element).find(this.options.counter);
      this.increment_link = $(this.element).find(this.options.increment_link);
    };

    this.parse_data_options = function(){
      this.options.count = $(this.increment_link).data('cocoon-limit') || this.options.count;
    };

    // If items count > limit this hide.
    // Otherwise it mush be shown
    this.set_visibility = function(){
      if (this.items.length < this.options.count){
        // Show it
        this.increment_link.show();
      } else {
        // Hide it
        this.increment_link.hide();
      }
    };

    // Define events for increment and decrement items in array
    this.cocoon_events = {
      increment_event:  function(e, task){
        var parent = this.reference;
        parent.items.push(task);
        parent.set_visibility();
        $( this ).trigger('cocoon:changed', [parent.items.length]);
      },
      decrement_event: function(e, task){
        var parent = this.reference;
        parent.items.splice($.inArray(task, parent.items), 1);
        $( this ).trigger('cocoon:changed', [parent.items.length]);
        parent.set_visibility();
      }
    };

    this.update_counter = function(e, count){
      var left_count = (this.reference.options.count - count)
      $( this.reference.counter_widget ).text(left_count);
    };

    this.bind_events = function(){
      $( this.element ).bind('cocoon:after-insert', this.cocoon_events.increment_event)
      $( this.element ).bind('cocoon:after-remove', this.cocoon_events.decrement_event)
      $( this.element ).bind('cocoon:changed', this.update_counter)
    }

    this.calc_existing_elements = function(){
      var plugin = this;
      $( this.element ).find('.remove_fields').each(function(){
        $(plugin.element).trigger('cocoon:after-insert');
      });
    }

    this.init();
  }

  Plugin.prototype.init = function () {

    // Initial counter value
    this.items_count = 0;

    // Find counter widget
    this.assign_all_elements();

    this.parse_data_options();

    this.bind_events();

    this.calc_existing_elements();

    // First 
    $( this.element ).trigger('cocoon:changed', [this.items.length]);
  };

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  }

}(jQuery, window));
