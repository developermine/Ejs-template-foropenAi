const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
const clear = document.querySelector('#clear');




  let loadInterval;
  
    function loader(element) {
      element.textContent = '';

      loadInterval = setInterval(() => {
        element.textContent += '.';

        if (element.textContent === '....') {
          element.textContent = '';
        }
      }, 300)
    }

  function typeText(element, text) {
        let index = 0;

        let interval = setInterval(() => {
          if(index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
          } else {
            clearInterval(interval);
          }
        }, 20)
      }
          

      function generateUniqueId() {
        const timestamp = Date.now();
        const randomNumber = Math.random();
        const hexadecimalString = randomNumber.toString(16);
          
        return `id-${timestamp}-${hexadecimalString}`;
       }
    
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const data = new FormData(form);
    
      // user's chatstripe
      chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
    
      form.reset();
    
      // bot's chatstripe
      const uniqueId = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
    
      chatContainer.scrollTop = chatContainer.scrollHeight;
    
      const messageDiv = document.getElementById(uniqueId);
    
      loader(messageDiv);
    
      // fetch data from server -> bot's response
    
      fetch(' /', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: data.get('prompt')
        })
      })
      .then(response => {
        clearInterval(loadInterval);
        messageDiv.innerHTML = '';
    
        if(response.ok) {
          return response.json();  //returns a promise object which is resolved with the data from the server 
    
        } else {
          return response.text(); //returns a promise object which is resolved with the error message from the server 
    
        }
    
      })   //end of first then() block 
    
      .then(data => {   //second then() block to handle the response from the server  
    
         if (data instanceof Object) {   //if data is an object, it means that response was ok and we can parse it as json  
    
            const parsedData = data.bot.trim();
    
            typeText(messageDiv, parsedData);
    
         } else {   //if data is not an object, it means that there was an error and we can display it in alert and console log  
    
            messageDiv.innerHTML = "Please we are having a down time, kindly check your network and try again.";
    
            alert(data);
            console.log(data);
    
         }
    
      })   //end of second then() block
    }
    
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('keypress', (e) => {
     if (e.which === 13) {
     handleSubmit(e);
  }
})

document.getElementById("clear").onclick = function() {
  document.getElementById("chat_container").innerHTML = "";
}
