document.addEventListener("DOMContentLoaded", function() {
    const viewCodeBtn = document.getElementById('viewCode');
    const step2Btn = document.getElementById('step2Btn');
    // Retrieve values from localStorage
function retrieveValues() {
    const programName = localStorage.getItem('programName');
    const packageName = localStorage.getItem('packageName');

    // Set values in input fields if they exist
    if (programName) {
        document.getElementById('name').value = programName;
    }
    if (packageName) {
        document.getElementById('package').value = packageName;
    }
}

    // Function to generate code for Step 1
    function generateCodeStep1() {
        const programName = document.getElementById('name').value.trim();
        const packageName = document.getElementById('package').value.trim();

        const generatedCode = `
            package ${packageName};
            
            import androidx.annotation.NonNull;
            
            // RR-specific imports
            import com.acmerobotics.dashboard.config.Config;
            import com.acmerobotics.dashboard.telemetry.TelemetryPacket;
            import com.acmerobotics.roadrunner.Action;
            import com.acmerobotics.roadrunner.Pose2d;
            import com.acmerobotics.roadrunner.SequentialAction;
            import com.acmerobotics.roadrunner.ParallelAction;
            import com.acmerobotics.roadrunner.Vector2d;
            import com.acmerobotics.roadrunner.ftc.Actions;
            
            // Non-RR imports
            import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
            import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
            import com.qualcomm.robotcore.hardware.HardwareMap;
            import com.qualcomm.robotcore.hardware.Servo;
            
            // 23344-Specific Imports
            import org.firstinspires.ftc.teamcode.Autonomous.RR.MecanumDrive;
            import org.firstinspires.ftc.teamcode.Teleop.BehindTheScenes.Singletons.Robot;
        
            @Config
            @Autonomous(name = "${programName}", group = "Autonomous")
            public class ${programName} extends LinearOpMode {
            } 
        `;

        return generatedCode;
    }

    // Function to validate Step 1 input fields
    function validateStep1() {
        const programName = document.getElementById('name').value.trim();
        const packageName = document.getElementById('package').value.trim();

        if (!programName || !packageName) {
            alert('Please enter both Program Name and Package Name to proceed to Step 2.');
            return false;
        }

        return true;
    }

    // Function to move to Step 2
    function moveToStep2() {
        if (validateStep1()) {
            // Replace current URL with Step 2 URL on your domain
            saveValues();
            
            window.location.href = 'step2.html'; // Example: '/step2.html' or '/path/to/step2.html'
        }
    }
// Save values to localStorage
function saveValues() {
    const programName = document.getElementById('name').value.trim();
    const packageName = document.getElementById('package').value.trim();

    localStorage.setItem('programName', programName);
    localStorage.setItem('packageName', packageName);
}
    // Event listener for View Code button
    viewCodeBtn.addEventListener('click', () => {
        const generatedCode = generateCodeStep1();
        const newWindow = window.open('view-code.html', '_blank');
        newWindow.addEventListener('load', () => {
            newWindow.document.getElementById('code-content').textContent = generatedCode.trim();
            newWindow.hljs.highlightBlock(newWindow.document.getElementById('code-content'));
        });
    });

    // Event listener for Step 2 button
    step2Btn.addEventListener('click', moveToStep2);



    // Save data to localStorage before leaving the page
    window.addEventListener('unload', function() {
        saveValues();
    });

    window.addEventListener('beforeunload', function(){

        saveValues();


    });

    function checkStoredValues() {
        if (localStorage.getItem('programName') || localStorage.getItem('packageName')) {
            const confirmation = confirm('Do you want to pick up where you left off?');
            if (confirmation) {
                retrieveValues();

            } else {
                // Clear localStorage if user chooses not to pick up where they left off
                localStorage.removeItem('programName');
                localStorage.removeItem('packageName');
            }
        }
    }

    checkStoredValues();


});

