(self["webpackChunkphonebook3_client"]=self["webpackChunkphonebook3_client"]||[]).push([[238],{9254:function(t,e,n){"use strict";var a=n(2109),l=n(4230),i=n(3429);a({target:"String",proto:!0,forced:i("link")},{link:function(t){return l(this,"a","href",t)}})},7268:function(t,e,n){"use strict";var a=n(2109),l=n(4230),i=n(3429);a({target:"String",proto:!0,forced:i("small")},{small:function(){return l(this,"small","","")}})},1945:function(t,e,n){"use strict";n(4916),n(7601),n(5306),n(1703);var a=n(3545),l={"text/plain":"Text","text/html":"Url",default:"Text"},i="Copy to clipboard: #{key}, Enter";function o(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function c(t,e){var n,c,r,s,u,p,d=!1;e||(e={}),n=e.debug||!1;try{r=a(),s=document.createRange(),u=document.getSelection(),p=document.createElement("span"),p.textContent=t,p.style.all="unset",p.style.position="fixed",p.style.top=0,p.style.clip="rect(0, 0, 0, 0)",p.style.whiteSpace="pre",p.style.webkitUserSelect="text",p.style.MozUserSelect="text",p.style.msUserSelect="text",p.style.userSelect="text",p.addEventListener("copy",(function(a){if(a.stopPropagation(),e.format)if(a.preventDefault(),"undefined"===typeof a.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var i=l[e.format]||l["default"];window.clipboardData.setData(i,t)}else a.clipboardData.clearData(),a.clipboardData.setData(e.format,t);e.onCopy&&(a.preventDefault(),e.onCopy(a.clipboardData))})),document.body.appendChild(p),s.selectNodeContents(p),u.addRange(s);var m=document.execCommand("copy");if(!m)throw new Error("copy command was unsuccessful");d=!0}catch(f){n&&console.error("unable to copy using execCommand: ",f),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),d=!0}catch(f){n&&console.error("unable to copy using clipboardData: ",f),n&&console.error("falling back to prompt"),c=o("message"in e?e.message:i),window.prompt(c,t)}}finally{u&&("function"==typeof u.removeRange?u.removeRange(s):u.removeAllRanges()),p&&document.body.removeChild(p),r()}return d}t.exports=c},3545:function(t,e,n){n(1539),t.exports=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,n=[],a=0;a<t.rangeCount;a++)n.push(t.getRangeAt(a));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){"Caret"===t.type&&t.removeAllRanges(),t.rangeCount||n.forEach((function(e){t.addRange(e)})),e&&e.focus()}}},377:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return je}});var a=n(3396),l=n(7139),i=function(t){return(0,a.dD)("data-v-50e33ae0"),t=t(),(0,a.Cn)(),t},o={key:0},c={ref:"observer",class:"observer"},r={key:1,class:"text-center",style:{"margin-top":"100px"}},s=i((function(){return(0,a._)("h1",{class:"display-4"},"Сервис временно недоступен :-(",-1)})),u=i((function(){return(0,a._)("p",{class:"lead"},"Загляните к нам чуть позднее. Мы его обязательно починим!",-1)})),p=[s,u];function d(t,e,n,i,s,u){var d=(0,a.up)("pb-search"),m=(0,a.up)("pb-detail-contact"),f=(0,a.up)("pb-contacts"),h=(0,a.up)("scale-loader");return t.apiService?((0,a.wg)(),(0,a.iD)("div",o,[(0,a.Wm)(d),(0,a._)("div",{class:(0,l.C_)(["contacts",{loading:t.loading&&!t.loadingShow}])},[(0,a.Wm)(m),(0,a.Wm)(f,{view:t.defaultView},null,8,["view"])],2),(0,a._)("div",c,[(0,a.Wm)(h,{loading:t.loadingShow,color:"#337ab7",height:"20px",width:"4px",margin:"2px",radius:"0px"},null,8,["loading"])],512)])):((0,a.wg)(),(0,a.iD)("div",r,p))}var m=n(5082),f=n(6948),h=n(6728),v=n(669),g=(n(7327),n(1539),n(9242)),y=function(t){return(0,a.dD)("data-v-7cf2428a"),t=t(),(0,a.Cn)(),t},b={key:0,class:"btn-ctrl"},x=y((function(){return(0,a._)("i",{class:"fa-solid fa-magnifying-glass"},null,-1)})),w=y((function(){return(0,a._)("span",null,"поиск",-1)})),C=[x,w],k={class:"search-ctrl"},_=y((function(){return(0,a._)("div",{class:"fas fa-times",style:{position:"absolute",cursor:"pointer","z-index":"0","font-size":"25px",color:"rgb(170, 170, 170)",top:"11.5px",right:"15px"}},null,-1)})),D=[_];function S(t,e,n,i,o,c){return(0,a.wg)(),(0,a.iD)("div",{class:(0,l.C_)(["search d-flex justify-content-end",{animate:o.animate},{active:o.focusState},{"auto-hide":!o.focusState&&t.searchAutoHide&&t.filter},{"auto-show":o.focusState&&t.searchAutoHide&&t.filter}])},[t.searchAutoHide?((0,a.wg)(),(0,a.iD)("div",b,[(0,a._)("button",{type:"button",class:"btn btn-primary btn-search",onClick:e[0]||(e[0]=function(){return c.selectAll&&c.selectAll.apply(c,arguments)}),title:"Поиск контактов"},C)])):(0,a.kq)("",!0),(0,a._)("div",k,[(0,a._)("div",{style:{position:"relative",margin:"0",padding:"0",border:"none"},onMouseover:e[7]||(e[7]=function(t){return o.hoverDiv=!0}),onMouseleave:e[8]||(e[8]=function(t){return o.hoverDiv=!1})},[c.showClear?((0,a.wg)(),(0,a.iD)("div",{key:0,onClick:e[1]||(e[1]=function(){return c.clear&&c.clear.apply(c,arguments)})},D)):(0,a.kq)("",!0),(0,a.wy)((0,a._)("input",{ref:"search",type:"text",class:"form-control form-control-lg",placeholder:"Быстрый поиск контактов",spellcheck:"false",autocomplete:"off","onUpdate:modelValue":e[2]||(e[2]=function(e){return t.filter=e}),onBlur:e[3]||(e[3]=function(t){return c.setFocus(!1)}),onFocus:e[4]||(e[4]=function(t){return c.setFocus(!0)}),onKeydown:[e[5]||(e[5]=(0,g.D2)((function(t){return o.focusState=!1}),["esc"])),e[6]||(e[6]=(0,g.D2)((function(t){return o.focusState=!1}),["enter"]))]},null,544),[[g.nr,t.filter]])],32)])],2)}n(4916),n(4765);var P={name:"PbSearch",data:function(){return{hoverDiv:!1,focusState:!1,animate:!1}},computed:{showClear:function(){return this.hoverDiv&&this.filter.length>0}},mounted:function(){this.searchIntercept&&window.addEventListener("keydown",this.keySearch),this.filter||(this.focusState=!0)},unmounted:function(){window.removeEventListener("keydown",this.keySearch)},methods:{clear:function(){this.focusState=!0,this.filterChange("")},selectAll:function(){this.$refs.search.setSelectionRange(0,this.filter.length),this.focusState=!0},setFocus:function(t){var e=this;setTimeout((function(){e.focusState=t}),200)},keySearch:function(t){(114===t.keyCode||t.ctrlKey&&70===t.keyCode)&&(t.preventDefault(),this.focusState=!0,this.selectAll())}},watch:{focusState:function(t){var e=this;this.animate=!0,t?setTimeout((function(){e.$refs.search.focus(),e.animate=!1}),200):setTimeout((function(){e.$refs.search.blur(),e.animate=!1}),200)}},setup:function(){return(0,m.Z)((0,m.Z)((0,m.Z)({},(0,v.U2)("app/*")),(0,v.Z_)("phonebook",["filter"])),(0,v.RE)("phonebook",["filterChange"]))}},Z=n(89);const j=(0,Z.Z)(P,[["render",S],["__scopeId","data-v-7cf2428a"]]);var I=j,T=(n(8309),function(t){return(0,a.dD)("data-v-04f98b36"),t=t(),(0,a.Cn)(),t}),E={key:0,class:"mt-4"},H={class:"p-3 shadow-sm bg-white rounded d-flex flex-fill flex-row align-self-stretch"},R={class:"d-flex flex-column flex-fill"},q={class:"d-flex flex-column flex-sm-row"},z={class:"align-self-top text-center me-0 me-sm-4"},A={class:"p-2 flex-fill text-center text-sm-start"},U=["textContent"],Y=["textContent"],K={class:"mt-3"},N={"aria-label":"breadcrumb"},L={class:"breadcrumb bg-light justify-content-center justify-content-sm-start"},F=["textContent","onClick"],W={class:"mt-4 row text-muted"},B={class:"d-flex flex-column col align-items-stretch m-2"},M=T((function(){return(0,a._)("h6",{class:"m-0 pb-2",style:{"border-bottom":"1px solid #dee2e6"}},[(0,a._)("span",{class:"fa fa-phone"}),(0,a._)("span",{class:"ms-3"},"Телефон для связи:")],-1)})),V={class:"flex-fill py-2"},O={class:"d-flex flex-column col align-items-stretch m-2"},$=T((function(){return(0,a._)("h6",{class:"m-0 pb-2",style:{"border-bottom":"1px solid #dee2e6"}},[(0,a._)("span",{class:"fa fa-at"}),(0,a._)("span",{class:"ms-3"},"Электронная почта:")],-1)})),X={class:"flex-fill py-2"};function G(t,e,n,i,o,c){var r=(0,a.up)("pb-contact-photo"),s=(0,a.up)("pb-contact-value");return t.contact?((0,a.wg)(),(0,a.iD)("div",E,[(0,a._)("div",H,[(0,a._)("div",R,[(0,a._)("div",q,[(0,a._)("div",z,[(0,a.Wm)(r,{src:t.contact.photo},null,8,["src"])]),(0,a._)("div",A,[(0,a._)("h3",{textContent:(0,l.zw)(t.contact.name)},null,8,U),(0,a._)("span",null,[(0,a._)("p",{textContent:(0,l.zw)(t.contact.title)},null,8,Y),(0,a._)("div",K,[(0,a._)("nav",N,[(0,a._)("ol",L,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.contact.department,(function(t,e){return(0,a.wg)(),(0,a.iD)("li",{key:t,class:"breadcrumb-item"},[(0,a._)("a",{class:"click",textContent:(0,l.zw)(t.name),onClick:function(){return c.clickDepartment(e+1)}},null,8,F)])})),128))])])])]),(0,a._)("div",W,[(0,a._)("div",B,[M,(0,a._)("div",V,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.contact.params.phone,(function(t){return(0,a.wg)(),(0,a.j4)(s,{item:t,key:t},null,8,["item"])})),128))])]),(0,a._)("div",O,[$,(0,a._)("div",X,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.contact.params.email,(function(t){return(0,a.wg)(),(0,a.j4)(s,{item:t,key:t},null,8,["item"])})),128))])])])])])])])])):(0,a.kq)("",!0)}n(9714);var J=["src"];function Q(t,e,n,i,o,c){return(0,a.wg)(),(0,a.iD)("img",{class:(0,l.C_)(["img-thumbnail","rounded",{click:t.$attrs.onClick}]),name:"photo",src:c.srcPhoto,style:{"min-width":"70px"}},null,10,J)}var tt={name:"PbPhoto",props:{src:String},data:function(){return{baseUrl:h.v.baseApi}},computed:{srcPhoto:function(){return this.baseUrl+this.src}},mounted:function(){}};const et=(0,Z.Z)(tt,[["render",Q],["__scopeId","data-v-a8663694"]]);var nt=et,at=(n(7268),n(9254),["title"]),lt={key:0,class:"me-2 text-nowrap"},it=["href","textContent"],ot={key:0,class:"me-2 text-nowrap"},ct=["href","textContent"];function rt(t,e,n,i,o,c){return(0,a.wg)(),(0,a.iD)("div",{class:"value",title:n.hint&&n.item.type||null},[n.small?((0,a.wg)(),(0,a.iD)("small",{key:0,class:(0,l.C_)(["d-flex flex-wrap",{"justify-content-between":!n.center},{"justify-content-center":n.center}])},[n.notitle?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("span",lt,(0,l.zw)(n.item.type)+":",1)),(0,a._)("a",{class:(0,l.C_)(["text-nowrap text-end",{"flex-fill":!n.center}]),href:n.item.link,textContent:(0,l.zw)(n.item.value)},null,10,it)],2)):((0,a.wg)(),(0,a.iD)("span",{key:1,class:(0,l.C_)(["d-flex flex-wrap",{"justify-content-between":!n.center},{"justify-content-center":n.center}])},[n.notitle?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("span",ot,(0,l.zw)(n.item.type)+":",1)),(0,a._)("a",{class:(0,l.C_)(["text-nowrap text-end",{"flex-fill":!n.center}]),href:n.item.link,textContent:(0,l.zw)(n.item.value)},null,10,ct)],2))],8,at)}var st={name:"PbContactValue",props:{item:Object,small:{type:Boolean,default:!1},notitle:{type:Boolean,default:!1},center:{type:Boolean,default:!1},hint:{type:Boolean,default:!1}}};const ut=(0,Z.Z)(st,[["render",rt],["__scopeId","data-v-f36e5804"]]);var pt=ut,dt={name:"PbDetailContact",components:{PbContactPhoto:nt,PbContactValue:pt},methods:{clickDepartment:function(t){if(this.clickDepartmentName&&(this.clickDepartmentNameLast||t<this.contact.department.length)){var e=document.getSelection().toString();if(e.length>0)return;this.filterChange(this.contact.department[t-1].slug)}}},setup:function(){return(0,m.Z)((0,m.Z)((0,m.Z)((0,m.Z)({},(0,v.U2)("app/*")),(0,v.U2)("phonebook/",["contact"])),(0,v.Z_)("phonebook/",["filter"])),(0,v.RE)("phonebook",["filterChange"]))}};const mt=(0,Z.Z)(dt,[["render",G],["__scopeId","data-v-04f98b36"]]);var ft=mt,ht={class:"mt-4 row p-2"};function vt(t,e,n,l,i,o){var c=(0,a.up)("pb-contact-card"),r=(0,a.up)("pb-contact-table");return(0,a.wg)(),(0,a.iD)("div",ht,["card"==n.view?((0,a.wg)(!0),(0,a.iD)(a.HY,{key:0},(0,a.Ko)(t.contacts,(function(e,l){return(0,a.wg)(),(0,a.j4)(c,{item:e,key:e.id,"department-title":o.departmentTitle(e.department,t.contacts[l-1]&&t.contacts[l-1].department),view:n.view},null,8,["item","department-title","view"])})),128)):(0,a.kq)("",!0),"table"==n.view?((0,a.wg)(!0),(0,a.iD)(a.HY,{key:1},(0,a.Ko)(t.contacts,(function(e,n){return(0,a.wg)(),(0,a.j4)(r,{item:e,key:e.id,"department-title":o.departmentTitle(e.department,t.contacts[n-1]&&t.contacts[n-1].department)},null,8,["item","department-title"])})),128)):(0,a.kq)("",!0)])}n(7042);var gt=function(t){return(0,a.dD)("data-v-5e13d9be"),t=t(),(0,a.Cn)(),t},yt={key:0,class:"col-lg-6 p-0 d-flex card-view"},bt={class:"m-2 p-3 shadow-sm bg-white rounded d-flex flex-fill flex-row align-self-stretch"},xt={class:"d-flex flex-column flex-fill"},wt={key:0,class:"position-relative"},Ct={class:"btn-group btn-group-xs copy"},kt=gt((function(){return(0,a._)("i",{class:"fa fa-copy fa-lg"},null,-1)})),_t=["textContent"],Dt={class:"d-flex flex-column flex-sm-row"},St={class:"align-self-top text-center pt-2"},Pt={class:"p-2 flex-fill"},Zt=["textContent"],jt=["textContent"],It=["textContent"],Tt={class:"d-flex flex-row justify-content-around justify-content-sm-between text-muted"},Et={key:0,class:"me-1"},Ht=gt((function(){return(0,a._)("small",{class:"text-nowrap"},[(0,a._)("span",{class:"fa fa-phone"}),(0,a._)("span",{class:"font-weight-bold ms-1"},"Телефон для связи:")],-1)})),Rt={key:1,class:"ms-1"},qt=gt((function(){return(0,a._)("small",{class:"text-nowrap"},[(0,a._)("span",{class:"fa fa-at"}),(0,a._)("span",{class:"font-weight-bold ms-1"},"Электронная почта:")],-1)}));function zt(t,e,n,i,o,c){var r=(0,a.up)("pb-contact-department"),s=(0,a.up)("pb-contact-photo"),u=(0,a.up)("pb-contact-value");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(r,{department:n.departmentTitle},null,8,["department"]),"card"==n.view?((0,a.wg)(),(0,a.iD)("div",yt,[(0,a._)("div",bt,[(0,a._)("div",xt,[t.clipboardFastCopy?((0,a.wg)(),(0,a.iD)("div",wt,[(0,a._)("div",Ct,[(0,a._)("button",{type:"button",class:"btn btn-outline-phonebook",title:"Копировать в буфер обмена",ref:"copyBtn",onClick:e[0]||(e[0]=function(){return c.clipboardCopy&&c.clipboardCopy.apply(c,arguments)})},[kt,(0,a._)("span",{textContent:(0,l.zw)(o.copyText)},null,8,_t)],512)])])):(0,a.kq)("",!0),(0,a._)("div",Dt,[(0,a._)("div",St,[(0,a.Wm)(s,{src:n.item.photo,onClick:(0,g.iM)(c.clickContact,["prevent"])},null,8,["src","onClick"])]),(0,a._)("div",Pt,[(0,a._)("h6",{class:"text-center text-sm-start click",textContent:(0,l.zw)(n.item.name),onClick:e[1]||(e[1]=(0,g.iM)((function(){return c.clickContact&&c.clickContact.apply(c,arguments)}),["prevent"]))},null,8,Zt),(0,a._)("small",null,[(0,a._)("p",{class:"text-center text-sm-start m-0",textContent:(0,l.zw)(n.item.title)},null,8,jt),(0,a._)("p",{class:"text-center text-sm-start m-0",textContent:(0,l.zw)(n.item.department.name)},null,8,It)])])]),(0,a._)("div",Tt,[n.item.params.phone?((0,a.wg)(),(0,a.iD)("div",Et,[Ht,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.item.params.phone,(function(t){return(0,a.wg)(),(0,a.j4)(u,{item:t,key:t,small:""},null,8,["item"])})),128))])):(0,a.kq)("",!0),n.item.params.email?((0,a.wg)(),(0,a.iD)("div",Rt,[qt,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.item.params.email,(function(t){return(0,a.wg)(),(0,a.j4)(u,{item:t,key:t,small:""},null,8,["item"])})),128))])):(0,a.kq)("",!0)])])])])):(0,a.kq)("",!0)],64)}n(2222),n(1249),n(9600);var At={key:0,class:"col-12 p-0 d-flex"},Ut={class:"m-2 px-2 shadow-sm bg-light rounded d-flex flex-fill flex-column align-self-stretch"},Yt=["onClick"],Kt=["textContent"],Nt=["onClick"],Lt={class:"m-2 p-2 shadow-sm bg-light rounded d-flex flex-fill flex-column align-self-stretch"},Ft={class:"mx-2 d-lg-flex flex-row"},Wt=["textContent"];function Bt(t,e,n,i,o,c){return n.department.length>0?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[t.joinDepartmentName?((0,a.wg)(),(0,a.iD)("div",At,[(0,a._)("div",Ut,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.department,(function(e,i){return(0,a.wg)(),(0,a.iD)("div",{class:"m-2 d-lg-flex flex-row",key:e,onClick:function(){return c.clickDepartment(i+1)}},[(0,a._)("h5",{class:(0,l.C_)(["m-0 align-self-center flex-fill",{click:t.clickDepartmentName&&(t.clickDepartmentNameLast||i<n.department.length-1)}]),textContent:(0,l.zw)(e.name+(i<n.department.length-1?" /":""))},null,10,Kt)],8,Yt)})),128))])])):((0,a.wg)(!0),(0,a.iD)(a.HY,{key:1},(0,a.Ko)(n.department,(function(e,i){return(0,a.wg)(),(0,a.iD)("div",{key:e,class:"col-12 p-0 d-flex",onClick:function(){return c.clickDepartment(i+1)}},[(0,a._)("div",Lt,[(0,a._)("div",Ft,[(0,a._)("h5",{class:(0,l.C_)(["m-0 align-self-center flex-fill",{click:t.clickDepartmentName&&(t.clickDepartmentNameLast||i<n.department.length-1)}]),textContent:(0,l.zw)(e.name)},null,10,Wt)])])],8,Nt)})),128))],64)):(0,a.kq)("",!0)}var Mt={name:"PbContactDepartment",props:{department:{type:Array,default:[]}},methods:{clickDepartment:function(t){if(this.clickDepartmentName&&(this.clickDepartmentNameLast||t<this.department.length)){var e=document.getSelection().toString();if(e.length>0)return;this.filterChange(this.department[t-1].slug)}}},setup:function(){return(0,m.Z)((0,m.Z)((0,m.Z)({},(0,v.U2)("app/*")),(0,v.Z_)("phonebook/",["filter"])),(0,v.RE)("phonebook",["filterChange"]))}};const Vt=(0,Z.Z)(Mt,[["render",Bt],["__scopeId","data-v-1c244298"]]);var Ot=Vt,$t=n(1945),Xt=n.n($t),Gt={name:"PbContactCard",props:{item:Object,departmentTitle:{type:Array,default:[]},view:{type:String,default:"card"}},data:function(){return{copyText:"копировать"}},components:{PbContactValue:pt,PbContactDepartment:Ot,PbContactPhoto:nt},methods:{clickContact:function(){var t=document.getSelection().toString();t.length>0||this.filterChange(this.item.slug)},clipboardCopy:function(){var t=this;this.copyText="скопировано",setTimeout((function(){t.copyText="копировать"}),2e3);var e=[];this.clipboardCopyItems_name&&(e=e.concat(this.item.name)),this.clipboardCopyItems_title&&(e=e.concat(this.item.title)),this.clipboardCopyItems_company&&(e=e.concat(this.item.department[0].name)),this.clipboardCopyItems_department&&(e=e.concat(this.item.department.slice(1).map((function(t){return t.name})))),Xt()(e.join("\t"),{format:"text/plain"})}},setup:function(){return(0,m.Z)((0,m.Z)((0,m.Z)({},(0,v.U2)("app/*")),(0,v.Z_)("phonebook/",["filter"])),(0,v.RE)("phonebook",["filterChange"]))}};const Jt=(0,Z.Z)(Gt,[["render",zt],["__scopeId","data-v-5e13d9be"]]);var Qt=Jt,te=function(t){return(0,a.dD)("data-v-b83fa16c"),t=t(),(0,a.Cn)(),t},ee=(0,a.uE)('<div class="row py-2 mx-0 px-0" data-v-b83fa16c><div class="col text-center" data-v-b83fa16c><h6 data-v-b83fa16c><small data-v-b83fa16c>Должность / Ф.И.О.</small></h6></div><div class="col text-center" data-v-b83fa16c><h6 data-v-b83fa16c><small data-v-b83fa16c>Телефон внутренний</small></h6></div><div class="col text-center" data-v-b83fa16c><h6 data-v-b83fa16c><small data-v-b83fa16c>Телефон городской</small></h6></div><div class="col text-center" data-v-b83fa16c><h6 data-v-b83fa16c><small data-v-b83fa16c>HiCom</small></h6></div><div class="col text-center" data-v-b83fa16c><h6 data-v-b83fa16c><small data-v-b83fa16c>Электронная почта</small></h6></div></div>',1),ne={class:"col"},ae={class:"text-center text-sm-start"},le=["textContent"],ie=te((function(){return(0,a._)("br",null,null,-1)})),oe=["textContent"],ce={class:"col"},re={class:"justify-content-center"},se={class:"col"},ue={class:"justify-content-center"},pe={class:"col"},de={class:"justify-content-center"},me={class:"col"},fe={class:"justify-content-center"};function he(t,e,n,i,o,c){var r=(0,a.up)("pb-contact-department"),s=(0,a.up)("pb-contact-value");return(0,a.wg)(),(0,a.iD)(a.HY,null,[n.departmentTitle.length>0?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[(0,a.Wm)(r,{department:n.departmentTitle},null,8,["department"]),ee],64)):(0,a.kq)("",!0),(0,a._)("div",{class:"row py-2 mx-0 px-0 click align-items-center",onClick:e[0]||(e[0]=function(){return c.clickContact&&c.clickContact.apply(c,arguments)})},[(0,a._)("small",ne,[(0,a._)("div",ae,[(0,a._)("span",{textContent:(0,l.zw)(n.item.title)},null,8,le),ie,(0,a._)("span",{textContent:(0,l.zw)(n.item.name)},null,8,oe)])]),(0,a._)("div",ce,[(0,a._)("div",re,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.extPhone(n.item.params.phone),(function(t){return(0,a.wg)(),(0,a.j4)(s,{key:t,item:t,notitle:1==c.uniqItem(c.extPhone(n.item.params.phone).map((function(t){return t.type}))).length,small:"",center:"",hint:""},null,8,["item","notitle"])})),128))])]),(0,a._)("div",se,[(0,a._)("div",ue,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.intPhone(n.item.params.phone),(function(t){return(0,a.wg)(),(0,a.j4)(s,{key:t,item:t,notitle:1==c.uniqItem(c.intPhone(n.item.params.phone).map((function(t){return t.type}))).length,small:"",center:"",hint:""},null,8,["item","notitle"])})),128))])]),(0,a._)("div",pe,[(0,a._)("div",de,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(c.hicomPhone(n.item.params.phone),(function(t){return(0,a.wg)(),(0,a.j4)(s,{key:t,item:t,notitle:1==c.uniqItem(c.hicomPhone(n.item.params.phone).map((function(t){return t.type}))).length,small:"",center:"",hint:""},null,8,["item","notitle"])})),128))])]),(0,a._)("div",me,[(0,a._)("div",fe,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.item.params.email,(function(t){return(0,a.wg)(),(0,a.j4)(s,{key:t,item:t,notitle:1==c.uniqItem(n.item.params.email.map((function(t){return t.type}))).length,small:"",center:"",hint:""},null,8,["item","notitle"])})),128))])])])],64)}n(7601),n(4603),n(8450),n(8386);var ve={name:"PbContactTable",props:{item:Object,departmentTitle:{type:Array,default:[]}},components:{PbContactValue:pt,PbContactDepartment:Ot,PbContactPhoto:nt},methods:{clickContact:function(){var t=document.getSelection().toString();t.length>0||this.filterChange(this.item.slug)},extPhone:function(t){return t.filter((function(t){return RegExp("^рабочий|^конференция","i").test(t.type)}))},intPhone:function(t){return t.filter((function(t){return RegExp("^городской","i").test(t.type)}))},hicomPhone:function(t){return t.filter((function(t){return RegExp("^hicom","i").test(t.type)}))},uniqItem:function(t){return t.filter((function(t,e,n){return n.indexOf(t)===e}))}},setup:function(){return(0,m.Z)((0,m.Z)((0,m.Z)({},(0,v.U2)("app/*")),(0,v.Z_)("phonebook/",["filter"])),(0,v.RE)("phonebook",["filterChange"]))}};const ge=(0,Z.Z)(ve,[["render",he],["__scopeId","data-v-b83fa16c"]]);var ye=ge,be={name:"PbContacts",props:{view:{type:String,default:"card"}},components:{PbContactCard:Qt,PbContactTable:ye},methods:{departmentTitle:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=0;n<t.length;n++)if(!e[n]||e[n].slug!=t[n].slug)return t.slice(n);return[]}},setup:function(){return(0,m.Z)({},(0,v.U2)("phonebook/",["contacts"]))}};const xe=(0,Z.Z)(be,[["render",vt]]);var we=xe,Ce={class:"v-spinner"};function ke(t,e,n,i,o,c){return(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",Ce,[(0,a._)("div",{class:"v-scale v-scale1",style:(0,l.j5)([o.spinnerStyle,o.spinnerDelay1])},null,4),(0,a._)("div",{class:"v-scale v-scale2",style:(0,l.j5)([o.spinnerStyle,o.spinnerDelay2])},null,4),(0,a._)("div",{class:"v-scale v-scale3",style:(0,l.j5)([o.spinnerStyle,o.spinnerDelay3])},null,4),(0,a._)("div",{class:"v-scale v-scale4",style:(0,l.j5)([o.spinnerStyle,o.spinnerDelay4])},null,4),(0,a._)("div",{class:"v-scale v-scale5",style:(0,l.j5)([o.spinnerStyle,o.spinnerDelay5])},null,4)],512)),[[g.F8,n.loading]])}var _e={name:"ScaleLoader",props:{loading:{type:Boolean,default:!0},color:{type:String,default:"#5dc596"},height:{type:String,default:"35px"},width:{type:String,default:"4px"},margin:{type:String,default:"2px"},radius:{type:String,default:"2px"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.height,width:this.width,margin:this.margin,borderRadius:this.radius,display:"inline-block",animationName:"v-scaleStretchDelay",animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"cubic-bezier(.2,.68,.18,1.08)",animationFillMode:"both"},spinnerDelay1:{animationDelay:"0.1s"},spinnerDelay2:{animationDelay:"0.2s"},spinnerDelay3:{animationDelay:"0.3s"},spinnerDelay4:{animationDelay:"0.4s"},spinnerDelay5:{animationDelay:"0.5s"}}}};const De=(0,Z.Z)(_e,[["render",ke]]);var Se=De,Pe={name:"ContactsView",components:{PbSearch:I,PbDetailContact:ft,PbContacts:we,ScaleLoader:Se},mounted:function(){var t=this,e={rootMargin:"0px",threshold:1},n=function(e,n){e[0].isIntersecting&&!t.loading&&t.loadContacts()},a=new IntersectionObserver(n,e);a.observe(this.$refs.observer)},methods:(0,m.Z)({},(0,v.RE)("phonebook",["loadContacts"])),setup:function(){return(0,f.jq)({title:h.v.title("Контакты")}),(0,m.Z)((0,m.Z)({},(0,v.U2)("app/*")),(0,v.U2)("phonebook/",["apiService","loading","loadingShow"]))}};const Ze=(0,Z.Z)(Pe,[["render",d],["__scopeId","data-v-50e33ae0"]]);var je=Ze}}]);
//# sourceMappingURL=views-Contacts-legacy.23988aee.js.map