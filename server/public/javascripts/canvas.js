var GRID_SIZE = 20;

var SPLASH = GRID_SIZE * 3;
var DAMPING = 5;
var FORCE = 100;

var rasterSource = new Raster('victim-face');
rasterSource.visible = false;

var gridRowCount = parseInt(rasterSource.size.height / GRID_SIZE, 10);
var gridColCount = parseInt(rasterSource.size.width / GRID_SIZE, 10);

_.each(document.getElementsByTagName('canvas'), function(canvas)
{
  canvas.width = rasterSource.size.width;
  canvas.height = rasterSource.size.height;
});

var grid = _.map(_.range(gridRowCount),
  function() { return _.range(gridColCount); });

var background = new Path.Rectangle([0, 0], rasterSource.size);
background.fillColor = 'black';

_.each(grid, function(row, y)
{
  _.each(row, function(col, x)
  {
    var frag = new Raster(
      rasterSource.getSubImage(
        x * GRID_SIZE, y * GRID_SIZE,
        GRID_SIZE, GRID_SIZE));

    frag.position = new Point(x, y) * GRID_SIZE;

    frag.destination = null;
    frag.currentAngle = 0;
    frag.destinationAngle = null;

    grid[y][x] = frag;
  });
});

window.paperReset = function()
{
  _.each(grid, function(row, y)
  {
    _.each(row, function(col, x)
    {
      var frag = grid[y][x];
      frag.destination = new Point(x, y) * GRID_SIZE;
      frag.destinationAngle = 0;
    });
  });
};

window.paperExplodeAt = function(x, y, force, direction)
{
  force = force * 10;
  var radius = SPLASH;
  var site = new Point(x, y);

  _.each(grid, function(row, y)
  {
    _.each(row, function(col, x)
    {
      var frag = grid[y][x];
      var vec = frag.position - site;

      if(vec.length > radius) return;

      vec = vec.normalize();

      frag.destination = frag.position + vec * force * Math.random();
      frag.destinationAngle = Math.random() * 360;
    });
  });
};

function onFrame()
{
  _.each(grid, function(row, y)
  {
    _.each(row, function(col, x)
    {
      var frag = grid[y][x];

      if(frag.destination)
      {
        var vec = frag.destination - frag.position;
        vec /= DAMPING;

        if(vec.length > 3)
          frag.translate(vec);
        else
        {
          frag.position = frag.destination;
          frag.destination = null;
        }
      }

      if(frag.destinationAngle !== null)
      {
        var deltaAngle = frag.destinationAngle - frag.currentAngle;
        deltaAngle /= DAMPING;

        if(Math.abs(deltaAngle) > 3)
        {
          frag.rotate(deltaAngle);
          frag.currentAngle += deltaAngle;
        }
        else
        {
          frag.rotate(frag.destinationAngle - frag.currentAngle);
          frag.currentAngle = frag.destinationAngle;
          frag.destinationAngle = null;
        }
      }
    });
  });
}
