(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r,c){var a=e.cloneNode(!0),i=a.querySelector(".card__image"),s=a.querySelector(".card__delete-button"),u=a.querySelector(".card__like-button"),l=a.querySelector(".card__like-number"),d=a.querySelector(".card__title");return i.src=t.link,i.alt=t.name,d.textContent=t.name,void 0!==t.likes?(l.textContent=t.likes.length,t.owner._id===c&&(s.classList.remove("card__delete-button_hidden"),s.addEventListener("click",(function(){n(s,t)}))),t.likes.some((function(e){return e._id===c}))&&u.classList.add("card__like-button_is-active")):(l.textContent=0,s.classList.remove("card__delete-button_hidden"),s.addEventListener("click",(function(){n(s,t)}))),u.addEventListener("click",(function(e){o(e,t)})),i.addEventListener("click",r),a}var n=document.querySelector(".page");function o(e){e.classList.add("popup_is-opened"),n.addEventListener("keydown",c),setTimeout((function(){n.addEventListener("click",a)}),50)}function r(){var e=document.querySelector(".popup_is-opened");e.querySelectorAll("input").forEach((function(e){return e.value=""})),null!==e&&(e.classList.remove("popup_is-opened"),n.removeEventListener("keydown",c),n.removeEventListener("click",a))}function c(e){"Escape"===e.key&&r()}function a(e){null===e.target.closest(".popup__content")&&r()}var i,s=function(e){return e.some((function(e){return!e.validity.valid}))},u=function(e){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка (getUserInformation): ".concat(e.status))}))},l=function(e){return fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка (getAllCards): ".concat(e.status))}))},d=function(e,t,n){var o;return o=!0===n?"PUT":"DELETE",fetch("".concat(e.baseUrl,"/cards/likes/")+t,{method:o,headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка (addRemoveLikeCard): ".concat(e.status))}))},p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",spanErrorClass:".form__input-error",errorClass:"popup__error_visible"},f={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"5f6c0717-61b9-4f4a-8c74-b03867a939b6","Content-Type":"application/json"}},_=document.querySelector(".places__list"),m=document.querySelector(".popup_type_image"),v=m.querySelector(".popup__caption"),y=m.querySelector(".popup__image"),h=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),C=document.querySelector(".popup_type_edit"),g=C.querySelector("input:nth-of-type(1)"),k=C.querySelector("input:nth-of-type(2)"),L=document.querySelector(".popup_type_delete-card"),q=0,E=void 0;function x(e,t){var n=document.querySelector(e),c=document.querySelector(t),a=c.querySelector(".popup__close");n.addEventListener("click",(function(){c.classList.contains("popup_type_edit")&&(g.value=h.textContent,k.value=b.textContent),o(c),function(e,t){e.querySelectorAll(t.spanErrorClass).forEach((function(e){e.textContent=""}));var n=e.querySelectorAll(t.inputSelector);n.forEach((function(e){e.classList.remove(t.inputErrorClass)}));var o=e.querySelector(t.submitButtonSelector);Array.from(n).every((function(e){return e.value.length>0}))?(o.classList.remove(t.inactiveButtonClass),o.removeAttribute("disabled")):(o.classList.add(t.inactiveButtonClass),o.setAttribute("disabled",!0))}(c,p)})),a.addEventListener("click",(function(){r()}))}function A(e,t){q=t._id,E=e,o(L)}function j(e){var t=e.target.closest(".card"),n=t.querySelector(".card__image"),r=t.querySelector(".card__title");v.textContent=r.textContent,y.alt=n.alt,y.src=n.src,o(m)}!function(e){Promise.all(function(e){return[u(e),l(e)]}(e)).then((function(e){var n,o;h.textContent=e[0].name,b.textContent=e[0].about,S.src=e[0].avatar,S.classList.add("profile__image-visible"),n=e[1],o=e[0]._id,n.forEach((function(e){return _.append(t(e,A,N,j,o))})),console.log(e)})).catch((function(e){console.log("Ошибка. Запрос не выполнен: ".concat(e))}))}(f),x(".profile__edit-button",".popup_type_edit"),x(".profile__add-button",".popup_type_new-card"),x(".avatar",".popup_type_new-avatar"),L.querySelector(".popup__close").addEventListener("click",(function(){r()})),m.querySelector(".popup__close").addEventListener("click",r),i=p,Array.from(document.querySelectorAll(i.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}));var t=Array.from(e.querySelectorAll(i.inputSelector));t.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n,o){var r=e.querySelector(".".concat(t.name,"-input-error"));t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?(t.classList.remove(n),r.classList.remove(o),r.textContent=""):(t.classList.add(n),r.textContent=t.validationMessage,r.classList.add(o))}(e,n,i.inputErrorClass,i.errorClass),function(e,t,n){var o=e.querySelector(n.submitButtonSelector);s(t)?(o.setAttribute("disabled",!0),o.classList.add(n.inactiveButtonClass)):(o.removeAttribute("disabled"),o.classList.remove(n.inactiveButtonClass))}(e,t,i)}))}))}));var U=document.forms.edit_profile,P=U.querySelector("button");U.addEventListener("submit",(function(e){e.preventDefault(),function(e,t,n,o){o.textContent="Сохранение...",function(e,t,n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка (setUserInformation): ".concat(e.status))}))}(e,t,n).then((function(e){e.name===t&&e.about===n?console.log("UserData записаны на сервер"):console.log("UserData НЕ записаны")})).catch((function(e){console.log(e)})).finally((function(){o.textContent="Сохранить",h.textContent=U.name.value,b.textContent=U.description.value,r()}))}(f,U.name.value,U.description.value,P)}));var w=document.forms.new_place,D=w.querySelector("button");w.addEventListener("submit",(function(e){e.preventDefault();var n={name:w.place_name.value,link:w.link.value,_id:""};!function(e,n,o){o.textContent="Сохранение...",function(e,t,n){return fetch("".concat(e.baseUrl,"/cards "),{method:"POST",headers:e.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка (setNewCard): ".concat(e.status))}))}(e,n.name,n.link).then((function(e){e.name===n.name&&e.link===n.link?(n._id=e._id,console.log("Card записана на сервер")):console.log("Card НЕ записана на сервер")})).catch((function(e){console.log(e)})).finally((function(){o.textContent="Сохранить",function(e){_.prepend(t(e,A,N,j,0))}(n),r()}))}(f,n,D)})),document.forms.delete_card.addEventListener("submit",(function(e){e.preventDefault(),function(e,t){return fetch("".concat(e.baseUrl,"/cards/")+t,{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка (deleteCardFromServer): ".concat(e.status))}))}(f,q).then((function(e){"Пост удалён"===e.message?(void 0!==E&&(E.closest(".places__item").remove(),q=0),console.log("Карточка удалена")):console.log("Карточка НЕ удалена")})).catch((function(e){console.log(e)})).finally((function(){r()}))}));var B=document.forms.new_avatar,T=B.querySelector("button");function N(e,t){d(f,t._id,!e.target.classList.contains("card__like-button_is-active")).then((function(n){n._id===t._id&&(e.target.closest(".card__description").querySelector(".card__like-number").textContent=n.likes.length,e.target.classList.toggle("card__like-button_is-active"))})).catch((function(e){console.log(e)}))}B.addEventListener("submit",(function(e){e.preventDefault(),T.textContent="Сохранение...",function(e,t){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка (setUserAvatar): ".concat(e.status))}))}(f,B.avatar.value).then((function(e){e.avatar===B.avatar.value&&(S.src=e.avatar),console.log(e)})).catch((function(e){console.log(e)})).finally((function(){T.textContent="Сохранить",r()}))}))})();
//# sourceMappingURL=main.js.map