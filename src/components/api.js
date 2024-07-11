export {getUserInformation };




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
        return Promise.reject(`Ошибка: ${res.status}`);
    });
    // .then((data) => {
    //    return data
    // })
    // .catch((err) => {
    //   console.log('Ошибка. Запрос не выполнен: ', err);
    // });

  } 