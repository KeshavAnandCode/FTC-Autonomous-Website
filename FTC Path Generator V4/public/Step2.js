document.addEventListener("DOMContentLoaded", function() {

    const viewCodeBtn = document.getElementById('viewCodeStep2');

    // Retrieve values from localStorage
    let programName = localStorage.getItem('programName');
    let packageName = localStorage.getItem('packageName');

    // Check if values are null or undefined, initialize them if so
    if (!programName) {
        programName = '';
    }
    if (!packageName) {
        packageName = '';
    }

    // Function to generate code using retrieved values
    function generateCodeStep2() {
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

    // Event listener for View Code button
    viewCodeBtn.addEventListener('click', () => {
        const generatedCode = generateCodeStep2();
        const newWindow = window.open('view-code.html', '_blank');
        newWindow.addEventListener('load', () => {
            newWindow.document.getElementById('code-content').textContent = generatedCode.trim();
            newWindow.hljs.highlightBlock(newWindow.document.getElementById('code-content'));
        });
    });

    function checkStoredValues() {
        if (!localStorage.getItem('programName') || !localStorage.getItem('packageName')) {
            const confirmation = confirm('You are missing value(s) from earlier steps. Do you want to go back?');
            if (confirmation) {
                window.location.href = 'index.html'; // Example: '/step2.html' or '/path/to/step2.html'


            } else {
                
            }
        }
    }

    checkStoredValues();

});