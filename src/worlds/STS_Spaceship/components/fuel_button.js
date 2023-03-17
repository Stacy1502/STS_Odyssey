// Component for task 5 for mission control
// Increases the fuel bar when pressed
// Fuel bar slowly falls when button is released

'user strict'

// Functions ---------------------------------------------------------------------------------------------------------------

// Increasing the fuel bar by 0.01
var increaseBar = function(fuelBar, tankHeight)
{
    // Getting current height of fuel bar
    var currentHeight = fuelBar.getAttribute('geometry')['height'];

    // Making sure the fuel bar does not go over the screen
    if (currentHeight < tankHeight)
    {
        // Adding to fuel bar
        fuelBar.setAttribute('geometry', {height: currentHeight + 0.01});

        // Leveling out position of fuel bars
        fuelBar.setAttribute('position', {
            x: fuelBar.getAttribute('position')['x'],
            y: fuelBar.getAttribute('position')['y'] + 0.005,
            z: fuelBar.getAttribute('position')['z'],
        });
    }
    else
    {
        fuelBar.setAttribute('geometry', {height: tankHeight});
    }
}

// --------------------------------------------------------

// Decreasing the fuel bar by 0.01
var decreaseBar = function(fuelBar)
{
    // Getting current height of fuel bar
    var currentHeight = fuelBar.getAttribute('geometry')['height'];

    // Making sure the fuel bar does not go into negatives
    if (currentHeight > 0)
    {
        // Subtracting to fuel bar
        fuelBar.setAttribute('geometry', {height: currentHeight - 0.01});

        // Leveling out position of fuel bars
        fuelBar.setAttribute('position', {
            x: fuelBar.getAttribute('position')['x'],
            y: fuelBar.getAttribute('position')['y'] - 0.005,
            z: fuelBar.getAttribute('position')['z'],
        });
    }
    else
    {
        fuelBar.setAttribute('geometry', {height: 0});
    }
}

// Component ---------------------------------------------------------------------------------------------------------------

AFRAME.registerComponent('fuel_button', 
{
    schema: 
    {
        // If the ideal fuel percentage has been reached
        isIdeal : {type: 'boolean', default:false},
    },

    init : function() 
    {
        const CONTEXT_AF = this;

        const element = CONTEXT_AF.el;

        // If the button is currently being held down
        var buttonHold = false;

        // Getting fuel bar
        var fuelBar = document.querySelector('#fuelBar');

        // Getting fuel tank
        var fuelTank = document.querySelector('#fuelTank');
        var tankHeight = fuelTank.getAttribute('geometry')['height'];

        // Listening for button press
        element.addEventListener('mousedown', function()
        {

            // If task has not been completed
            if (CONTEXT_AF.data.isIdeal === false)
            {
                // When button is held, increase fuel bar every 30 milliseconds
                mouseHold = setInterval(function() 
                {
                    increaseBar(fuelBar, tankHeight);

                    buttonHold = true;

                    // Listening for button release
                    element.addEventListener('mouseup', function()
                    {
                        setTimeout(function() 
                        {
                            clearInterval(mouseHold);

                            buttonHold = false;

                        }, 120);
                    });

                }, 30);
            }
        });

        // Check if button is not held every 30 millisecond
        setInterval(function()
        {
            // If the button is not currently being held and task is not complete
            // Decrease the weight bar every 30 milliseconds
            if (buttonHold === false && CONTEXT_AF.data.isIdeal === false)
            {
                decreaseBar(fuelBar);
            }
        }, 30);
    }
});