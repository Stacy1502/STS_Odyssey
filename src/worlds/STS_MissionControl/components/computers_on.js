// Component for task 1 for mission control
// Turns on computers from button click

'user strict'

// Component ---------------------------------------------------------------------------------------------------------------

AFRAME.registerComponent('computers_on', 
{
    schema: 
    {
        // If the computers are on and task is completed
        isOn : {type: 'boolean', default:false},
    },

    init : function() 
    {
        const CONTEXT_AF = this;

        const element = CONTEXT_AF.el;

        // Getting computer screens
        var computers = document.querySelectorAll('.computer');
        var numComputers = computers.length;

        // Listening for on button click 
        // When button is clicked, turn on computer screen
        element.addEventListener('click', function()
        {
            if (CONTEXT_AF.data.isOn === false)
            {
                CONTEXT_AF.data.isOn = true;

                for (let i = 0; i < numComputers; i++)
                {
                    computers[i].setAttribute('material', {color: '#858dff'});
                }
            }
        });
    }
});