document.addEventListener("DOMContentLoaded", function() {
   const button = document.getElementById('start');
   const programName = localStorage.getItem('programName');
   const packageName = localStorage.getItem('packageName');
   const storedClasses = localStorage.getItem('actionClasses');
   const yes =localStorage.getItem('Step2');
   let list = storedClasses ? JSON.parse(storedClasses) : [];



   function goToPage(){
    if(programName &&packageName){
        if((!(list.length===0)||yes)&&storedClasses){
            window.location.href = 'step3.html'; // Example: '/step2.html' or '/path/to/step2.html'
        } else {
            window.location.href = 'step2.html'; // Example: '/step2.html' or '/path/to/step2.html'

        }
    } else {
        window.location.href = 'step1.html'; // Example: '/step2.html' or '/path/to/step2.html'

    }
   }

   button.addEventListener('click', function(){
     goToPage();
   });

   localStorage.removeItem('Step2');

});