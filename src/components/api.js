export {getUserInformation, getAllCards, getAllData, setUserInformation, setNewCard, deleteCardFromServer };




// const config = {
//     baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
//     headers: {
//       authorization: '5f6c0717-61b9-4f4a-8c74-b03867a939b6',
//       'Content-Type': 'application/json'
//     }
//   }
  
   const getUserInformation = (config) => {
     

  return  fetch(`${config.baseUrl}/users/me`, 
        {headers: config.headers}
      )
    .then((res) => {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка (getUserInformation): ${res.status}`);
    });
  } 

  const getAllCards = (config) => {
     

    return  fetch(`${config.baseUrl}/cards`, 
          {headers: config.headers}
        )
      .then((res) => {
          if (res.ok) {
              return res.json();
            }
          return Promise.reject(`Ошибка (getAllCards): ${res.status}`);
      });
    } 


   const getAllData = (config)=>{

    return [getUserInformation(config),getAllCards(config)];

   }



   const setUserInformation = (config, name,about)=>{

    return  fetch(`${config.baseUrl}/users/me`, 
      {method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
                 name: name,
                 about: about
        })

      }
    )
  .then((res) => {
      if (res.ok) {
          return res.json();
        }
      return Promise.reject(`Ошибка (setUserInformation): ${res.status}`);
  });
 }

 const setNewCard = (config, name,link)=>{

  return  fetch(`${config.baseUrl}/cards `, 
    {method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
               name: name,
               link: link
      })

    }
  )
.then((res) => {
    if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка (setNewCard): ${res.status}`);
});
}


// удаление карточки

const deleteCardFromServer = (config, id)=>{

 fetch(`${config.baseUrl}/cards/`+id, 
    {method: 'DELETE',
      headers: config.headers
    }
  )
.then((res) => {
    if (res.ok) {
      console.log("Удаление прошло успешно");
      }
    return Promise.reject(`Ошибка (deleteCardFromServer): ${res.status}`);
}) 
.catch((err) => {
  console.log(err); // выводим ошибку в консоль
}); 
;
}