var GRID_SIZE = 20;

var SPLASH = GRID_SIZE * 3;
var DAMPING = 5;
var FORCE = 100;

var rasterSource = new Raster('victim-face');
rasterSource.visible = false;

var gridRowCount = parseInt(rasterSource.size.height / GRID_SIZE, 10);
var gridColCount = parseInt(rasterSource.size.width / GRID_SIZE, 10);

var grid = _.map(_.range(gridRowCount),
  function() { return _.range(gridColCount); });

var background = new Path.Rectangle([0, 0], view.size);
background.fillColor = 'black';

var gridLayer = new Layer();

_.each(grid, function(row, y)
{
  _.each(row, function(col, x)
  {
    grid[y][x] = new Raster(
      rasterSource.getSubImage(
        x * GRID_SIZE, y * GRID_SIZE,
        GRID_SIZE, GRID_SIZE));

    grid[y][x].position = new Point(x * GRID_SIZE, y * GRID_SIZE);

    grid[y][x].destination = null;
    grid[y][x].currentAngle = 0;
    grid[y][x].destinationAngle = null;
  });
});

project.activeLayer.strokeColor = 'white';

window.paperExplodeAt = function(x, y)
{
  var force = FORCE;
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
}

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
          frag.destination = null;
      }

      if(frag.destinationAngle)
      {
        var deltaAngle = frag.destinationAngle - frag.currentAngle;
        deltaAngle /= DAMPING;

        if(deltaAngle > 3)
        {
          frag.rotate(deltaAngle);
          frag.currentAngle += deltaAngle;
        }
        else
          frag.destinationAngle = null;
      }
    });
  });
}
