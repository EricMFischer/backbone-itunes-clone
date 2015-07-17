// INDEX
$(function(){
  // set up model objects
  var library = new Songs(songData);
  var app = new AppModel({library: library});

  // build a view for the top level of the whole app
  var appView = new AppView({model: app});

  // put the view onto the screen
  $('body').append(appView.render());
});


// App model
initialize: function(params){
  this.set('currentSong', new SongModel());
  this.set('songQueue', new SongQueue());


// App view
initialize: function(params){
  this.playerView = new PlayerView({model: this.model.get('currentSong')});
  this.libraryView = new LibraryView({collection: this.model.get('library')});
  this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});


// Library view
render: function(){
  // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
  // see http://api.jquery.com/detach/
  this.$el.children().detach();
  this.$el.html('<th>Library</th>').append(
    this.collection.map(function(song){
      return new LibraryEntryView({model: song}).render();
    })
  );
}


// Song Queue view
render: function(){
  // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
  // see http://api.jquery.com/detach/
  this.$el.children().detach();
  this.$el.html('<th>Playlist</th>').append(
    this.collection.map(function(song){
      return new SongQueueEntryView({model: song}).render();
    })
  );
}


// Songs collection
var Songs = Backbone.Collection.extend({
  model: SongModel
});