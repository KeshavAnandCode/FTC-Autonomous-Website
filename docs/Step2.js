document.addEventListener("DOMContentLoaded", function() {

    const viewCodeBtn = document.getElementById('viewCodeStep2');
    const addActionClassBtn = document.getElementById('addActionClassBtn');
    const popupForm = document.getElementById('popupForm');
    const saveClassBtn = document.getElementById('saveClassBtn');
    const cancelClassBtn = document.getElementById('cancelClassBtn');
    const classNameInput = document.getElementById('className');
    const classCodeTextarea = document.getElementById('classCode');
    const actionClassesContainer = document.getElementById('actionClassesContainer');
    const addClassPopup = document.getElementById('addClassPopup');
    const classNameInputPopup = document.getElementById('classNamePopup');
    const saveClassNameBtn = document.getElementById('saveClassNameBtn');
    const cancelClassNameBtn = document.getElementById('cancelClassNameBtn');
    const step3 = document.getElementById('moveOn');

    let editingClassIndex = null;
    let codeMirrorEditor = null; // To store the CodeMirror editor instance

    // Function to generate code using retrieved values
    function generateCodeStep2() {
        const programName = localStorage.getItem('programName') || '';
        const packageName = localStorage.getItem('packageName') || '';
        let actionClasses2 = JSON.parse(localStorage.getItem('actionClasses')) || [];
    
        let actionClassesCode = '';
    
        actionClasses2.forEach(actionClass => {
            // Split the code into lines
            const lines = actionClass.code.split('\n');
    
            // Indent each line by one tab (four spaces)
            const indentedCode = lines.map(line => `\t${line}`).join('\n');
    
            // Append the indented code to actionClassesCode
            actionClassesCode += indentedCode + '\n\n'; // Add double newline for separation between classes
        });
    
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

${actionClassesCode}
} 
    `;
    
        return generatedCode; // Trim any leading/trailing whitespace
    }

    // Event listener for View Code button
    viewCodeBtn.addEventListener('click', () => {
        localStorage.removeItem('actionClasses');
        saveActionClassesToLocalStorage();
        const generatedCode = generateCodeStep2();
        const newWindow = window.open('view-code.html', '_blank');
        newWindow.addEventListener('load', () => {
            newWindow.document.getElementById('code-content').textContent = generatedCode.trim();
            newWindow.hljs.highlightBlock(newWindow.document.getElementById('code-content'));
        });
    });

    // Event listener for Add Action Class button
    addActionClassBtn.addEventListener('click', () => {
        openClassNamePopup();
    });

    // Event listener for Save Class Name button in popup
    saveClassNameBtn.addEventListener('click', () => {
        const className = classNameInputPopup.value.trim();

        const existingClass = Array.from(actionClassesContainer.children).find(element => {
            return element.querySelector('span').textContent === className;
        });
    
        if (existingClass) {
            // Alert user or handle conflict appropriately
            alert(`Action class "${className}" already exists.`);
            return;
        }

        if (className) {
            closeClassNamePopup();
            openPopupForm(className);
        } else {
            alert('Please enter a class name.');
        }


    });

    // Event listener for Cancel Class Name button in popup
    cancelClassNameBtn.addEventListener('click', () => {
        closeClassNamePopup();
    });

    // Event listener for Save Class button in main form
    // Event listener for Save Class button in main form
saveClassBtn.addEventListener('click', () => {
    const className = classNameInput.value.trim();
    const classCode = codeMirrorEditor.getValue().trim(); // Get value from CodeMirror editor

    if (className && classCode) {
        if (editingClassIndex !== null) {
            updateActionClass(editingClassIndex, className, classCode);
        } else {
            addActionClass(className, classCode);
        }
        closePopupForm();
    } else {
        alert('Please enter both class name and class code.');
    }
});

    // Event listener for Cancel button in main form
    cancelClassBtn.addEventListener('click', () => {
        closePopupForm();
    });

    // Function to open class name input popup
    function openClassNamePopup() {
        classNameInputPopup.value = '';
        addClassPopup.style.display = 'block';
    }

    // Function to close class name input popup
    function closeClassNamePopup() {
        addClassPopup.style.display = 'none';
    }

    // Function to open main form for adding/editing action class
    // Function to open main form for adding/editing action class
// Function to open main form for adding/editing action class
function openPopupForm(className = '', classCode = '') {
    classNameInput.value = className;

    if (!classCode) {
        classCode = 
`public class ${className}Action implements Action {

    @Override
    public boolean run(@NonNull TelemetryPacket packet) {
        return false;
    }
}

public Action ${className}() {
    return new ${className}Action();
}`;
    }
    classCodeTextarea.value = classCode;
    
    if (codeMirrorEditor) {
        // Set value if editor already initialized
        codeMirrorEditor.setValue(classCode);
        codeMirrorEditor.refresh(); // Refresh editor
    } else {
        // Initialize CodeMirror editor
        codeMirrorEditor = CodeMirror.fromTextArea(classCodeTextarea, {
            lineNumbers: false,
            mode: 'text/x-java',
            theme: 'darcula',
            indentUnit: 4,
            autofocus: true

        });
        codeMirrorEditor.getWrapperElement().style.fontSize = '12px'; 
    }
    
    popupForm.style.display = 'block';
}

   

let actionClasses = [];

// Function to save action classes to local storage
function saveActionClassesToLocalStorage() {
    localStorage.setItem('actionClasses', JSON.stringify(actionClasses));
}

// Function to load action classes from local storage
function loadActionClassesFromLocalStorage() {
    const storedClasses = localStorage.getItem('actionClasses');
    if (storedClasses) {
        actionClasses = JSON.parse(storedClasses);
        actionClasses.forEach(actionClass => {
            addActionClass(actionClass.name, actionClass.code, false);
        });
    }
}

    
    // Function to add action class to the container
    function addActionClass(className, classCode, saveToStorage = true) {
        // Check if class with the same name already exists
        const existingClass = Array.from(actionClassesContainer.children).find(element => {
            return element.querySelector('span').textContent === className;
        });
    
        if (existingClass) {
            // Alert user or handle conflict appropriately
            alert(`Action class "${className}" already exists.`);
            return;
        }
    
        const classElement = document.createElement('div');
        classElement.classList.add('action-class');
        classElement.innerHTML = `
            <span>${className}</span>
            <div class="action-class-buttons">
                <button class="editClassBtn">Edit</button>
                <button class="deleteClassBtn">Delete</button>
            </div>
        `;
        actionClassesContainer.appendChild(classElement);
    
        // Add to the actionClasses array
        if (saveToStorage){
        actionClasses.push({ name: className, code: classCode });
        }

    
        // Event listener for edit button
        classElement.querySelector('.editClassBtn').addEventListener('click', () => {
            const index = Array.from(actionClassesContainer.children).indexOf(classElement);
            openPopupForm(className, classCode);
            editingClassIndex = index;
        });
    
        // Event listener for delete button
        classElement.querySelector('.deleteClassBtn').addEventListener('click', () => {
            const index = Array.from(actionClassesContainer.children).indexOf(classElement);
            actionClasses.splice(index, 1);
            actionClassesContainer.removeChild(classElement);
        });
    }
    

    // Function to close main form
    function closePopupForm() {
        classNameInput.value = '';
        classCodeTextarea.value = '';
        editingClassIndex = null;
        popupForm.style.display = 'none';
    }

    
    // Function to update action class in the container
    function updateActionClass(index, className, classCode) {
        const classElement = actionClassesContainer.children[index];
        classElement.querySelector('span').textContent = className;
        actionClasses[index] = { name: className, code: classCode };
    }

    // Ensure Highlight.js remains functional
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });


    function checkStoredActionClasses() {
        const storedClasses = localStorage.getItem('actionClasses');
        let list = storedClasses ? JSON.parse(storedClasses) : [];
     
        if (!(list.length===0)) {
            const confirmation = confirm('Do you want to pick up where you left off with your action classes?');
            if (confirmation) {
                loadActionClassesFromLocalStorage();
            } else {
                // Clear localStorage if user chooses not to pick up where they left off
                localStorage.removeItem('actionClasses');
            }
        }
    }

    window.addEventListener('beforeunload', function(event) {
        localStorage.removeItem('actionClasses');

        saveActionClassesToLocalStorage();

    });

    function checkStoredValues() {
        if (!localStorage.getItem('programName') || !localStorage.getItem('packageName')) {
                alert('You are missing value(s) from earlier steps');
                window.location.href = 'index.html'; // Example: '/step2.html' or '/path/to/step2.html'
            
          
            
        } else {
                checkStoredActionClasses();


        }
    }

    step3.addEventListener('click', function(){
        localStorage.removeItem('actionClasses');
        saveActionClassesToLocalStorage();
        const classes = localStorage.getItem('actionClasses');
        let list = classes ? JSON.parse(classes) : [];
        if (list.length===0){
            const conf = confirm('You have zero action classes. Are you sure you want to move on?');
            if (conf){
                window.location.href = 'step3.html'; // Example: '/step2.html' or '/path/to/step2.html'
                localStorage.setItem('Step2', 1);


            } else {
                localStorage.removeItem('Step2');
            }
        } else {
            window.location.href = 'step3.html'; // Example: '/step2.html' or '/path/to/step2.html'

        }


    });
    setTimeout(function(){
        checkStoredValues();

    },250);

 



});