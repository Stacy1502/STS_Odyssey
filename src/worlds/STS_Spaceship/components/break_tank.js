// Component for task 10 for spaceship
// Tank breaks off when button is clicked

'user strict'

// Component ---------------------------------------------------------------------------------------------------------------

AFRAME.registerComponent('break_tank', 
{
    schema: 
    {
        // If the fuel tank is broken off and task is completed
        isBrokenOff : {type: 'boolean', default:false},

        // If the previous task is complete
        isPrevComplete : {type: 'boolean', default:false},
    },

    init : function() 
    {
        const CONTEXT_AF = this;

        const element = CONTEXT_AF.el;

        // Listening for on button click 
        // When button is clicked, break tank off
        element.addEventListener('click', function()
        {
            // If the previous task is complete
            // And if task has not been completed
            if (CONTEXT_AF.data.isPrevComplete === true && CONTEXT_AF.data.isBrokenOff === false)
            {
                CONTEXT_AF.data.isBrokenOff = true;
            }
        });
    }
});