(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function f(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(e){if(e.ep)return;e.ep=!0;const n=f(e);fetch(e.href,n)}})();const o=document.querySelectorAll(".ball"),t={x:0,y:0,size:300,r:Math.random()*255,g:Math.random()*255,b:Math.random()*255,a:.4},s={x:0,y:0};function m(){d(),a(),window.addEventListener("mousemove",u),window.addEventListener("touchmove",u),window.addEventListener("resize",()=>{d()})}m();function d(){t.x=window.innerWidth*.5-t.size*.5,t.y=window.innerHeight*.5-t.size*.5,window.innerWidth>=768?(o[0].style.width=`${t.size}px`,o[0].style.height=`${t.size}px`):(o[0].style.width=`calc(${t.size}px / 2)`,o[0].style.height=`calc(${t.size}px / 2)`),o[0].style.background=`rgba(${t.r},${t.g},${t.b},${t.a})`}function u(i){s.x=i.clientX,s.y=i.clientY}function a(){const i=s.x-t.size*.5,r=s.y-t.size*.5;o[0].style.left=`${i}px`,o[0].style.top=`${r}px`,requestAnimationFrame(a)}