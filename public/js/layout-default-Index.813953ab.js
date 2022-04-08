"use strict";(self["webpackChunkphonebook3_client"]=self["webpackChunkphonebook3_client"]||[]).push([[876],{764:function(e,t,n){n.d(t,{Z:function(){return i}});var a=n(3396);const r=["href"],s=["href","onClick"];function o(e,t,n,o,c,l){const f=(0,a.up)("router-link");return l.isExternalLink?((0,a.wg)(),(0,a.iD)("a",(0,a.dG)({key:0},e.$attrs,{href:e.to,target:"_blank"}),[(0,a.WI)(e.$slots,"default")],16,r)):((0,a.wg)(),(0,a.j4)(f,(0,a.dG)({key:1},e.$props,{custom:""}),{default:(0,a.w5)((({isExactActive:t,href:n,navigate:r})=>[(0,a._)("a",(0,a.dG)(e.$attrs,{href:n,onClick:r,class:[t&&"active"]}),[(0,a.WI)(e.$slots,"default")],16,s)])),_:3},16))}var c=n(678),l={name:"AppLink",inheritAttrs:!1,props:{...c.rH.props,inactiveClass:String},computed:{isExternalLink(){return"string"===typeof this.to&&this.to.startsWith("http")}}},f=n(89);const u=(0,f.Z)(l,[["render",o]]);var i=u},7130:function(e,t,n){n.r(t),n.d(t,{default:function(){return H}});var a=n(3396);function r(e,t,n,r,s,o){const c=(0,a.up)("default-header"),l=(0,a.up)("default-view"),f=(0,a.up)("default-footer");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(c),(0,a.Wm)(l),(0,a.Wm)(f)],64)}const s={class:"container"};function o(e,t,n,r,o,c){const l=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)("div",s,[((0,a.wg)(),(0,a.j4)(l,{key:e.$route.path}))])}var c={name:"DefaultView"},l=n(89);const f=(0,l.Z)(c,[["render",o]]);var u=f,i=n(7334);const A={class:"navbar navbar-expand-lg sticky-top navbar-dark bg-phonebook"},p={class:"container d-flex justify-content-center"},d=(0,a._)("span",{class:"d-none d-sm-inline"},"Телефонный",-1),v=(0,a._)("img",{class:"mx-4",alt:"Phonebook3 logo",src:i},null,-1),k=(0,a._)("span",{class:"d-none d-sm-inline"},"справочник",-1);function E(e,t,n,r,s,o){const c=(0,a.up)("app-link");return(0,a.wg)(),(0,a.iD)("header",A,[(0,a._)("div",p,[(0,a.Wm)(c,{class:"navbar-brand text-uppercase",to:"/#"},{default:(0,a.w5)((()=>[d,v,k])),_:1})])])}var w=n(764),m={name:"DefaultHeader",components:{AppLink:w.Z}};const x=(0,l.Z)(m,[["render",E]]);var g=x,z=n(7139);const D={class:"fixed-bottom border-top"},y={class:"container py-2 d-lg-flex flex-row"},I=(0,a._)("p",{class:"m-0 small flex-fill d-none d-lg-block"},"Телефонный справочник Администрации города Твери",-1),S={class:"m-0 small text-center"};function U(e,t,n,r,s,o){return(0,a.wg)(),(0,a.iD)("footer",D,[(0,a._)("div",y,[I,(0,a._)("p",S,"© Телефонный справочник, 2013 - "+(0,z.zw)((new Date).getFullYear())+" [версия 3.1]",1)])])}var h={name:"DefaultFooter"};const G=(0,l.Z)(h,[["render",U]]);var L=G,N={name:"DefaultLayout",components:{DefaultView:u,DefaultHeader:g,DefaultFooter:L}};const Z=(0,l.Z)(N,[["render",r]]);var H=Z},7334:function(e){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=layout-default-Index.813953ab.js.map