fetch('http://localhost:3000/weather?location=karachi')
.then((response)=>{
    response.json()
    .then((data)=>{
        console.log(data)
    })
})
// async function fetchAsync (url) {
//     let response = await fetch(url);
//     let data = await response.json();
//     return data;
//   }

//https://javascript.info/fetch

// //connect form with javascript
// const weather = document.querySelector('form')
// const search = document.querySelector('input')

// //listners perform different types of actions
// //there are two arguments. first one is name of event and second one is callback
// weather.addEventListener('submit',(e)=>{
//   e.preventDefault()//it gonna change the default behaviuor(refresh completely)
//   const location = search.value //extracts the input value typed in the form
//   console.log('just testing')
//   console.log(location)
// })//at this point browser refresh completely
// ///     note:  orders matters