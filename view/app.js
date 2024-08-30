const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const send = document.querySelector('.send2');

const send2 = document.querySelector('.form_2');

const login = document.querySelector('.container2');

const register = document.querySelector('.container');
send2.addEventListener('submit',function(){
    const valuez = {
        email: email.value,
        password: password.value
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        if(xhr.status === 200){
            if(email.value !== '' && password.value !== ''){
                console.log(xhr.responseText)
            }else{
                console.log('No data fetched!')
            }
        }
    }
    xhr.send(JSON.stringify(valuez));
})

send.addEventListener('submit', function () {
    // event.preventDefault();
    const values = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    const url = 'http://localhost:5500/send_mes';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }
       if(username.value !== '' && email.value !== ''&& password.value !== ''){
        alert('success!');        
        fetch(url, options).then(res=>res.json()).then(data=> console.log(data.details[0].message)).catch(err=>console.log(err.message))
       }else{
        alert('Failed!')
       } 
                
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', '/send_mes');
    // xhr.setRequestHeader('content-type', 'application/json');
    // xhr.onload = function () {
    //     if (xhr.status === 200) {
    //         if (username.value !== '' && email.value !== '' && password.value !== '') {
    //             alert('Success: Form sent!')
    //         } else {
    //             alert('Failed: Empty blocks!')
    //         }
    //     } else {
    //         alert('Status_Code_Not_200!')
    //     }

    // }
    // xhr.send(JSON.stringify(values));
});

