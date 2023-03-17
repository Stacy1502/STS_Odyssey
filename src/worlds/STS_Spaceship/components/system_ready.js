// Component for task 3 for spaceship
// Players 1 and 2 must press the buttons at the same time

'user strict'

// Component ---------------------------------------------------------------------------------------------------------------

AFRAME.registerComponent('system_ready', 
{
    schema: 
    {
        // If system is ready
        ready : {type: 'boolean', default:false},
    },

    init : function() 
    {
        const CONTEXT_AF = this;

        const element = CONTEXT_AF.el;

        // Getting player 1 and 2 buttons
        var player1 = document.querySelector('#player1Button');
        var player2 = document.querySelector('#player2Button');

        // Getting player 1 and 2 ready screens
        var screen1 = document.querySelector('#player1Ready');
        var screen2 = document.querySelector('#player2Ready');

        // Listening for player 1 and 2 button clicks
        var player1Ready = false;
        var player2Ready = false;

        var player1Timer;
        var player2Timer;

        // Player 1
        player1.addEventListener('click', function() 
        {
            // Only running if task is not complete
            if (CONTEXT_AF.data.ready === false)
            {
                player1Ready = true;

                // Turning player 1 screen green
                screen1.setAttribute('material', {color: '#00FF00'});

                // Players have +-1/2 a second to press the buttons together
                player1Timer = setTimeout(function() 
                {
                    player1Ready = false;

                    // Turning player 1 screen back to red
                    screen1.setAttribute('material', {color: '#FF0000'});

                }, 500);
            }
        });

        // Player 2
        player2.addEventListener('click', function() 
        {
            // Only running if task is not complete
            if (CONTEXT_AF.data.ready === false)
            {
                player2Ready = true;

                // Turning player 2 screen green
                screen2.setAttribute('material', {color: '#00FF00'});

                // Players have +-1/2 a second to press the buttons together
                player2Timer = setTimeout(function() 
                {
                    player2Ready = false;

                    // Turning player 2 screen back to red
                    screen2.setAttribute('material', {color: '#FF0000'});

                }, 500);
            }
        });

        // Checking if the players have pressed the buttons together 50 milliseconds
        var checkReady = setInterval(function() 
        {
            if (player1Ready === true && player2Ready === true)
            {
                CONTEXT_AF.data.ready = true;
    
                // Clearning timers so screens stay green
                clearTimeout(player1Timer);
                clearTimeout(player2Timer);

                clearInterval(checkReady);
            }

        }, 50);
    }
});