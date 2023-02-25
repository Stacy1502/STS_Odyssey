// Component for task 2 for spaceship
// Weight bar rises and falls until ideal amount is reached
// Weight bar can not be moved if task is complete

'user strict'

// Functions ---------------------------------------------------------------------------------------------------------------

// Calculates and creates bar object to indicate the ideal amount of weight
// Takes the ideal amount of weight as a percent, and the screen height and width
// Returns the bar object
var placeBar = function(idealAmount, screenHeight, screenWidth)
{
    // Calculating the position of the bar on the screen depending on the ideal amount of weight
    // Position is between -(screenHeight / 2) and (screenHeight / 2)
    var decimal = idealAmount / 100;

    var percentOfScreen = decimal * screenHeight;

    var barPos = -(screenHeight / 2) + percentOfScreen;
    
    // Creating bar object
    var bar = document.createElement('a-entity');

    bar.setAttribute('position', {
        x: 0,
        y: barPos,
        z: 0.01
    });

    bar.setAttribute('geometry', {
        primitive: 'plane',
        height: 0.05,
        width: screenWidth
    });

    bar.setAttribute('material', {
        color: '#000000'
    });

    return bar;
}

// --------------------------------------------------------

// Increasing the weight bar
var upButton = function(weightBar, screenHeight)
{
    // Getting current height of weight bar
    var currentHeight = weightBar.getAttribute('geometry')['height'];

    // Making sure the weight bar does not go over the screen
    if (currentHeight < screenHeight)
    {
        // Adding to weight bar
        weightBar.setAttribute('geometry', {height: currentHeight + 0.05});

        // Leveling out position of weight bars
        weightBar.setAttribute('position', {
            x: weightBar.getAttribute('position')['x'],
            y: weightBar.getAttribute('position')['y'] + 0.025,
            z: weightBar.getAttribute('position')['z'],
        });
    }
    else
    {
        weightBar.setAttribute('geometry', {height: screenHeight});
    }
}

// --------------------------------------------------------

// Decreasing the weight bar
var downButton = function(weightBar)
{
    // Getting current height of weight bar
    var currentHeight = weightBar.getAttribute('geometry')['height'];

    // Making sure the weight bar does not go into negatives
    if (currentHeight > 0)
    {
        // Subtracting to weight bar
        weightBar.setAttribute('geometry', {height: currentHeight - 0.05});

        // Leveling out position of weight bars
        weightBar.setAttribute('position', {
            x: weightBar.getAttribute('position')['x'],
            y: weightBar.getAttribute('position')['y'] - 0.025,
            z: weightBar.getAttribute('position')['z'],
        });
    }
    else
    {
        weightBar.setAttribute('geometry', {height: 0});
    }
}

// --------------------------------------------------------

// Checking if the weight bar has reached the ideal amount (+-2%)
var checkWeight = function(idealAmount, weightBar, screenHeight)
{
    // Getting percent height the weight bar is at
    var currentPercent = (weightBar.getAttribute('geometry')['height'] / screenHeight) * 100;

    // Comparing it against the ideal amount
    if (currentPercent < idealAmount + 2)
    {
        if (currentPercent > idealAmount - 2)
        {
            return true;
        }
    }

    return false;
}

// Component ---------------------------------------------------------------------------------------------------------------

AFRAME.registerComponent('weight_bar', 
{
    schema: 
    {
        // If the cargo weight is good
        isGood : {type: 'boolean', default:false},

        // The ideal amount of weight
        idealAmount: {type: 'int', default: 50},

        // Type of button it is (either up or down)
        buttonType : {type: 'string', default:''},
    },

    init : function() 
    {
        const CONTEXT_AF = this;

        const element = CONTEXT_AF.el;

        // Getting screen
        var screen = document.querySelector('#weightScreen');
        
        var screenHeight = screen.getAttribute('geometry')['height'];
        var screenWidth = screen.getAttribute('geometry')['width'];

        // Creating a visual bar of the ideal weight amount and displaying it to the user
        // If the visual bar is already an object, do not duplicate it
        if (screen.children.length === 0)
        {
            var bar = placeBar(CONTEXT_AF.data.idealAmount, screenHeight, screenWidth);

            screen.appendChild(bar);
        }

        // Getting weight indication bar
        var weightBar = document.querySelector('#weightBar');

        // Listening for up or down button click
        element.addEventListener('click', function()
        {
            // If task has not been completed
            if (CONTEXT_AF.data.isGood === false)
            {
                // If the up button was clicked, increase weight bar
                if(CONTEXT_AF.data.buttonType === 'up')
                {
                    upButton(weightBar, screenHeight);
                }
                // If down button was clicked, decrease weight bar
                else if (CONTEXT_AF.data.buttonType === 'down')
                {
                    downButton(weightBar);
                }

                // Checking if the weight bar has reached the ideal amount
                // If it is, record that the task is complete on all objects with this component
                if(checkWeight(CONTEXT_AF.data.idealAmount, weightBar, screenHeight) === true)
                {
                    // Each will have the 'weightButton' class
                    var componentObjects = document.querySelectorAll('.weightButton');
                    var numObjects = componentObjects.length;

                    for (let i = 0; i < numObjects; i++)
                    {
                        componentObjects[i].setAttribute('weight_bar', {isGood: true});
                    }
                }
            }
        });
    }
});