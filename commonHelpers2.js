import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as n}from"./assets/vendor-77e16229.js";const r=document.forms[0];r.addEventListener("submit",e=>{e.preventDefault();const o=e.target.state.value,s=e.target.delay.value,t=l(s,o);a(t),e.target.reset()});function l(e,o){return new Promise((s,t)=>{setTimeout(()=>{o==="fulfilled"?s(e):t(e)},e)})}function i(e,o="fulfilled"){const s=o==="fulfilled"?`✅ Fulfilled promise in ${e}ms`:`❌ Rejected promise in ${e}ms`,t=o==="fulfilled"?"#59A10D":"#EF4040";n.show({icon:!1,backgroundColor:`${t}`,message:`${s}`,messageColor:"black",messageSize:"16",position:"topRight",close:!1,displayMode:1})}function a(e){e.then(o=>i(o)).catch(o=>i(o,"r"))}
//# sourceMappingURL=commonHelpers2.js.map
