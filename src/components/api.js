export {
  getUserInformation, 
  getAllCards, 
  getAllData, 
  setUserInformation, 
  setNewCard, 
  deleteCardFromServer, 
  addRemoveLikeCard,
  setUserAvatar
 };



  
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

return fetch(`${config.baseUrl}/cards/`+id, 
    {method: 'DELETE',
      headers: config.headers
    }
  )
.then((res) => {
    if (res.ok) {
      return res.json();
      
      }
    return Promise.reject(`Ошибка (deleteCardFromServer): ${res.status}`);
}); 
;
}


// установка аватара

const setUserAvatar = (config, link)=>{

  return  fetch(`${config.baseUrl}/users/me/avatar`, 
    {method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
               avatar: link,
               
      })

    }
  )
.then((res) => {
    if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка (setUserAvatar): ${res.status}`);
});
}









// установка/ снятие лайка  

const addRemoveLikeCard = (config, id, like)=>{

  let _method = undefined;
  if(like === true){_method = 'PUT'}
  else{ _method = 'DELETE' }


  return fetch(`${config.baseUrl}/cards/likes/`+id, 
      {method: _method,
        headers: config.headers
      }
    )
  .then((res) => {
      if (res.ok) {
        return res.json();
        
        }
      return Promise.reject(`Ошибка (addRemoveLikeCard): ${res.status}`);
  }); 
  ;
  }
  